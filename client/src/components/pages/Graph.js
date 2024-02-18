import React, { useState, useEffect } from "react";
import Selector from "../modules/Selector.js";
import { get } from "../../utilities";
import OneGraph from "../modules/OneGraph.js";
import "./Graph.css";

const Graph = (props) => {
  const [gamemode, setGamemode] = useState("AB");
  const [nation, setNation] = useState("USA");
  const [cls, setCls] = useState("Ground_vehicles");
  const [startBr, setStartBr] = useState(1.0);
  const [brRange, setBrRange] = useState(0);
  const [field, setField] = useState("ab_win_rate");
  const [data, setData] = useState([]);
  const convertBr = (brStr) => {
    if (brStr === "All") {
      setBrRange(2);
    }
    return setBrRange(parseInt(brStr));
  };
  const convertField = (fieldStr) => {
    if (gamemode) {
      if (fieldStr === "Win Rate") {
        setField(`${gamemode.toLowerCase()}_win_rate`);
      } else if (fieldStr === "# of Battles") {
        setField(`${gamemode.toLowerCase()}_battles_sum`);
      } else if (fieldStr === "Air Frags/Battle") {
        setField(`${gamemode.toLowerCase()}_air_frags_per_battle`);
      } else if (fieldStr === "Ground Frags/Battle") {
        setField(`${gamemode.toLowerCase()}_ground_frags_per_battle`);
      } else if (fieldStr === "Ground Frags/Death") {
        setField(`${gamemode.toLowerCase()}_ground_frags_per_death`);
      } else if (fieldStr === "Air Frags/Death") {
        setField(`${gamemode.toLowerCase()}_air_frags_per_death`);
      }
    }
  };

  useEffect(() => {
    get("/api/nations", {
      gamemode: gamemode.toLowerCase(),
      cls: cls,
      nation: nation,
      br: startBr,
      brRange: brRange,
      field: field,
    }).then((v) => {
      console.log(v[0]);
      console.log(v.length);
      setData(v);
    });
  }, [gamemode, nation, cls, startBr, brRange, field]);
  console.log(gamemode, nation, cls, startBr, brRange);

  return (
    <>
      <div className="u-flex graph-selectorContainer">
        <div className="graph-selector">
          <Selector func={setGamemode} mode="gamemode" />
        </div>
        <div className="graph-selector">
          <Selector func={setNation} mode="nation" />
        </div>
        <div className="graph-selector">
          <Selector func={setCls} mode="cls" nation={nation} />
        </div>
        <div className="graph-selector">
          <Selector func={convertBr} mode="brRange" />
        </div>
        <div className="graph-selector">
          <Selector
            func={setStartBr}
            mode="br"
            gamemode={gamemode.toLowerCase()}
            nation={nation}
            cls={cls}
            brRange={brRange}
          />
        </div>
        <div className="graph-selector">
          <Selector func={convertField} mode="dataEntry" />
        </div>
      </div>
      <div className="">
        {data ? (
          <OneGraph
            dataX={data.map((element) => element.date)}
            dataY={data.map((element) => element[field])}
          />
        ) : (
          <p>Please Select an Item</p>
        )}
      </div>
    </>
  );
};
export default Graph;
