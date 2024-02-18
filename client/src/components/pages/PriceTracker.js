import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import Chart from "chart.js/auto";
// import "chartjs-adapter-date-fns";
// import "../modules/OneGraph.js";
import OneGraph from "../modules/OneGraph.js";
import Selector from "../modules/Selector.js";
import "./PriceTracker.css";
import { get } from "../../utilities";

const PriceTracker = () => {
  const [vehicle, setVehicle] = useState("");
  const [data, setData] = useState([]);
  // TODO: Add display for vehicles's name, br, silver lion cost, and golden eagle cost using warthunder wiki api
  // TODO: add selectors for vehicles

  useEffect(() => {
    get("/api/prices", { vehicle: vehicle }).then((v) => {
      setData(v);
    });
    console.log(vehicle);
    console.log(data);
  }, [vehicle]);

  return (
    <div className="u-flex PriceTracker-container">
      <div className="PriceTracker-graph">
        {data ? (
          <OneGraph
            dataX={data.map((element) => element.date)}
            dataY={data.map((element) => element.new_price)}
          />
        ) : (
          <p>Please Select an Item</p>
        )}
      </div>

      <div className="PriceTracker-select">
        <Selector func={setVehicle} mode="price" />
      </div>
    </div>
  );
};
export default PriceTracker;
