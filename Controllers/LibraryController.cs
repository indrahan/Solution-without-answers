using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Model;

namespace firstChance_2nd_attempt.Controllers
{
    [Route("api/[controller]")]//<<< URI voor api-call = `api/library/regel 63
    public class LibraryController : Controller//<<<<< /library komt van libraryController, maar dan zonder "Controller" 
    {
        private readonly LibraryContext _context;
        public LibraryController(LibraryContext context)
        {
            _context = context;
            if (_context.Authors.Count() == 0 &&
               _context.Books.Count() == 0)
            {
                System.Console.WriteLine("00000");
                Author a1 = new Author() { Name = "John Ronald Reuel Tolkien", Gender = "male", Birth = new DateTime(1892, 1, 3), Id = 1 };
                Author a2 = new Author() { Name = "Paulo Coelho", Gender = "male", Birth = new DateTime(1947, 8, 24), Id = 2 };
                Author a3 = new Author() { Name = "Khalil Gibran", Gender = "male", Birth = new DateTime(1883, 1, 6), Id = 3 };
                _context.Authors.Add(a1);
                _context.Authors.Add(a2);
                _context.Authors.Add(a3);
                _context.SaveChanges();
                System.Console.WriteLine("aaa");

                Book b1 = new Book() { Id = 1, Title = "The Lord Of The Rings", Year = new DateTime(1937, 1, 1) };
                Book b2 = new Book() { Id = 2, Title = "The Silmarillion", Year = new DateTime(1977, 1, 1) };

                Book b3 = new Book() { Id = 3, Title = "The Alchemist", Year = new DateTime(1988, 1, 1) };
                Book b4 = new Book() { Id = 4, Title = "The Pilgrimage", Year = new DateTime(1987, 1, 1) };

                Book b5 = new Book() { Id = 5, Title = "The Prophet", Year = new DateTime(1923, 1, 1) };
                Book b6 = new Book() { Id = 6, Title = "Kingdom of the Imagination", Year = new DateTime(1927, 1, 1) };
                _context.Books.Add(b1);
                _context.Books.Add(b2);
                _context.Books.Add(b3);
                _context.Books.Add(b4);
                _context.Books.Add(b5);
                _context.Books.Add(b6);

                BookAuthor ba11 = new BookAuthor() { AuthorId = a1.Id, BookId = b1.Id };
                BookAuthor ba12 = new BookAuthor() { AuthorId = a1.Id, BookId = b2.Id };
                BookAuthor ba23 = new BookAuthor() { AuthorId = a2.Id, BookId = b3.Id };
                BookAuthor ba24 = new BookAuthor() { AuthorId = a2.Id, BookId = b4.Id };
                BookAuthor ba35 = new BookAuthor() { AuthorId = a3.Id, BookId = b5.Id };
                BookAuthor ba36 = new BookAuthor() { AuthorId = a3.Id, BookId = b6.Id };
                _context.BookAuthor.Add(ba11);
                _context.BookAuthor.Add(ba12);
                _context.BookAuthor.Add(ba23);
                _context.BookAuthor.Add(ba24);
                _context.BookAuthor.Add(ba35);
                _context.BookAuthor.Add(ba36);

                _context.SaveChanges();
            }

        }
        [HttpGet("GetAuthorsAndBooks")]//<<<<< komt in je URI
        public AuthorBooks[] GetAuthorsAndBooks()
        {
            //TODO 6: missing code 1pt
            //Data uit database halen zoda je deze op de front-end kunt gebruiken dmv api-call
            //
            var authorsAndBooks = (from a in _context.Authors
                                   let a_books =
                                   (from a_b in _context.BookAuthor 
                                   from b in _context.Books 
                                   where a_b.AuthorId == a.Id && a_b.BookId == b.Id 
                                   select b).ToArray()
                                   select new AuthorBooks() { Author = a, Books = a_books }).ToArray();

            return authorsAndBooks;
        }
        public class AuthorBooks
        {
            public Author Author { get; set; }
            public Book[] Books { get; set; }
        }
    }
}
