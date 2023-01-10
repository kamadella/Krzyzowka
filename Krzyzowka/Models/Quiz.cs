using System.ComponentModel.DataAnnotations;

namespace Krzyzowka.Models
{
    public enum Type{
        number,
        text,
        checkbox,
        radio
    }

    public class Question
    {
        [Key]
        [Required]
        public int Id { get; set; }
        [Required]
        public Type type { get; set; }
        [Required]
        public string questionText { get; set; } = null!;
        [Required]
        public List<CorrectAnswer> correctAnswers { get; set; } = new List<CorrectAnswer>();
        [Required]
        [MinLength(2)]
        public List<PossibleAnswer> possibleAnswers { get; set; } = new List<PossibleAnswer>();
    }

    public class PossibleAnswer
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string answerText { get; set; } = null!;
        [Required]
        public bool isCorrect { get; set; }
        [Required]
        public int ClosedQuestionId { get; set; }
    }

    public class CorrectAnswer
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string correctValue { get; set; } = null!;
        [Required]
        public int QuestionId { get; set; }
    }

}