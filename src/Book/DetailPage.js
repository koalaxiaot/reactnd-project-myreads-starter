import React from 'react';
import QueryString from 'query-string';
import { Link } from 'react-router-dom';
import Book from './Book';
import Loading from './Loading';
import * as BooksAPI from '../BooksAPI';

class DetailPage extends React.Component {

  state = {
    book: {},
    isLoading: true,
    isError: false
  };

  componentDidMount() {
    const { bookid } = QueryString.parse(this.props.location.search);
    if (bookid) {
      BooksAPI.get(bookid).then(book => {
        this.setState({ book, isLoading: false });
      }).catch(() => {
        // book is not exist
        this.setState({ isError: true, isLoading: false, book: { title: 'The book is not exist.' } });
      });
      // bookid is undefined
    } else {
      this.setState({ isError: true, isLoading: false, book: { title: 'The book is not exist.' } });
    }
  }

  render() {
    const { book, isLoading, isError } = this.state;
    return (
      <div>
        {
          isLoading ?
            <Loading />
            :
            <div className="book-detail">
              <div className="book-detail-bar" >
                <Link className="close-button" to="/">Close</Link>
                <h2>{book.title}</h2>
                <small>{book.subtitle}</small>
              </div >

              {isError ||
                <div className="book-detail-info">
                  <dl>
                    <dt>Authors</dt>
                    <dd>{book.authors.join(', ')}</dd>
                    <dt>Publisher</dt>
                    <dd>{book.publisher} @ {book.publishedDate}</dd>
                    <dt>Content Version</dt>
                    <dd>{book.contentVersion}</dd>
                    <dt>Pages</dt>
                    <dd>{book.pageCount || '0'}</dd>
                    <dt className="mb20">ISBN</dt>
                    <dd className="mb20">{book.industryIdentifiers && book.industryIdentifiers.map(i => i.identifier).join(', ')}</dd>
                    <dt>Description</dt>
                    <dd>{book.description}</dd>
                  </dl>
                  <div className="book">
                    <Book book={book} onChange={this.props.onChange} showInfo={false} />
                  </div>
                </div>
              }

            </div >
        }
      </div>
    )
  }

}

export default DetailPage;