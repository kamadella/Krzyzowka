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
                    length: 5
                },
                {
                    word: "consolidate",
                    orientation: "across",
                    x: 1,
                    y: 2,
                    length: 5
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
                    length: 5
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
                    x: 9,
                    y: 5,
                    length: 5
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
              "Word",
              "consolidate",
              "shift",
              "ice",
              "truce",
              "relish"
            ],
            attempts: [],
            numberOfWords: 6,
            refs: [],
            currentFocus: 0,
            currentWord: 0
        }
    };
}

addSolvedWord = (word) => {
  console.log("here ", word);
  this.setState(
      (prevState) => ({
          data: { ...this.state.data, attempts: word }
      }),
      console.log("Added attempt ", word)
  );
};

checkAnswers = () => {
  const { attempts, answers } = this.state.data;
  //console.log(attempts, answers);
  let score = 0;

  if (attempts.length === answers.length) {
      attempts.forEach((attempt, index) => {
          if (answers.includes(attempts[index])) {
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

moveToNextCell = (backwards) => {
    //all the cell change logic is in changeActiveCell
    //here we will just call changeActiveCell with parameters in a
    //loop

    const { currentWord, currentFocus } = this.state.data;
    let curWordLength = this.state.data.wordList[currentWord].length;

    if (currentFocus < curWordLength) {
        console.log("move to next cell", currentWord, currentFocus);
    }

    // this.changeActiveCell({ index: 0, wordNum: 0 });

    // let { currentFocus } = this.state.data;
    // if (this.state.data.currentFocus < this.state.data.refs.length - 1) {
    //     console.log(
    //         this.state.data.currentFocus,
    //         this.state.data.refs.length
    //     );

    //     const nextCell = (this.state.data.currentFocus += 1);

    //     this.setState(
    //         { currentFocus: nextCell },
    //         this.state.data.refs[nextCell].current.focus()
    //     );
    // } else {
    //     this.setState({ currentFocus: 0 });
    // }
};

changeActiveCell = (activeCell) => {
    // activeCell = {index: 0, wordNum: 0}

    // console.log(
    //     "changeActiveCell",
    //     activeCell,
    //     this.state.data.currentWord
    // );

    let newActiveCell = 0,
        allPrevWords = 0,
        allCurWordChars = activeCell.index;

    for (let i = 0; i < activeCell.wordNum; i++) {
        allPrevWords += this.state.data.wordList[i].length;
    }

    newActiveCell = allPrevWords + allCurWordChars;

    this.setState(
        (prevState) => ({
            data: {
                ...this.state.data,
                currentFocus: newActiveCell,
                currentWord: activeCell.wordNum
            }
        }),
        console.log("currentFocus ", newActiveCell)
    );
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
            <React.Fragment>
                <Grid 
                data={this.state.data} 
                addSolvedWord={this.addSolvedWord}
                addToRefs={this.addToRefs}
                moveToNextCell={this.moveToNextCell}
                changeActiveCell={this.changeActiveCell}
                ></Grid>
                {this.state.data.clues.map((clue, index) => {
                    return (
                      <div className="clue" key={clue}>
                      <li
                          onClick={(e) =>
                              this.handleClueClick(e, index)
                          }
                      >
                          {clue}
                      </li>
                  </div>
                    );
                })}
                <button onClick={this.checkAnswers}>Check answers</button>
                <button onClick={this.clearEverything}>Clear</button>
            </React.Fragment>
        );
    } else {
        return <p>Loading...</p>;
    }
}
}
