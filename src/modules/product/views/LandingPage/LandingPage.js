import React from 'react';
import Nav from '../../../core/components/Nav'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import CropFreeIcon from '@material-ui/icons/CropFree';
import bookdrive from '../../../../assets/img/bookdrive.jpeg'
import heart from '../../../../assets/img/heart.jpeg'
import incentive from '../../../../assets/img/incentive.jpeg'
import RoomIcon from '@material-ui/icons/Room';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';


import "./LandingPage.css"


export default function LandingPage() {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const xsScreen = useMediaQuery(theme.breakpoints.down(550));
  return (
    <>
      <Nav activeUser={false}/>
      <Box
        className="image-box"
        display="flex"
        flex-direction="column"
        w="100vw"
        minHeight="45vh"

        justifyContent="center"
        alignItems="center"
    
      >
          <Box
            className="splash-info" 
          >
            <Box
                m={2.33}
            >
                <h2 className="slide-text">Give your old books a new meaning</h2>
            </Box>
            <Box
                m={2.33}
            >
                <h4 className="slide-desc">Earn points to buy products and help literacy rates in the African Continent</h4>
            </Box>
          </Box>
      </Box>
      <Box
        flexDirection = {smScreen ? "column" :  "row"}
        className="feature-container"
        display="flex"

        h={0.4}
        minHeight="200px"
        alignItems="center"
        justifyContent="space-evenly"
      >
          <Box
            className="feature-box"
            >
            <div className="features">Scan your gently used books with Kitabu's barcode reader</div>
            <CropFreeIcon marginTop="10px"fontSize="large"></CropFreeIcon>
          </Box>
          <Box
            className="feature-box"
            backgroundColor="F3AE52"
            >
            <div className="features" fontFamily="Press Start 2P">Find an active book drive in your area</div>
            
            <RoomIcon fontSize="large"></RoomIcon>
          </Box>
          <Box
            className="feature-box"
            >
            <div className="features">Drop-off your books and earn points to redeem</div>
            <EmojiTransportationIcon fontSize="large"></EmojiTransportationIcon>
          </Box>
      </Box>
      <Box
        className="landing-content"
      >
          <Typography variant="h1">A seamless, online donation and collection process</Typography>
          <img src={bookdrive} alt="book drive"></img>
          <p className="more-info">Kitabu is part of African Library Project, which seeks to changes lives book by book by starting libraries in the African continent. 
              Our book drive process makes it easy to donate your gently used children's books by scanning, 
              selecting a drive near your area, and dropping off your books.</p>
      </Box>
      <Box
        className="landing-content"
      >
          <Typography variant="h1">An incentives-backed donation system</Typography>
          <img src={incentive}></img>
          <p className="more-info">Kitabu's digital donation platform is backed by points, where every book donated gives you points to redeem towards your favorite products. 
              Our goal is to create socially-conscious purchasing habits that also benefits literacy rates in Africa.
          </p>
      </Box>
      <Box
        className="landing-content"
      >
          <Typography variant="h1">Points you earn in Kitabu be redeemed to get discounts on partnered businesses</Typography>
          <img src={heart}></img>
          <p className="more-info">We partnered with small black-owned businesses and influencers around the world to create a sustainable model that gives their businesses more visibility.
              Some of our top partners have opted to donate a percentage of their profits to shipping efforts.</p>
      </Box>
    </>
  );
}

