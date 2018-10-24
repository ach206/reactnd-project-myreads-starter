import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Shelf from '../comps/Shelf'
import BooksApp from '../App';




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
  this.setState({ books: book})
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
  BooksAPI.search(query.trim()).then((query) => (this.setState({ books: query })))
  this.setState({ query: query.trim()})
  if (this.state.query === undefined){
    return this.setState({ query: '', books: [] })
  }
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
            <Shelf name="Results" category={this.state.books} updateBook={this.updateBookcategory}/>
          </ol>
        </div>
      </div>
    );
  }
}


export default Search;