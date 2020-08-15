import React from 'react';
import Nav from '../../components/Nav'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import "./LandingPage.css"


export default function DonationPage() {
  return (
    <>
      <Nav activeUser={false}/>
      <Box
        display="flex"
        flex-direction="column"
        w="100vw"
        minHeight="45vh"
        maxHeight="45vh"
        border="1px solid blue"
        justifyContent="center"
        alignItems="center"
      >
          <Box
            className="splash-info"
          >
            <Box
                m={2.33}
            >
                <Typography variant="h3">Give your old books a new meaning</Typography>
            </Box>
            <Box
                m={2.33}
            >
                <Typography variant="h5">Earn points to buy products and help literacy rates in Africa</Typography>
            </Box>
          </Box>
      </Box>
      <Box
        display="flex"
        flex-direction="row"
        h={0.4}
        minHeight="200px"
        alignItems="center"
        justifyContent="space-evenly"
      >
          <Box
            className="feature-box"
            >
            <Typography>Scan your gently used books with Kitabu's barcode reader</Typography>
          </Box>
          <Box
            className="feature-box"
            >
            <Typography>Find an active book drive in your area</Typography>
          </Box>
          <Box
            className="feature-box"
            >
            <Typography>Drop-off your books and earn points to redeem</Typography>
          </Box>
      </Box>
      <Box
        className="landing-content"
      >
          <Typography variant="h1">A seamless, online donation and collection process</Typography>
          <p>Kitabu is part of African Library Project, which seeks to changes lives book by book by starting libraries in Africa. 
              Our book drive process makes it easy to donate your gently used children's books by scanning, 
              selecting a drive near your area, and dropping off your books.</p>
      </Box>
      <Box
        className="landing-content"
      >
          <Typography variant="h1">An incentives-backed donation system</Typography>
          <p>Kitabu's digital donation platform is backed by points, where every book donated gives you points to redeem towards your favorite products. 
              Our goal is to create socially-conscious purchasing habits that also benefits literacy rates in Africa.
          </p>
      </Box>
      <Box
        className="landing-content"
      >
          <Typography variant="h1">Points you earn in Kitabu be redeemed to get discounts on partnered businesses</Typography>
          <p>We partnered with small black-owned businesses and influencers around the world to create a sustainable model that gives their businesses more visibility.
              Some of our top partners have opted to donate a percentage of their profits to shipping efforts.</p>
      </Box>
    </>
  );
}

