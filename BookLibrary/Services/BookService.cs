using System;
using BookLibrary.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace BookLibrary.Services
{
    public class BookService : IBookService
    {
        private readonly BookLibraryDbContext _context;

        public BookService(BookLibraryDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            return await _context.Books.Where(x => x.IsDeleted == false).ToListAsync();
        }

        public async Task<Book> GetBook(int id)
        {
            return  await _context.Books.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task CreateBook(Book book)
        {
            _context.Add(book);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBook(int id)
        {
            var book = _context.Books.FirstOrDefault(x => x.Id == id);

            if (book == null)
            {
                throw new Exception($"There is no book id database with {id} id.");
            }

            book.IsDeleted = true;

            await _context.SaveChangesAsync();
        }

        public async Task UpdateBook(Book book)
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

            await _context.SaveChangesAsync();
        }
    }

    public interface IBookService
    {
        Task<IEnumerable<Book>> GetBooks();
        Task<Book> GetBook(int id);
        Task CreateBook(Book book);
        Task DeleteBook(int id);
        Task UpdateBook(Book book);
    }
}
