import React from 'react';
import BookList from '../BookList'

import './Ticket.css'

export default function Ticket(props) {
    return (
        <>
            <BookList books={props.queued} finished={true} readOnly={true}/>
            <h2>Donating to: {props.partner.name}</h2>
            <p>Address: {props.partner.address}</p>
            <p>Hours: {props.partner.hours}</p>
            <p>Description: {props.partner.description}</p>
            <p>Contact #: {props.partner.contactNum}</p>
        </>
    )
}