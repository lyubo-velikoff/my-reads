import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Shelfs from './Shelfs'

class List extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfs: PropTypes.array.isRequired,
  }

  render() {
    const { shelfs } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <Shelfs shelfs={shelfs} />
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