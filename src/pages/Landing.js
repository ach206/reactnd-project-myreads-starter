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
                <Shelf name="Currently Reading"/>
                <Shelf name="Want To Read"/>
                <Shelf name="Read"/>
            </div>
            < OpenSearchBtn />
          </div>
        );
    }
}

export default Landing;