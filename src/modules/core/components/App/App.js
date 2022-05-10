import React, {Component} from 'react';
import { Route } from "react-router-dom";

import TokenService from '../../services/token-service'
import CoreHttpService from '../../services/core-http-service';

import AuthContext from "../../context/AuthContext";

import DonationPage from "../../../donation/views/DonationPage"
import CollectionPage from '../../../donation/views/CollectionPage';
import DropOffPage from '../../../donation/views/DropOffPage';
import LandingPage from '../../../product/views/LandingPage';
import SignUpPage from '../../views/SignUpPage';
import LoginPage from '../../views/LoginPage';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import ListItemStyle from '../../../donation/themes/ListItem.style'

import PrivateRoute from "../../utils/PrivateRoute";
import PublicOnlyRoute from "../../utils/PublicOnlyRoute";

export default class App extends Component {
  state = {
    user: {
      class: null,
      name: null,
      _id: null,
      location: {
        coordinates: []
      },
      collections: null
    },
    loaded: false,
    error: false
  }

  async componentDidMount() {
    await this.getUserData();
    this.setState({
      loaded: true
    })
  }

  getUserData = async () => {
    const userId = TokenService.getUserId();
    const userData = await CoreHttpService.getUserData(userId);
    if (!userData) {
      this.setState({...this.state, error: true});
    } else {
      this.setUser(userData);
    }
  };

  setUser = (user) => {
    this.setState({
      ...this.state,
      user: user
    })
  }
  setCollections = (collections) => {
    this.setState({
      ...this.state,
      collections: collections
    })
  }

  handleAddCollection = (newCollection) => {
    const updatedCollections = [...this.state.collections, newCollection]
    this.setState({
      ...this.state,
      collections: updatedCollections
    })
  }

  render() {
    const AuthContextVal = {
      user: this.state.user,
      id: this.state.user?._id,
      collections: this.state.collections,
      setUser: this.setUser,
      setCollections: this.setCollections,
      handleAddCollection: this.handleAddCollection,
      loaded: this.state.loaded
  };
  return (
    
    <>
    {this.state.loaded? 
    <>
    <AuthContext.Provider value={AuthContextVal}>
      <ThemeProvider theme={ListItemStyle}>
      <Route
            exact
            path={"/"}
            component={LandingPage}
        />
        <PrivateRoute
            exact
            path={"/donate"}
            component={DonationPage}
        />
        <PrivateRoute
            exact
            path={"/partners"}
            component={CollectionPage}
        />
        <PublicOnlyRoute
            exact
            path={"/login"}
            component={LoginPage}
        />
        <PublicOnlyRoute
            exact
            path={"/join"}
            component={SignUpPage}
        />
        <PrivateRoute
          exact
          path={"/collections"}
          component={DropOffPage}
        />
        </ThemeProvider>
      </AuthContext.Provider>
      </>
      : null}
    </>
  );
}
}


