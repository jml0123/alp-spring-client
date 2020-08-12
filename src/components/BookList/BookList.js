import React from 'react';
import BookItem from '../BookItem';

import './BookList.css'

export default function BookList(props) {
    let books;
    if (props.readOnly) {
        books = props.books.map((book, i) => {
            return(
                <BookItem book={book} listItem={true} key={i} readOnly={true} condition={book.condition}/>
            )
        })
    }
    else {
        books = props.books.map((book, i) => {
            return(
                <BookItem book={book} listItem={true} key={i} id={book.id} listId={i} condition={book.condition}/>
            )
        })
    }
   
    return (
        <div className="donate-content list">
        <div className="container-header">
            {(!props.finished)? <h1>Your Box</h1> : <h1>Donation Reciept</h1>}
        </div>
            {books}
        </div>
    )
}