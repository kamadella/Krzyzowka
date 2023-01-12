import React, { Component } from "react";
import Word from "./Word";
import Cell from "./Cell";

//use content loader
export default class Grid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
            solvedWords: [],
            words: [],
            wordsLoaded: false,
            currentWord: this.props.currentWord
        };
    }

    componentDidUpdate() {
        if (this.props.currentWord !== this.state.currentWord) {
            this.setState(
                { currentWord: this.props.currentWord },
                console.log("GcDu", this.state.currentWord)
            );

            // this.props.handleNewCurrentWord(this.props.currentWord);
        }
        if (
            !this.state.wordsLoaded &&
            this.props.data.numberOfWords === this.props.data.wordList.length
        ) {
            console.log("GCDU", this.props.currentWord);
            const words = this.props.data.wordList.map((word, index) => (
                <Word
                    refer={this.props.data.refs[index]}
                    number={index}
                    word={word.word}
                    x={word.x}
                    y={word.y}
                    orientation={word.orientation}
                    key={word.word}
                    wordChange={this.handleWordChange}
                    addToRefs={this.props.addToRefs}
                    moveToNextCell={this.props.moveToNextCell}
                    changeActiveCell={this.props.changeActiveCell}
                    currentWord={this.state.currentWord}
                />
            ));

            this.setState({ wordsLoaded: true, words: words });
        }
    }

    componentDidMount() {
        let width = this.props.data.width; //ile komorek na wysokosc
        let height = this.props.data.height;
        let newGrid = [];

        for (let i = 1; i < width; i++) {
            for (let j = 1; j < height; j++) {
                newGrid.push( //tworzymy komórki
                    <Cell x={i} y={j} value={""} key={Math.random()} />
                );
            }
        }
        this.setState({ grid: newGrid }); //tu ustalam cały grid komórek
    }
  
            
    handleWordChange = (tuple) => {
        //the incoming tuple is an array, needs sorting by tuple.index
        let sorted = tuple.value.slice(0);
        let word = "";

        sorted.sort((a, b) => {
            return a.index - b.index;
        });

        sorted.forEach((e) => (word += e.value));

        console.log("GhandleWordChange", tuple.number, word);

        this.props.addSolvedWord(
            { word: word, number: tuple.number },
            this.props.handleNewCurrentWord(this.props.currentWord)
        );

    };

    render() {
        // to wielkosc calej planszy w sensie jak duza jest wyswietlana
        const dim =" 0 0 " + (13 * this.props.data.width + 3) + " " + (13 * this.props.data.height + 3); 
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