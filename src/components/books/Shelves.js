import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Books from './Books'

class Shelves extends Component {

  static propTypes = {
    shelves: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

  render() {
    const { shelves, onChangeShelf } = this.props
    return (
      <div>
        {shelves.map(shelf => (
          <div className="bookshelf" key={shelf.id}>
            <h2 className="bookshelf-title">{shelf.name}</h2>
            <div className="bookshelf-books">
              <Books 
                books={shelf.books}
                shelves={shelves}
                onChangeShelf={onChangeShelf}
              />
            </div>
          </div>
        ))}
      </div>
    )
  }

}

export default Shelves

