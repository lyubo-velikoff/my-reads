import React, { Component } from 'react'
import * as BooksAPI from '../../utils/BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import Books from './Books'

const WAIT_INTERVAL = 500
const ENTER_KEY = 13
const searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

class Search extends Component {

  static propTypes = {
    shelves: PropTypes.array.isRequired,
    rootBooks: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,    
  }

  state = {
    query: '',
    books: []
  }

  componentWillMount() {
    this.timer = null
  }

  handleTerm = () => {
    const match = new RegExp(escapeRegExp(this.state.query), 'i')
    return searchTerms.filter((term) => match.test(term)).length > 0 ? true : false
  }

  updateQuery = (query) => { 
    clearTimeout(this.timer)
    this.setState({ query: query, books: [] })
    this.timer = setTimeout(this.searchBooks, WAIT_INTERVAL)
  }

  searchBooks = () => {
    if (this.state.query !== '' && this.handleTerm()) {
      BooksAPI.search(this.state.query).then((books) => {
        books.forEach(book => {
          let existingBook = this.props.rootBooks.filter((rootBook) => rootBook.id === book.id)
          if (existingBook.length > 0) {
            book.shelf = existingBook[0].shelf
          }
        })
        this.setState({
          query: this.state.query,
          books: books
        })
      })
    }
  }

  clearQuery = () => {
    this.setState({ query: '', books: [] })
  }

  handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      this.searchBooks()
    }
  }

  render() {
    const { shelves, onChangeShelf } = this.props
    const { query, books } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to='/'
            className='close-search'
          >Close
          </Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
              onKeyDown={this.handleKeyDown.bind(this)}
            />
          </div>
        </div>

        {books && books.length > 0 && (
          <div className="search-books-results">
            <Books 
              books={books}
              shelves={shelves}
              onChangeShelf={onChangeShelf}
            />
            <button onClick={this.clearQuery}>Reset</button>
          </div>
        )}
      </div>
    )
  }
}

export default Search