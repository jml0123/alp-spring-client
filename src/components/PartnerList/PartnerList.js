import React from 'react';
import PartnerItem from '../PartnerItem';

import './PartnerList.css'

export default function PartnerList(props) {
    const partners = props.partners.map((partner, i) => {
        return(
            <PartnerItem data={partner} key={i} partnerId = {partner.id} listId={i}/>
        )
    })
    return (
        <div class="donate-content list">
            <div class="container-header"><h1>Nearby Book  Drives</h1></div>
                {partners}
        </div>
    )
}