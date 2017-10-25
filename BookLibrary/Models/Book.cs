namespace BookLibrary.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Isbn { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int YearPress { get; set; }
        public bool IsDeleted { get; set; }
    }
}
