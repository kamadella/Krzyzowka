using Krzyzowka.Data;
using Krzyzowka.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Krzyzowka.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class CrosswordController : ControllerBase
    {
        

        private readonly ILogger<CrosswordController> _logger;

        public CrosswordController(ApplicationDbContext context, ILogger<CrosswordController> logger)
        {
            _context = context;
            _logger = logger;
        }

        ApplicationDbContext _context { get; }

        //[HttpGet]
        //public IEnumerable<Crossword> Get()
        //{

        //    return;
        //}
    }
}