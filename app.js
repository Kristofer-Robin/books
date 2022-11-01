const form = document.querySelector('form')
const booksList = document.querySelector('#books-list')

form.addEventListener('submit', addBook)
document.addEventListener('DOMContentLoaded', getBooksFromLS)
booksList.addEventListener('click', deleteBook)

function getBooksFromLS(){
    let books
    if (localStorage.getItem('books') === null){
        books = []
    } else {
        books = JSON.parse(localStorage.getItem('books'))
    }
    for (let i = 0; i < books.length; i++){
        let book = books[i]
        const tr = document.createElement('tr')
        for (let i = 0; i < book.length; i++){
            let td = document.createElement('td')
            let text = document.createTextNode(book[i])
            td.appendChild(text)
            tr.appendChild(td)
        }
        td = document.createElement('td')
        const link = document.createElement('a')
        link.setAttribute('href', '#')
        link.appendChild(document.createTextNode('X'))
        td.appendChild(link)
        tr.appendChild(td)
        booksList.appendChild(tr)
    }
}

function addBook(event){
    const titleInput = document.querySelector('#title')
    const authorInput = document.querySelector('#author')
    const isbnInput = document.querySelector('#isbn')

    let title = titleInput.value
    let author = authorInput.value
    let isbn = isbnInput.value

    const book = [title, author, isbn]
    const tr = document.createElement('tr')
    for (let i = 0; i < book.length; i++){
        let td = document.createElement('td')
        let text = document.createTextNode(book[i])
        td.appendChild(text)
        tr.appendChild(td)
    }
    td = document.createElement('td')
    const link = document.createElement('a')
    link.setAttribute('href', '#')
    link.appendChild(document.createTextNode('X'))
    td.appendChild(link)
    tr.appendChild(td)
    booksList.appendChild(tr)
    addBookToLS(book)
    event.preventDefault()
}

function addBookToLS(book){
    let books
    if(localStorage.getItem('books') === null){
        books = []
    } else {
        books = JSON.parse(localStorage.getItem('books'))
    }
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
}

function deleteBook(event){
    if (event.target.textContent === 'X'){
        if(confirm('Do you want to delete this book?')){
            event.target.parentElement.parentElement.remove()
            let booksISBN = event.target.parentElement.previousElementSibling.textContent
            deleteBookFromLS(booksISBN)
        }
    }
}

function deleteBookFromLS(bookISBN){
    let books
    if(localStorage.getItem('books') === null){
        books = []
    } else {
        books = JSON.parse(localStorage.getItem('books'))
    }
    books.forEach(function (book, index) {
        if (book[2] === bookISBN){
            books.splice(index, 1)
        }
    })
    localStorage.setItem('books', JSON.stringify(books))
}