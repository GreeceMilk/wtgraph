import React, { useState, useEffect } from "react";
import { Link, Router } from "@reach/router";

import "./Navbar.css";

const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-block">
        <Link to="/" className="NavBar-LinkTextMain">
          wtgraph.com
        </Link>
        <div></div>
      </div>
      <div>
        <Link to="/vehicles" className="NavBar-LinkText">
          Search by vehicles
        </Link>
        <div></div>
      </div>
      <div>
        <Link to="/BR" className="NavBar-LinkText">
          Search by BR
        </Link>
        <div></div>
      </div>
      <div>
        <Link to="/Price_Tracker" className="NavBar-LinkText">
          Price Tracker
        </Link>
        <div></div>
      </div>
      <div>
        <Link to="/Profile" className="NavBar-LinkText">
          Profile
        </Link>
        <div></div>
      </div>
      <div>
        <Link to="/About" className="NavBar-LinkText">
          About
        </Link>
        <div></div>
      </div>
    </nav>
  );
};
export default NavBar;
