import React, { Component } from 'react';
import Shelf from '../comps/Shelf'
import OpenSearchBtn from '../comps/OpenSearchBtn'

class Landing extends Component {
    render() {
        console.log('Props', this.props)
        return (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <Shelf name="Currently Reading" category={this.props.category.currentlyReading} updateBook={this.props.updateBook}/>
                <Shelf name="Want To Read" category={this.props.category.wantToRead} updateBook={this.props.updateBook}/>
                <Shelf name="Read" category={this.props.category.read} updateBook={this.props.updateBook}/>
            </div>
            < OpenSearchBtn />
          </div>
        );
    }
}

export default Landing;