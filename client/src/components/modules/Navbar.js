import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-blockMain">
        <Link to="/" className="NavBar-LinkTextMain">
          wtgraph.com
        </Link>
        <rect class="NavBar-MainRect"></rect>
      </div>
      <div className="NavBar-block">
        <Link to="/Vehicles" className="NavBar-LinkText">
          Search by vehicles
        </Link>
      </div>
      <div className="NavBar-block">
        <Link to="/BR" className="NavBar-LinkText">
          Search by BR
        </Link>
      </div>
      <div className="NavBar-block">
        <Link to="/Price_Tracker" className="NavBar-LinkText">
          Price Tracker
        </Link>
      </div>
      <div className="NavBar-block">
        <Link to="/Profile" className="NavBar-LinkText">
          Profile
        </Link>
      </div>
      <div className="NavBar-block">
        <Link to="/About" className="NavBar-LinkText">
          About
        </Link>
      </div>
    </nav>
  );
};
export default NavBar;
