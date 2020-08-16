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

export default class App extends Component {
  state = {
    user: {
      class: "",
      name: "",
      id: "",
      location: {
        coordinates: []
      },
      collections: ""
    }
  }

  async componentDidMount() {
    this.getUserData();
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
      setCollections: this.setCollections
  };
  return (
    <>
    <AuthContext.Provider value={AuthContextVal}>
      <ThemeProvider theme={ListItemStyle}>
      <Route
            exact
            path={"/"}
            component={LandingPage}
        />
        <Route
            exact
            path={"/donate"}
            component={DonationPage}
        />
        <Route
            exact
            path={"/partners"}
            component={CollectionPage}
        />
        <Route
            exact
            path={"/login"}
            component={LoginPage}
        />
        <Route
            exact
            path={"/join"}
            component={SignUpPage}
        />
        <Route
          exact
          path={"/collections"}
          component={CollectionsPage}
        />
        </ThemeProvider>
      </AuthContext.Provider>
    </>
  );
}
}


