import React, { Component } from 'react'
import * as BooksAPI from '../../utils/BooksAPI'
import { Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import ListBooks from '../books/List'
import SearchBooks from '../books/Search'
import '../../assets/css/App.css'

class App extends Component {
  state = {
    books: []
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  handleShelfChange = (book, shelf) => {
    book.shelf = shelf.target.value
    BooksAPI.update(book, shelf.target.value).then(() => {
      this.setState((state) => ({
        books: state.books.filter((b) => b.id !== book.id).concat([ book ])
      }))
      toast("Successfully updated shelf", {
        position: toast.POSITION.TOP_RIGHT
      })
    })
  }

  render() {

    const shelves = [
      {'id': 'currentlyReading', 'name': 'Currently Reading'},      
      {'id': 'wantToRead', 'name': 'Want to Read'},
      {'id': 'read', 'name': 'Read'},
    ]

    return (
      <div className='app'>
        <ToastContainer />

        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            shelves={shelves}
            onChangeShelf={this.handleShelfChange}
          />
        )} />

        <Route path='/search' render={() => (
          <SearchBooks 
            shelves={shelves}
            onChangeShelf={this.handleShelfChange}
          />
        )} />
      </div>
    )
  }
}

export default App
