using Krzyzowka.Data;
using Krzyzowka.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Krzyzowka.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class QuizController : ControllerBase
    {
        

        private readonly ILogger<QuizController> _logger;

        public QuizController(ApplicationDbContext context, ILogger<QuizController> logger)
        {
            _context = context;
            _logger = logger;
        }

        ApplicationDbContext _context { get; }

        [HttpGet]
        public IEnumerable<Question> Get()
        {

            if (!(_context.Questions.FirstOrDefault()!=null))
            {
                Question[] example = new Question[]{
                    new OpenQuestion {
                        questionText= "Rok podpisania niepodległości USA?",
                        type=Models.Type.number,
                        correctAnswers = new List<CorrectAnswer> { new CorrectAnswer { correctValue = "1776" } }
                    },
                    new OpenQuestion {
                        questionText= "Numer atomowy węgla?",
                        type=Models.Type.number,
                        correctAnswers = new List<CorrectAnswer> { new CorrectAnswer { correctValue = "6" } }
                    },
                    new OpenQuestion {
                        questionText= "Co to ciapąg?",
                        type=Models.Type.text,
                        correctAnswers = new List<CorrectAnswer> { new CorrectAnswer { correctValue = "pociąg" }, new CorrectAnswer() { correctValue = "ciuchcia" }  }
                    },
                    new ClosedQuestion {
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

                _context.Questions.AddRange(example);
                _context.SaveChanges();
            }

            return _context.Questions.ToArray();
        }
    }
}