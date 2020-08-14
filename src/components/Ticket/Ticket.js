import React from 'react';
import BookList from '../BookList'
import PointsCircle from '../PointsCircle'

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import './Ticket.css'

export default function Ticket(props) {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const copyAddress = (e) => {
        if (document.queryCommandSupported('copy')) {
            props.partners.address.select();
            document.execCommand('copy');
        }
        // Add a button that copies address
    }

    const numBooks = props.queued.length
    const points = numBooks * 12
    
    return (
        <Card maxWidth="md">
            <Box
                m={3}
            >
                <Typography 
                    variant="h1"
                    align="center">
                    {props.user.userName}'s Donation
                </Typography>
            </Box>
            <BookList 
                books={props.queued} 
                finished={true} 
                readOnly={true}
                simpleItems={true}
                condensed={true}
            />
            <CardContent>
            <Box
                display="flex"
                flexDirection={smScreen ? "column-reverse" : "row"}
                alignItems="center"
                justifyContent="space-between"
                m={3}
            >
                <Box
                    display="flex"
                    flexDirection="column"
                >
                {props.partner ? 
                    <>
                        <Typography variant="h1">Dropoff Location</Typography>
                        <Typography>{props.partner.name}</Typography>
                        <Typography>Address: {props.partner.address}</Typography>
                        <Typography>Hours: {props.partner.hours}</Typography>
                        <Typography>Details: {props.partner.description}</Typography>
                        <Typography>Contact #: {props.partner.contactNum}</Typography>
                    </>
                : null}
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Typography variant="h2" align="center">Estimated Points Earned<br/>(for {numBooks} books)</Typography>
                    <PointsCircle pointsVal={points}/>
                </Box>
            </Box>
            <Typography align="center">Save or print this reciept and scan it at the dropoff location.</Typography>
            </CardContent>
        </Card>
    )
}
// Add expected # of points here