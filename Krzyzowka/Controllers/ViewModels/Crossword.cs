using System.ComponentModel.DataAnnotations;

namespace Krzyzowka.Controllers.ViewModels
{
    public class CrosswordData
    {
        public int width { get; set; }
        public int height { get; set; }
        public string[] questions { get; set; } = { };
        public Word[] wordList { get; set; } = { };
        public string name { get; set; } = "";
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

    public class CrosswordListElement
    {
        public int id { get; set; }
        public string name { get; set; } = "";
        public int width { get; set; }
        public int height { get; set; }
        public int questionCount { get; set; }
    }

    public class WordAppearences
    {
        public int Id { get; set; }
        public string word { get; set; } = "";
        public string clue { get; set; } = "";
        public bool isActive { get; set; }
        public List<string> crosswords { get; set; } = new List<string>();
    }

    public class WordPostData
    {
        public string word { get; set; } = "";
        public string clue { get; set; } = "";
    }
    public class WordPutData
    {
        public int id { get; set; }
        public string word { get; set; } = "";
        public string clue { get; set; } = "";
    }
    public class WordDeleteData
    {
        public int id { get; set; }
    }
}
