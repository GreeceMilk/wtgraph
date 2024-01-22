import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { get } from "../../utilities";

const Selector = (props) => {
  const [vehicleList, setVehicleList] = useState([]);
  const [allData, setAllData] = useState([]);
  // const vehicles = [
  //   "M1A2 Abrams",
  //   "T-80U",
  //   "Leopard 2A5",
  //   "Challenger 2",
  //   "Type 90",
  //   "Ariete (P)",
  //   "M1A1 Abrams",
  //   "T-80B",
  //   "Leopard 2K",
  //   "Challenger 1",
  //   "Type 74",
  //   "OF-40 (MTCA)",
  //   "M1 Abrams",
  //   "T-64B",
  //   "Leopard A1A1 (L/44)",
  //   "Chieftain Mk 10",
  //   "STB-1",
  //   "OF-40",
  //   "M60A3 TTS",
  //   "T-62",
  //   "Leopard A1A1",
  //   "Chieftain Mk 3",
  //   "Type 74G",
  //   "M60A1 (AOS)",
  // ];
  useEffect(() => {
    get("/api/prices").then((v) => {
      setVehicleList(v.map((vehicle) => vehicle.name));
      setAllData(v);
    });
  }, []);
  const findData = (vehicleName) => {
    return allData.find((v) => {
      return v.name === vehicleName;
    });
  };

  return (
    <Autocomplete
      id="vehicle-select"
      options={vehicleList}
      onChange={(event, value) => props.setD(findData(value))}
      renderInput={(params) => <TextField {...params} label="Vehicle" />}
    ></Autocomplete>
  );
};

export default Selector;
