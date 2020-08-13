import React from 'react';
import BookItem from '../BookItem';

import './BookList.css'

import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"

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
        <Container maxWidth="lg">
            <Box 
                display="flex" 
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                width={1}
                m={2}
                mx="auto"
            >
                <div className="container-header">
                    {(!props.finished)? <h1>Your Box</h1> : <h1>Donation Reciept</h1>}
                </div>
                    {books}
            </Box>
        
        </Container>
       
    )
}