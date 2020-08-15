import React, {Component} from 'react';
import uuid from 'react-uuid'

import BookList from '../BookList'
import BookItem from '../BookItem';
import PartnerList from '../PartnerList';
import BarcodeScanner from '../Scanner/BarcodeScanner';
import Ticket from '../Ticket/Ticket';

import UserContext from '../../UserContext';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';


import './DonorConsole.css'
import { Typography } from '@material-ui/core';
import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined';
import HorizontalLinearStepper from '../Stepper/Stepper';

export default class DonorConsole extends Component {
    state = {
            user: {
                userName: "Kelly",
                points: 24
            },
            books: [
                {   
                    id: 1,
                    authors: ["Don Norman"],
                    title: "Design Of Everyday Things",
                    isbn: "111-111-111-1111",
                    originalDate: "July 25, 1978",
                    thumbnail: "https://images-na.ssl-images-amazon.com/images/I/410RTQezHYL._SX326_BO1,204,203,200_.jpg",
                    condition: "Select",
                },
                {
                    id: 2,
                    title: "Test Book",
                    authors: ["Winnie Ng"],
                    isbn: "111-111-111-1111",
                    originalDate: "Jan 25, 2020",
                    thumbnail: "https://image.shutterstock.com/image-vector/book-icon-sign-design-260nw-553945819.jpg",
                    condition: "Select",
                }
                // status
                // 
            ],
            partners: [
                {
                    id: 1,
                    name: "Allen W. Roberts Elementary",
                    address: "123 Abv. Lane, New Providence NJ, 07974",
                    hours: "8:00am - 5:00pm",
                    description: "",
                    contactNum: "111-111-1111",
                },
                {
                    id: 2,
                    name: "Jane Doe Household",
                    address: "12 Pal Ct, Summit NJ, 07902",
                    hours: "9:00am - 9:00pm",
                    description: "call to coordinate",
                    contactNum: "111-111-1111",
                },
            ],
            selectedPartner: null,
            currentPhase: 3
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
        }
 
 
    render() {
        const unloggedConditions = this.state.books.filter(book => book.condition === "Select" || book.condition === "").length
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
            maxWidth="500px"
            mx="auto"
            textAlign="center"
        >    
            <Typography>Welcome {this.state.user.userName}!</Typography>
            <Typography>Give your books a new meaning.</Typography>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={3.33}>
                <Typography>Start scanning to add to your donation box.</Typography>
                <AutorenewOutlinedIcon>Revive Used Books</AutorenewOutlinedIcon>
            </Box>
            <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => this.setPhase(0)}
            >
                Begin Scanning
        </Button>
        </Box>
        </Container>

        const scannerView = 
        <>
            <UserContext.Provider value = {userContextVal}>
                <BarcodeScanner/>
                <Box
                    m={4}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-evenly"
                >
                        <Button variant="contained" size="small" onClick={() => this.setPhase(1)}>
                            I'm done scanning
                        </Button>
                </Box>
            </UserContext.Provider>
        </>
        
        const listView =  
        <>
            <UserContext.Provider value = {userContextVal}>
                <BookList books={this.state.books}/>
                <Box
                    m={4}
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-evenly"
                 >
                    {this.state.books.length? 
                    <>
                        <Button 
                            variant="contained" 
                            size="small"  
                            onClick={() => this.setPhase(0)}
                        >
                                Scan more books
                        </Button>
                        <Button 
                            size="small" 
                            color="primary"
                            onClick={() => this.setPhase(2)} 
                            disabled = {unloggedConditions? true : false}>Choose a drop-off</Button>
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
                <Button 
                    size="small"  
                    onClick={() => this.setPhase(1)}>
                        Back to your box
                </Button>
                <Button 
                    variant="contained"
                    size="small" 
                    color="secondary" 
                    onClick={() => this.setPhase(3)} 
                    disabled = {(!this.state.selectedPartner)? true: false}>
                        Confirm Donation
                </Button>
            </Box>
         </UserContext.Provider>
         </>

        const exportView = 
        <>  
            <Ticket 
                user={this.state.user}
                queued={this.state.books} 
                partner={this.state.selectedPartner}
            />
            <Box
                      m={4}
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-evenly"
            >
                <Button variant="contained" size="small" onClick={() => this.setPhase(1)}>I've changed my mind</Button>
                <Button size="small"  color="primary" onClick={() => {window.alert("export summary with QR CODE")}}>Print Reciept</Button>
            </Box>
        </>

        const currentView = 
        (!this.state.books.length && this.state.currentPhase !== 0)? beginView
        : (this.state.currentPhase === 0)? scannerView
        : (this.state.currentPhase === 1)? listView 
        : (this.state.currentPhase === 2)? locationView
        : (this.state.currentPhase === 3)? exportView
        : null;

        const currentStatus = 
        (!this.state.books.length && this.state.currentPhase !== 0)? "Welcome to Kitabu!"
        : (this.state.currentPhase === 0)? "Give Your Used Books a New Life" 
        : (this.state.currentPhase === 1)? "Give Your Used Books a New Life" 
        : (this.state.currentPhase === 2)? "Select a drop-off location"
        : (this.state.currentPhase === 3)? "Confirm your donation"
        : null;

        let preQueue = false;
        if (!this.state.books.length && this.state.currentPhase !== 0) {
            preQueue = true;
        }

        return (
            <>
                <Container maxWidth="lg">
                    <Typography variant = "h4" align="center" className="console-header">{currentStatus}</Typography>
                    <HorizontalLinearStepper preQueue={preQueue? true: false} activeStep={this.state.currentPhase}/>
                    <Box
                        borderRadius="5px"
                        py={2}
                        px={0}
                    >
                        {currentView}  
                    </Box>
                </Container>
            </>
        )
    }
}

