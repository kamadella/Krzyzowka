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
    public class CrosswordController : ControllerBase
    {


        private readonly ILogger<CrosswordController> _logger;

        public CrosswordController(ApplicationDbContext context, ILogger<CrosswordController> logger)
        {
            _context = context;
            _logger = logger;
        }

        ApplicationDbContext _context { get; }

        [HttpGet]
        [Route("data")]
        public CrosswordData Get()
        {
            int id = 1;
            FillerManager fillerManager = new FillerManager(_context);
            fillerManager.FillCrossword();

            Crossword crossword = _context.Crosswords.Where(x => x.Id == id).FirstOrDefault()!;
            List<WordPlacement> words = _context.WordPlacements.Where(x => x.CrosswordId == id).Include(x => x.word).ToList();

            CrosswordData resoult = new CrosswordData
            {
                height = 13,
                width = 13,
                wordList = words.Select(
                            wp => new Word()
                            {
                                x = wp.x,
                                y = wp.y,
                                orientation = wp.vertical ? "down" : "across",
                                length = wp.word.word.Length
                            }).ToArray(),
                clues = words.Select(x => x.word.clue).ToArray()
            };
           
            return resoult;
        }
    }
}