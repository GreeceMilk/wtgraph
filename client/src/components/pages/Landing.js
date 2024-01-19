import React, { useState, useEffect } from "react";
import "./Landing.css";
import "../../utilities.css";

const Landing = () => {
  return (
    <div className="u-flex Landing-ContentBox">
      <iframe
        className="Landing-PlayerBox"
        src="https://steamdb.info/embed/?appid=236390"
        height="389"
        style={{ border: 0, overflow: "hidden", width: "100%" }}
        loading="lazy"
      ></iframe>
      <iframe src="https://warthunder.com/en/news/" className="Landing-NewsBox"></iframe>
    </div>
  );
};
export default Landing;
