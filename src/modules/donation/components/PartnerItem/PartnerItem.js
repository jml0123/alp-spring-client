import React, {useContext} from 'react';
import DonationContext from '../../context/DonationContext'
import './PartnerItem.css'


import ListItemStyle from '../../themes/ListItem.style'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


export default function PartnerItem(props) {
    const donationContext = useContext(DonationContext)

    return (
        <>
        <ThemeProvider theme={ListItemStyle}>
        <Card variant="outlined">
        <CardContent>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                maxWidth="100%"
                maxHeight="180px"
                overflow="hidden"
                m={1}
            >
                <img className="partner-img" src="https://i.pinimg.com/originals/48/bc/d6/48bcd68d718226b7febeb4407548953d.png"/>
            </Box>
        </CardContent>
        <CardContent>
                <Typography variant="h1">{props.data.name}</Typography>
                <Box
                    display="flex"
                    flexDirection="column"
                    minHeight="100px"
                >
                    <Typography variant="p">{props.data.address}</Typography>
                    <Typography variant="p">Hours: {props.data.hours}</Typography>
                    <Typography variant="p">{props.data.description}</Typography>
                    <Typography variant="p">Contact: {props.data.contactNum}</Typography>
                </Box>
        </CardContent>
            <Box 
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                my={2}
            >
                {(!props.selected) ? 
                    <Button 
                        variant="contained"
                        color="primary"
                        onClick={() => donationContext.handleSelectPartner(props.partnerId)}
                    >
                        Select
                    </Button>
                :
                    <Button 
                        variant="contained"
                        color="secondary"
                        endIcon={<CheckCircleOutlineIcon>Check</CheckCircleOutlineIcon>}
                        onClick={() => donationContext.handleSelectPartner(props.partnerId)}
                        disableElevation
                    >
                        Ready to Donate!
                    </Button>
                }
            </Box>
        </Card>
        </ThemeProvider>
        </>
    )
}