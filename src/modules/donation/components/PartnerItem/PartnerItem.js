import React, { useContext } from "react";
import DonationContext from "../../context/DonationContext";
import "./PartnerItem.css";

import ListItemStyle from "../../themes/ListItem.style";
import ThemeProvider from "@material-ui/styles/ThemeProvider";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

export default function PartnerItem(props) {
  const donationContext = useContext(DonationContext);

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
              <img
                className="partner-img"
                src="https://i.pinimg.com/originals/48/bc/d6/48bcd68d718226b7febeb4407548953d.png"
                alt="Kitabu Partner"
              />
            </Box>
          </CardContent>
          <CardContent>
            <Typography variant="h1">{props.data.name}</Typography>
            <Box display="flex" flexDirection="column" minHeight="100px">
              <Typography>{props.data.address}</Typography>
              <Typography>Hours: {props.data.hours}</Typography>
              <Typography>{props.data.description}</Typography>
              <Typography>
                Contact: {props.data.contactNum}
              </Typography>
            </Box>
          </CardContent>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            my={2}
          >
            {!props.selected ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  donationContext.handleSelectPartner(props.partnerId)
                }
              >
                Select
              </Button>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                endIcon={<CheckCircleOutlineIcon>Check</CheckCircleOutlineIcon>}
                onClick={() =>
                  donationContext.handleSelectPartner(props.partnerId)
                }
                disableElevation
              >
                Ready to Donate!
              </Button>
            )}
          </Box>
        </Card>
      </ThemeProvider>
    </>
  );
}
