import React from "react";

const AuthContext = React.createContext({
  user: "",
  collections: "",
  coordinates: "",
  setCollections: () => {},
  setUser: () => {},
  loaded: ""
});

export default AuthContext;
