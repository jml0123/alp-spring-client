import React from "react";

const UserContext = React.createContext({
  books: [],
  partners: [],
  handleSelectCondition: () => {},
  handleRemoveBook: () => {},
  handleAddBook: () => {},
  handleSelectPartner: () => {},
  setPhase: () => {}
});

export default UserContext;
