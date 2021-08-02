'use srtict'

var gActiveBtn;
var gSortActive;

function onInit() {
  console.log('hii');
  renderBooks()
  renderButtons()
  gSortActive = document.querySelector('[name="name"]')
  gSortActive.classList.add('active-sort')
  gActiveBtn = document.querySelector(`[name="btn${gPageIdx + 1}"]`)
  gActiveBtn.classList.add('active')
}




function renderBooks() {


  var books = getBooks()

  var strHTMLs = books.map(function (book) {
    var strHTML =
      `<tr>
            <td>${createStarsRate(book.rate)}</td> 
            <td>${book.name}</td>
            <td>${book.price}</td>
            <td colspan=3>
            <button class="read-btn" onclick="onReadBook('${book.id}')" type="boutton">Read</button>
            <button class="update-btn" onclick="onUpdateBook('${book.id}')" type="boutton">Update</button>
            <button class="delete-btn" onclick="onDeleteBook('${book.id}')" type="boutton">Delete</button>
            </td>
            <td>${book.img}</td>
            </tr>`
    return strHTML
  })
  var elTable = document.querySelector('.books-table tbody');
  elTable.innerHTML = strHTMLs.join('');
}

function onSetSort(sortBy) {
  gSortActive.classList.remove('active-sort')
  gSortActive = sortBy;
  gSortActive.classList.add('active-sort')
  setSortBy(sortBy)
  renderBooks()
}

function renderButtons() {
  var elButtons = document.querySelector('.pagination ul')
  console.log(elButtons);
  var numOfBtns = Math.ceil(gBooks.length / PAGE_SIZE)
  console.log(numOfBtns);
  elButtons.innerHTML = `
<li><a name="prev" onclick="onPage(this)"></a></li>
`
  var strHtml = ''
  for (let i = 0; i < numOfBtns; i++) {
    strHtml += `<li><a name="btn${i + 1}" onClick="onPage(this)"></a></li>`
  }
  strHtml = strHtml + `<li><a name="next" onclick="onPage(this, event)"></a></li> `
  elButtons.innerHTML += strHtml
}


function onAddBook() {
  var elModal = document.querySelector('.input-modal')
  elModal.hidden = false;
}

function inputConfirm() {
  var name = document.querySelector('[name="title-input"]').value
  var price = document.querySelector('[name="price-input"]').value
  var img = document.querySelector('[name="img-input"]').value
  addBook(name, price, img)
  renderBooks()
  renderButtons()
  onCloseInputModal()
}

function onDeleteBook(bookIdx) {
  console.log('deleted id ', bookIdx);
  deleteBook(bookIdx)
  renderBooks()
  renderButtons()
}

function onUpdateBook(bookIdx) {
  var name = prompt('enter the book name')
  var price = +prompt('enter the book price: ')
  var img = prompt('enter the book url: ')
  updateBook(bookIdx, name, price, img);
  renderBooks();
}

function onReadBook(bookIdx) {
  var book = getBookById(bookIdx)
  var elModal = document.querySelector('.modal')
  elModal.querySelector('.img-container').innerHTML = book.img
  elModal.querySelector('h5').innerText = 'book id:' + book.id
  elModal.querySelector('h4').innerText = 'book title: ' + book.name
  elModal.querySelector('p').innerText = 'book price: ' + book.price
  elModal.hidden = false;
  elModal.querySelector('.rate-conroller').innerHTML =
    `
    <h4>rate this book:</h4>

  <button onclick="addRate('${bookIdx}')">+</button>
  <span>${book.rate}</span>
  <button onclick="decRate('${bookIdx}')">-</button>`

}

function onCloseModal() {
  document.querySelector('.modal').hidden = true
}

function onCloseInputModal() {
  document.querySelector('.input-modal').hidden = true
}


function onPage(elDirection) {
  gActiveBtn.classList.remove('active')



  console.log(elDirection);
  if (elDirection.name === 'next') {

    nextPage();
    renderBooks();
    gActiveBtn = document.querySelector(`[name="btn${gPageIdx + 1}"]`)
    gActiveBtn.classList.add('active')
    return
  }
  if (elDirection.name === 'prev') {
    prevPage()
    renderBooks()
    gActiveBtn = document.querySelector(`[name="btn${gPageIdx + 1}"]`)
    gActiveBtn.classList.add('active')
    return
  }

  var pageNum = +elDirection.name.substring(3, 4)
  console.log(typeof pageNum);
  gPageIdx = pageNum - 1;

  gActiveBtn = document.querySelector(`[name="btn${gPageIdx + 1}"]`)
  gActiveBtn.classList.add('active')

  renderBooks()



}
