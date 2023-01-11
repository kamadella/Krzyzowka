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
            refs: [React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef(),React.createRef()]
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
  console.log(attempts, answers);
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

handleClueClick = (e, index) => {
  this.state.data.refs[index].current.focus();
  console.log(this.state.data.refs);
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
                <Grid data={this.state.data} addSolvedWord={this.addSolvedWord}>
                </Grid>
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
            </React.Fragment>
        );
    } else {
        return <p>Loading...</p>;
    }
}
}
