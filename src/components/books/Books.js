import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Books extends Component {
  
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

  render() {
    const { books, shelves, onChangeShelf } = this.props
    return (
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div 
                  className="book-cover" 
                  style={{ 
                    width: 128, 
                    height: 193, 
                    backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : ''})`
                  } }>
                </div>
                <div className="book-shelf-changer">
                  <select value={book.shelf} onChange={onChangeShelf.bind(this, book)}>
                    <option value="none" disabled>Move to...</option>
                    {shelves.map((shelf, index) => (
                      <option value={shelf.id} key={index}>{shelf.name}</option>
                    ))}
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title ? book.title :  'No title'}</div>
              <div className="book-authors">{book.authors ? book.authors.join(', ') :  ''}</div>
            </div>
          </li>
        ))}
      </ol>
    )
  }
}

export default Books