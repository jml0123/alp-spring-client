import React, {useContext} from 'react';
import Nav from "../../components/Nav"
import CollectionsList from "../../components/CollectionsList"

export default function DonationPage() {
  return (
    <>
      <Nav activeUser={true}/>
      <CollectionsList/>
    </>
  );
}

