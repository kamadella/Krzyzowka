import React, { Component } from "react";
import Error from "./Error";

class ValidationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answerContainsOnlyLetters: false, //czy odpwowiedz ma same litery
            answerIsLowercase: false, //czy odpowiedz jest napisana drukowanymi
            answerContainsOnlyNumbers: false
        };
    }

    validateUserData(event) {
        let id = event.target.id;
        let data = event.target.value;
        var letters = /^[A-Za-z]+$/;
         
        if (data.length >= 1) {
            if (isNaN(data)) {
                this.setState({
                    [id + "answerContainsOnlyNumbers"]: false 
                });
            } else { 
                this.setState({ 
                    [id + "answerContainsOnlyNumbers"]: true 
                });
            }

            if (data === data.toLowerCase()) {
                this.setState({
                    [id + "answerIsLowercase"]: true 
                });
            } else { 
                this.setState({ 
                    [id + "answerIsLowercase"]: false 
                });
            }
            
            if (data.match(letters)) {
                this.setState({
                    [id + "ContainsOnlyLetters"]: true
                });
            } else {
                this.setState({
                    [id + "ContainsOnlyLetters"]: false
                });
            }
        } 
    } 

    render() {
        const { answerContainsOnlyLetters, answerIsLowercase, answerContainsOnlyNumbers } = this.state;
        return (
        <div>
            <div> Answer: <input type="text" id="answer_text" onChange={(e) => this.validateUserData(e)}/>
            <Error status={answerContainsOnlyLetters} info="Odpowiedź musi zawierać same litery" ></Error>
            <Error status={answerIsLowercase} info="Odpowidź musi być napisana malymi literami" ></Error>
            </div>
            <div> Answer: <input type="text" id="answer_number" onChange={(e) => this.validateUserData(e)}/>
            <Error status={answerContainsOnlyNumbers} info="Odpowiedź musi zawierać same cyfry" ></Error>
            </div>
             
        </div>
        );
    } 
}

