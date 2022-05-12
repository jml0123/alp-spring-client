import React from 'react';
import PartnerItem from '../PartnerItem';

import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import './PartnerList.css'

export default function PartnerList(props) {
    const theme = useTheme();
    const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const partners = props.partners.map((partner, i) => {
        return(
            <PartnerItem 
                data={partner} 
                key={i} 
                partnerId = {partner.donorId} 
                listId={i} 
                selected = {props.selected && (partner.donorId === props.selected.donorId)} 
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
