import React, { Component } from "react";
import Cell from "./Cell";
import PropTypes, { number, string } from 'prop-types';

export default class Word extends Component {
    constructor(props) {
        super(props);
        this.state = {
            length: this.props.length,
            solved: [],
            tuples: [],
            indices: [],
            cells: [],
            currentWord: null,
            isFocused: false
        };
    }


    componentDidMount() {
        let cells = [];

        for (let index = 0; index < this.props.length; index++){
            cells.push(
                <React.Fragment key={this.props.firstCharacter + index}>
                    <Cell
                        currentWord={this.props.currentWord}
                        value={this.state.value}
                        index={index}
                        number={index === 0 ? this.props.number + 1 : null}
                        wordNum={this.props.number}
                        x={
                            this.props.orientation === "horizontal"
                                ? this.props.x + index
                                : this.props.x
                        }
                        y={
                            this.props.orientation === "vertical"
                                ? this.props.y + index
                                : this.props.y
                        }
                        onWordChange={this.handleWordChange}
                        addToRefs={this.props.addToRefs}
                        moveToNextCell={this.props.moveToNextCell}
                        moveToNextWord={this.props.moveToNextWord}
                        changeActiveCell={this.props.changeActiveCell}
                        handleInputBlur={this.props.handleInputBlur}
                    />
                </React.Fragment>
            );
        };

        this.setState({ cells: cells, currentWord: this.props.currentWord });
    }



    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            let cells = [];

            for (let index = 0; index < this.props.length; index++) {
                cells.push(
                    <React.Fragment key={this.props.firstCharacter + index}>
                        <Cell
                            currentWord={this.props.currentWord}
                            value={this.state.tuples}
                            index={index}
                            number={index === 0 ? this.props.number + 1 : null}
                            wordNum={this.props.number}
                            x={
                                this.props.orientation === "horizontal"
                                    ? this.props.x + index
                                    : this.props.x
                            }
                            y={
                                this.props.orientation === "vertical"
                                    ? this.props.y + index
                                    : this.props.y
                            }
                            onWordChange={this.handleWordChange}
                            addToRefs={this.props.addToRefs}
                            moveToNextCell={this.props.moveToNextCell}
                            moveToNextWord={this.props.moveToNextWord}
                            changeActiveCell={this.props.changeActiveCell}
                            handleInputBlur={this.props.handleInputBlur}
                        />
                    </React.Fragment>
                );
            };

            this.setState({
                cells: cells,
                currentWord: this.props.currentWord
            });
        }

        const { solved, length } = this.state;

        if (this.state.solved.length === length) {
            this.props.wordChange(
                {
                    value: solved,
                    number: this.props.number,
                    currentWord: this.props.currentWord
                }
            );
        }
    }


    addToRefs = (ref) => {
        
        this.props.addToRefs(ref);
    };


    handleWordChange = (tuple) => {
        //cell handlechange z tego korzysta
        console.log("word handleWordChange", tuple);
        let { tuples, indices, solved } = this.state;

        if (this.state.indices.indexOf(tuple.index) === -1) {
            //jeśli jest puste
            this.setState(
                {
                    tuples: [...tuples, tuple],
                    indices: [...indices, tuple.index]
                },
                this.setState({
                    solved: [...solved, tuple]
                })
            );
        } else {
            let edit = tuples.findIndex((x) => x.index === tuple.index);

            tuples[edit].value = tuple.value;
            solved[edit] = tuple;
            this.setState(
                { tuples: tuples, solved: solved },
                console.log("index edited", tuples[edit])
            );
        }
        this.props.moveToNextCell();
    };


    render() {
        return this.state.cells;
    }
}


Word.propTypes = {
    length: PropTypes.number,
    firstCharacter: PropTypes.number,
    currentWord: PropTypes.number,
    number: PropTypes.number,
    orientation: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
};