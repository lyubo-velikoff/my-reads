import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  
  static propTypes = {
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    shelfs: PropTypes.array.isRequired,
    authors: PropTypes.array.isRequired
  }

  render() {
    const { title, cover, shelfs, authors } = this.props
    return (
       <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + cover + '")' }}></div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>Move to...</option>
              {shelfs.map((shelf, index) => (
                <option value={shelf.key} key={index}>{shelf.name}</option>
              ))}
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{authors.join(', ')}</div>
      </div>
    )
  }
}

export default Book