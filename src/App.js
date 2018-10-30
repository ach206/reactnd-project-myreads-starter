import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Landing from './pages/Landing'
import Search from './pages/Search'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
state = {
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: []
    }

    componentDidMount() {
      BooksAPI.getAll().then((book) => {
        const currentlyReading = book.filter(book => book.shelf === "currentlyReading")
        const wantToRead = book.filter(book => book.shelf === "wantToRead")
        const read = book.filter(book => book.shelf === "read")
        this.setState({ books: book, currentlyReading: currentlyReading, wantToRead: wantToRead, read: read })
      })  
    }
  // gets all the books from the api and sorts them into 3 categories
  // and updates the state with this data
// sortBooks = (
//     BooksAPI.getAll().then((book) => {
//     const currentlyReading = book.filter(book => book.shelf === "currentlyReading")
//     const wantToRead = book.filter(book => book.shelf === "wantToRead")
//     const read = book.filter(book => book.shelf === "read")
//     this.setState({ books: book, currentlyReading: currentlyReading, wantToRead: wantToRead, read: read})
//   })  
// )
// updates the book's category and trigger a state change
updateBookcategory = (book, shelf) => {
  // console.log(book);
  BooksAPI.update(book, shelf).then((res) => {
    // console.log(res);
    book.shelf = shelf;
    this.setState((state) => ({
      books: state.books,
      currentlyReading: state.books.filter(book => book.shelf === "currentlyReading"),
      wantToRead: state.books.filter(book => book.shelf === "wantToRead"),
      read: state.books.filter(book => book.shelf === "read")
    }))
  })
  }

updateBookAgain = (book, shelf) => {
  console.log(book);
  
    this.setState((state) => ({
      books: state.books.map(obj => book)
    }))
  }

  
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Landing category={this.state} updateBook={this.updateBookcategory}/>
          )} />
        <Route exact path="/search" render={() => (
          <Search updateBook={this.updateBookAgain}/>
        )} />
        {/* <Route path="/search" component={Search} /> */}
      </div>
    )
  }
}

export default BooksApp
