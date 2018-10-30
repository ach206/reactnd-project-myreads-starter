import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Shelf from '../comps/Shelf'
import BooksApp from '../App';




class Search extends Component {
  state = {
    books: [],
    results: [],
    query: ''
  }

  updateBookcategory = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      book.shelf = shelf;
      this.setState((state) => ({ 
        books: state.books
      }))
  BooksApp.updateBookcategory();
})

}

updateQuery = (query) => {
  this.setState({ query: query.trim()}, this.checkQuery)
}

checkQuery() {
  if (this.state.query === "" || this.state.query === undefined){
    return this.setState({ results: [], books: [] })
  }
  BooksAPI.search(this.state.query.trim()).then((query) => (this.setState({ books: query })))
  // if (this.state.query === "" ) {
  //   return this.setState({ query: '', books: [] })
  // } 

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
            {/* <Shelf name="Results1" category={this.state.books}/> */}
            <Shelf name="Results" category={this.state.books} updateBook={this.updateBookcategory}/>
          </ol>
        </div>
      </div>
    );
  }
}


export default Search;