namespace Krzyzowka.Data.Fillers
{
    public class FillerManager
    {
        private ApplicationDbContext _context;
        public FillerManager(ApplicationDbContext context)
        {
            _context = context;
        }

        public void FillCrossword()
        {
            if(_context.Crosswords.FirstOrDefault() == null)
            {
                _context.Crosswords.AddRange(CrosswordFiller.crossword);
                _context.SaveChanges();
            }
                
            if (_context.WordPlacements.FirstOrDefault() == null)
            {
                _context.WordPlacements.AddRange(CrosswordFiller.wordPlacement);
                _context.SaveChanges();
            }

            if (_context.Questions.FirstOrDefault() == null)
            {
                _context.Questions.AddRange(QuizFiller.quiz);
                _context.SaveChanges();
            }


        }
    }
}
