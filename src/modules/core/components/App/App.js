import React, {Component} from 'react';
import { Route } from "react-router-dom";

import config from '../../../../config'
import TokenService from '../../services/token-service'

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
    loaded: false
  }

  async componentDidMount() {
    await this.getUserData();
    this.setState({
      loaded: true
    })
  }

  getUserData = async () => {
    const userId = TokenService.getUserId()
    fetch(`${config.API_ENDPOINT}/users/user/${userId}`, {
      method: "GET",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((res) => {
        this.setUser(res);
        return res;
      })
      .catch((error) => this.setState({ error }));
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

  render() {
    const AuthContextVal = {
      user: this.state.user,
      collections: this.state.collections,
      setUser: this.setUser,
      setCollections: this.setCollections,
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


