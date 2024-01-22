import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import Chart from "chart.js/auto";
// import "chartjs-adapter-date-fns";
// import "../modules/OneGraph.js";
import OneGraph from "../modules/OneGraph.js";
import Selector from "../modules/Selector.js";
import "./PriceTracker.css";

const PriceTracker = () => {
  const [vehicle, setVehicle] = useState("");
  const [data, setData] = useState([]);
  // TODO: Add display for vehicles's name, br, silver lion cost, and golden eagle cost using warthunder wiki api
  // TODO: add selectors for vehicles
  return (
    <div className="u-flex PriceTracker-container">
      <div className="PriceTracker-graph">
        {data.prices ? <OneGraph data={data} /> : <p>Please Select an Item</p>}
      </div>

      <div className="PriceTracker-select">
        <Selector v={vehicle} setV={setVehicle} setD={setData} />
      </div>
    </div>
  );
};
export default PriceTracker;
