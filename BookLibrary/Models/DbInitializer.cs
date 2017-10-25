using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookLibrary.Models
{
    public class DbInitializer
    {
        public static void Initialize(BookLibraryDbContext context)
        {
            context.Database.EnsureCreated();

            if (context.Books.Any())
            {
                return;   // DB has been seeded
            }

            var books = new List<Book>()
            {
                new Book()
                {
                    Author = "Author 1",
                    Isbn = "Isbn 1",
                    Title = "Title 1",
                    YearPress = 2017,
                    IsDeleted = false
                },
                new Book()
                {
                    Author = "Author 2",
                    Isbn = "Isbn 2",
                    Title = "Title 2",
                    YearPress = 2016,
                    IsDeleted = false
                },
                new Book()
                {
                    Author = "Author 3",
                    Isbn = "Isbn 3",
                    Title = "Title 3",
                    YearPress = 2015,
                    IsDeleted = false
                },
                new Book()
                {
                    Author = "Author 4",
                    Isbn = "Isbn 4",
                    Title = "Title 4",
                    YearPress = 2014,
                    IsDeleted = false
                },
                new Book()
                {
                    Author = "Author 5",
                    Isbn = "Isbn 5",
                    Title = "Title 5",
                    YearPress = 2013,
                    IsDeleted = false
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
