using Domain.Entities;

namespace Infrastructure.Data
{
    public class DemoDb
    {
        public List<Word> Words { get; set; } = new List<Word>()
        {
            new Word{Id = 1, Text = "Hello" },
            new Word{Id = 2, Text = "World" },
            new Word{Id = 3, Text = "Telephone" },
            new Word{Id = 4, Text = "Rabbit" },
            new Word{Id = 5, Text = "Background" },
            new Word{Id = 6, Text = "Color" },
            new Word{Id = 7, Text = "Sity" },
            new Word{Id = 8, Text = "Winter" },
            new Word{Id = 9, Text = "Dump" },
            new Word{Id = 10, Text = "Jump" }
        };
    }
}
