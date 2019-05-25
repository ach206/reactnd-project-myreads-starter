import React, { Component } from 'react';
import Shelf from '../comps/Shelf'
import OpenSearchBtn from '../comps/OpenSearchBtn'

class Landing extends Component {
    render() {
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <Shelf name="Currently Reading" category={this.props.category.currentlyReading} updateBook={this.props.updateBook} updateBookCover={this.props.updateBookCover}/>
                <Shelf name="Want To Read" category={this.props.category.wantToRead} updateBook={this.props.updateBook} updateBookCover={this.props.updateBookCover}/>
                <Shelf name="Read" category={this.props.category.read} updateBook={this.props.updateBook} updateBookCover={this.props.updateBookCover}/>
            </div>
            < OpenSearchBtn />
          </div>
        );
    }
}

export default Landing;