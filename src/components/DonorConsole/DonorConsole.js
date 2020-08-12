import React, {Component} from 'react';
import BookList from '../BookList'
import BookItem from '../BookItem';
import PartnerList from '../PartnerList';
import BarcodeScanner from '../Scanner/BarcodeScanner';
import Ticket from '../Ticket/Ticket';
import UserContext from '../../UserContext';

import './DonorConsole.css'
export default class DonorConsole extends Component {
    state = {
            books: [
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
            currentPhase: 1,
            loggedConditions: false
        }

        // Refactor to use bookId
        handleSelectCondition = (bookKey, cond) => {
            const newBookState = this.state.books
            newBookState[bookKey]['condition'] = cond
            const checkConditions = newBookState.filter(book => book.condition === "Select")
            const allLogged = !checkConditions.length ? true: false
            this.setState({
                ...this.state,
                books: newBookState,
                loggedConditions: allLogged
            })
        }

        handleAddBook = (newBook) => {
            console.log("called")
            this.setState({
                ...this.state,
                books: [
                    ...this.state.books,
                    newBook
                ]
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
            console.log(selectedP)
            this.setState({
                ...this.state,
                selectedPartner: selectedP
            })
        }

        setPhase = (phase) => {
            this.setState({
                ...this.state,
                currentPhase: phase
            })
        }
       
 
    render() {
        console.log(this.state.books)
        const userContextVal = {
            books: this.state.books,
            handleSelectCondition: this.handleSelectCondition, 
            handleSelectPartner: this.handleSelectPartner,
            handleRemoveBook: this.handleRemoveBook,
            handleAddBook: this.handleAddBook,
            setPhase: this.setPhase,
        }


        const scannerView = 
        <>
            <UserContext.Provider value = {userContextVal}>
                <BarcodeScanner/>
                <div className="btn-row">
                    <button onClick={() => this.setPhase(1)}>I'm done scanning</button>
                </div>
            </UserContext.Provider>
        </>
        
        const listView =  
        <>
            <UserContext.Provider value = {userContextVal}>
                <BookList books={this.state.books}/>
                <h1>African Library project operates in...</h1>
                <div className="btn-row">
                    <button onClick={() => this.setPhase(2)} disabled = {(this.state.loggedConditions === false)? true: false}>Choose a drop-off</button>
                    <button onClick={() => this.setPhase(0)}>Scan more books</button>
                </div>
            </UserContext.Provider>
        </>

        const locationView = 
        <>
        <UserContext.Provider value = {userContextVal}>
            <PartnerList partners={this.state.partners}/>
                <h1>African Library project operates in...</h1>
                <div class="btn-row">
                    <button onClick={() => this.setPhase(3)} disabled = {(!this.state.selectedPartner)? true: false}>Confirm Donation</button>
                    <button onClick={() => this.setPhase(1)}>Back to your box</button>
                </div>
         </UserContext.Provider>
         </>

        const exportView = 
        <>  
            <Ticket queued={this.state.books} partner={this.state.selectedPartner}/>
            <h1>Your donation reciept is on the next page. Bring it to the drive to scan</h1>
            <div class="btn-row">
                    <p>Changed your Mind?</p>
                    <button onClick={() => this.setPhase(1)}>Donate other books!</button>
                    <button onClick={() => {}}>Print Reciept</button>
                </div>
        </>

        const currentView = (this.state.currentPhase === 0)? scannerView
        : (this.state.currentPhase === 1)? listView 
        : (this.state.currentPhase === 2)? locationView
        : (this.state.currentPhase === 3)? exportView
        : null;

        return (
                <div className="main-container">
                    <p>*Add Material UI stepper here*</p>
                    {currentView} 
                </div>
        )
    }
}

