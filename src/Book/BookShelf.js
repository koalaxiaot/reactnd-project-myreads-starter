import React from 'react';
import PropTypes from 'prop-types';
import BookList from './BookList';

class BookShelf extends React.Component {
  render() {
    const { shelfname, books, onChange } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfname}</h2>
        <div className="bookshelf-books">
          <BookList books={books} onChange={onChange}/>
        </div>
      </div>
    )
  }
}

BookShelf.propTypes = {
  shelfname: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

BookShelf.defaultProps = {
  books: []
};

export default BookShelf;