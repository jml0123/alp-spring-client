import React, {Component} from 'react';
import BookItem from '../BookItem'
import './BarcodeScanner.css' 

export default class BarcodeScanner extends Component {
  state = {
    scanned: {
        title: "New book Scan",
        isbn: "111-111-111-1111",
        originalDate: "July 25, 1978",
        thumbnail: "https://images-na.ssl-images-amazon.com/images/I/410RTQezHYL._SX326_BO1,204,203,200_.jpg"
    },
  }

  render() {
      return (
            <>
                *ADD SCANNER/CAMERA HERE*
                <BookItem book={this.state.scanned} bookScan={true}/>
            </>
        );
    }
}

