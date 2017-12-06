import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelfs extends Component {

  static propTypes = {
    shelfs: PropTypes.array.isRequired,
  }

  render() {
    const { shelfs } = this.props
    return (
      <div>
        {shelfs.map(shelf => (
          <div className="bookshelf" key={shelf.id}>
            <h2 className="bookshelf-title">{shelf.name}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {shelf.books.map(book => (
                  <li key={book.id}>
                    <Book 
                      title={book.title}
                      cover={book.imageLinks.smallThumbnail}
                      shelfs={shelfs}
                      authors={book.authors}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    )
  }

}

export default Shelfs

