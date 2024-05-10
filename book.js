function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function Library() {
    this.books = [];

    this.addBook = function(book) {
        this.books.push(book);
    };

    this.displayBooks = function() {
        const booksContainer = document.querySelector('.books-container');
        booksContainer.innerHTML = '';

        this.books.forEach((book, index) => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');

            const titleElement = document.createElement('h2');
            titleElement.textContent = book.title;

            const authorElement = document.createElement('p');
            authorElement.textContent = `Author: ${book.author}`;

            const pagesElement = document.createElement('p');
            pagesElement.textContent = `Pages: ${book.pages}`;

            const readElement = document.createElement('p');
            readElement.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;

            const indexElement = document.createElement('p');
            indexElement.textContent = `Index: ${index}`;

            const swapButton = document.createElement('button');
            swapButton.textContent = 'Swap Read';
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove Book';

            swapButton.addEventListener('click', function() {
                book.read = !book.read;
                readElement.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
            });
            
            removeButton.addEventListener('click', function() {
                library.removeBook(index);
                library.displayBooks();
            });

            bookElement.appendChild(titleElement);
            bookElement.appendChild(authorElement);
            bookElement.appendChild(pagesElement);
            bookElement.appendChild(readElement);
            bookElement.appendChild(indexElement);
            bookElement.appendChild(swapButton);
            bookElement.appendChild(removeButton);

            booksContainer.appendChild(bookElement);
        });
    };
}

Library.prototype.removeBook = function(index) {
    this.books.splice(index, 1);
};

const library = new Library();

function showNewBookForm() {
    document.getElementById('new-book-form').style.display = 'block';
}

// Handle form submission
document.getElementById('add-book-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission to a server

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    library.addBook(newBook);
    library.displayBooks();

    document.getElementById('new-book-form').style.display = 'none';
});

document.getElementById('new-book-btn').addEventListener('click', showNewBookForm);

library.displayBooks();
