import React from 'react';
import './Nav.css';

function Nav(props) {
  return (
    <>
    <nav>
        <div className="nav-logo-wrapper">
            <img src="https://img.icons8.com/color/48/000000/leaf.png"/>
            Kitabu
        </div>
        <ul>
            <li><a href="/donationlist.html">Donate Books</a></li>
            <li><a href="/status.html">Donation History</a></li>
            <li><a href="/index.html">Sign Out</a></li>
        </ul>
    </nav>
    </>
  );
}

export default Nav;
