import React from 'react';
import { Route } from "react-router-dom";
import DonationPage from "../../views/DonationPage"

function App() {
  return (
    <>
      <Route
          exact
          path={"/donate"}
          component={DonationPage}
      />
    </>
  );
}

export default App;
