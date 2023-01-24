using Krzyzowka.Models;

namespace Krzyzowka.Data.Fillers
{
    public static class QuizFiller
    {
        public static Question[] quiz = new Question[]{
            new Question {
                questionText= "Rok podpisania niepodległości USA?",
                type=Models.Type.number,
                correctAnswers = new List<CorrectAnswer> { new CorrectAnswer { correctValue = "1776" } }
            },
            new Question {
                questionText= "Numer atomowy węgla?",
                type=Models.Type.number,
                correctAnswers = new List<CorrectAnswer> { new CorrectAnswer { correctValue = "6" } }
            },
            new Question {
                questionText= "Co to ciapąg?",
                type=Models.Type.text,
                correctAnswers = new List<CorrectAnswer> { new CorrectAnswer { correctValue = "pociąg" }, new CorrectAnswer() { correctValue = "ciuchcia" }  }
            },
            new Question {
                questionText= "Co jest stolicą Australii?",
                type=Models.Type.checkbox,
                possibleAnswers = new List<PossibleAnswer>
                {
                    new PossibleAnswer{ answerText="Sydney", isCorrect=false},
                    new PossibleAnswer{ answerText="Melbourne", isCorrect=false},
                    new PossibleAnswer{ answerText="Perth", isCorrect=false},
                    new PossibleAnswer{ answerText="Canberra", isCorrect=true},
                }
            }
        };
    }
}
