import React from 'react';
import * as BooksAPI from './BooksAPI'
import { Link, Route } from 'react-router-dom';
import BookShelf from './Book/BookShelf';
import SearchPage from './Book/SearchPage';
import DetailPage from './Book/DetailPage';
import Loading from './Book/Loading';
import './App.css';

class BooksApp extends React.Component {

  state = {
    books: [],
    isLoading: true
  };

  BOOK_SHELVES = [
    { id: "currentlyReading", name: "Currently Reading" },
    { id: "wantToRead", name: "Want to Read" },
    { id: "read", name: "Read" },
  ];

  // filter books by shelf
  booksFilter = shelf => this.state.books.filter(book => book.shelf === shelf)

  // change book shelf
  handleChange = (newbook, e) => {
    const newShelf = e.target.value;
    newbook['shelf'] = newShelf;
    this.setState(prevState => {
      // add new book to prevState.books array if the new book not in array
      prevState.books.find(book => book.id === newbook.id) || prevState.books.push(newbook);
      // update (new) book to target shelf
      return { books: prevState.books.map(book => book.id === newbook.id ? newbook : book) }
    });
    BooksAPI.update(newbook, newShelf); // remote update
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books, isLoading: false });
    });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {
          isLoading ?
            <Loading />
            :
            <div className="app">

              <Route path="/search" render={() => (
                <SearchPage onChange={this.handleChange} books={this.state.books} />
              )} />

              <Route path="/detail" render={({ location }) => (
                <DetailPage onChange={this.handleChange} location={location} />
              )} />

              <Route exact path="/" render={() => (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    {this.BOOK_SHELVES.map(shelf =>
                      <BookShelf
                        key={shelf.id}
                        shelfname={shelf.name}
                        books={this.booksFilter(shelf.id)}
                        onChange={this.handleChange} />
                    )}
                  </div>
                  <div className="open-search">
                    <Link to="/search">Add a book</Link>
                  </div>
                </div>
              )} />

            </div>
        }
      </div>
    )
  }
}

export default BooksApp;