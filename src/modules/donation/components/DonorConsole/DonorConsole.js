import React, { Component } from "react";
import { withRouter } from "react-router";

import BookList from "../BookList";
import PartnerList from "../PartnerList";
import BarcodeScanner from "../BarcodeScanner/BarcodeScanner";
import Ticket from "../Ticket/Ticket";

import DonationContext from "../../context/DonationContext";

import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import "./DonorConsole.css";
import { Typography } from "@material-ui/core";
import AutorenewOutlinedIcon from "@material-ui/icons/AutorenewOutlined";
import HorizontalLinearStepper from "../Stepper/Stepper";
import AuthContext from "../../../../modules/core/context/AuthContext";
import DonationHttpService from "../../services/donation-http-service";
import { NotificationFacadeService } from "../../../notifications/services/notification-facade-service";

const { createNewNotification } = NotificationFacadeService();

class DonorConsole extends Component {
  /*
   * Improvements
   ** Make views into separate components
   */
  static contextType = AuthContext;
  state = {
    user: {
      name: null,
    },
    books: [],
    partners: [],
    selectedPartner: null,
    currentPhase: 1,
    qrCreated: false,
    _cID: null,
  };

  async componentDidMount() {
    const userContext = this.context;
    this.setState({
      ...this.state,
      user: userContext.user,
    });
    // await this.fetchNearestBookDrives(userContext.user.location.coordinates)
    await this.fetchUserCollections(userContext.id);
    this.setPartners();
  }

  fetchUserCollections = async (id) => {
    const userCollections = await DonationHttpService.fetchUserCollections(id);
    if (!userCollections) {
      this.setGetCollectionError();
    } else {
      this.setUserCollections(userCollections);
    }
  };

  setGetCollectionError() {
    this.setState({ ...this.state, error: true });
    createNewNotification({
      message: "There was a problem fetching user collections",
      type: "error",
    });
  }

  setUserCollections = (userCollections) => {
    this.context.setCollections(userCollections);
  };

  fetchNearestBookDrives = async (coords) => {
    const nearestBookDrives = await DonationHttpService.fetchNearestBookCollectors(
      { long: coords[0], lat: coords[1] }
    );
    if (!nearestBookDrives) {
      this.setState({ ...this.state, error: true });
      createNewNotification({
        message: "There was a problem fetching nearest book drives",
        type: "error",
      });
    } else {
      this.setPartners(nearestBookDrives);
    }
  };

  handleCreateCollection = async () => {
    const collection = {
      books: this.state.books,
      donorId: this.state.user.id,
    };
    const newCollection = await DonationHttpService.createNewCollection(
      collection
    );
    if (!newCollection) {
      this.setState({ ...this.state, error: true });
      createNewNotification({
        message: "There was a problem creating a new collection",
        type: "error",
      });
    } else {
      const cID = newCollection._id;
      this.handleCreateQRCode(cID);
      this.context.handleAddCollection(newCollection);
    }
  };

  handleSelectCondition = (bookKey, cond) => {
    const newBookState = this.state.books;
    newBookState[bookKey]["condition"] = cond;
    this.setState({
      ...this.state,
      books: newBookState,
    });
  };

  handleAddBook = (newBook) => {
    this.setState({
      ...this.state,
      books: [...this.state.books, newBook],
    });
  };

  handleRemoveBook = (bookId) => {
    const booksQueue = [...this.state.books];
    booksQueue.splice(bookId, 1);
    this.setState({
      ...this.state,
      books: booksQueue,
    });
  };

  handleSelectPartner = (partnerId) => {
    const selectedP = this.state.partners.filter(
      (partner) => partner.donorId === partnerId
    )[0];
    this.setState({
      ...this.state,
      selectedPartner: selectedP,
    });
  };

  setPhase = (phase) => {
    this.setState({
      ...this.state,
      currentPhase: phase,
    });
  };

  setPartners = (nearbyDrives) => {
    this.setState({
      ...this.state,
      partners: [
        {
          donorId: "1",
          name: "Bobst Library (DEMO)",
          address: "14 Bleecker Street",
          hours: "24/7",
          description: "Call to coordinate",
          contactNum: "888-222-3333",
        },
        {
          donorId: "2",
          name: "Battery Park Collective (DEMO)",
          address: "88 Battery Place",
          hours: "M-F 9am - 5pm",
          description: "Come anytime during business hours",
          contactNum: "222-544-1123",
        },
      ],
    });
  };

  handleFinalizeDonation = () => {
    if (this.state.qrCreated) {
      this.props.history.push("/collections");
    } else {
      this.handleCreateCollection();
    }
  };

