import React, { Component } from 'react';
import Book from './Book'
import PropTypes from 'prop-types';


class Shelf extends Component {
  //trigger an update on shelf if user
  //selects a different book category
  state = {
    books: []
  }

  render() {
    const shelfName = this.props.name
    const booksData = this.props.category
    const listItems = booksData.map((book) =>
      <li key={book.id}>
        <Book data={book} updateBook={this.props.updateBook}/>
      </li>
    );
        return (
            <div className="bookshelf">
            <h2 className="bookshelf-title">{shelfName}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
              {listItems}
              </ol>
            </div>
          </div>
        );
    }
}
Shelf.propTypes = {
  category: PropTypes.array.isRequired
}
export default Shelf;