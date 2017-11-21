import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookList extends React.Component {
  render() {
    const {books, onChange} = this.props;
    return (
      <ol className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            <Book book={book} onChange={onChange}/>
          </li>
        ))}
      </ol>
    )
  }
}

BookList.propTypes = {
  books: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

BookList.defaultProps = {
  books: []
};

export default BookList;