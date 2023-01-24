using Krzyzowka.Data;
using Krzyzowka.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Krzyzowka.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EPQuizController : ControllerBase
    {
        

        private readonly ILogger<EPQuizController> _logger;

        public EPQuizController(ApplicationDbContext context, ILogger<EPQuizController> logger)
        {
            _context = context;
            _logger = logger;
        }

        ApplicationDbContext _context { get; }

        [HttpGet]
        [Route("data/{id:int}")]
        public IEnumerable<Question> Get(int id)
        {
            return _context.Questions.Include(p=>p.possibleAnswers).Include(c=>c.correctAnswers).ToArray();
        }
    }
}