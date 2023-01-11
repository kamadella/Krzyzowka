import React, { Component } from 'react';
import Error from "./Error";
import authService from './api-authorization/AuthorizeService';

export class Quiz extends Component {
  constructor(props) {
    
    super(props);

    // Set up initial state
      this.state = {
          questions: [],
          loading: true,
          currentQuestionIndex: 0,
          score: 0,
          answerContainsNumbers: false, //czy odpwowiedz ma same litery
          answerIsLowercase: false, //czy odpowiedz jest napisana malymi literami
          answerContainsFormat: false
    };

     // Bind functions to the component instance
    this.resetQuiz = this.resetQuiz.bind(this);
  }

    componentDidMount() {
        this.populateQuizData();
    }

  currentAnswer="";


  handleChange ( event ){
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
    const currentQuestion = this.state.questions[this.state.currentQuestionIndex];

    let isCorrect=false;
    // Check if the selected answer is correct
    switch(currentQuestion.type){
        case 1:
            isCorrect = false;
            currentQuestion.correctAnswers.forEach(answer => { if (this.currentAnswer === answer.correctValue)  isCorrect = true;  })
        break;        
        case 2:
            isCorrect = event.target.value === "true";
        break;
        case 0:
            isCorrect = currentQuestion.correctAnswers[0].correctValue === this.currentAnswer;
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


  validateAnswerData( event ){
    let data = event.target.value;
    var numbers = /[0-9]/;
    // eslint-disable-next-line
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    //this.setState({ answerIsLowercase: true });

    if (data === data.toLowerCase()) {
      this.setState({ answerIsLowercase: true });
    } 
    else { 
      this.setState({ answerIsLowercase: false });
    }
  
    if (data.match(numbers)) { //czy jest liczba
        this.setState({ answerContainsNumbers: false });
    } else {
        this.setState({ answerContainsNumbers: true });
    }

    if (data.match(format)) { //czy ma znaki psecjalne
      this.setState({ answerContainsFormat: false });
  } else {
      this.setState({ answerContainsFormat: true });
  }

    
  } 

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <h1 id="tabelLabel" >Strona Quizu</h1>
                    <p>Pobieranie pytań</p>
                    <p><em>Loading...</em></p>
                </div>
            );
        }
        else {
            const currentQuestion = this.state.questions[this.state.currentQuestionIndex];

            return (
                <div>
                    {this.state.currentQuestionIndex < this.state.questions.length && (
                        <Question
                            question={currentQuestion.questionText}
                            questionId={this.state.currentQuestionIndex}
                            handleAnswerSelected={this.handleAnswerSelected}
                        >
                            {currentQuestion.type === 2 && (
                                currentQuestion.possibleAnswers.map(answer => (
                                    <AnswerSelect key={answer.id} answer={answer.answerText} value={answer.isCorrect} handleAnswerSelected={this.handleAnswerSelected} />
                                ))
                            )}
                            {currentQuestion.type !== 2 && (
                                <AnswerInput type={Text} questionId={this.state.currentQuestionIndex} handleChange={this.handleChange} handleAnswerSelected={this.handleAnswerSelected} to={this} />
                            )}
                        </Question>
                    )}

                    {this.state.currentQuestionIndex === this.state.questions.length && (
                        <Result score={this.state.score} total={this.state.questions.length} resetQuiz={this.resetQuiz} />
                    )}
                </div>
            );
        }        
    }

   

  async populateQuizData() {
      const token = await authService.getAccessToken();
      const response = await fetch('quiz', {
          headers: !token ? {} : { 'Authorization': `Bearer ${token}` }

      });
      const data = await response.json();
      this.setState({ questions: data, loading: false });
  }
}

function Question({ question, questionId, children }) {
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

function AnswerInput({ type, handleAnswerSelected, handleChange, to, questionId }) {
    const { answerContainsNumbers, answerIsLowercase, answerContainsFormat } = to.state;
    if(questionId !== 3){
      return (
        <div >
            <input type={type} onChange={e => to.handleChange(e) } /> 
            <button onClick={handleAnswerSelected}> Następne Pytanie </button>
        </div>
        
    );
    }
    else{
      return (
        <div >
            <input type={type} onChange={e => { to.validateAnswerData(e); to.handleChange(e) }} /> 
            <Error status={answerContainsNumbers} info="Odpowiedź nie może zawierać liczb" ></Error>
            <Error status={answerIsLowercase} info="Odpowiedź musi być napisana malymi literami" ></Error>
            <Error status={answerContainsFormat} info="Odpowiedź nie może zawierać znaków specjalnych" ></Error>
            <button onClick={handleAnswerSelected}> Następne Pytanie </button>
        </div>
    );
    }

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



