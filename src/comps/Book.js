import React, { Component } from 'react'


class Book extends Component {
componentDidMount() {
  
}
  render() {
    const bookInfo = this.props.data;
    const bookTitle = bookInfo.title;
      return (
          <div className="book">
            <div className="book-top">
              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${this.props.data.imageLinks && this.props.data.imageLinks.thumbnail || 'No thumbnail'}")` }}></div>
              <div className="book-shelf-changer">
                <select  value={bookInfo.shelf || "none"} onChange={(evt) => {
                  this.props.updateBook(bookInfo, evt.target.value)
                }}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{bookTitle}</div>
            <div className="book-authors">{this.props.data.authors && this.props.data.authors[0] || "No Authors"}</div>
          </div>
      );
  }
}

export default Book;