import React from "react";

const AuthContext = React.createContext({
  user: "",
  id: "",
  collections: "",
  coordinates: "",
  setCollections: () => {},
  setUser: () => {}
});

export default AuthContext;
