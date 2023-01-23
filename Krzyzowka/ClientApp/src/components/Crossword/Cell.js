import React, { Component } from 'react';

export default class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputVal: "",
            value: "",
            currentWord: this.props.currentWord,
            isFocused: false
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

    //linkowanie po pytaniach
    componentDidMount() {
        if (typeof this.props.addToRefs === "function") {
            this.props.addToRefs(this.cellRef);
        }
    }
    
    //tu sie dzieje magia zmiany koloru
    handleFocus = () => {
        if (this.props.value !== "-") {
            this.props.changeActiveCell({
                index: this.props.index,
                wordNum: this.props.wordNum,
                currentWord: this.props.wordNum
            });
            this.setState({ isFocused: true });
        }
    };

    handleBlur = () => {
        this.setState({ isFocused: false });
        this.props.handleInputBlur();
    };

    handleChange = (e) => {
        let { index, wordNum } = this.props;
        let value = e.target.value;

        if (/[a-zA-Z]/.test(value)) {
            this.setState(
                {
                    value: value
                },
                this.props.onWordChange({ value, index, wordNum })
            );
        }
    };

    handleKeyDown = (e) => {   

        //przejście do następnej komórki
        if(e.keyCode === 39 || e.keyCode === 40){
            this.props.moveToNextCell(false);
        }
        //przejście do poprzedniej komórki
        else if(e.keyCode === 37 || e.keyCode === 38){
            this.props.moveToNextCell(true);
        }
        //przejście do następnego/poprzedniego słowa 
        else if(e.keyCode === 9){
            //tab domyślnie przeniósł by nas do następnego pola,
            // potencjalnie poza krzyżówkę
            // wyłączamy to
            e.preventDefault();
            //jeśli jest naciśnięty shift to idzie do poprzedniego
            this.props.moveToNextWord(e.shiftKey);
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

        const selected =
            this.state.isFocused
                ? "cellInputBlink"
                : "cellInput";


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
                width="10"
                height="10"
                className={"input"}
            >  
                    <input 
                    type="text"
                    tabIndex={-1}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    value={this.state.inputVal}
                    className={selected}
                    maxLength="1"
                    ref={this.cellRef}
                />
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