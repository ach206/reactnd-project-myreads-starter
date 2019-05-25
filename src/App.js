import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Landing from './pages/Landing'
import Search from './pages/Search'
import { Route } from 'react-router-dom'

// let fabHover = document.getElementsByClassName(".book-shelf-changer");
// let bookcoverHover = document.getElementsByClassName(".book-cover");

// if (evt.type == 'hover') {
//   bookcoverHover.style.filter = "none";
// }

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
// @description takes book object and shelf string
// and updates state with updated data
updateBookcategory = (book, shelf) => {
  console.log(book);
  BooksAPI.update(book, shelf).then((res) => {
    book.shelf = shelf;
    this.setState((state) => ({
      books: state.books,
      currentlyReading: state.books.filter(book => book.shelf === "currentlyReading"),
      wantToRead: state.books.filter(book => book.shelf === "wantToRead"),
      read: state.books.filter(book => book.shelf === "read")
    }))
  })
  }

//@description triggered when other pages
//  update the landing page state
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


  //changes the css filter effect 
  //when the FAB is being hovered
  updateBookCover = (e) => {
    let bookcoverHover = e.target.parentNode.parentNode.children[0];
    if (e.type === "mouseenter"){
        bookcoverHover.style.filter = "none";
      } 
      setTimeout(() => {
        bookcoverHover.style.filter = "grayscale(100%)";
      }, 3000);
      // let prevEl = e.target.previousElementSibling;
      // console.log(prevEl, e.target.parentNode.parentNode.children[0]);
      // prevEl.style.filter = "none";

      // console.log(e.composedPath);
  }
  
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Landing category={this.state} updateBook={this.updateBookcategory} updateBookCover={this.updateBookCover} />
          )} />
        <Route exact path="/search" render={() => (
          <Search category={this.state} updateBook={this.updateBookAgain}  updateBookCover={this.updateBookCover} />
        )} />
      </div>
    )
  }
}

export default BooksApp
