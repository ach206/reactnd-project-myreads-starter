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

updateBookcategory = (book, shelf) => {
  console.log(book);
  BooksAPI.update(book, shelf).then((res) => {
    console.log(res);
    console.log(book);
    console.log(shelf);
    book.shelf = shelf;
    this.setState((state) => ({
      books: state.books,
      currentlyReading: state.books.filter(book => book.shelf === "currentlyReading"),
      wantToRead: state.books.filter(book => book.shelf === "wantToRead"),
      read: state.books.filter(book => book.shelf === "read")
    }))
  })
  }

//triggered when other pages update the landing page
// state
  updateBookAgain = (book, shelf) => {
  console.log(book);
  book.shelf = shelf;

    this.setState((state) => ({
      books: state.books.filter(b => b.id !== book.id).concat([book])
    }))
    this.setState((state) => ({
      currentlyReading: state.books.filter(book => book.shelf === "currentlyReading"),
      wantToRead: state.books.filter(book => book.shelf === "wantToRead"),
      read: state.books.filter(book => book.shelf === "read")
    }))
  }

  
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Landing category={this.state} updateBook={this.updateBookcategory}/>
          )} />
        <Route exact path="/search" render={() => (
          <Search category={this.state} updateBook={this.updateBookAgain}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
