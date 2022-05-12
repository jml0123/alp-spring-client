import React, { Component } from "react";
import QRScannerCore from "react-qr-reader";

import DonationContext from "../../context/DonationContext";

import BookList from "../BookList";

import { Typography, Container, Button, Box } from "@material-ui/core";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import Alert from "@material-ui/lab/Alert";
import { NotificationFacadeService } from "../../../notifications/services/notification-facade-service";
import DonationHttpService from "../../services/donation-http-service";

const { createNewNotification } = NotificationFacadeService();

export default class QRScanner extends Component {
  state = {
    scanned: [],
    toggled: false,
    _cID: null,
  };

  static contextType = DonationContext;

  handleDiscard = (bookId) => {
    const preQueue = [...this.state.scanned];
    preQueue.splice(bookId, 1);
    this.setState({
      ...this.state,
      scanned: preQueue,
    });
  };

  handleClearQueue = () => {
    this.setState({
      ...this.state,
      scanned: [],
    });
  };

  handleScan = (data) => {
    if (data) {
      this.getCollectionByQRCode(data);
    }
  };

  getCollectionByQRCode = async (c_id) => {
    const fetchedCollection = await DonationHttpService.getCollectionByQrCode(
      c_id
    );
    if (!fetchedCollection) {
      this.setState({
        ...this.state,
        error:
          "There was an issue fetching the collection with the given QR code.",
      });
    } else {
      this.setCollection(fetchedCollection);
    }
  };

  setCollection = (collection) => {
    const books = collection[0].books;
    const id = collection[0]._id;
    this.setState({
      ...this.state,
      scanned: books,
      _cID: id,
      error: false,
    });
  };
  handleError = (e) => {
    createNewNotification({
      message: `There was a problem with the QR Reader: ${e}`,
      type: "error",
    });
  };

  handleAcceptCollection = () => {
    this.props.onAddCollection(this.state.scanned);
    this.props.onPatchCollection(this.state._cID, this.state.scanned);
  };

  render() {
    return (
      <Container maxWidth="lg">
        {this.state.error ? (
          <Alert severity="info">{this.state.error}</Alert>
        ) : null}
        <Box display="flex" alignItems="center" justifyContent="center"></Box>
        {!this.state.scanned.length ? (
          <>
            <Typography align="center">
              Focus QR code at the center of the frame
            </Typography>
            <Box
              minHeight="30vh"
              maxHeight="500px"
              maxWidth="500px"
              mx="auto"
              p={4.44}
              style={{
                backgroundColor: "lightgrey",
              }}
            >
              <QRScannerCore
                delay={300}
                onError={this.handleError}
                onScan={this.handleScan}
              />
            </Box>
          </>
        ) : null}
        <Box display="flex" alignItems="center" justifyContent="center"></Box>
        <BookList
          condensed={true}
          books={this.state.scanned}
          collection={true}
          simpleItems={true}
          preQueueHandler={this.handleDiscard}
        />
        {this.props.collection ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection="column"
            minHeight="75px"
          >
            {this.state.scanned.length ? (
              <>
                <Button
                  color="secondary"
                  endIcon={<AutorenewIcon />}
                  onClick={() => this.handleClearQueue()}
                >
                  Try another scan
                </Button>

                <Button
                  variant="contained"
                  size="small"
                  color="primary"
                  onClick={() => {
                    this.handleAcceptCollection();
                  }}
                >
                  Add all to queue
                </Button>
              </>
            ) : null}
          </Box>
        ) : null}
      </Container>
    );
  }
}
