import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Shelf from '../comps/Shelf'



class Search extends Component {
  state = {
    books: [],
    query: ''
  }
  // @returns search string and initiates checkQuery 
  updateQuery = (query) => {
    this.setState({ query: query.trim()}, this.checkQuery)
  }
  

  checkQuery() {
    const initBooks = this.props.category.books
    // error handling for empty string field 
    if (this.state.query === "" || this.state.query === undefined){
      return this.setState({ books: [] })
    }
  // captures search results and makes sure shelves are accurately displayed  
    BooksAPI.search(this.state.query.trim()).then((res) => {
      if (res.error) {
        this.setState({ books: [] })
      } else {
        this.setState({ books: res })
      } 
      res.map(b => {
        let shelf = ''
        initBooks.map(bk => bk.id === b.id ? (b.shelf = bk.shelf) : shelf
        )
      })
      this.setState({ books: res })
    })
  }
render() {
    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"><div className="close-search">Close</div></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(evt) => this.updateQuery(evt.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <Shelf name="Results" category={this.state.books} updateBook={this.props.updateBook}/>
          </ol>
        </div>
      </div>
    );
  }
}


export default Search;