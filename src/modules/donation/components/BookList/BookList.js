import React from 'react';
import BookItem from '../BookItem';

import './BookList.css'

import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Container from "@material-ui/core/Container"

export default function BookList(props) {
    const books = props.books.map((book, i) => {
        return(
            <BookItem 
                book={book} 
                key={i} 
                id={i}
                authors={book.authors} 
                listId={i} 
                activeListItem={props.readOnly? false: true} 
                readOnly={props.readOnly? true: false}
                ready={props.finished? true: false}
                condition={book.condition}
                itemSmall={props.condensed? true: false}
                noSelect={props.simpleItems? true: false}
                collectionControls={props.collection? true: false}
                preQueueHandler={props.preQueueHandler? 
                    props.preQueueHandler 
                    : false
                }
            />
        )
    })
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
                    {books}
            </Box>
        
        </Container>
       
    )
}