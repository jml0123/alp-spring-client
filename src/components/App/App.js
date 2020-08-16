import React, {Component} from 'react';
import { Route } from "react-router-dom";

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

  setUser = (user) => {
    this.setState({
      ...this.state,
      user: user
    })
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


