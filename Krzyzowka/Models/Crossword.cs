using System.ComponentModel.DataAnnotations;

namespace Krzyzowka.Models
{
    public class Crossword
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public int width { get; set; }
        [Required]
        public int height { get; set; }

        [Required]
        public List<wordPlacement> words { get; set; } = null!;

    }

    public class wordPlacement
    {
        [Key]
        [Required]
        public int Id { get; set; }

        public int x { get; set; }
        public int y { get; set; }

        public GuessWord word { get; set; } = null!;
    }

    public class GuessWord
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public string word { get; set; } = null!;
        [Required]
        public string clue { get; set; } = null!;
    }

}
