import React, { Component } from 'react'
import * as BooksAPI from '../../utils/BooksAPI'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Books from './Books'

const searchTerms = ['Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS']

class Search extends Component {

  static propTypes = {
    shelves: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,    
  }

  state = {
    query: '',
    books: []
  }

  handleTerm = (term) => {
    return searchTerms.filter((t) => t.includes(term)).length > 0 ? true : false
  }

  updateQuery = (query) => {
    this.setState({ query: query, books: [] })
    if (query !== '' && this.handleTerm(query) ) {
      BooksAPI.search(query).then((books) => {
        console.log(books)
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
            {/*
            NOTES: The search from BooksAPI is limited to a particular set of search terms.
            You can find these search terms here:
            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
            you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input 
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
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