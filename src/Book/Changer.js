import React from 'react';
import PropTypes from 'prop-types';

class Changer extends React.Component {
  render() {
    const { book, onChange } = this.props;
    return (
      <div className="book-shelf-changer">
        <select value={book.shelf||'none'} onChange={(e) => onChange(book, e)}>
          <option value="none" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

Changer.propTypes = {
  book: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Changer;