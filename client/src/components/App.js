import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import { get, post } from "../utilities";
import NavBar from "./modules/Navbar.js";
import Landing from "./pages/Landing.js";
import NotFound from "./pages/NotFound.js";
import Graph from "./pages/Graph.js";
import Profile from "./pages/Profile.js";

import "../utilities.css";
import "./App.css";

/**
 * Define the "App" component as a function.
 */
const App = () => {
  // const [userId, setUserId] = useState(null);

  // useEffect(() => {
  //   get("/api/whoami").then((user) => {
  //     if (user._id) {
  //       // they are registed in the database, and currently logged in.
  //       setUserId(user._id);
  //     }
  //   });
  // }, []);

  // const handleLogin = (res) => {
  //   const userToken = res.tokenObj.id_token;
  //   post("/api/login", { token: userToken }).then((user) => {
  //     setUserId(user._id);
  //     post("/api/initsocket", { socketid: socket.id });
  //   });
  // };

  // const handleLogout = () => {
  //   console.log("Logged out successfully!");
  //   setUserId(null);
  //   post("/api/logout");
  // };

  // <> is like a <div>, but won't show
  // up in the DOM tree
  // TODO: add userID in the future
  return (
    <>
      <p>Hello</p>
      <NavBar />
      <div className="App-container">
        <Router>
          <Landing path="/" />
          <Graph path="/graph/" />
          <PriceTracker path="/price/" />
          <Profile path="/profile/" />
          <NotFound default />
        </Router>
      </div>
    </>
  );
};

export default App;
