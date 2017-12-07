import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Books from './Books'

class Shelfs extends Component {

  static propTypes = {
    shelfs: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

  render() {
    const { shelfs, onChangeShelf } = this.props
    return (
      <div>
        {shelfs.map(shelf => (
          <div className="bookshelf" key={shelf.id}>
            <h2 className="bookshelf-title">{shelf.name}</h2>
            <div className="bookshelf-books">
              <Books 
                books={shelf.books}
                shelfs={shelfs}
                onChangeShelf={onChangeShelf}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

}

export default Shelfs

