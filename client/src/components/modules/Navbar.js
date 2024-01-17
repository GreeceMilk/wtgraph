import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="NavBar-container">
      <Link to="/" className="NavBar-blockMain">
        <div className="NavBar-PrimaryRectangle"></div>
        <p className="NavBar-LinkTextMain">wtgraph.com</p>
      </Link>
      <Link to="/Vehicles" className="NavBar-block NavBar-SecondaryColor">
        <div className="NavBar-SecondaryRectangle"></div>
        <p className="NavBar-LinkText">Search by vehicles</p>
      </Link>
      <Link to="/BR" className="NavBar-block NavBar-PrimaryColor">
        <div className="NavBar-PrimaryRectangle"></div>
        <p className="NavBar-LinkText">Search by BR</p>
      </Link>
      <Link to="/Price_Tracker" className="NavBar-block NavBar-SecondaryColor">
        <div className="NavBar-SecondaryRectangle"></div>
        <p className="NavBar-LinkText">Price Tracker</p>
      </Link>
      <Link to="/Profile" className="NavBar-block NavBar-PrimaryColor">
        <div className="NavBar-PrimaryRectangle"></div>
        <p className="NavBar-LinkText">Profile</p>
      </Link>
      <Link to="/About" className="NavBar-block NavBar-SecondaryColor">
        <div className="NavBar-SecondaryRectangle"></div>
        <p className="NavBar-LinkText">About</p>
      </Link>
    </nav>
  );
};
export default NavBar;
