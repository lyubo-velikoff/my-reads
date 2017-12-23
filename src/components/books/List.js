import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelves from './Shelves'

class List extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    shelves: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
  }

  render() {
    const { books, shelves, onChangeShelf, handleOpenModal } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelves 
            books={books}
            shelves={shelves}
            onChangeShelf={onChangeShelf}
            handleOpenModal={handleOpenModal}
          />
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link> 
        </div>
      </div>
    )
  }
}

export default List