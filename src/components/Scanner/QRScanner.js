import React, {Component} from 'react';
import QRScannerCore from 'react-qr-reader'
import config from '../../config'


import UserContext from '../../UserContext';

import BookList from '../BookList';

import {Typography, Container, IconButton, Button, Box} from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Alert from '@material-ui/lab/Alert';

export default class QRScanner extends Component {
  state = {
    scanned: [],   
    toggled: false,
    _cID: null
  }

  static contextType = UserContext;

  handleDiscard = (bookId) => {
        const preQueue = [...this.state.scanned]
        preQueue.splice(bookId, 1)
        this.setState({
            ...this.state,
            scanned: preQueue
        })
  }

  handleClearQueue = (bookId) => {
    this.setState({
        ...this.state,
        scanned: []
    })
  }

  handleScan = (data) => {
      if(data) {
        this.getCollection(data)
      }
  }

  getCollection = (c_id) => {
    fetch(`${config.API_ENDPOINT}/collections/${c_id}`).then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json()
        .then(res => this.setCollection(res))
      })
      .catch((error) => this.setState({ error: "Invalid QR Code"}));
  }

  setCollection = (collection) => {
      console.log(collection)
      const books = collection[0].books
      const id = collection[0]._id
      this.setState({
          ...this.state,
          scanned: books,
          _cID: id
      })
      console.log(this.state)
  }
  handleError = (e) => {
    window.alert("Error" + e)
  }

  handleAcceptCollection = () => {
      this.props.onAddCollection(this.state.scanned)
      this.props.onPatchCollection(this.state._cID, this.state.scanned)
      // PATCH COLLECTION
      // TAKES this.state.scanned
      // Calculate points based on # of books in that array
      // Modify original collection (points, books, status)
      // Then call this.props.HandleAddCollection
  }

  render() {
 
      return (
            <Container maxWidth="lg">
               {(this.state.error)  ? <Alert severity="info">{this.state.error}</Alert> : null}
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                </Box>
                  {!this.state.scanned.length? 
                  <>
                    <Typography align="center">Focus QR code at the center of the frame</Typography>
                    <Box
                        minHeight="30vh"
                        maxHeight="500px"
                        maxWidth="500px"
                        mx="auto"
                        p={4.44}
                        style={{
                            backgroundColor: "lightgrey",
                        }}
                    >
                        <QRScannerCore
                            delay={300}
                            onError={this.handleError}
                            onScan={this.handleScan}
                        />
                    </Box>
                  </>
                  : null}
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                  </Box>
                  <BookList 
                    condensed={true} 
                    books={this.state.scanned} 
                    collection={true} 
                    simpleItems={true} 
                    preQueueHandler={this.handleDiscard}/>  
                  {this.props.collection ? 
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                        flexDirection="column"
                        minHeight="75px"
                    >
                        {this.state.scanned.length? 
                        <>
                        <Button
                                color="secondary"
                                endIcon={<AutorenewIcon/>}
                                onClick={()=>this.handleClearQueue()} 
                            >
                                Try another scan
                        </Button>
                     
                        <Button 
                            variant="contained" 
                            size="small" 
                            color="primary" onClick={() => {
                            this.handleAcceptCollection()
                            }}
                        >
                            Add all to queue
                        </Button>
                        </>
                        : null}
                    </Box>
                  : null}
            </Container>
        );
    }
}

// Create a separate slide out widget when scan is successful
