import React, {Component} from 'react';
import config from '../../config'

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
import AuthContext from '../../AuthContext';

export default class DonorConsole extends Component {
    state = {
            user: null,
            books: [{
                authors: [],
                condition: "",
                isbn: "9781250038821",
                publishedDate: "2013-10-15",
                thumbnail: "http://books.google.com/books/content?id=tWVEAQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
                title: "Humans of New York"
            }],
            partners: [],
            selectedPartner: null,
            currentPhase: 3,
            _cID: null
        }

        static contextType = AuthContext
        
        async componentWillMount(){ 
            const userContext = this.context;
            await this.setState({
                ...this.state,
                user: userContext.user
            })
            await this.fetchUserCollections(userContext.user.id)
            await this.fetchNearestDonors(userContext.user.coordinates)
            console.log(this.state)
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

        fetchUserCollections = async (id) => {
            fetch(`${config.API_ENDPOINT}/collections/${id}/index`).then((res) => {
                if (!res.ok) {
                  throw new Error(res.status);
                }
                return res.json();
              }).then(res => this.setUserCollections(res))
              .catch((error) => this.setState({ error }));
        }

        fetchNearestDonors = (coords) => {
            fetch(`${config.API_ENDPOINT}/users/index?long=${coords[0]}&latt=${coords[1]}`).then((res) => {
                if (!res.ok) {
                  throw new Error(res.status);
                }
                return res.json();
              }).then(res => this.setPartners(res))
              .catch((error) => this.setState({ error }));
        }


        setPartners = (nearbyDrives) => {
            this.setState({
                ...this.state,
                partners: nearbyDrives
            })
        }

        setUserCollections = (userCollections) => {
            console.log(userCollections)
            this.context.setCollections(userCollections)
        }


        handleFinalizeDonation = async () => {
            this.handleCreateCollection()
        }

        handleCreateCollection = async () => {
            const collection = {
                books: this.state.books,
                donorId: this.state.user.id,
            }
            fetch(`${config.API_ENDPOINT}/collections/new`, {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(collection)}).then(res => 
                    res.json()).then(data => {
                        console.log(data)
                        const cID = data._id
                        this.handleCreateQRCode(cID)
                        this.context.handleAddCollection(data)
                    }).catch((error) => {
                        this.setState({ error })
                    })  
        }

        handleCreateQRCode = (cID) => {
            this.setState({
                ...this.state,
                _cID: cID
            })
            console.log(this.state)
        }

        handlePurgeQueue = () => {
            this.setState({
                ...this.state,
                books: []
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
            <Typography>Welcome {this.state.user.name}!</Typography>
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
                        Summary Page
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
                QRVal={this.state._cID}
            />
            <Box
                      m={4}
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="space-evenly"
            >
                <Button variant="contained" size="small" onClick={() => this.setPhase(1)}>I've changed my mind</Button>
                <Button size="small"  color="primary" onClick={() => this.handleFinalizeDonation()}>Confirm Donation</Button>
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

