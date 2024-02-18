import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { get } from "../../utilities";
// import { setLabels } from "react-chartjs-2/dist/utils";

// props: mode, func

const Selector = (props) => {
  const [list, setList] = useState([]);
  const [label, setLabel] = useState("");
  // testing data
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
      setLabel("Vehicle");
    } else if (props.mode === "nation") {
      get("/api/nation_list").then((v) => {
        setList(v);
      });
      setLabel("Nation");
    } else if (props.mode === "vehicle") {
      get("/api/vehicle_list").then((v) => {
        setList(v);
      });
      setLabel("Vehicle");
    } else if (props.mode === "br") {
      if (props.brRange === 2) {
        setList(["All"]);
      } else {
        get("/api/br_list", { mode: props.gamemode, cls: props.cls, nation: props.nation }).then(
          (v) => {
            // console.log(v);
            setList(v);
          }
        );
      }
      setLabel("Lower BR");
    } else if (props.mode === "gamemode") {
      setList(["RB", "AB", "SB"]);
      setLabel("Gamemode");
    } else if (props.mode === "cls") {
      get("/api/cls_list", { nation: props.nation }).then((v) => {
        setList(v);
      });
      setLabel("Class");
    } else if (props.mode === "brRange") {
      setList(["All", "0", "1"]);
      setLabel("BR Range");
    } else if (props.mode === "dataEntry") {
      setList([
        "Win Rate",
        "# of Battles",
        "Air Frags/Battle",
        "Ground Frags/Battle",
        "Ground Frags/Death",
        "Air Frags/Death",
      ]);
      setLabel("Statistics");
    }
  }, [props]);
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
      renderInput={(params) => <TextField {...params} label={label} />}
    ></Autocomplete>
  );
};

export default Selector;
