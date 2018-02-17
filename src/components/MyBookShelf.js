import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

class MyBookShelf extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({
        books: books
      });
    });
  }

  onShelfChange = (book, shelf) => {
    const id = book.id;
    const currentBooks = [...this.state.books];
    const iToUpdate = currentBooks.findIndex(book => book.id === id);
    const newBookToUpdate = Object.assign({}, currentBooks[iToUpdate], {
      shelf: shelf
    });

    this.setState({
      books: [
        ...currentBooks.slice(0, iToUpdate),
        newBookToUpdate,
        ...currentBooks.slice(iToUpdate + 1)
      ]
    });

    BooksAPI.update(book, shelf);
  };

  render() {
    const { books } = this.state;

    let currentList = [];
    let wantList = [];
    let readList = [];

    books.forEach(book => {
      switch (book.shelf) {
        case "currentlyReading":
          currentList.push(book);
          break;
        case "wantToRead":
          wantList.push(book);
          break;
        case "read":
          readList.push(book);
          break;
        default:
          break;
      }
    });

    const shelfList = [
      {
        title: "Currently Reading",
        books: currentList
      },
      {
        title: "Want To Read",
        books: wantList
      },
      {
        title: "Read",
        books: readList
      }
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <div className="list-books-content">
          <div>
            {shelfList.map((shelf, index) => (
              <div key={index} className="bookshelf">
                <h2 className="bookshelf-title">{shelf.title}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {shelf.books.map((book, i) => (
                      <Book
                        key={i}
                        book={book}
                        onShelfChange={this.onShelfChange}
                      />
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
          }
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default MyBookShelf;
