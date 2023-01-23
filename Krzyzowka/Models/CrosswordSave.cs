using System.ComponentModel.DataAnnotations;

namespace Krzyzowka.Models
{

    public class CrosswordSave
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        public Crossword crossword { get; set; } = null!;

        [Required]
        public string filledCells { get; set; } = "";

        [Required]
        public DateTime StartTime { get; set; } = DateTime.Now;
        public DateTime EndTime { get; set; }

        [Required]
        public bool finished { get; set; }

        public ApplicationUser? user = null;
    }
}
