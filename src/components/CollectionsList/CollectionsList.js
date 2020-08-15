import React from 'react';
import PointsCircle from '../PointsCircle';

import './CollectionList.css';


import {Button, ButtonGroup, Box, Container, Typography, Chip} from "@material-ui/core"

export default function CollectionsList(props) {

    const collections  = props.collections.map(collection => {
        return(
            <Box border="1px solid #0f0f0f" className="collection-row" display="flex" justifyContent="left" alignItems="center" w={1}>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="left"
                    className="collection-wrapper"
                >
                    <PointsCircle pointsVal={collection.points}/>
                    <Chip color={collection.status === "Pending" ? "secondary": "primary"} label={collection.status}/>
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    className="collection-wrapper"
                >
                <p>{collection.books.length} Books</p>
                <p>{collection.date}</p>
                </Box>
        
                {collection.status === "Pending" ? 
                <Box
                    display="flex"
                    alignItems="flex-end"
                    justifyContent="flex-end"
                    className="collection-wrapper"
                >
                    <Button>Edit</Button>
                    <Button>Cancel</Button>
                </Box>
                : null
                }
            </Box>
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
                 <Typography variant="h4">Your Previous Donations</Typography>
                {collections}
            </Box>
        </Container>
       
    )
}


CollectionsList.defaultProps = {
    collections: [
        {
            books: [1, 2, 3, 4, 5, 6, 7],
            status: "Pending",
            points: 7,
            date: "15-Aug-2020",
        },
        {
            books: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            status: "Confirmed",
            points: 9,
            date: "27-Jul-2020",
        },
    ]
}
