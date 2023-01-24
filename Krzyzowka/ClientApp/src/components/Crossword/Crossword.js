import React, { Component } from 'react';
import Grid from "./Grid";
import authService from '../api-authorization/AuthorizeService';

export class Crossword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                height: 0,
                width: 0,
                wordList: [],
                questions: []
            },
            metaData: {
                numberOfWords: 0,
                firstLetters: [],
            },
            positioning: {
                refs: [],
                currentFocus: 0,
                currentWord: null,
            },
            user_answers: [],
            answers: [
                "uszka",
                "szczeniak",
                "piesek",
                "samoyed",
                "nos",
                "mudik"
            ],
        
            reset: false,
            loading: true,
        };

    }

    componentDidMount() {
        this.populateCrosswordData();
        this.setState({ loading: false });

    }


    addSolvedWord = (tuple) => {
    
        let { user_answers } = this.state;
        let answeredIndices = [];

        tuple.word = tuple.word.toLowerCase();

        for (let i = 0; i < user_answers.length; i++) {
            answeredIndices.push(user_answers[i].number);
        }

        if ( user_answers.length !== 0) {
            if (answeredIndices.includes(tuple.number)) {
                user_answers[answeredIndices.indexOf(tuple.number)].word = tuple.word;

                this.setState(
                    () => ({
                        user_answers: user_answers
                        
                    }),
                    console.log("Edytowano slowo ", tuple)
                );
            } else {
                //add an attempt
                this.setState(
                    (prevState) => ({
                         user_answers: [...this.state.user_answers, tuple]
                    }),
                    console.log("Dodano slowo ", tuple)
                );
            }
        } else {
            //add an attempt
            this.setState(
                (prevState) => ({
                    user_answers: [...this.state.user_answers, tuple]
                }),
                console.log("Dodano slowo ", tuple)
            );
        }
    };


    checkAnswers = () => {
        //pobieramy odpowiedzi użytkownika i te prawdziwe
        const { user_answers, answers } = this.state.data;

        sa.sort((a, b) => {
            return a.number - b.number;
        });
        //console.log(user_answers, answers);
        
        let score = 0;
        let newAttempts = sa;
        console.log(user_answers);
        
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

            console.log("Sorka ale musisz odpowiedziec na wszystko na razie masz: " + user_answers.length + " na " + answers.length);
        }

        user_answers.forEach((attempt) => {
            if ( answers[attempt.number] === attempt.word) {
                score += 1;
            }
            else {
                console.log("zła odpowiedz: " + attempt.word + " poprawna to: " + answers[attempt.number]);
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
            startingCell += this.state.data.wordList[i].length;
        }

        //ustawiamy inteks słowa i jego początkowego znaku,
        //po czym przenosimy na jego komurkę uwagę
        this.setState(
            () => ({
                positioning: {
                    ...this.state.positioning,
                    currentFocus: startingCell,
                    currentWord: index
                }
            }),
            this.state.positioning.refs[startingCell].current.focus()
            );
    };


    handleNewCurrentWord = (neWord) => {
        this.setState(
            () => ({
                positioning: {
                    ...this.state.positioning,
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

        const { currentFocus, refs } = this.state.positioning;
        let nextCell = 0;

        if (backwards) {
            nextCell = currentFocus === 0 ? (refs.length - 1) : (currentFocus - 1);
        } else {
            nextCell = (currentFocus < refs.length - 1) ? currentFocus + 1 : 0;
        }

        //liczymy następny wyraz
        let newWord = 0;

        for (let i = 1; this.state.metaData.firstLetters[i] <= nextCell; i++) {
            newWord = i;
        }

        this.setState(
            {
                positioning: {
                    ...this.state.positioning,
                    currentFocus: nextCell,
                    currentWord: newWord
                }
            }
        );   

        this.state.positioning.refs[nextCell].current.focus();
        
    };

    
    //funkcja która przenosi nas do następnego/poprzedniego słowa
    moveToNextWord = (backwards) => {

        //pobieramy zmienne ze stanu
        const { numberOfWords } = this.state.metaData;
        const { currentWord } = this.state.positioning;

        //określamy zmienne na index następnego słowa i jego komurki początkowej
        let nextWord = 0;

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
        

        //ustawiamy inteks słowa i jego początkowego znaku,
        //po czym przenosimy na jego komurkę uwagę
        this.setState(
            () => ({
                positioning: {
                    ...this.state.positioning,
                    currentFocus: this.state.metaData.firstLetters[nextWord], 
                    currentWord: nextWord
                },
            }),
            this.state.positioning.refs[this.state.metaData.firstLetters[nextWord]].current.focus()
        );
        
    };


    //przez wyłącza focus na słowie
    handleInputBlur = () => {
        this.setState(
            () => ({
                positioning: {
                    ...this.state.positioning,
                    currentWord: null
                }
            }));
    }

    changeActiveCell = (activeCell) => {
        let newActiveCell = 0,
            allPrevWords = 0,
            allCurWordChars = activeCell.index;

        for (let i = 0; i < activeCell.wordNum; i++) {
            allPrevWords += this.state.data.wordList[i].length;
        }

        newActiveCell = allPrevWords + allCurWordChars;

        this.setState((prevState) => ({
            positioning: {
                ...this.state.positioning,
                currentFocus: newActiveCell,
                currentWord: activeCell.wordNum
            }
        }));
    };




    addToRefs = (ref) => {
        const { positioning } = this.state;
        this.setState((prevState) => ({
            positioning: {
                ...positioning,
                refs: prevState.positioning.refs.concat(ref)
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
        if (this.state.loading) {
            return (
                <div>
                    <h1 id="tabelLabel" >Strona Quizu</h1>
                    <p>Pobieranie pytań</p>
                    <p><em>Loading...</em></p>
                </div>
            );
        }
        else {
            if (this.state.metaData.numberOfWords > 0) {
                return (
                    <div className="CW-container">
                        <Grid
                            data={this.state.data}
                            metaData={this.state.metaData}
                            positioning={this.state.positioning}
                            addSolvedWord={this.addSolvedWord}
                            addToRefs={this.addToRefs}
                            moveToNextCell={this.moveToNextCell}
                            moveToNextWord={this.moveToNextWord}
                            changeActiveCell={this.changeActiveCell}
                            currentWord={this.state.positioning.currentWord}
                            handleNewCurrentWord={this.handleNewCurrentWord}
                            handleInputBlur={this.handleInputBlur}
                        ></Grid>
                        <div className='questions'>
                            {this.state.data.questions.map((question, index) => {
                                return (

                                    <div className={this.state.data.currentWord === index ? "question editing" : "question "} key={question}>
                                        <li onClick={(e) => this.handleClueClick(e, index)} >
                                            {index + 1}.  {question}&nbsp;({this.state.data.wordList[index].length})
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

    async populateCrosswordData() {
        let id  = 1;
        const token = await authService.getAccessToken();
        const response = await fetch('crossword/data/'+id, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }

        });
        const responseData = await response.json();
        this.setState({
            data: responseData,
        }, () => {

            //ustawiamy długość tablicy z indeksami pierwszych znaków 
            let firsts = new Array(this.state.data.wordList.length).fill(0);

            //wypełniamy tablicę licząc indeksy pirewszych znaków
            this.state.data.wordList.forEach((word, index) => {
                if (index < this.state.data.wordList.length - 1) {
                    firsts[index + 1] = firsts[index] + word.length;
                }
            });
            //zapisujemy stan ilości liter i indeksów początkowych
            this.setState({
                metaData: {
                    numberOfWords: this.state.data.wordList.length,
                    firstLetters: firsts
                }
            });
        }
        );        
    }

}
