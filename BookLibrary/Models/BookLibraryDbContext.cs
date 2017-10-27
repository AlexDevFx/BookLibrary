using Microsoft.EntityFrameworkCore;

namespace BookLibrary.Models
{
    public class BookLibraryDbContext : DbContext
    {
        public BookLibraryDbContext(DbContextOptions<BookLibraryDbContext> options)
            : base(options)
        {
        }

        public DbSet<Book> Books { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>().ToTable("Book").HasKey(x => x.Id);
            modelBuilder.Entity<Category>().ToTable("Category").HasKey(x => x.Id);

            modelBuilder.Entity<Book>().HasOne(x => x.Category).WithMany(y => y.Books);
        }
    }
}
