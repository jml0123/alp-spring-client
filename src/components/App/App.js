import React from 'react';
import { Route } from "react-router-dom";
import DonationPage from "../../views/DonationPage"
import CollectionPage from '../../views/CollectionPage';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
