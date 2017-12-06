import React from 'react'
import * as BooksAPI from '../books/Api'
import { Route } from 'react-router-dom'
import ListBooks from '../books/List'
import SearchBooks from '../books/Search'
import '../../assets/css/App.css'

class App extends React.Component {
  
  state = {
    books: [],
    shelfs: [
      {
        "id": "currentlyReading",
        "name": "Currently Reading",
        "books": []
      },
      {
        "id": "wantToRead",
        "name": "Want to Read",
        "books": []
      },
      {
        "id": "read",
        "name": "Read",
        "books": []
      },
    ]
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ 
        books: books,
        shelfs: [
          {
            "id": "currentlyReading",
            "name": "Currently Reading",
            "books": books.filter((book) => book.shelf === "currentlyReading")
          },
          {
            "id": "wantToRead",
            "name": "Want to Read",
            "books": books.filter((book) => book.shelf === "wantToRead")
          },
          {
            "id": "read",
            "name": "Read",
            "books": books.filter((book) => book.shelf === "read")
          },
        ]
      })
      console.log(books)
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks 
            books={this.state.books}
            shelfs={this.state.shelfs}
          />
        )} />

        <Route path='/search' render={() => (
          <SearchBooks />
        )} />
      </div>
    )
  }
}

export default App
