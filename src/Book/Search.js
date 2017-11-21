import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import BookList from './BookList';

class Search extends React.Component {

  state = {
    books: []
  };

  handleSearch = (e) => {
    let query = e.target.value;
    if (query) {
      // maxResult param does not work
      BooksAPI.search(query, 10).then(books => {
        if (books && !books.error) {
          // set book to its shelf if exist
          books.forEach((book) => {
            this.props.books.forEach( (b) => {
              if (b.id === book.id){
                book['shelf'] = b.shelf;
              }
            });
          });
          this.setState({ books });
        }
      });
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(e) => this.handleSearch(e)} />
          </div>
        </div>
        <div className="search-books-results">
          <BookList onChange={this.props.onChange} books={this.state.books} />
        </div>
      </div>
    )
  }
}

export default Search;