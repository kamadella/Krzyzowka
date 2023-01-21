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
            bool changes = false;

            if(_context.Crosswords.FirstOrDefault() == null)
            {
                changes = true;
                _context.Crosswords.AddRange(CrosswordFiller.crossword);
            }
                
            if (_context.WordPlacements.FirstOrDefault() == null)
            {
                changes = true;
                _context.WordPlacements.AddRange(CrosswordFiller.wordPlacement);
            }

            if (changes)
                _context.SaveChanges();

        }
    }
}
