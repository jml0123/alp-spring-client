import React, {Component} from 'react';
import CoreScanner from './__barcodeScanner.core';

import BookItem from '../BookItem'
import UserContext from '../../UserContext';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import config from "../../config";

export default class BarcodeScanner extends Component {
  state = {
    scanned: [],
  }

  static contextType = UserContext;

  handleSelectConditionScanner = (c) => {
    const newState = this.state.scanned[0]
    newState['condition'] = c

    console.log(newState)
    this.setState({
      ...this.state,
      scanned: [newState]
    })
  }
  handleManualInput = (isbn) => {

    //.then this.context.handleAddBook(book)
  }
  handleScanSuccess = (results) => {
    const isbn =(results[0].barcodeText) 
    window.alert(results[0].barcodeText)
    this.getBookInfo(isbn)
  }

  setScannedState = (book) => {
    this.setState({
      ...this.state,
      scanned: [book]
    })
  }

  getBookInfo = (isbn) => {
    const serializedBookData = {
      isbn: "",
      title: "",
      authors:"",
      publishedDate: "",
      thumbnail: "",
      condition: "",
    }

    const GBooksAPI = "https://www.googleapis.com/books/v1"
    fetch(`${GBooksAPI}/volumes?q=isbn:${isbn}&key=${config.GBOOKS_KEY}`).then(res => res.json())
    .then((data) =>{
        if (data.totalItems !== 0) {
            const bookData = data.items[0]
            console.log(bookData)
            serializedBookData.isbn = isbn
            serializedBookData.title = bookData.volumeInfo.title
            serializedBookData.authors = bookData.volumeInfo.authors
            serializedBookData.publishedDate = bookData.volumeInfo.publishedDate
            serializedBookData.thumbnail = bookData.volumeInfo.imageLinks.thumbnail
            this.setScannedState(serializedBookData)
        }
        else {
            window.alert("Book not found")
        }
    })
}

  render() {
      return (
            <Container maxWidth="lg">
                  <Box
                    minHeight="30vh"
                    maxWidth="500px"
                    mx="auto"
                    p={5}
                  >
                    <CoreScanner onScan={this.handleScanSuccess}/>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {this.state.scanned.length? 
                      <BookItem 
                        book={this.state.scanned[0]} 
                        bookScan={true} 
                        handleSelectConditionScanner={(e) => this.handleSelectConditionScanner(e)}
                      />
                      : null }  
                  </Box>  
            </Container>
        );
    }
}

// Create a separate slide out widget when scan is successful
