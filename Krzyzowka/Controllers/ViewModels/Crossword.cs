using System.ComponentModel.DataAnnotations;

namespace Krzyzowka.Controllers.ViewModels
{
    public class CrosswordData
    {
        public int width { get; set; }
        public int height { get; set; }
        public string[] questions { get; set; } = { };
        public Word[] wordList { get; set; } = { };
    }

    public class Word
    {
        public int x { get; set; }
        public int y { get; set; }

        public string orientation { get; set; } = "horisontal";

        public int length { get; set; }
    }

    public class Answer
    {
        public string[] answers { get; set; } = { };
    }
}
