import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Book extends React.Component {
  render() {
    const { book, onChange, showInfo } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <Link to={{ pathname: "/detail", search: `?bookid=${book.id}` }} title="click to view details">
            <div className="book-cover" style={{ backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
          </Link>
          <div className="book-shelf-changer">
            <select value={book.shelf || 'none'} onChange={(e) => onChange(book, e)}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        {showInfo ?
          <div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors.join(', ')}</div>
          </div>
          : null}
      </div>
    )
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  // if show title & authors
  showInfo: PropTypes.bool
};

Book.defaultProps = {
  showInfo: true
};

export default Book;