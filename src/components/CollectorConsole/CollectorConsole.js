import React, {Component} from 'react';
import config from '../../config'

import HorizontalLinearStepper from '../Stepper';
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
import AuthContext from '../../AuthContext';

export default class CollectorConsole extends Component {
    state = {
            user: {
                name: null,
                id: null,
                drive: []
            },
            books: [],
            currentPhase: 1,
            _cID: null,
        }

        static contextType = AuthContext

        async componentDidMount() {
            const userContext = this.context;
    
            await this.setState({
                ...this.state,
                user: userContext.user
            })
            await this.fetchUserCollections(userContext.user.id)
            await this.fetchUserDrive(userContext.user.id)
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
        
        fetchUserDrive = (id) => {
            fetch(`${config.API_ENDPOINT}/users/${id}/drive`).then((res) => {
                if (!res.ok) {
                  throw new Error(res.status);
                }
                return res.json();
              }).then(res => this.setUserDrive(res))
              .catch((error) => this.setState({ error }));
        }

        patchUserDrive = () => {
            fetch(`${config.API_ENDPOINT}/users/${this.state.user.id}/drive`, 
            {   
                method: "PUT",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(this.state.books)
            }
            )
            .then((res) => {
                if (!res.ok) {
                  throw new Error(res.status);
                }
                return res.json();
              }).then(res => this.setUserDrive(res))
              .catch((error) => this.setState({ error }));
        }

        setUserDrive = (bookList) => {
            this.setState({
                books: bookList
            })
        }

        setUserCollections = (userCollections) => {
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
        }

        handlePurgeDrive = () => {
            this.setState({
                ...this.state,
                books: []
            })
            this.patchUserDrive()
        }
 
        handlePatchCollection = (c_id, queued) => {
            let newPoints = 0; 

            for (const book of queued) {
                newPoints++
            }

            let newData = {
                books: queued,
                points: newPoints,
                status: "finished"
            }

            fetch(`${config.API_ENDPOINT}/collections/${c_id}`, 
            {   
                method: "PUT",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(newData)
            }
            )
            .then((res) => {
                if (!res.ok) {
                  throw new Error(res.status);
                }
                return res.json();
              }).catch((error) => console.log(error));
        }



        handleSelectCondition = (bookKey, cond) => {
            const newBookState = this.state.books
            newBookState[bookKey]['condition'] = cond
            this.setState({
                ...this.state,
                books: newBookState,
            })
        }

        handleAddBook = (newBook) => {
            this.setState({
                ...this.state,
                books: [
                    ...this.state.books,
                    newBook
                ]
            })
            this.patchUserDrive()
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
            this.patchUserDrive()
        }

   

        handleRemoveBook = (bookId) => {
            const booksQueue = [...this.state.books]
            booksQueue.splice(bookId, 1)
            this.setState({
                ...this.state,
                books: booksQueue
            })
            this.patchUserDrive()
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
            <Typography>Welcome {this.state.user.name}!</Typography>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={3.33}>
                <Typography>Start scanning QR Codes to add to your book drive!</Typography>
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
                <QRScanner collection={true} onPatchCollection = {this.handlePatchCollection} onAddCollection={(c) => this.handleAddCollection(c)}/>
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
                    Summary
                </Button>
            </Box>
         </UserContext.Provider>
         </>

        const exportView = 
        <>  
                <Ticket 
                    user={this.state.user}
                    queued={this.state.books} 
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

        const currentStatus = 
        (!this.state.books.length && this.state.currentPhase !== 0)? "Welcome to Kitabu!"
        : (!this.state.books.length && this.state.currentPhase !== -1)? "Welcome to Kitabu!"
        : (this.state.currentPhase === 1)? "Host Book Drives for Local Donors" 
        : (this.state.currentPhase === 2)? "Package Your Collection"
        : null;

        let preQueue = false
        if (!this.state.books.length && this.state.currentPhase !== 0) {
            preQueue = true;
        }
        if (!this.state.books.length && this.state.currentPhase !== -1) {
            preQueue = true;
        }

        return (
                <Container maxWidth="lg">
                    <Typography variant = "h1" align="center" className="console-header">{currentStatus}</Typography>
                    <HorizontalLinearStepper preQueue={preQueue} activeStep={(this.state.currentPhase)}/>
                    {currentView} 
                </Container>
        )
    }
}

