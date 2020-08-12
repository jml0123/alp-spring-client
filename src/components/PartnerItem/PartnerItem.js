import React, {useContext} from 'react';
import UserContext from '../../UserContext'
import './PartnerItem.css'

export default function PartnerItem(props) {
    const donationContext = useContext(UserContext)
    return (
        <div class="partner-item">
        <div class="partner-container">
            <div class="partner-wrapper">
                <div class="partner-img-wrapper">
                    <img src=""/>
                </div>
                <div class="partner-description-wrapper">
                    <h1>{props.data.name}</h1>
                    <div class="partner-description-wrapper--details">
                        <p>{props.data.address}</p>
                        <p>Hours: {props.data.hours}</p>
                        <p>{props.data.description}</p>
                        <p>Contact: {props.data.contactNum}</p>
                    </div>
                </div>
                <div class="select-col">
                    <div class="select-box" onClick={() => donationContext.handleSelectPartner(props.partnerId)}>
                        Click here to check me
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}