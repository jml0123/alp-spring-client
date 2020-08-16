import React, {Component} from 'react';
import { Route } from "react-router-dom";

import config from '../../config'
import TokenService from '../../services/token-service'

import AuthContext from "../../AuthContext";

import DonationPage from "../../views/DonationPage"
import CollectionPage from '../../views/CollectionPage';
import CollectionsPage from '../../views/CollectionsPage';
import LandingPage from '../../views/LandingPage';
import SignUpPage from '../../views/SignUpPage';
import LoginPage from '../../views/LoginPage';

import ThemeProvider from '@material-ui/styles/ThemeProvider';
import ListItemStyle from '../../themes/ListItem.style'

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
        console.log(res)
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
    console.log(this.state.user)
  }
  setCollections = (collections) => {
    console.log(collections)
    this.setState({
      ...this.state,
      collections: collections
    })
  }

  render() {
    console.log(this.state)
  
  
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
          component={CollectionsPage}
        />
        </ThemeProvider>
      </AuthContext.Provider>
      </>
      : null}
    </>
  );
}
}


