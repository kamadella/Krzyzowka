import React, { Component } from 'react';

export default class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputVal: "",
            value: "",
            currentWord: this.props.currentWord
        };

        this.cellRef = React.createRef();
    }


    componentDidUpdate(prevProps) {
        // console.log("Cell-componentDidUpdate", this.props.clearAll);
        if (this.props !== prevProps) {
            if (
                this.props.clear === this.props.wordNum &&
                this.state.value !== ""
            ) {
                this.setState({ value: "" });
                this.props.deleteClearedWord(this.props.clear);
            }
        }
    }


    componentDidMount() {
        if (typeof this.props.addToRefs === "function") {
            this.props.addToRefs(this.cellRef);
        }
    }

    handleFocus = () => {
        if (this.props.value !== "-") {
            this.props.changeActiveCell({
                index: this.props.index,
                wordNum: this.props.wordNum,
                currentWord: this.props.wordNum
            });
        }
    };

    //handleBlur = () => {
    //    this.setState({ editing: !this.state.editing });
    //};

    handleChange = (e) => {
        let { index, wordNum } = this.props;
        let value = e.target.value;

        if (value !== "") {
            this.setState(
                {
                    value: value
                },
                this.props.onWordChange({ value, index, wordNum })
            );
        }
    };

    handleKeyDown = (e) => {
        if(e.keyCode === 39 || e.keyCode === 40){
            this.props.moveToNextCell(false);
        }
        else if(e.keyCode === 37 || e.keyCode === 38){
            this.props.moveToNextCell(true);
        }
    }

    render() {
        //(status = age >= 18 ? 'adult' : 'minor';)
        const style =
            this.props.value === "-"
                ? "rgba(0, 0, 0, 0.85)"
                : this.props.currentWord === this.props.wordNum
                ? "rgb(255,192,203)"
                : "rgba(255, 255, 255, 0.85)";

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
                className={ "input"}
            >  
                <div >
                    <input 
                        type="text"
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        value={this.state.inputVal}
                        className={"input"}
                        maxLength="1"
                        ref={this.cellRef}
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
                            strokeWidth: "0.1px",
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
                {this.props.value === "-" ? null : input}
            </svg>
        );
    }
}