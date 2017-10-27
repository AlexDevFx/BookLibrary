using System.Collections.Generic;
using System.Linq;

namespace BookLibrary.Models
{
    public class DbInitializer
    {
        public static void Initialize(BookLibraryDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Books.Any())
            {
                return; // DB has been seeded
            }

            var categories = new List<Category>()
            {
                new Category()
                {
                    Name = "Category 1"
                },
                new Category()
                {
                    Name = "Category 2"
                },
                new Category()
                {
                    Name = "Category 3"
                },
                new Category()
                {
                    Name = "Category 4"
                },
                new Category()
                {
                    Name = "Category 5"
                }
            };

            foreach (var category in categories)
            {
                context.Add(category);
            }

            context.SaveChanges();

            var books = new List<Book>()
            {
                new Book()
                {
                    Title = "Title 1",
                    IsDeleted = false,
                    Category = categories[0]
                },
                new Book()
                {
                    Title = "Title 2",
                    IsDeleted = false,
                    Category = categories[1]
                },
                new Book()
                {
                    Title = "Title 3",
                    IsDeleted = false,
                    Category = categories[2]
                },
                new Book()
                {
                    Title = "Title 4",
                    IsDeleted = false,
                    Category = categories[3]
                },
                new Book()
                {
                    Title = "Title 5",
                    IsDeleted = false,
                    Category = categories[4]
                },
            };

            foreach (var book in books)
            {
                context.Books.Add(book);
            }

            context.SaveChanges();
        }
    }
}
