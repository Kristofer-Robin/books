const form = document.querySelector('form')
const booksList = document.querySelector('#books-list')

form.addEventListener('submit', addBook)
document.addEventListener('DOMContentLoaded', getBooksFromLS)

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