  handleCreateQRCode = (cID) => {
    this.setState({
      ...this.state,
      _cID: cID,
      qrCreated: true,
    });
  };

  handlePurgeQueue = () => {
    this.setState({
      ...this.state,
      books: [],
    });
  };

  showNotification = ({ message, type }) => {
    createNewNotification({ message, type });
  };

  render() {
    const unloggedConditions = this.state.books.filter(
      (book) => book.condition === "Select" || book.condition === ""
    ).length;
    const donationContextVal = {
      books: this.state.books,
      handleSelectCondition: this.handleSelectCondition,
      handleSelectPartner: this.handleSelectPartner,
      handleRemoveBook: this.handleRemoveBook,
      handleAddBook: this.handleAddBook,
      setPhase: this.setPhase,
    };

    const beginView = (
      <Container maxWidth="sm">
        <Box
          display="flex"
          alignitemx="center"
          justifyContent="center"
          flexDirection="column"
          m={3}
          maxWidth="500px"
          mx="auto"
          textAlign="center"
        >
          <Typography>Welcome {this.state.user.name}!</Typography>
          <Typography>Give your books a new meaning.</Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            p={3.33}
          >
            <Typography>Start scanning to add to your donation box.</Typography>
            <AutorenewOutlinedIcon>Revive Used Books</AutorenewOutlinedIcon>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => this.setPhase(0)}
          >
            Begin Scanning
          </Button>
        </Box>
      </Container>
    );

    const scannerView = (
      <>
        <DonationContext.Provider value={donationContextVal}>
          <BarcodeScanner />
          <Box
            m={4}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Button
              variant="contained"
              size="small"
              onClick={() => this.setPhase(1)}
            >
              I'm done scanning
            </Button>
          </Box>
        </DonationContext.Provider>
      </>
    );

    const listView = (
      <>
        <DonationContext.Provider value={donationContextVal}>
          <BookList books={this.state.books} />
          <Box
            m={4}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-evenly"
          >
            {this.state.books.length ? (
              <>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => this.setPhase(0)}
                >
                  Scan more books
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => this.setPhase(2)}
                  disabled={unloggedConditions ? true : false}
                >
                  Choose a drop-off
                </Button>
              </>
            ) : null}
          </Box>
        </DonationContext.Provider>
      </>
    );

    const locationView = (
      <>
        <DonationContext.Provider value={donationContextVal}>
          <PartnerList
            partners={this.state.partners}
            selected={this.state.selectedPartner}
          />
          <Box
            m={4}
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-evenly"
          >
            <Button size="small" onClick={() => this.setPhase(1)}>
              Back to your box
            </Button>
            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => this.setPhase(3)}
              disabled={!this.state.selectedPartner ? true : false}
            >
              Summary Page
            </Button>
          </Box>
        </DonationContext.Provider>
      </>
    );

    const exportView = (
      <>
        <Ticket
          user={this.state.user}
          queued={this.state.books}
          partner={this.state.selectedPartner}
          QRVal={this.state._cID}
        />
        <Box
          m={4}
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <Button
            variant="contained"
            size="small"
            onClick={() => this.setPhase(1)}
          >
            I've changed my mind
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => this.handleFinalizeDonation()}
          >
            {!this.state.qrCreated ? "Confirm Donation" : "Back to dashboard"}
          </Button>
        </Box>
      </>
    );

    const currentView =
      !this.state.books.length && this.state.currentPhase !== 0
        ? beginView
        : this.state.currentPhase === 0
        ? scannerView
        : this.state.currentPhase === 1
        ? listView
        : this.state.currentPhase === 2
        ? locationView
        : this.state.currentPhase === 3
        ? exportView
        : null;

    const currentStatus =
      !this.state.books.length && this.state.currentPhase !== 0
        ? "Welcome to Kitabu!"
        : this.state.currentPhase === 0
        ? "Give Your Used Books a New Life"
        : this.state.currentPhase === 1
        ? "Give Your Used Books a New Life"
        : this.state.currentPhase === 2
        ? "Select a drop-off location"
        : this.state.currentPhase === 3
        ? "Confirm your donation"
        : null;

    let preQueue = false;
    if (!this.state.books.length && this.state.currentPhase !== 0) {
      preQueue = true;
    }
    if (!this.context.loaded) {
      return null;
    }
    return (
      <>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" className="console-header">
            {currentStatus}
          </Typography>
          <HorizontalLinearStepper
            preQueue={preQueue ? true : false}
            activeStep={this.state.currentPhase}
          />
          <Box borderRadius="5px" py={2} px={0}>
            {currentView}
          </Box>
        </Container>
      </>
    );
  }
}

export default withRouter(DonorConsole);
