import React from "react";

const AuthContext = React.createContext({
  user: "",
  collections: "",
  coordinates: "",
  setCollections: () => {},
  setUser: () => {},
  handleAddCollection: () => {},
  loaded: ""
});

export default AuthContext;
