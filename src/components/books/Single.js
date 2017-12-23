import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Single extends Component {
  
  static propTypes = {
    book: PropTypes.object.isRequired,
  }
  
  render() {
    const { book} = this.props
    return (
      <div className="single-book">
        <div className="book-top">
          <div 
            className="book-single-cover"
            style={{ 
              width: 128, 
              height: 193, 
              backgroundImage: `url(${book.imageLinks && book.imageLinks.smallThumbnail ? book.imageLinks.smallThumbnail : ''})`
            } }>
          </div>
        </div>
        <div className="book-right">
          <h1>{book.title ? book.title :  'No title'}</h1>
          <h3>{book.subtitle ? book.subtitle :  'No subtitle'} (published by {book.publisher ? book.publisher : 'Unknown'})</h3>
          <p className="book-authors">{book.authors ? book.authors.join(', ') :  ''}</p>
          <p>{book.description ? book.description :  'No description'}</p>
          <p>{book.categories ? book.categories.join(', ') :  ''}</p>
        </div>
      </div>
    )
  }
}

export default Single