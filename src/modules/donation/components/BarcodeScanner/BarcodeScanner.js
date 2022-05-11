import React, {Component} from 'react';
import CoreScanner from './__barcodeScanner.core';

import BookItem from '../BookItem'
import DonationContext from '../../context/DonationContext';

import {Container, Box, Button, TextField, Typography} from '@material-ui/core';
import AddToLibraryIcon from '@material-ui/icons/LibraryAdd';

import Alert from '@material-ui/lab/Alert';

import config from "../../../../config";
import './BarcodeScanner.css'
import { NotificationFacadeService } from '../../../notifications/services/notification-facade-service';
import DonationHttpService from '../../services/donation-http-service';

const { 
  createNewNotification
} = NotificationFacadeService();

export default class BarcodeScanner extends Component {
  state = {
    scanned: [],
    error: null,
    manualInput: null
    
  }

  static contextType = DonationContext;

  handleSelectConditionScanner = (c) => {
    const newState = this.state.scanned[0]
    newState['condition'] = c

    this.setState({
      ...this.state,
      scanned: [newState]
    })
  }

  handleAddBook = () => {
    this.context.handleAddBook(this.state.manualInput);
    createNewNotification({
      message: `Manually added book to donation queue!`
    })
  }

  handleScanSuccess = (results) => {
    const isbn =(results[0].barcodeText) 
    createNewNotification({
      message: `Book ${results[0].barcodeText} found!`
    })
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
  getBookInfo = async (isbn) => {
    const serializedBookData = {
      isbn: "",
      title: "",
      authors: [],
      publishedDate: "",
      thumbnail: "",
      condition: "",
    }

    const googleBookData = await DonationHttpService.getBookInfo(isbn);

    if (!googleBookData) {
      this.setState({
        ...this.state,
        error: "There was a problem fetching book data"
      })
    } else {
      if (googleBookData.totalItems !== 0) {
        const bookData = googleBookData.items[0]
            serializedBookData.isbn = isbn
            serializedBookData.title = bookData.volumeInfo.title
            serializedBookData.authors = (!bookData.volumeInfo.authors)? [] : bookData.volumeInfo.authors
            serializedBookData.publishedDate = bookData.volumeInfo.publishedDate
            serializedBookData.thumbnail = (!bookData.volumeInfo.imageLinks?.thumbnail)? '' : bookData.volumeInfo.imageLinks?.thumbnail
            this.setScannedState(serializedBookData)
      } else {
        this.setState({
          ...this.state,
          error: "Book not found. Try again"
        });
      }
    }
}

  render() {
      const message = (this.state.error? 
      <Alert severity="info">{this.state.error}</Alert>          
      : this.state.scanned.length?
      <Alert severity="success">Book found! {this.state.scanned[0].title}</Alert>    
      : null)

      return (
            <Container maxWidth="lg">
                  {!this.state.manualInput ? 
                  <Box
                    minHeight="30vh"
                    maxWidth="500px"
                    mx="auto"
                    p={4.44}
                  >
                    <CoreScanner onScan={this.handleScanSuccess}/>
                    {message}
                  </Box> : <></>
                  }
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {
                      this.state.scanned.length? 
                        <BookItem 
                          book={this.state.scanned[0]} 
                          bookScan={true} 
                          condition={this.state.scanned[0]?.condition}
                          handleSelectConditionScanner={(e) => this.handleSelectConditionScanner(e)}
                        />
                        : 
                        !this.state.manualInput? <Button onClick={e => this.setManualInput()}>Manual Input</Button> : null
                      }
                      {
                      this.state.manualInput? 
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
                        <Box className="alternate-box" display="flex" flexDirection="column">
                          <Typography variant="h2">OR</Typography> 
                          <Button className="alternate-box--btn" onClick={e => this.closeManualInput()}>Use the Scanner?</Button>
                        </Box>
                      </Box>
                      </>
                        : null
                      }  
                  </Box>  
            </Container>
        );
    }
}

