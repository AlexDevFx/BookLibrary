using System.Threading.Tasks;
using BookLibrary.Models;
using BookLibrary.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BookLibrary.Controllers
{
    [Route("api/Book")]
    public class BookController : Controller
    {
        private readonly IBookService _bookService;

        public BookController(IBookService bookService)
        {
            _bookService = bookService;
        }

        [HttpGet("[action]"), Produces("application/json")]
        [AllowAnonymous]
        public async Task<IActionResult> GetBooks()
        {
            return Ok(new
            {
                result = await _bookService.GetBooks()
            });
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetBook(int id)
        {
            return Ok(new {data = await _bookService.GetBook(id)});
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateBook([FromBody] Book book)
        {
            await _bookService.CreateBook(book);
            return Ok();
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            await _bookService.DeleteBook(id);
            return Ok();
        }

        [HttpPut("[action]")]
        public async Task<IActionResult> UpdateBook([FromBody] Book book)
        {
            await _bookService.UpdateBook(book);
            return Ok();
        }
    }
}
