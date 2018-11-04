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

// @description error handling for empty string field 
checkQuery() {
  if (this.state.query === "" || this.state.query === undefined){
    return this.setState({ books: [] })
  }
  BooksAPI.search(this.state.query.trim()).then((res) => (this.setState({ books: res }),
  // console.log(res)
  res.forEach(book => {
   let sort = this.props.category.books.filter(b => b.id === book.id)
    if (sort[0]){
      book.shelf = sort[0].shelf;
    }
  })
  ))

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