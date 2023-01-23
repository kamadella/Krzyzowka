import React, { Component } from "react";
import Word from "./Word";
import Cell from "./Cell";

//use content loader
export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],  //nasze czarne pola
            solvedWords: [], //odpowiedzi
            words: [],
            wordsLoaded: false,
            currentWord: this.props.currentWord
        };
    }

    //to się dzieje dopiero jak zaktualizujemy coś wow wow
    componentDidUpdate(prevProps) {
        let words = [];
        //zmiana aktualnego slowa
        if (prevProps.currentWord !== this.props.currentWord) {
            this.setState(
                { currentWord: this.props.currentWord, wordsLoaded: false }
            );

        }
        if (!this.state.wordsLoaded && this.props.metaData.numberOfWords === this.props.data.wordList.length ) {
            // WORDS are mapped each time CW rerenders?
            words = this.props.data.wordList.map((word, index) => (
                <Word
                    refer={this.props.positioning.refs[index]}
                    number={index}
                    numberOfWords={this.props.metaData.numberOfWords}
                    firstCharacter={this.props.metaData.firstLetters[index]}
                    x={word.x}
                    y={word.y}
                    orientation={word.orientation}
                    key={"w"+index}
                    length={word.length}
                    wordChange={this.handleWordChange}
                    addToRefs={this.props.addToRefs}
                    moveToNextCell={this.props.moveToNextCell}
                    moveToNextWord={this.props.moveToNextWord}
                    changeActiveCell={this.props.changeActiveCell}
                    currentWord={this.props.currentWord} 
                    />
            ));

            this.setState({
                wordsLoaded: true,
                words: words,
                currentWord: this.props.currentWord
            });
        }
    }


    //to się dzieje zaraz po render() samo z siebie :o
    //ogólnie to wywola nam render 2 raz ale zaktualizuje grida do takiego jakiego go chcemy
    //tu robimy cały ten czarny grid komórek
    //szarych edytowalnych jeszcze nie mamy jak to się robi
    componentDidMount() {
        let width = this.props.data.width; //ile komorek na wysokosc
        let height = this.props.data.height;
        let newGrid = [];

        for (let i = 1; i < width; i++) {
            //tu wywołuje komórki do grida
            for (let j = 1; j < height; j++) {
                newGrid.push( //tworzymy komórki
                    <Cell x={i} y={j} value={"-"} key={`${i}-${j}`} />
                );
            }
        }
        this.setState({ grid: newGrid }); //tu ustalam cały grid komórek
    }

  
            
    handleWordChange = (tuple) => {
        //the incoming tuple is an array, needs sorting by tuple.index
        console.log("grid handleWordChange", tuple);
        let sorted = tuple.value.slice(0);
        let word = "";

        sorted.sort((a, b) => {
            return a.index - b.index;
        });

        sorted.forEach((e) => (word += e.value));


        this.props.addSolvedWord(
            { word: word, number: tuple.number },
            this.props.handleNewCurrentWord(this.props.currentWord)
        );

    };

    render() {
        // to wielkosc calej planszy w sensie jak duza jest wyswietlana
        const dim =" 0 0 " + (10 * this.props.data.width + 3) + " " + (10 * this.props.data.height + 3); 
        // to tworzymy komórki na uzupelnianie hasla 
        return (
            <div className="grid_container">
                <svg viewBox={dim} xmlns="http://www.w3.org/2000/svg">
                    {this.state.grid}
                    {this.state.words}
                </svg>
            </div>
        );
    }
}