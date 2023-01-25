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
        [Route("list")]
        public IEnumerable<CrosswordListElement> GetList()
        {
            List<Crossword> crosswords = _context.Crosswords.Where(x=> x.isActive).ToList();
            var counts = _context.WordPlacements.GroupBy(x => x.CrosswordId).Select(g => new { id = g.Key, count = g.Count() });

            List<CrosswordListElement> resoult = crosswords.Select(
                x => new CrosswordListElement {
                    id = x.Id,
                    name = x.name,
                    height = x.height,
                    width = x.width,
                    questionCount = 
                        counts.Where(c => c.id == x.Id).Count() > 0 ? 
                        counts.Where(c => c.id == x.Id).FirstOrDefault()!.count : 
                        0
                }).ToList();

            return resoult;
        }

        [HttpGet]
        [Route("data/{id:int}")]
        public CrosswordData GetItem(int id)
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