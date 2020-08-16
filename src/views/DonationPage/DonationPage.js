import React, {useContext} from 'react';
import Nav from "../../components/Nav"
import DonorConsole from "../../components/DonorConsole"

export default function DonationPage() {

  return (
    <>
      <Nav activeUser={true}/>
      <DonorConsole />
    </>
  );
}

