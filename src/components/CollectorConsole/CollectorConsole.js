import React, {Component} from 'react';
import uuid from 'react-uuid'

import BookList from '../BookList'
import BookItem from '../BookItem';
import PartnerList from '../PartnerList';
import BarcodeScanner from '../Scanner/BarcodeScanner';
import QRScanner from '../Scanner/QRScanner';

import Ticket from '../Ticket/Ticket';
import UserContext from '../../UserContext';
import Container from '@material-ui/core/Container';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import './CollectorConsole.css'
import { Typography } from '@material-ui/core';
import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined';

export default class CollectorConsole extends Component {
    state = {
            userName: "Usman",
            books: [],
            partners: [],
            selectedPartner: null,
            currentPhase: 1
        }
        // Refactor to use bookId
        handleSelectCondition = (bookKey, cond) => {
            const newBookState = this.state.books
            newBookState[bookKey]['condition'] = cond
            this.setState({
                ...this.state,
                books: newBookState,
            })
        }

        handleAddBook = (newBook) => {
            newBook.id = uuid()
            console.log(newBook.id)
            this.setState({
                ...this.state,
                books: [
                    ...this.state.books,
                    newBook
                ]
            })
         
        }
        handleAddCollection = (collectionArray) => {
            window.alert(`added ${collectionArray.length} books to queue`)
            const currQueue = Array.from(this.state.books)
            const newQueue = currQueue.concat(collectionArray)
            this.setState({
                ...this.state,
                books: newQueue,
                currentPhase: 1
            })
            console.log(this.state.books)
        }

        handleRemoveBook = (bookId) => {
            const booksQueue = this.state.books
            this.setState({
                ...this.state,
                books: this.state.books.filter(book => book.id !== bookId )
            })
        }

        handleSelectPartner = (partnerId) => {
            const selectedP = this.state.partners.filter(partner => partner.id === partnerId)[0]
            this.setState({
                ...this.state,
                selectedPartner: selectedP
            })
        }

        setPhase = (phase) => {
            this.setState({
                ...this.state,
                currentPhase: (phase)
            })
            console.log(this.state.currentPhase)

        }
 
 
    render() {
        const unloggedConditions = this.state.books.filter(book => book.condition === "Select").length
        const userContextVal = {
            books: this.state.books,
            handleSelectCondition: this.handleSelectCondition, 
            handleSelectPartner: this.handleSelectPartner,
            handleRemoveBook: this.handleRemoveBook,
            handleAddBook: this.handleAddBook,
            setPhase: this.setPhase,
        }
        
        const beginView = 
        <Container maxWidth="small">
        <Box
            display="flex"
            alignItemx="center"
            justifyContent="center"
            flexDirection="column"
            m={3}
            maxWidth="800px"
            mx="auto"
            textAlign="center"
        >    
            <Typography>Welcome {this.state.userName}!</Typography>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={3.33}>
                <Typography>Start scanning to add to your book drive</Typography>
            </Box>
            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-evenly"
                w={1}
                m={3}
            >
            <Box m={2}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => this.setPhase(0)}
                >
                    QR Scanner
                </Button>
            </Box>
            <Box m={2}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => this.setPhase(-1)}
                >
                    Barcode Scanner
                </Button>
            </Box>
            </Box>
        </Box>
        </Container>

        const barcodeScannerView = 
        <>
            <UserContext.Provider value = {userContextVal}>
                <BarcodeScanner/>
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-evenly"
                    m={3}
                >
                    <Box m={1}>
                        <Button size="small" onClick={() => this.setPhase(0)}>
                            Scan Donor QR Codes Instead
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button size="small" onClick={() => this.setPhase(1)}>
                            Back To Queue
                        </Button>
                    </Box>
                </Box>
            </UserContext.Provider>
        </>
        
        const qrScannerView = 
        <>
            <UserContext.Provider value = {userContextVal}>
                <QRScanner collection={true} onAddCollection={(c) => this.handleAddCollection(c)}/>
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-evenly"
                    m={3}
                >
                    <Box m={1}>
                        <Button  size="small" onClick={() => this.setPhase(-1)}>
                            Scan Barcodes Manually
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button size="small" onClick={() => this.setPhase(1)}>
                            Back To Queue
                        </Button>
                    </Box>
                </Box>
            </UserContext.Provider>
        </>
        

        const listView =  
        <>
            <UserContext.Provider value = {userContextVal}>
                <BookList books={this.state.books} listType="condensed" collection={true}/>
                <Box
                    m={2}
                    display="flex"
                    justifyContent="space-evenly"
                 >
                    {this.state.books.length? 
                        <>
                        <Button 
                            variant="contained" 
                            size="small"  
                            onClick={() => this.setPhase(0)}>
                                Scan Donor QR Codes
                        </Button>
                        <Button 
                            size="small" 
                            onClick={() => this.setPhase(2)} 
                            disabled = {unloggedConditions? true : false}>
                                View Shipping List
                            </Button>
                        </>
                    : null}
                </Box>
                
            </UserContext.Provider>
        </>

        const locationView = 
        <>
        <UserContext.Provider value = {userContextVal}>
            <PartnerList partners={this.state.partners} selected={this.state.selectedPartner}/>
            <Box
                m={4}
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-evenly"
            >
                <Button variant="contained"  size="small"  onClick={() => this.setPhase(1)}>
                    Back to your queue
                </Button>
                <Button variant="contained"  size="small" color="primary" onClick={() => this.setPhase(3)} disabled = {(!this.state.selectedPartner)? true: false}>
                    Confirm shipping
                </Button>
            </Box>
         </UserContext.Provider>
         </>

        const exportView = 
        <>  
            <Ticket queued={this.state.books}/>
            <Box
                m={4}
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-evenly"
            >
                <Button size="small" onClick={() => this.setPhase(1)}>
                    Add more books first!
                </Button>
                <Button variant="contained"  size="small"  color="primary" onClick={() => {window.alert("export summary with QR CODE")}}>
                    Print Collection Details
                </Button>
   
            </Box>
        </>

        let currentView;
        if (this.state.currentPhase !== -1 && this.state.currentPhase !== 0) {
            if(!this.state.books.length) {
                currentView = beginView
            }
            else {
                currentView = (this.state.currentPhase === 0)? qrScannerView 
                : (this.state.currentPhase === -1)? barcodeScannerView 
                : (this.state.currentPhase === 1)? listView 
                : (this.state.currentPhase === 2)? exportView
                : null;
            }
        }
        else {
            currentView = (this.state.currentPhase === 0)? qrScannerView 
            : barcodeScannerView 
        }

        return (
                <Container maxWidth="lg">
                  
                    <p>*Add Material UI stepper here*</p>
                    {currentView} 
             
                </Container>
        )
    }
}
