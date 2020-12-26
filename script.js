let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
    }
}

let addBookToLibrary = (title, author, pages, read) => {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    saveLib();
    display();
}

let displayBooks = () => {
    let size = myLibrary.length;
    for (let i = 0; i < size; i++) {
        let table = document.querySelector('.table');
        let row = document.createElement('tr');
        row.classList.add('temp');

        let serial = document.createElement('td');
        serial.textContent = i + 1;

        let title = document.createElement('td');
        title.textContent = myLibrary[i].title;

        let author = document.createElement('td');
        author.textContent = myLibrary[i].author;

        let pages = document.createElement('td');
        pages.textContent = myLibrary[i].pages;

        let read = document.createElement('td');
        read.textContent = myLibrary[i].read;

        let action = document.createElement('td');
        let delBtn = document.createElement('button');
        let readBtn = document.createElement('button');
        readBtn.classList.add('readbtn');
        readBtn.setAttribute('type', 'button');
        delBtn.classList.add('remove');
        delBtn.setAttribute('type', 'button');
        readBtn.textContent = 'Change Read';
        delBtn.textContent = 'Delete';
        action.appendChild(delBtn);
        action.appendChild(readBtn);
        
        row.appendChild(serial);
        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(read);
        row.appendChild(action);
        
        table.appendChild(row);

        delBtn.addEventListener('click', () => {
            table.removeChild(row);
            myLibrary.splice(i, 1);
            saveLib();
            display();
        })

        readBtn.addEventListener('click', () => {
            read.textContent = read.textContent == 'read' ? 'not read': 'read';
        })
    }
}

let displayReset = () => {
    let table = document.querySelector('.table');
    let rows = document.querySelectorAll('tr.temp');

    rows.forEach(row => {
        table.removeChild(row);
    })
}

let display = () => {
    displayReset();
    displayBooks();
}

let form = document.querySelector('form');
let button = document.querySelector('.new');

button.addEventListener('click', () => {
    form.classList.toggle('hide');
})

let subBtn = document.getElementById('submit');
subBtn.addEventListener('click', () => {
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').checked ? 'read' : 'not read';

    addBookToLibrary(title, author, pages, read);
    form.classList.toggle('hide');
})

let saveLib = () => {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

let loadLib = () => {
    objects = localStorage.getItem('library');
    objects = JSON.parse(objects);
    myLibrary = objects;
    displayBooks();
}

if (localStorage['library'] != null) {
    loadLib();
} else {
    display();
}
