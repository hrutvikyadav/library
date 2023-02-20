//empty books array
myBooks = []

// constructor
function Book (title, author, totalPages, read=false) {
    this.title = title
    this.author = author
    this.totalPages = totalPages
    this.read = read
    this.info = function () {
        return `\n${this.title}, by\n${this.author}, ${this.totalPages} pages\n${this.read}`
    }
}

function addToMyBooks (book) {
    return myBooks.push(book)
}

// create books and add to array
let book = new Book("New Book", "Some wise man", 200, true)
let book1 = new Book("2nd Book", "Some old man", 500, true)
let book2 = new Book("3rd Book", "Some fat man", 400, false)
console.log(book,"\n",book.info())

let newBook = document.getElementById('new-book')
newBook.onclick = (e) => {
    e.preventDefault()
    document.querySelector('body').appendChild(showForm())
}

function showForm () {
    let form = document.createElement('form')
    form.setAttribute('method', 'GET');

    let formContent = [
        {
            labelContent: 'Enter title',
            inputId: 'title-input',
            inputName: 'title',
        },
        {
            labelContent: 'Enter Author',
            inputId: 'author-input',
            inputName: 'author',
        },
        {
            labelContent: 'Enter Pages',
            inputId: 'pages-input',
            inputName: 'pages',
        }
    ]
    
    formContent.forEach( el => {
        let label = document.createElement('label')
        label.textContent = el.labelContent
        let input = document.createElement('input')
        input.setAttribute('id', el.inputId)
        input.setAttribute('type', 'text')
        input.setAttribute('name', el.inputName)
        label.appendChild(input)
        form.appendChild(label)
    })

    let submitButton = document.createElement('button')
    submitButton.setAttribute('type', 'submit')
    submitButton.setAttribute('id', 'submit')
    submitButton.textContent = 'Add to list'
    submitButton.onclick = (e) => {
        e.preventDefault()
        console.log(e)
        let titleInput = document.getElementById('title-input').value
        let authorInput = document.getElementById('author-input').value
        let pagesInput = document.getElementById('pages-input').value
        console.log(titleInput, authorInput, pagesInput)
        let tempBook = new Book(titleInput, authorInput, pagesInput)
        addToMyBooks(tempBook)
        bookContainer.removeChild(bookContainer.firstChild)
        displayBooks(myBooks, bookContainer)
        document.querySelector('body').removeChild(document.querySelector('form'))
    }
    form.appendChild(submitButton)
    return form
}

addToMyBooks(book)
addToMyBooks(book1)
addToMyBooks(book2)

console.log(myBooks)

// get container div
let bookContainer = document.getElementById('booklist')

// loop over books arr and display in table format
function displayBooks (myBooks, bookContainer) {
    let table = document.createElement('table')
    let row = document.createElement('tr')
    let header = document.createElement('th')
    let header2 = document.createElement('th')
    let header3 = document.createElement('th')
    let header4 = document.createElement('th')

    header.textContent = "Title"
    row.appendChild(header)

    header2.textContent = 'Author'
    row.appendChild(header2)

    header3.textContent = 'Number of pages'
    row.appendChild(header3)

    header4.textContent = 'Read yet?'
    row.appendChild(header4)

    table.appendChild(row)

    myBooks.forEach(book => {
        let bookRow = document.createElement('tr')
        let headerdata = document.createElement('td') // title
        let header2data = document.createElement('td') // author
        let header3data = document.createElement('td') // pages
        let header4data = document.createElement('td') // read?

        headerdata.textContent = book.title
        bookRow.appendChild(headerdata)
        header2data.textContent = book.author
        bookRow.appendChild(header2data)
        header3data.textContent = book.totalPages
        bookRow.appendChild(header3data)
        header4data.textContent = `${book.read}`
        bookRow.appendChild(header4data)
        table.appendChild(bookRow)
    });
    bookContainer.appendChild(table)
}

displayBooks(myBooks, bookContainer)
