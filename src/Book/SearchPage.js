import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import BookList from './BookList';
import Loading from './Loading';

class SearchPage extends React.Component {

  state = {
    books: [], // search result
    isSearching: false, // if it is searching
    query: '' // search key words
  };

  // https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
  _isMounted = true

  handleChange = (e) => {
    const query = e.target.value;
    this.setState({ query });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { query } = this.state;
    if (query.trim()) {
      this.setState({ isSearching: true });
      this.cancelablePromise = BooksAPI.search(query, 10)
        .then((books) => {
          if (books && !books.error) {
            // set book to its shelf if exist
            // i want to change the code below to declarative, but i don't know how.
            books.forEach((book) => {
              this.props.books.forEach((b) => {
                if (b.id === book.id) {
                  book['shelf'] = b.shelf;
                }
              });
            });
            this._isMounted && this.setState({ books, isSearching: false });
          } else {
            this._isMounted && this.setState({ books: [], isSearching: false });
          }
        });
    } else {
      this.setState({ books: [], isSearching: false });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { isSearching, books, query } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-button" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <input
                type="text"
                placeholder="Search by title or author (press Enter to search)"
                value={query}
                onChange={(e) => this.handleChange(e)} />
            </form>
          </div>
        </div>
        {isSearching ?
          <Loading /> :
          <div className="search-books-results">
            {
              (books.length > 0 && <BookList onChange={this.props.onChange} books={books} />) || 'no books.'
            }
          </div>
        }
      </div>
    )
  }
}

export default SearchPage;