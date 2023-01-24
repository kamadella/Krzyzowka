using Krzyzowka.Data;
using Krzyzowka.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Krzyzowka.Controllers
{
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
        [Route("data/{id:int}")]
        public IEnumerable<Question> Get()
        {
            return _context.Questions.Include(p=>p.possibleAnswers).Include(c=>c.correctAnswers).ToArray();
        }
    }
}