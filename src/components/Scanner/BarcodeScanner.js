import React, {Component} from 'react';
import BookItem from '../BookItem'
import './BarcodeScanner.css' 
import UserContext from '../../UserContext';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';


export default class BarcodeScanner extends Component {
  state = {
    scanned: {
        title: "New book Scan",
        isbn: "111-111-111-1111",
        originalDate: "July 25, 1978",
        thumbnail: "https://images-na.ssl-images-amazon.com/images/I/410RTQezHYL._SX326_BO1,204,203,200_.jpg",
        condition: "Select"
    },
  }

  static contextType = UserContext;

  handleSelectConditionScanner = (c) => {
    this.setState({
      ...this.state,
      scanned: {
        ...this.state.scanned,
        condition: c
      }
    })
  }
  handleManualInput = (isbn) => {

    //.then this.context.handleAddBook(book)
  }

  render() {
      return (
            <Container maxWidth="lg">
                  <Box
                    minHeight="30vh"
                    border='1px solid grey'
                  >
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                  <BookItem book={this.state.scanned} bookScan={true} handleSelectConditionScanner={(e) => this.handleSelectConditionScanner(e)}/>  
                  </Box>  
            </Container>
        );
    }
}

