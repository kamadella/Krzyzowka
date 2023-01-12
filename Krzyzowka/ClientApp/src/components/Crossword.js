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
                        word: "Word",
                        orientation: "down",
                        x: 2,
                        y: 1,
                        length: 4
                    },
                    {
                        word: "consolidate",
                        orientation: "across",
                        x: 1,
                        y: 2,
                        length: 11
                    },
                    {
                        word: "shift",
                        orientation: "down",
                        x: 4,
                        y: 2,
                        length: 5
                    },
                    {
                        word: "ice",
                        orientation: "across",
                        x: 4,
                        y: 4,
                        length: 3
                    },
                    {
                        word: "truce",
                        orientation: "across",
                        x: 4,
                        y: 6,
                        length: 5
                    },
                    {
                        word: "relish",
                        orientation: "down",
                        x: 8,
                        y: 5,
                        length: 6
                    }
                ],
                clues: [ 
                    "Co to świat?",
                    "długie łsowo?", 
                    "ctr + + delete?", 
                    "zimne?", 
                    "coś?", 
                    "pasujem?" 
                ],
                answers: [
                    {
                        word: "Word",
                        number: 0
                    },
                    {
                        word: "consolidate",
                        number: 1
                    },
                    {
                        word: "shift",
                        number: 2
                    },
                    {
                        word: "ice",
                        number: 3
                    },
                    {
                        word: "truce",
                        number: 4
                    },
                    {
                        word: "relish",
                        number: 5
                    }
                //"Word",
                //"consolidate",
                //"shift",
                //"ice",
                //"truce",
                //"relish"
                ],
                attempts: [],
                numberOfWords: 6,
                refs: [],
                currentFocus: 0,
                currentWord: null
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
                //[0,2,3], tuple.number===2
                attempts[answeredIndices.indexOf(tuple.number)].word =
                    tuple.word;

                this.setState(
                    (prevState) => ({
                        data: {
                            ...this.state.data,
                            attempts: attempts
                        }
                    }),
                    console.log("Edited attempt ", tuple)
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
                    console.log("Added attempt ", tuple)
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
    
        // sortedAnswers
        let sa = attempts.slice(0);

        sa.sort((a, b) => {
            return a.number - b.number;
        });
    //console.log(attempts, answers);
    
    let score = 0;
    let newAttempts = sa;

    if (newAttempts.length === answers.length) {
        newAttempts.forEach((attempt, index) => {
            if ( answers[attempt.number].word === attempt.word && answers[index].number === attempt.number ) {
                console.log(
                    `${attempt.word} : ${attempt.number} - ${
                        answers[attempt.number].word
                    }: ${answers[index].number}`
                );
                score += 1;
            }
        });

        if (score === answers.length) {
            console.log("Correct!");
        } else {
            console.log("Incorrect!");
        }
    } else {
        console.log(
            "Please answer all " + attempts.length + " of " + answers.length
        );
    }
    };


    clearEverything = () => {
        console.log("clear everything and rerender from scratch");
        // this.setState({ data: null });
    };


    handleClueClick = (e, index) => {
        let startingCell = 0;

        for (let i = 0; i < index; i++) {
            startingCell =
                index === 0
                    ? 0
                    : (startingCell += this.state.data.wordList[i].word.length);
        }

        this.setState(
            { currentFocus: startingCell },
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

            if (currentFocus < refs.length - 1) {
                if (backwards) {
                    nextCell = currentFocus === 0 ? 0 : currentFocus - 1;
                } else {
                    nextCell = currentFocus + 1;
                }

                this.setState(
                    { currentFocus: nextCell },
                    this.state.data.refs[nextCell].current.focus()
                );
            } else {
                nextCell = 0;
                this.setState(
                    { currentFocus: nextCell },
                    this.state.data.refs[nextCell].current.focus()
                );
        }

        
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
                        <button onClick={this.checkThis}>Check This</button>
                        <button onClick={this.revealThis}>Reveal This</button>
                        <button onClick={this.clearThis}>Clear This</button>
                        <br />
                        <br />
                        <button onClick={this.checkAnswers}>Check All</button>
                        <button onClick={this.revealAll}>Reveal All</button>
                        <button onClick={this.clearEverything}>
                            Clear All
                        </button>
                    </div>
                </div>
            );
        } else {
            return <p>Loading...</p>;
        }
    }
}
