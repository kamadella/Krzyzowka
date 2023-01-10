import React, { Component } from 'react';

export class Quiz extends Component {
  static displayName = Quiz.name;

  constructor(props) {
    super(props);
    this.state = { 
      data: {
        height: 13,
        width: 13,
        wordList: [
          {
            word: "Word1",
            orientation: "down",
            x: 3,
            y: 2,
            length: 5
        },
        {
            word: "Word2",
            orientation: "across",
            x: 1,
            y: 2,
            length: 5
        }
        ], //lista slow
        clues: [],
        answers: [],
        attempts: [],
        refs: [], //to do podswietlania
        revealedWords: [],
        currentFocus: 0, //komorka w ktorej aktualnie jestesmy
        numberOfWords: 0, //liczba slow w krzyzowce
        currentWord: null, //aktualne slowo
        clearNext: null,
        clearAll: false
      },
      debug: false
    };
   
  }


  handleKeyPress = (event) => {
    // console.log("CW-handleKeyPress");
    const { currentWord, numberOfWords } = this.state.data;

    if (event.key === "Escape") { //jeżeli naciśniemy escape
        // console.log(event.key);
        this.setState({ debug: !this.state.debug }); //to wzywam do ponownego renderowania komponentu w tym przypadku debuga zmieniam na odwrotność?
    }

    if (event.key === "Backspace") { //jeżeli naciśniemy backspace 
        this.moveToNextCell(true);
    }

    if (event.key === "Tab") {  //jeżeli naciśniemy tab 
        event.preventDefault(); //żeby nie odświerzac strony?
        this.handleClueClick(
            event,
            currentWord === numberOfWords - 1 ? 0 : currentWord + 1 //jezeli aktualne slowo jest tym ostatnim to przekazujemy index 0 jezeli nie to przenosimy na kolejny index
        );
    }
};

moveToNextCell = (backwards) => {
  // console.log("CW-moveToNextCell");
  //all the cell change logic is in changeActiveCell
  //here we will just call changeActiveCell with parameters in a
  //loop

  const { currentFocus, refs } = this.state.data;
  let nextCell = 0; //zaczynamy od komorki 0

  if (currentFocus < refs.length - 1) {
      if (backwards === true) { //jezeli cofamy się
          // console.log(currentFocus);
          nextCell = currentFocus === 0 ? 0 : currentFocus - 1; //to nasza kolejna komorka jest ta poprzednia (status = age >= 18 ? 'adult' : 'minor';)
      } else {
          nextCell = currentFocus + 1; //jezeli idziemy dalej to po prostu przechodzimy do kolejnej komorki
      }

      this.setState(
          { currentFocus: nextCell }, 
          this.state.data.refs[nextCell].current.focus() //focus przenosi się na odpowiednia komórkę
      );
  } else {
      nextCell = 0;
      this.setState(
          { currentFocus: nextCell },
          this.state.data.refs[nextCell].current.focus() //focus przenosi się na początek
      );
  }
};


//podswietlanie aktualnego hasla w spisie 
handleClueClick = (e, index) => {
  // console.log("CW-handleClueClick");
  let startingCell = 0;

  for (let i = 0; i < index; i++) {
      startingCell = index === 0 ? 0 : (startingCell += this.state.data.wordList[i].word.length);
  }

  this.setState(
      { currentFocus: startingCell, currentWord: index },
      this.state.data.refs[startingCell].current.focus()
  );
};



  render() {
    //if(this.state.data.wordList.length > 0){
      return (
        <div className="CW-container" onKeyDown={this.handleKeyPress}> 
          
          <div className="clues">
            {this.state.data.clues.map((clue, index) => {
              return (
                <div className={this.state.data.currentWord === index? "clue editing" : "clue "} key={clue} >
                  <li onClick={(e) => this.handleClueClick(e, index) }>
                    {clue}&nbsp;({this.state.data.wordList[index].length})
                  </li>
                </div>
              );
            })}
          </div>
        
        </div>
      );
    //}
    //else {
    //  return (
    //    <div>Loading...</div>
    //  );
    //}

  }
}
