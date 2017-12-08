import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelves from './Shelves'

class List extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
  }

  render() {
    const { shelves, onChangeShelf } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelves 
            shelves={shelves}
            onChangeShelf={onChangeShelf} 
          />
        </div>
        <div className="open-search">
          <Link
            to='/search'
          >Add a book
          </Link> 
        </div>
      </div>
    )
  }
}

export default List