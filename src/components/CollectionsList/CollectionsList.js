import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import PointsCircle from '../PointsCircle';

import './CollectionList.css';


import {Button, ButtonGroup, Box, Container, Typography, Chip} from "@material-ui/core"
import AuthContext from '../../AuthContext';

export default function CollectionsList(props) {
    const userContext = React.useContext(AuthContext);
    const userCollections = userContext.collections ? userContext.collections : []
    const collections  = userCollections.map(collection => {
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
        )})
    
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
                 <Typography variant="h4">{userCollections.length ? "Your Previous Donations" : "You don't have any donations yet!"}</Typography>
                {collections}
                {!userCollections.length ?
                <Box m={3} textAlign="center">
                 <Typography  variant="h2">Start donating to earn points!</Typography>
                    <Box my={3}><Button component={Link} to="/donate">Donate</Button></Box>
                 </Box>
                : null}
            </Box>
        </Container>
       
    )
}

