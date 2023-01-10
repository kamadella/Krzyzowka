import React, { Component } from 'react';
import Grid from "./Grid";

export class Quiz extends Component {
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
            ]
        }
    };
}

render() {
    return (
        <div>
            <Grid data={this.state.data}></Grid>
        </div>
    );
}
}
