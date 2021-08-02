'use strict'

const KEY = 'bookDB'
var gBooks;
var gSortBy = 'name'
var gPageIdx = 0;
const PAGE_SIZE = 3;

_createBooks();





function getBooks() {
  gBooks.sort(sortBy)
  var startIdx = gPageIdx * PAGE_SIZE;
  return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}


function nextPage() {
  gPageIdx++;
  if (gPageIdx * PAGE_SIZE >= gBooks.length) {
    gPageIdx = 0;
  }
}
function prevPage() {
  if (!gPageIdx) return
  gPageIdx--;
}
function getBookById(bookIdx) {
  var book = gBooks.find(function (book) {
    return bookIdx === book.id
  })
  return book
}


function _createBook(bookName, price, imgUrl) {
  return {
    id: makeId(),
    img: `<img class ="display-img" src="${imgUrl}" alt="${bookName}"></img>`,
    price: `${price}$`,
    name: bookName,
    rate: 1
  }
}


function sortBy(t1, t2) {
  switch (gSortBy) {
    case 'name':
      return t1.name.localeCompare(t2.name);
    case 'rate':
      return parseInt(t2.rate) - parseInt(t1.rate);
    case 'low to high':
      return parseInt(t1.price) - parseInt(t2.price);
    case 'high to low':
      return parseInt(t2.price) - parseInt(t1.price);
    default: return t1.name.localeCompare(t2.name);

  }
}

function setSortBy(sortBy) {
  gSortBy = sortBy.name;
}


function _createBooks() {
  var books = loadFromStorage(KEY)
  if (!books || !books.length) {
    books = []
    for (let i = 1; i < 3; i++) {
      var bookName = "test"
      var bookImg = `img/book${i}.jpeg`
      var price = 0;
      books.push(_createBook(bookName, price, bookImg))
    }
  }
  gBooks = books;
  _saveBooksToStorage();
}

function _saveBooksToStorage() {
  saveToStorage(KEY, gBooks)
}

function deleteBook(bookId) {

  var bookIdx = gBooks.findIndex(function (book) {
    return bookId === book.id
  })
  gBooks.splice(bookIdx, 1)
  _saveBooksToStorage();

}

function updateBook(bookIdx, newName, newPrice, newImg) {
  var book = gBooks.find(function (book) {
    return book.id === bookIdx;
  })
  book.name = newName
  book.price = newPrice
  book.img = newImg
  _saveBooksToStorage();
}


function addBook(name, price, imgUrl) {
  var book = _createBook(name, price, imgUrl)
  gBooks.unshift(book)
  _saveBooksToStorage();

}



function _saveBooksToStorage() {
  saveToStorage(KEY, gBooks)
}


function addRate(bookIdx) {
  var rateDisplay = document.querySelector('.rate-conroller span')
  var book1 = getBookById(bookIdx)
  console.log(book1);

  var currBook = gBooks.find((book) => {
    return book === book1;
  })
  if (currBook.rate === 5) return
  currBook.rate++
  rateDisplay.innerHTML = currBook.rate
  renderBooks()
  _saveBooksToStorage()
  console.log(currBook);
}

function decRate(bookIdx) {
  var rateDisplay = document.querySelector('.rate-conroller span')
  var book1 = getBookById(bookIdx)
  console.log(book1);

  var currBook = gBooks.find((book) => {
    return book === book1;
  })
  if (currBook.rate === 1) return
  currBook.rate--
  rateDisplay.innerHTML = currBook.rate
  renderBooks()
  _saveBooksToStorage()
  console.log(currBook);
}

function openInputModal() {

}

function createStarsRate(rate) {
  var strHtml = ''

  for (let i = 0; i < rate; i++) {
    strHtml += ' ⭐️'
  }
  return strHtml
}