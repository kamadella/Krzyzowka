using Krzyzowka.Models;

namespace Krzyzowka.Data.Fillers
{
    public static class CrosswordFiller
    {
        public static WordPlacement[] wordPlacement = new[]
        {
            new WordPlacement()
            {
                word = new GuessWord()
                    {
                        clue = "zdrobnienie narządu do słyszenia",
                        word = "uszka",
                    },
                vertical = true,
                x = 1,
                y = 2,
                CrosswordId = 1,
            },
            new WordPlacement()
            {
                word = new GuessWord()
                    {
                        clue = "psie dziecko",
                        word = "szczeniak",
                    },
                vertical = false,
                x = 1,
                y = 3,
                CrosswordId = 1,
            },
            new WordPlacement()
            {
                word = new GuessWord()
                    {
                        clue = "zdrobnienie slowa pies",
                        word = "piesek",
                    },
                vertical = true,
                x = 5,
                y = 1,
                CrosswordId = 1,
            },
            new WordPlacement()
            {
                word = new GuessWord()
                    {
                        clue = "najładniejsza rasa psa",
                        word = "samoyed",
                    },
                vertical = true,
                x = 8,
                y = 2,
                CrosswordId = 1,
            },
            new WordPlacement()
            {
                word = new GuessWord()
                    {
                        clue = "służy do wąchania",
                        word = "nos",
                    },
                vertical = false,
                x = 7,
                y = 5,
                CrosswordId = 1,
            },
            new WordPlacement()
            {
                word = new GuessWord()
                    {
                        clue = "dziwna rasa psa",
                        word = "mudik",
                    },
                vertical = false,
                x = 6,
                y = 8,
                CrosswordId = 1,
            }
        };

        public static Crossword[] crossword = new[]
        {
            new Crossword()
            {
                height = 13,
                width = 13,
                words= {}
            }
        };
    }
}
