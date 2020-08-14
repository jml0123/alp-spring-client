import React from 'react';
import { Route } from "react-router-dom";
import DonationPage from "../../views/DonationPage"
import CollectionPage from '../../views/CollectionPage';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import ListItemStyle from '../../themes/ListItem.style'

function App() {
  return (
    <>
    <ThemeProvider theme={ListItemStyle}>
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
      </ThemeProvider>
    </>
  );
}

export default App;
