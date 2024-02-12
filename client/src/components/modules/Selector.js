import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { get } from "../../utilities";

const Selector = (props) => {
  const [list, setList] = useState([]);
  // const [allData, setAllData] = useState([]);
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
    if (props.mode === "price") {
      get("/api/price_list").then((v) => {
        setList(v.map((element) => element._id));
      });
    } else if (props.mode === "nation") {
      get("/api/nation_list").then((v) => {
        setList(v);
      });
    } else if (props.mode === "vehicle") {
      get("/api/vehicle_list").then((v) => {
        setList(v);
      });
    } else if (props.mode === "BR") {
      get("").then((v) => {
        setList(v); // Fill details
      });
    }
  }, []);
  // const findData = (vehicleName) => {
  //   return allData.find((v) => {
  //     return v.name === vehicleName;
  //   });
  // };

  return (
    <Autocomplete
      id="vehicle-select"
      options={list}
      onChange={(event, value) => props.func(value)}
      renderInput={(params) => <TextField {...params} label="Vehicle" />}
    ></Autocomplete>
  );
};

export default Selector;
