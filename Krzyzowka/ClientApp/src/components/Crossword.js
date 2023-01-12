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
                        orientation: "down",
                        x: 1,
                        y: 2,
                        length: 5
                    },
                    {
                        word: "szczeniak",
                        orientation: "across",
                        x: 1,
                        y: 3,
                        length: 9
                    },
                    {
                        word: "piesek",
                        orientation: "down",
                        x: 5,
                        y: 1,
                        length: 6
                    },
                    {
                        word: "samoyed",
                        orientation: "down",
                        x: 8,
                        y: 2,
                        length: 7
                    },
                    {
                        word: "nos",
                        orientation: "across",
                        x: 7,
                        y: 5,
                        length: 3
                    },
                    {
                        word: "mudik",
                        orientation: "across",
                        x: 6,
                        y: 8,
                        length: 5
                    }
                ],
                clues: [ 
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
                attempts: [],
                numberOfWords: 6,
                refs: [],
                currentFocus: 0,
                currentWord: null,
                reset: false
            }
        };
    }


    addSolvedWord = (tuple) => {
    
        let { attempts } = this.state.data;
        let answeredIndices = [];

        tuple.word = tuple.word.toLowerCase();

        for (let i = 0; i < attempts.length; i++) {
            answeredIndices.push(attempts[i].number);
        }

        if ( attempts.length !== 0) {
            if (answeredIndices.includes(tuple.number)) {
                attempts[answeredIndices.indexOf(tuple.number)].word =
                    tuple.word;

                this.setState(
                    (prevState) => ({
                        data: {
                            ...this.state.data,
                            attempts: attempts
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
                            attempts: [...this.state.data.attempts, tuple]
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
                        attempts: [...this.state.data.attempts, tuple]
                    }
                }),
                console.log("Added attempt ", tuple)
            );
        }
    };


    checkAnswers = () => {
    const { attempts, answers } = this.state.data;
        let score = 0;
        // sortedAnswers
        /*
        let sa = attempts.slice(0);

        sa.sort((a, b) => {
            return a.number - b.number;
        });
        //console.log(attempts, answers);
        
        let score = 0;
        let newAttempts = sa;
        console.log(attempts);
        
        if (newAttempts.length === answers.length) {
            newAttempts.forEach((attempt, index) => {
                if ( answers[attempt.number].word === attempt.word && answers[index].number === attempt.number ) {
                    score += 1;
                }
            });

            if (score === answers.length) {
                console.log("Brawo wszystkie odgadłeś!");
            } else {
                console.log("przykro mi masz błąd!");
            }
        } else {

            console.log("Sorka ale musisz odpowiedziec na wszystko na razie masz: " + attempts.length + " na " + answers.length);
        }
        */

        attempts.forEach((attempt) => {
            if ( answers[attempt.number].word === attempt.word) {
                score += 1;
            }
            else {
                console.log("zła odpowiedz: " + attempt.word + " poprawna to: " + answers[attempt.number].word);
            }
            
        });
        console.log("zdobyłeś punktów: " + score + " na " + answers.length);
    };


    //przechodzimy do słowa o indeksie podanym w inpucie
    handleClueClick = (e, index) => {
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
        //all the cell change logic is in changeActiveCell
        //here we will just call changeActiveCell with parameters in a
        //loop

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
        // activeCell = {index: 0, wordNum: 0}

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
        //return (
        //    <div>
        //        <p>{this.state.data.wordList.length}</p>
        //        <Grid data={this.state.data}></Grid>
        //    </div>
        //);
        if (this.state.data.wordList.length > 0) {
            return (
                <div className="CW-container">
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
                    {this.state.data.clues.map((clue, index) => {
                        return (
                        <div className={ this.state.data.currentWord === index ? "clue editing" : "clue "} key={clue}>
                            <li onClick={(e) => this.handleClueClick(e, index) } >
                            {clue}&nbsp;({this.state.data.wordList[index].length})
                            </li>
                        </div>
                        );
                    })}
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
