namespace BookLibrary.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int CategoryId { get; set; }
        public bool IsDeleted { get; set; }

        public Category Category { get; set; }
    }
}
