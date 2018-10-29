/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  // Your code goes here
  let b = books.filter(book => bookId === book.id);
  if (b) return b[0];
  return undefined;
}

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  // Your code goes here
  let a = authors.filter(
    author => authorName.toLowerCase() === author.name.toLowerCase()
  );
  if (a) return a[0];
  return undefined;
}

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  // Your code goes here
  let arr = authors.map(author => ({
    author: author.name,
    bookCount: author.books.length
  }));
  return arr;
}

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};

  // Your code goes here
  let cols = books.map(book => book.color);
  cols.sort();
  let col = cols[0];
  let flag = true;
  let newcol = [];
  for (let i = 0; i < cols.length; i++) {
    if (col !== cols[i]) {
      flag = true;
      col = cols[i];
    }
    if (col === cols[i] && flag) {
      newcol.push(col);
      flag = false;
    }
  }
  for (let i = 0; i < newcol.length; i++) {
    let newl = books
      .filter(book => book.color === newcol[i])
      .map(book => book.title);
    colors[newcol[i]] = newl;
  }

  return colors;
}

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here
  let authorBooks = [];

  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].authors.length; j++) {
      if (books[i].authors[j].name.toLowerCase() === authorName.toLowerCase()) {
        authorBooks.push(books[i].title);
      }
    }
  }
  return authorBooks;
}

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  // Your code goes here
  let authorscount = bookCountsByAuthor(authors);
  let high = authorscount[0];

  for (let i = 0; i < authorscount.length; i++) {
    if (authorscount[i].bookCount > high.bookCount) high = authorscount[i];
  }
  return high.author;
}

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  // Your code goes here
  let authorName = books.filter(book => book.id === bookId);

  let booklist = [];
  for (let i = 0; i < authorName[0].authors.length; i++) {
    let cbooklist = titlesByAuthorName(
      authorName[0].authors[i].name,
      authors,
      books
    );
    for (let j = 0; j < cbooklist.length; j++) {
      booklist.push(cbooklist[j]);
    }
  }
  return booklist.filter((v, i) => booklist.indexOf(v) == i);
}

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  // Your code goes here
  // let auth = authors[0];
  // let allcos = [];
  // // allcos = bookCountsByAuthor(authors);
  //
  // for (let i = 1; i < authors.length; i++) {
  //   let result = authors.forEach( function compare(books1, books2) {
  //   const comBooks = [];
  //   books1.forEach(book =>
  //     books2.forEach(book2 => {
  //       if (book === book2) {
  //         comBooks.push(book);
  //       }
  //     })
  //   );
  //   return comBooks;
  // })
  //   allcos.push();
  // }
  // //
  // // let co = authors.filter(function(author) {
  // //   author.books.filter(function(books) {
  // //     books.filter(function(books) {});
  // //   });
  // // });
  //
  //
  // co = authors.forEach(function(author) {
  //    author.books.filter(function(books) {
  //      books.filter(function(books) {});
  //    });
  //  });)
}

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */

// const authors = require("./authors.json");
// const books = require("./books.json");

// console.log(getBookById(12, books));
// console.log(getAuthorByName("J.K. Rowling", authors));
// console.log(bookCountsByAuthor(authors));
// console.log(booksByColor(books));
// console.log(titlesByAuthorName("George R.R. Martin", authors, books));
// console.log(mostProlificAuthor(authors));
// console.log(relatedBooks(50, authors, books));
// console.log(friendliestAuthor(authors));
