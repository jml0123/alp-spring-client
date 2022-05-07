import React from 'react';
import PartnerItem from '../PartnerItem';

import { sizing } from '@material-ui/system';
import { useTheme, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import './PartnerList.css'

export default function PartnerList(props) {
    console.log(props.partners);
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const partners = props.partners.map((partner, i) => {
        return(
            <PartnerItem 
                data={partner} 
                key={i} 
                partnerId = {partner.id} 
                listId={i} 
                selected = {(props.selected && partner.id === props.selected.id) ? true : false} 
            />
        )
    })
    return (
        <Container maxWidth="lg">
        <div className="container-header"><h1>Nearby Book Drives</h1></div>
        <Box
            display="flex"
            flexDirection={(smScreen)? "column": "row"}
        >
                {partners}
        </Box>
        </Container>
    )
}

// This component can use a Material UI Grid