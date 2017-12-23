import React, { Component } from 'react'
import * as BooksAPI from '../../utils/BooksAPI'
import { Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import ReactModal from 'react-modal'
import ListBooks from '../books/List'
import SearchBooks from '../books/Search'
import SingleBook from '../books/Single'
import '../../assets/css/App.css'

ReactModal.setAppElement('#root')

class App extends Component {
  
  constructor () {
    super()
    this.state = {
      books: [],
      showModal: false,
      modalBook: {}
    }
    
    this.handleOpenModal = this.handleOpenModal.bind(this)
    this.handleCloseModal = this.handleCloseModal.bind(this)
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ 
        books: books,
        showModal: this.state.showModal,
        modalBook: {}
      })
    })
  }

  handleShelfChange = (book, shelf) => {
    book.shelf = shelf.target.value
    BooksAPI.update(book, shelf.target.value).then(() => {
      this.setState((state) => ({
        books: state.books.filter((b) => b.id !== book.id).concat([ book ]),
        showModal: this.state.showModal,
        modalBook: {}        
      }))
      toast('Successfully updated shelf', {
        position: toast.POSITION.TOP_RIGHT,
      })
    })
  }

  handleOpenModal (book) {    
    this.setState({ 
      books: this.state.books,
      showModal: true,
      modalBook: book
    })
    console.log(book)
  }
  
  handleCloseModal () {
    this.setState({ 
      books: this.state.books,
      showModal: false,
      modalBook: {}
    })
  }

  render() {

    const shelves = [
      {'id': 'currentlyReading', 'name': 'Currently Reading'},      
      {'id': 'wantToRead', 'name': 'Want to Read'},
      {'id': 'read', 'name': 'Read'},
    ]
    
    console.log(this.state.modalBook)
    return (
      <div className='app'>
        <ToastContainer autoClose={3000} />

        <div>
          <ReactModal 
            isOpen={this.state.showModal}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
              }
            }}
          > 
            {Object.keys(this.state.modalBook).length !== 0 && this.state.modalBook.constructor === Object && (
              <SingleBook book={this.state.modalBook} />
            )}
            <button onClick={this.handleCloseModal}>Close</button>
          </ReactModal>
        </div>

        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            shelves={shelves}
            onChangeShelf={this.handleShelfChange}
            handleOpenModal={this.handleOpenModal}
          />
        )} />

        <Route path='/search' render={() => (
          <SearchBooks 
            shelves={shelves}
            rootBooks={this.state.books}
            onChangeShelf={this.handleShelfChange}
            handleOpenModal={this.handleOpenModal}
          />
        )} />
      </div>
    )
  }
}

export default App
