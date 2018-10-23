import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Shelf from '../comps/Shelf'



class Search extends Component {
  state = {
    query: '',
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }


sortBooks = (
  BooksAPI.getAll().then((book) => {
  const currentlyReading = book.filter(book => book.shelf === "currentlyReading")
  const wantToRead = book.filter(book => book.shelf === "wantToRead")
  const read = book.filter(book => book.shelf === "read")
  this.setState({ books: book, currentlyReading: currentlyReading, wantToRead: wantToRead, read: read})
})  
)

updateBookcategory = (book, shelf) => {
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

updateQuery = (query) => {
  const results = BooksAPI.search(query.trim()).then((query) => (this.setState({ books: query })))
  this.setState({ query: query.trim()})
}
render() {
    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"><div className="close-search">Close</div></Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(evt) => this.updateQuery(evt.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* <Shelf name="Results" /> */}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;