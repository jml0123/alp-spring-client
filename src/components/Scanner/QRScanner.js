import React, {Component} from 'react';
import QRScannerCore from 'react-qr-reader'

import UserContext from '../../UserContext';

import BookList from '../BookList';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AutorenewIcon from '@material-ui/icons/Autorenew';

import jsonpack from 'jsonpack'

export default class QRScanner extends Component {
  state = {
    scanned: [],   
        toggled: false,
  }

  static contextType = UserContext;

  handleDiscard = (bookId) => {
        const preQueue = this.state.scanned
        this.setState({
            ...this.state,
            scanned: preQueue.filter(book => book.id !== bookId )
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
        console.log(data)
        const unpackedJSON = jsonpack.unpack(data)
        this.setState({
            ...this.state,
            scanned: unpackedJSON
        })
      }
  }

  handleError = (e) => {
    window.alert("Error" + e)
  }

  onAcceptCollection = () => {
      // PATCH COLLECTION
      // TAKES this.state.scanned
      // Calculate points based on # of books in that array
      // Modify original collection (points, books, status)
      // Then call this.props.HandleAddCollection
  }

  render() {
      return (
            <Container maxWidth="lg">
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
                            this.props.onAddCollection(this.state.scanned)
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
