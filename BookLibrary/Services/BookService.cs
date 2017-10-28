using System;
using BookLibrary.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookLibrary.ViewModels;
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

        public async Task<IEnumerable<BookVm>> GetBooks()
        {
            var books = await _context.Books.Where(x => x.IsDeleted == false).Include(y => y.Category).ToListAsync();
            return books.Select(x => new BookVm()
            {
                BookId = x.Id,
                BookTitle = x.Title,
                CategoryName = x.Category.Name,
                CategoryId = x.CategoryId
            }).ToList();
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            return await _context.Categories.ToArrayAsync<Category>();
        }

        public async Task CreateBook(BookVm book)
        {
            var category = _context.Categories.FirstOrDefault(x => x.Name.ToUpperInvariant() == book.CategoryName.ToUpperInvariant());
            var entity = new Book {Title = book.BookTitle};

            if (category == null)
            {
                entity.Category = new Category() {Name = book.CategoryName};
            }
            else
            {
                entity.CategoryId = category.Id;
            }

            _context.Add(entity);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteBook(int id)
        {
            var book = _context.Books.Include(y => y.Category).FirstOrDefault(x => x.Id == id);

            if (book == null)
            {
                throw new Exception($"There is no book id database with {id} id.");
            }

            book.IsDeleted = true;

            await _context.SaveChangesAsync();
        }

        public async Task UpdateBook(BookVm book)
        {
            var entity = _context.Books.FirstOrDefault(x => x.Id == book.BookId);

            if (entity == null)
            {
                throw new Exception($"There is no book id database with {book.BookId} id.");
            }

            entity.Title = book.BookTitle;

            var category = _context.Categories.FirstOrDefault(x => x.Name.ToUpperInvariant() == book.CategoryName.ToUpperInvariant());

            if (category == null)
            {
                entity.Category = new Category() { Name = book.CategoryName };
            }
            else
            {
                entity.CategoryId = category.Id;
            }

            await _context.SaveChangesAsync();
        }
    }

    public interface IBookService
    {
        Task<IEnumerable<BookVm>> GetBooks();
        Task<IEnumerable<Category>> GetCategories();
        Task CreateBook(BookVm book);
        Task DeleteBook(int id);
        Task UpdateBook(BookVm book);
    }
}
