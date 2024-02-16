import React, { useState, useEffect } from "react";

const Graph = (props) => {
  const [gamemode, setGamemode] = useState("");
  const [nation, setNation] = useState("");
  const [cls, setCls] = useState("");
  const [startBr, setStartBr] = useState(0);
  const [brRange, setBrRange] = useState(0);
  return  (
    <div className="u-flex">
      <div className="">
        <Selector func={setGamemode} mode="gamemode"/>
      </div> 
      <div className="">
        <Selector func={setNation} mode="nation" />
      </div>
      <div className="">
        <Selector func={setCls} mode="cls" />
      </div>
      <div className="">
        <Selector func={setStartBr} mode="br" />
      </div>
      <div className="">
        <Selector func={setBrRange} mode="brRange"/>
      </div>
      {/* <div className="">
        {data.prices ? <OneGraph data={data} /> : <p>Please Select an Item</p>}
      </div> */}
    </div>
  );;
};
export default Graph;
