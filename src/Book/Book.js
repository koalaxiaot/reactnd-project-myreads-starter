import React from 'react';
import PropTypes from 'prop-types';
import Changer from './Changer';

class Book extends React.Component {
  render() {
    const { book, onChange } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
          <Changer book={book} onChange={onChange}/>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
      </div>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Book;