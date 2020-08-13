import React from 'react';
import BookList from '../BookList'

import ThemeProvider from '@material-ui/styles/ThemeProvider';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import ListItemStyle from '../../themes/ListItem.style'
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
    return (
        <Card maxWidth="md">
            <ThemeProvider theme={ListItemStyle}>
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
                >
                    <h1>Add QR CODE HERE</h1>
                </Box>
            </Box>
            <Typography align="center">Print this reciept and scan it at the dropoff location.</Typography>
            </CardContent>
            </ThemeProvider>
        </Card>
    )
}