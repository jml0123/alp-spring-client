import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';

import LeafLogo from '../../assets/img/leaf.png';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function Nav(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <nav>
        <Box
          display="flex"
          alignItems="center"
          justifyContent= "space-between"
          flex-direction= "row"
          w={1}
          py={2}
          px={3}
        >
        <Link to="/" className="nav-logo">
        <Box
          display="flex"
          alignItems="center"
          justifyContent= "space-evenly"
          flex-direction= "row"
        >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              mx={(smScreen)? 1: 1.48}
            >
              <img className="nav-img" src={LeafLogo}/>
            </Box>
            <Typography variant="h1">Kitabu</Typography>
        </Box>
        </Link>
        <Box>
        <Button 
          aria-controls="simple-menu" 
          aria-haspopup="true" 
          onClick={handleClick}
          color="primary"
        >
          Menu
        </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/donate" onClick={handleClose}>Donate Books</MenuItem>
            <MenuItem component={Link} to="/points"  onClick={handleClose}>Points</MenuItem>
            <MenuItem component={Link} to="/login"  onClick={handleClose}>Sign Out</MenuItem>
          </Menu>
          </Box>
        </Box>
    </nav>
  );
}

export default Nav;

// Add user info beside menu