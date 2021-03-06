import React, {useState, useContext} from 'react';
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
import TokenService from '../../services/token-service'
import AuthContext from '../../AuthContext';


function Nav(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const userContext = useContext(AuthContext)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleLogoutClick = () => {
    setAnchorEl(null);
    TokenService.clearAuthToken();
    TokenService.clearUserId();
    userContext.setUser(null)
  };
  

  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));

console.log(userContext.user)
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
        {userContext.user && userContext.user._id !== "" ? 
        <>
          <Button 
            aria-controls="simple-menu" 
            aria-haspopup="true"  d
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
              {userContext.user && userContext.user.class === "Collector" ? 
                <MenuItem component={Link} to="/partners" onClick={handleClose}>Collect Books</MenuItem>
                : null
              }
              {userContext.user && userContext.user.class === "donor" ? 
                <MenuItem component={Link} to="/donate" onClick={handleClose}>Donate Books</MenuItem>
                : null
              }
              <MenuItem component={Link} to="/collections"  onClick={handleClose}>Collections</MenuItem>
              <MenuItem component={Link} to="/login"  onClick={handleLogoutClick}>Sign Out</MenuItem>
            </Menu>
          </>
          :
          <div className="nav-ctrls">
            <Link to="/join" className="link"><Button>Join</Button></Link>
            <Link to="/login" className="link"><Button>Login</Button></Link>
          </div>
          }
          </Box>
        </Box>
    </nav>
  );
}

export default Nav;

// Add user info beside menu