import React, { Component } from 'react';
import "../styles/cell.css";

export default class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            editing: false, 
            value: props.value, 
            inputVal: "" 
        };
    }

    handleFocus = () => {
        this.setState({ editing: !this.state.editing, value: "" });
    };

    handleBlur = () => {
        this.setState({ editing: !this.state.editing });
    };

    handleChange = (e) => {
        if (e.target.value !== "") {
            console.log(e.target.value);
            this.setState({ value: e.target.value });
        }
    };

    render() {
        //(status = age >= 18 ? 'adult' : 'minor';)
        const style = this.state.editing
            ? "rgb(255,255,153)" //żółty
            : this.state.value === ""
            ? "rgb(10, 10, 10)" //czarny
            : this.state.editing
            ? "rgb(255,255,153)"  //żółty
            : "rgb(200, 200, 200)"; //szary

        //skomplikowane wyliczenia zeby komorki ladnie sie wyswietlaly
        const x =
            this.props.x === 1
                ? this.props.x
                : this.props.x + 10 * (this.props.x - 1); 

        const y =
            this.props.y === 1
                ? this.props.y
                : this.props.y + 10 * (this.props.y - 1);

        //input w komorkach
        const input = (
            <foreignObject
                x={x}
                y={y}
                width="9"
                height="9"
                className={this.state.editing ? "input current" : "input"}
            >
                <div>
                    <input
                        ref={this.props.value}
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        value={this.state.inputVal}
                        className={
                            this.state.editing ? "input current" : "input"
                        }
                        maxLength="1"
                    />
                </div>
            </foreignObject>
        );

        return (
            <svg className="cell">
                <g>
                    <rect
                        x={x}
                        y={y}
                        width={10}
                        height={10}
                        style={{
                            fill: style,
                            strokeWidth: "0.5px",
                            stroke: "black"
                        }}
                    />
                    <text x={x + 0.5} y={y + 2.7} className="small">
                        {this.props.number}
                    </text>
                    <text
                        x={x + 5}
                        y={y + 5.5}
                        className="heavy"
                        dominantBaseline="middle"
                        textAnchor="middle"
                    >
                        {this.state.value} 
                    </text>
                </g>
                {this.props.value === "" ? null : input}
            </svg>
        );
    }
}