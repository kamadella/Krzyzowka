import React, { Component } from 'react';
import Grid from "./Grid";

export class Crossword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                height: 13,
                width: 13,
                wordList: [
                    {
                        word: "uszka",
                        orientation: "vertical",
                        x: 1,
                        y: 2,
                        length: 5
                    },
                    {
                        word: "szczeniak",
                        orientation: "horizontal",
                        x: 1,
                        y: 3,
                        length: 9
                    },
                    {
                        word: "piesek",
                        orientation: "vertical",
                        x: 5,
                        y: 1,
                        length: 6
                    },
                    {
                        word: "samoyed",
                        orientation: "vertical",
                        x: 8,
                        y: 2,
                        length: 7
                    },
                    {
                        word: "nos",
                        orientation: "horizontal",
                        x: 7,
                        y: 5,
                        length: 3
                    },
                    {
                        word: "mudik",
                        orientation: "horizontal",
                        x: 6,
                        y: 8,
                        length: 5
                    }
                ],
                qestions: [ 
                    "zdrobnienie narządu do słyszenia",
                    "psie dziecko", 
                    "zdrobnienie slowa pies", 
                    "najładniejsza rasa psa", 
                    "służy do wąchania", 
                    "dziwna rasa psa" 
                ],
                answers: [
                    {
                        word: "uszka",
                        number: 0
                    },
                    {
                        word: "szczeniak",
                        number: 1
                    },
                    {
                        word: "piesek",
                        number: 2
                    },
                    {
                        word: "samoyed",
                        number: 3
                    },
                    {
                        word: "nos",
                        number: 4
                    },
                    {
                        word: "mudik",
                        number: 5
                    }
                ],
                user_answers: [],
                numberOfWords: 6,
                refs: [],
                currentFocus: 0,
                currentWord: null,
            }
        };
    }


    addSolvedWord = (tuple) => {
    
        let { user_answers } = this.state.data;
        let answeredIndices = [];

        tuple.word = tuple.word.toLowerCase();

        for (let i = 0; i < user_answers.length; i++) {
            answeredIndices.push(user_answers[i].number);
        }

        if ( user_answers.length !== 0) {
            if (answeredIndices.includes(tuple.number)) {
                user_answers[answeredIndices.indexOf(tuple.number)].word = tuple.word;

                this.setState(
                    (prevState) => ({
                        data: {
                            ...this.state.data,
                            user_answers: user_answers
                        }
                    }),
                    console.log("Edytowano slowo ", tuple)
                );
            } else {
                //add an attempt
                this.setState(
                    (prevState) => ({
                        data: {
                            ...this.state.data,
                            user_answers: [...this.state.data.user_answers, tuple]
                        }
                    }),
                    console.log("Dodano slowo ", tuple)
                );
            }
        } else {
            //add an attempt
            this.setState(
                (prevState) => ({
                    data: {
                        ...this.state.data,
                        user_answers: [...this.state.data.user_answers, tuple]
                    }
                }),
                console.log("Dodano slowo ", tuple)
            );
        }
    };


    checkAnswers = () => {
        //pobieramy odpowiedzi użytkownika i te prawdziwe
        const { user_answers, answers } = this.state.data;
        let score = 0;

        //dla kazdej odpowiedzi użytkownika sprawdzamy jej odpowiednik w odpoweidziach liczac po indxach
        user_answers.forEach((user_answer) => {
            if ( answers[user_answer.number].word === user_answer.word) {
                score += 1;
            }
            else {
                console.log("zła odpowiedz: " + user_answer.word + " poprawna to: " + answers[user_answer.number].word);
            }
            
        });
        console.log("zdobyłeś punktów: " + score + " na " + answers.length);
    };


    //przechodzimy do słowa o indeksie podanym w inpucie
    handleQuestionClick = (e, index) => {
        //określamy indeks pierwszego znaku słowa
        //jeśli mówimy o 1 słowie, jest to już jego indeks
        let startingCell = 0;

        //sumujemy liczby znaków w poprzednich słowach
        for (let i = 0; i < index; i++) {
            startingCell += this.state.data.wordList[i].word.length;
        }

        //ustawiamy inteks słowa i jego początkowego znaku,
        //po czym przenosimy na jego komurkę uwagę
        this.setState(
            { currentFocus: startingCell, currentWord: index },
            this.state.data.refs[startingCell].current.focus()
            );
    };


    handleNewCurrentWord = (neWord) => {
        this.setState(
            (prevState) => ({
                data: {
                    ...this.state.data,
                    currentWord: neWord
                }
            }),
            console.log("CWhandleNewCurrentWord", neWord)
        );
    };


    moveToNextCell = (backwards) => {
        const { currentFocus, refs } = this.state.data;
        let nextCell = 0;

        if (backwards) {
            nextCell = currentFocus === 0 ? (refs.length - 1) : (currentFocus - 1);
        } else {
            nextCell = (currentFocus < refs.length - 1) ? currentFocus + 1 : 0;
        }

        this.setState(
            { currentFocus: nextCell },
            this.state.data.refs[nextCell].current.focus()
        );
        
    };

    
    //funkcja która przenosi nas do następnego/poprzedniego słowa
    moveToNextWord = (backwards) => {

        //pobieramy zmienne ze stanu
        const { currentWord, numberOfWords } = this.state.data;

        //określamy zmienne na index następnego słowa i jego komurki początkowej
        let nextWord = 0;
        let startingCell = 0;

        //jeśli przekazaliśmy true to cofamy się
        if (backwards) {

            //liczymy indeks poprzedniego słowa, pamiętając o tym, że jeśli obecne to 0, to musimy przejść na koniec
            nextWord = currentWord === 0 ? (numberOfWords - 1) : (currentWord - 1);
        } else {
            //liczymy indeks następnego słowa tym razem możemy użyć modulo
            nextWord = (currentWord + 1) % numberOfWords;
        }

        //liczymy indeks pierwszego znaku w następnym słowie
        //aby to zrobić przejdziemy po każdym poprzednim 
        //i dodamy do siebie ilości ich znaków
        //jeśli mowa o 1 słowie, to jego indeks już mamy
        for (let i = 0; i < nextWord; i++) {
            startingCell += this.state.data.wordList[i].word.length;
        }

        //ustawiamy inteks słowa i jego początkowego znaku,
        //po czym przenosimy na jego komurkę uwagę
        this.setState(
            { currentFocus: startingCell, currentWord: nextWord },
            this.state.data.refs[startingCell].current.focus()
        );
        
    };


    changeActiveCell = (activeCell) => {
        let newActiveCell = 0,
            allPrevWords = 0,
            allCurWordChars = activeCell.index;

        for (let i = 0; i < activeCell.wordNum; i++) {
            allPrevWords += this.state.data.wordList[i].length;
        }

        newActiveCell = allPrevWords + allCurWordChars;

        this.setState((prevState) => ({
            data: {
                ...this.state.data,
                currentFocus: newActiveCell,
                currentWord: activeCell.wordNum
            }
        }));
    };




    addToRefs = (ref) => {
        const { data } = this.state;
        this.setState((prevState) => ({
            data: {
                ...data,
                refs: prevState.data.refs.concat(ref)
            }
        }));
    };



    render() {
        if (this.state.data.wordList.length > 0) {
            return (
                <div className="Crossword_container">
                    <Grid 
                    data={this.state.data} 
                    addSolvedWord={this.addSolvedWord}
                    addToRefs={this.addToRefs}
                    moveToNextCell={this.moveToNextCell}
                    moveToNextWord={this.moveToNextWord}
                    changeActiveCell={this.changeActiveCell}
                    currentWord={this.state.data.currentWord}
                    handleNewCurrentWord={this.handleNewCurrentWord}
                    ></Grid>
                    <div className='questions'>
                        {this.state.data.qestions.map((question, index) => {
                            return (
                                
                                    <div className={ this.state.data.currentWord === index ? "question editing" : "question "} key={question}>
                                        <li onClick={(e) => this.handleQuestionClick(e, index) } >
                                        {index+1}.  {question}
                                        </li>
                                    </div>
                            
                            );
                        })}
                    </div>
                    <div className="buttons">
                        <button className="button" onClick={this.checkAnswers}>Sprawdź</button>
                        <button className="button" onClick={this.loser}>Poddaj się</button>
                    </div>
                </div>
            );
        } else {
            return <p>Loading...</p>;
        }
    }
}
