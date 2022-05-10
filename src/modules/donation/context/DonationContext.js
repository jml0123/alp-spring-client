import React from "react";

const DonationContext = React.createContext({
  books: [],
  partners: [],
  handleSelectCondition: () => {},
  handleRemoveBook: () => {},
  handleAddBook: () => {},
  handleSelectPartner: () => {},
  setPhase: () => {}
});

export default DonationContext;
