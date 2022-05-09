import React, {Component} from 'react';
import CoreScanner from './__barcodeScanner.core';

import BookItem from '../BookItem'
import UserContext from '../../../core/context/UserContext';

import {Container, Box, Button, TextField, Typography} from '@material-ui/core';
import AddToLibraryIcon from '@material-ui/icons/LibraryAdd';

import Alert from '@material-ui/lab/Alert';

import config from "../../../../config";

export default class BarcodeScanner extends Component {
  state = {
    scanned: [],
    error: null,
    manualInput: null
    
  }

  static contextType = UserContext;

  handleSelectConditionScanner = (c) => {
    const newState = this.state.scanned[0]
    newState['condition'] = c

    this.setState({
      ...this.state,
      scanned: [newState]
    })
  }

  handleAddBook = () => {
    this.context.handleAddBook(this.state.manualInput)
    window.alert("Manually added book")
  }

  handleScanSuccess = (results) => {
    const isbn =(results[0].barcodeText) 
    window.alert(results[0].barcodeText)
    this.getBookInfo(isbn)
  }

  setScannedState = (book) => {
    this.setState({
      ...this.state,
      scanned: [book],
      error: null,
    })
  }

  setManualInput = () => {
    this.setState({
      ...this.state,
      manualInput: {
        title: null,
        authors: null,
        isbn: null
      }
    })
  }

  closeManualInput = () => {
    this.setState({
      ...this.state,
      manualInput: false
    })
  }

  handleSetData = async (e) => {
    const value = (e.target.name === "authors")? 
    e.target.value.split(",") : e.target.value;
    await this.setState({
        ...this.state,
         manualInput: {
            ...this.state.manualInput,
            [e.target.name]: value
        }  
    })
}
  getBookInfo = (isbn) => {
    const serializedBookData = {
      isbn: "",
      title: "",
      authors: [],
      publishedDate: "",
      thumbnail: "",
      condition: "",
    }

    const GBooksAPI = "https://www.googleapis.com/books/v1"
    fetch(`${GBooksAPI}/volumes?q=isbn:${isbn}&key=${config.gAPI_KEY}`).then(res => res.json())
    .then((data) =>{
        if (data.totalItems !== 0) {
            const bookData = data.items[0]
            serializedBookData.isbn = isbn
            serializedBookData.title = bookData.volumeInfo.title
            serializedBookData.authors = (!bookData.volumeInfo.authors)? [] : bookData.volumeInfo.authors
            serializedBookData.publishedDate = bookData.volumeInfo.publishedDate
            serializedBookData.thumbnail = (!bookData.volumeInfo.imageLinks.thumbnail)? '' : bookData.volumeInfo.imageLinks.thumbnail
            this.setScannedState(serializedBookData)
         
        }
        else {
            this.setState({
              ...this.state,
              error: "Book not found. Try again"
            })
        }
    })
}

  render() {
      const message = (this.state.error? 
      <Alert severity="info">{this.state.error}</Alert>          
      : this.state.scanned.length?
      <Alert severity="success">Book found! {this.state.scanned[0].title}</Alert>    
      : null)
      return (
            <Container maxWidth="lg">
                  <Box
                    minHeight="30vh"
                    maxWidth="500px"
                    mx="auto"
                    p={4.44}
                  >
                    <CoreScanner onScan={this.handleScanSuccess}/>
                    {message}
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
                      : 
                        this.state.error && !this.state.manualInput? <Button onClick={e => this.setManualInput()}>Type Manually?</Button> : null
                      }
                      {this.state.manualInput? 
                      <>
                      <Box display="flex" flexDirection="column">
                        <TextField label="Title" id="title" name="title" onChange={e => this.handleSetData(e)} />
                        <TextField label="Author/s" id="authors" name="authors" onChange={e => this.handleSetData(e)}/>
                        <Typography variant="h2">Author (Separate multiple authors by using ',')</Typography> 
                        <TextField label="ISBN" id="isbn" name="isbn" onChange={e => this.handleSetData(e)}/>
                        <Button 
                            variant = "contained" 
                            color="secondary"
                            size = "small"
                            startIcon={<AddToLibraryIcon/>} 
                            onClick = {() => {
                                this.handleAddBook(this.state.manualInput)
                            }}>
                              Add to Box
                      </Button>
                    </Box>
                      <Button onClick={e => this.closeManualInput()}>Use the Scanner?</Button>
                      </>
                        : null
                      }  
                  </Box>  
            </Container>
        );
    }
}

// Create a separate slide out widget when scan is successful
