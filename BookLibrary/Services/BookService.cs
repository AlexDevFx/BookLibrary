using System;
using BookLibrary.Models;
using System.Collections.Generic;
using System.Linq;

namespace BookLibrary.Services
{
    public class BookService : IBookService
    {
        private readonly BookLibraryDbContext _context;

        public BookService(BookLibraryDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Book> GetBooks()
        {
            return _context.Books.Where(x => x.IsDeleted == false);
        }

        public Book GetBook(int id)
        {
            return _context.Books.FirstOrDefault(x => x.Id == id);
        }

        public void CreateBook(Book book)
        {
            _context.Add(book);
            _context.SaveChanges();
        }

        public void DeleteBook(int id)
        {
            var book = _context.Books.FirstOrDefault(x => x.Id == id);

            if (book == null)
            {
                throw new Exception($"There is no book id database with {id} id.");
            }

            book.IsDeleted = true;

            _context.SaveChanges();
        }

        public void UpdateBook(Book book)
        {
            var entity = _context.Books.FirstOrDefault(x => x.Id == book.Id);

            if (entity == null)
            {
                throw new Exception($"There is no book id database with {book.Id} id.");
            }

            entity.Author = book.Author;
            entity.Isbn = book.Isbn;
            entity.Title = book.Title;
            entity.YearPress = book.YearPress;

            _context.SaveChanges();
        }
    }

    public interface IBookService
    {
        IEnumerable<Book> GetBooks();
        Book GetBook(int id);
        void CreateBook(Book book);
        void DeleteBook(int id);
        void UpdateBook(Book book);
    }
}
