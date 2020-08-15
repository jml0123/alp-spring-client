import React from 'react';
import { Route } from "react-router-dom";
import DonationPage from "../../views/DonationPage"
import CollectionPage from '../../views/CollectionPage';
import LandingPage from '../../views/LandingPage';

import SignUpPage from '../../views/SignUpPage';
import LoginPage from '../../views/LoginPage';


import ThemeProvider from '@material-ui/styles/ThemeProvider';
import ListItemStyle from '../../themes/ListItem.style'

function App() {
  return (
    <>
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
      </ThemeProvider>
    </>
  );
}

export default App;
