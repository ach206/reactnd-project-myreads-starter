import React, { Component } from 'react'


class Book extends Component {
  state = {

  }

  render() {

    const bookInfo = this.props.data;
    const bookID = bookInfo.id;
    const bookImg = bookInfo.imageLinks.thumbnail;
    const bookTitle = bookInfo.title;
    const bookAuthor = bookInfo.authors[0];
      return (
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${bookImg}")` }}></div>
              <div className="book-shelf-changer">
                <select  value={bookInfo.shelf || "none"} onChange={(evt) => {
                  this.props.updateBook(bookInfo, evt.target.value)
                }}>
                  {/* update on click evt to update(book, shelf)
                  trigger state change so book triggers Landing > Shelf */}
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{bookTitle}</div>
            <div className="book-authors">{bookAuthor}</div>
          </div>
      );
  }
}

export default Book;