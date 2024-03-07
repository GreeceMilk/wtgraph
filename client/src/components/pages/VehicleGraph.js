import React, { useState } from "react";
import OneGraph from "../modules/OneGraph";
import Selector from "../modules/Selector";
import { Button } from "@mui/material";
import { get } from "../../utilities";
import Alert from "@mui/material";

const VehicleGraph = () => {
  const [vehicle, setVehicle] = useState(null);
  const [nation, setNation] = useState(null);
  const [cls, setCls] = useState(null);
  const [field, setField] = useState(null);
  const [data, setData] = useState([]);
  const showGraph = () => {
    if (vehicle !== null || field !== null) {
      get("/api/vehicles", { vehicle: vehicle, field: field }).then((v) => {
        setData(v);
      });
    } else {
      console.log("No data");
      // add alert
    }
  };
  const parseField = (fieldStr) => {
    if (fieldStr !== null) {
      setField(fieldStr.toLowerCase().split("/").join(" per ").split(" ").join("_"));
    } else {
      setField(null);
    }
  };
  return (
    <>
      <div>
        <div className="">
          <Selector func={setNation} mode="nation" default="USA" />
        </div>
        <div className="">
          <Selector func={setCls} mode="cls" nation={nation} default="Aviation" />
        </div>
        <div>
          <Selector mode="vehicle" func={setVehicle} nation={nation} cls={cls}></Selector>
        </div>
        <div>
          <Selector mode="vdata" func={parseField} default="AB BR" />
        </div>
        <div>
          <Button onClick={showGraph} variant="contained">
            Show Graph
          </Button>
        </div>
      </div>
      <OneGraph
        dataX={data.map((element) => element.date)}
        dataY={data.map((element) => element[field])}
      />
    </>
  );
};
export default VehicleGraph;
