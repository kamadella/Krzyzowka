using Krzyzowka.Controllers.ViewModels;
using Krzyzowka.Data;
using Krzyzowka.Data.Fillers;
using Krzyzowka.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Krzyzowka.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EPCrosswordController : ControllerBase
    {


        private readonly ILogger<EPCrosswordController> _logger;

        public EPCrosswordController(ApplicationDbContext context, ILogger<EPCrosswordController> logger)
        {
            _context = context;
            _logger = logger;
        }

        ApplicationDbContext _context { get; }

        [HttpGet]
        [Route("data/{id:int}")]
        public CrosswordData Get(int id)
        {
            Crossword crossword = _context.Crosswords.Where(x => x.Id == id).FirstOrDefault()!;
            List<WordPlacement> words = _context.WordPlacements.Where(x => x.CrosswordId == id).Include(x => x.word).ToList();

            CrosswordData resoult = new CrosswordData
            {
                height = crossword.height,
                width = crossword.width,
                wordList = words.Select(
                            wp => new Word()
                            {
                                x = wp.x,
                                y = wp.y,
                                orientation = wp.vertical ? "vertical" : "horizontal",
                                length = wp.word.word.Length
                            }).ToArray(),
                questions = words.Select(x => x.word.clue).ToArray()
            };
           
            return resoult;
        }
    }
}