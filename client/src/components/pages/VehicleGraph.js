import React, { useState } from "react";
import OneGraph from "../modules/OneGraph";
import Selector from "../modules/Selector";
import { Button } from "@mui/material";
import { get } from "../../utilities";

const VehicleGraph = () => {
  const [vehicle, setVehicle] = useState("");
  const [nation, setNation] = useState("");
  const [cls, setCls] = useState("");
  const [field, setField] = useState("");
  const [data, setData] = useState([]);
  const showGraph = () => {
    get("/api/vehicles", { vehicle: vehicle, field: field }).then((v) => {
      setData(v);
    });
  };
  const parseField = (fieldStr) => {
    setField(fieldStr.toLowerCase().split("/").join(" per ").split(" ").join("_"));
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
