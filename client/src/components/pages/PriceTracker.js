import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import Chart from "chart.js/auto";
// import "chartjs-adapter-date-fns";
// import "../modules/OneGraph.js";
import OneGraph from "../modules/OneGraph.js";

const PriceTracker = () => {
  const [vehicle, setVehicle] = useState("M1A2 Abrams");

  return (
    <div>
      <OneGraph />{" "}
    </div>
  );
};
export default PriceTracker;
