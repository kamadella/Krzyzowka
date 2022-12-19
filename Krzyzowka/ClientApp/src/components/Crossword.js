import React, { Component } from 'react';
import Error from "./Error";

const questions = [  
    {    
        question: "In which year was the Declaration of Independence signed?",    
        type: "number",
        correctAnswer: "1776",
      },
        {
            question: "What is the atomic number of carbon?",
            type: "number",
            correctAnswer: 6,
        },
    {
        question: "What is the capital of Australia?",
        type: "radio",
        answers: [
          { id: "A", text: "Sydney", value: "A" },
          { id: "B", text: "Melbourne", value: "B" },
          { id: "C", text: "Perth", value: "C" },
          { id: "D", text: "Canberra", value: "D" },
        ],
        correctAnswer: "D",
      },
    {
        question: "Co to ciapąg?",
        type: "text",
        correctAnswers: [
            "pociąg",
            "ciuchcia"
        ]
    }
];


export class Crossword extends Component {
  constructor(props) {
    
    super(props);

    // Set up initial state
    this.state = {
      currentQuestionIndex: 0,
      score: 0,
      answerContainsOnlyLetters: false, //czy odpwowiedz ma same litery
      answerIsLowercase: false //czy odpowiedz jest napisana malymi literami
    };

     // Bind functions to the component instance
    this.resetQuiz = this.resetQuiz.bind(this);
  }
  
  currentAnswer="";


  handleChange = event =>{
    this.currentAnswer = event.target.value.toLowerCase();
  }



    // Function to reset the quiz
    resetQuiz() {
        // Reset the current question index and score
        this.setState({ currentQuestionIndex: 0, score: 0 });
    }



  // Function to handle when the user selects an answer
  handleAnswerSelected = event => {
    // Get the current question from the list of questions
    const currentQuestion = questions[this.state.currentQuestionIndex];

    let isCorrect=false;
    // Check if the selected answer is correct
    switch(currentQuestion.type){
        case "text":
            isCorrect= currentQuestion.correctAnswers.includes(this.currentAnswer);
        break;        
        case "radio":
            isCorrect= currentQuestion.correctAnswer === event.target.value;
        break;
        case "number":
            isCorrect= currentQuestion.correctAnswer === this.currentAnswer;
        break;
        default:
        break;
    }
    
    this.currentAnswer="";

    // Update the score if the answer is correct
    if (isCorrect) {
      this.setState(prevState => ({ score: prevState.score + 1 }));
    }

    // Go to the next question
    this.setState(prevState => ({ currentQuestionIndex: prevState.currentQuestionIndex + 1 }));
  };


  validateUserData(e) {
    let data = e.target.value;
    var letters = /^[A-Za-z]+$/;

    //this.setState({ answerIsLowercase: true });

    if (data === data.toLowerCase()) {
      this.setState({ answerIsLowercase: true });
    } 
    else { 
      this.setState({ answerIsLowercase: false });
    }
  
    if (data.match(letters)) { //czy jest liczba
        this.setState({ answerContainsOnlyLetters: true });
    } else {
        this.setState({ answerContainsOnlyLetters: false });
    }

    
  } 




  render() {
    // Get the current question from the list of questions
    const currentQuestion = questions[this.state.currentQuestionIndex];
    return (
      <div>
        {/* If the quiz is not finished, display the current question */}
        {this.state.currentQuestionIndex < questions.length && (
          <Question
            question={currentQuestion.question}
            questionId={this.state.currentQuestionIndex}
            handleAnswerSelected={this.handleAnswerSelected}
          >
            {currentQuestion.type==="radio" &&(
                currentQuestion.answers.map(answer => (
                <AnswerSelect key={answer.id} answer={answer.text} value={answer.value} handleAnswerSelected={this.handleAnswerSelected}/>
                ))
            )}
            {currentQuestion.type!=="radio" &&(
                <AnswerInput type={currentQuestion.type} questionId={this.state.currentQuestionIndex} handleChange={this.handleChange} handleAnswerSelected={this.handleAnswerSelected} state = {this.state} to = {this}/>
            )}
          </Question>
        )}

        {/* If the quiz is finished, display the results */}
        {this.state.currentQuestionIndex === questions.length && (
          <Result score={this.state.score} total={questions.length} resetQuiz={this.resetQuiz}/>
        )}
      </div>
    );
  }
}

function Question({ question, questionId, children, handleAnswerSelected }) {
  return (
    <div class="bg-light p-5 rounded">
      <h2>{questionId+1}. Pytanie</h2>
      <p>{question}</p>
      {children}
    </div>
  );
}

function AnswerSelect({ answer, value, handleAnswerSelected }) {
  return ( 
    <button onClick={handleAnswerSelected} value={value}>
      {answer}
    </button>
  );
}

function AnswerInput({ type, handleAnswerSelected, handleChange, state, to }) {
    const { answerContainsOnlyLetters, answerIsLowercase } = state;
    return (
        <div >
            <input type={type} id = "answer" onChange={(e) => to.validateUserData(e)} /> 
            <Error status={answerContainsOnlyLetters} info="Odpowiedź musi zawierać same litery" ></Error>
            <Error status={answerIsLowercase} info="Odpowidź musi być napisana malymi literami" ></Error>
            <button onClick={handleAnswerSelected}> Następne Pytanie </button>
        </div>
        
    );
  }

function Result({ score, total, resetQuiz}) {
    // Function to reset the quiz
  
    return (
      <div>
        <p>Your score: {score} / {total}</p>
        <button onClick={resetQuiz}>Play Again</button>
      </div>
    );
  }
