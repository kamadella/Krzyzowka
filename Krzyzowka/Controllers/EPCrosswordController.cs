using Krzyzowka.Controllers.ViewModels;
using Krzyzowka.Data;
using Krzyzowka.Models;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text;

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
                name = crossword.name,
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

        [HttpGet]
        [Route("word/list")]
        public IEnumerable<WordAppearences> GetWordList()
        {
            List<WordAppearences> resoult = new ();

            List<GuessWord> words = _context.GuessWords.Where(x=>x.isActive).ToList();
            List<WordPlacement> wordPlacements = _context.WordPlacements.ToList();
            List<Crossword> crosswords = _context.Crosswords.ToList();

            resoult = words.Select(x =>
                new WordAppearences()
                {
                    Id = x.Id,
                    word = x.word,
                    clue = x.clue,
                    /*
                     * tutaj większa kwerenda, można ją czytać tak:
                     * Wybieramy wszystkie umiejscowienia naszego słowa
                     * Dizęki temu wiemy w jakich krzyżówkach wystąpiło (po Id)
                     * Z krzyżówek w których wystąpiło tworzymy listę stringów w formie
                     * id. nazwa
                    */
                    crosswords = crosswords.Where(
                            c => wordPlacements.Where(w => w.word == x)
                            .Select(s => s.CrosswordId)
                            .Contains(c.Id))
                            .Select(wn => wn.Id.ToString() +". "+ wn.name)
                            .ToList(),
                    isActive = x.isActive
                }).ToList();

            return resoult;
        }

        [HttpPost]
        [Route("word/post")]
        public void WordPost([FromBody]WordPostData data)
        {
            GuessWord newWord = new GuessWord()
            {
                isActive = true,
                word = data.word,
                clue = data.clue,
            };

            _context.GuessWords.Add(newWord);
            _context.SaveChanges();
        }

        [HttpPut]
        [Route("word/put")]
        public void WordPut([FromBody]WordPutData data)
        {
            var source = _context.GuessWords.SingleOrDefault(x => x.Id == data.id);

            if (source != null)
            {
                source.word = data.word;
                source.clue = data.clue;

                _context.SaveChanges();
            }
        }

        [HttpDelete]
        [Route("word/delete")]
        public void WordDelete([FromBody]WordDeleteData data)
        {
            var source = _context.GuessWords.SingleOrDefault(x => x.Id == data.id);

            if (source != null)
            {
                source.isActive = false;

                _context.SaveChanges();
            }
        }

    }
}