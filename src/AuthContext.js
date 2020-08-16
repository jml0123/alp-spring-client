import React from "react";

const AuthContext = React.createContext({
  user: "",
  id: "",
  collections: "",
  setCollections: () => {},
  setUser: () => {}
});

export default AuthContext;
