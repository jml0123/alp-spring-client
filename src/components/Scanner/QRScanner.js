import React, {Component} from 'react';

import UserContext from '../../UserContext';

import BookList from '../BookList';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import AutorenewIcon from '@material-ui/icons/Autorenew';



export default class QRScanner extends Component {
  state = {
    scanned: [
        {   
            id: 1,
            title: "Design Of Everyday Things",
            isbn: "111-111-111-1111",
            originalDate: "July 25, 1978",
            thumbnail: "https://images-na.ssl-images-amazon.com/images/I/410RTQezHYL._SX326_BO1,204,203,200_.jpg",
            condition: "Select",
        },
        {
            id: 2,
            title: "Test Book",
            isbn: "111-111-111-1111",
            originalDate: "Jan 25, 2020",
            thumbnail: "https://image.shutterstock.com/image-vector/book-icon-sign-design-260nw-553945819.jpg",
            condition: "Select",
        },
        {
            id: 3,
            title: "Test Book",
            isbn: "111-111-111-1111",
            originalDate: "Jan 25, 2020",
            thumbnail: "https://image.shutterstock.com/image-vector/book-icon-sign-design-260nw-553945819.jpg",
            condition: "Select",
        },
        {
            id: 4,
            title: "Test Book",
            isbn: "111-111-111-1111",
            originalDate: "Jan 25, 2020",
            thumbnail: "https://image.shutterstock.com/image-vector/book-icon-sign-design-260nw-553945819.jpg",
            condition: "Select",
        },
        {
            id: 5,
            title: "Test Book",
            isbn: "111-111-111-1111",
            originalDate: "Jan 25, 2020",
            thumbnail: "https://image.shutterstock.com/image-vector/book-icon-sign-design-260nw-553945819.jpg",
            condition: "Select",
        },
        {
            id: 6,
            title: "Test Book",
            isbn: "111-111-111-1111",
            originalDate: "Jan 25, 2020",
            thumbnail: "https://image.shutterstock.com/image-vector/book-icon-sign-design-260nw-553945819.jpg",
            condition: "Select",
        },
        {
            id: 7,
            title: "Test Book",
            isbn: "111-111-111-1111",
            originalDate: "Jan 25, 2020",
            thumbnail: "https://image.shutterstock.com/image-vector/book-icon-sign-design-260nw-553945819.jpg",
            condition: "Select",
        },
        {
            id: 8,
            title: "Test Book",
            isbn: "111-111-111-1111",
            originalDate: "Jan 25, 2020",
            thumbnail: "https://image.shutterstock.com/image-vector/book-icon-sign-design-260nw-553945819.jpg",
            condition: "Select",
        },
        {
            id: 8,
            title: "Test Book",
            isbn: "111-111-111-1111",
            originalDate: "Jan 25, 2020",
            thumbnail: "https://image.shutterstock.com/image-vector/book-icon-sign-design-260nw-553945819.jpg",
            condition: "Select",
        },
        {
            id: 10,
            title: "Test Book",
            isbn: "111-111-111-1111",
            originalDate: "Jan 25, 2020",
            thumbnail: "https://image.shutterstock.com/image-vector/book-icon-sign-design-260nw-553945819.jpg",
            condition: "Select",
        },
    ],    
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


  render() {
      console.log(this.state.scanned)
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
                        style={{
                            backgroundColor: "lightgrey",
                        }}
                    >
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
                     
                        <Button variant="contained" size="small" color="primary" onClick={() => {
                            this.props.onAddCollection(this.state.scanned)
                        }}>
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
