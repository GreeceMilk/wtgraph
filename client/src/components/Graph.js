import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig.js';
import {Line} from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js';
import "chartjs-adapter-date-fns";

import { Box, TextField, Autocomplete } from '@mui/material';
import { set } from 'date-fns';

// import { parseISO } from 'date-fns';

const modes = ['ab', 'rb', 'sb'];
const brRanges = ['0', '1', 'all']

Chart.register(...registerables);

const Graph = () => {
    const [data, setData] = useState(null);
    const [mode, setMode] = useState(null);
    const [brRange, setBrRange] = useState(null);

    const [nation, setNation] = useState(null);
    const [nationList, setNationList] = useState([]);
    const [isNationDisabled, setIsNationDisabled] = useState(true);

    const [cls, setCls] = useState(null);
    const [isClsDisabled, setIsClsDisabled] = useState(true);
    const [clsList, setClsList] = useState([]);

    const [lowerBr, setLowerBr] = useState(null);
    const [isLowerBrDisabled, setIsLowerBrDisabled] = useState(true);
    const [lowerBrList, setLowerBrList] = useState([]);

    function areAllObjectsValid(array) {
        return array.every((element) => element !== undefined && element !== null);
    }

    async function getData() {
        const response = await api.get("/api/nationData", 
            {params: {mode: mode, brRange: brRange, nation: nation, cls: cls, output: mode+"_battles_mean", lowerBr: lowerBr}});
        let temp = {
            datasets: [{
                label: "test",
                data: response.data,
            }]
        };
        console.log("Temp: ", temp);
        setData(temp);
        // console.log("Response: ", response);
        // console.log(data);
    }

    async function getNationList() {
        if (areAllObjectsValid([mode, brRange])) {
            const response = await api.get("/api/nationList", {params: {mode: mode, brRange: brRange}});
            console.log("Nation List: ", response.data);
            setNationList(response.data);
        }
    }

    async function getClsList() {
        if (areAllObjectsValid([mode, brRange, nation])) {
            const response = await api.get("/api/clsList", {params: {mode: mode, brRange: brRange, nation: nation}});
            console.log("Cls List: ", response.data);
            setClsList(response.data);
        }
    }

    async function getLowerBrList() {
        if (areAllObjectsValid([mode, brRange, nation, cls])) {
            const response = await api.get("/api/brList", {params: {mode: mode, brRange: brRange, nation: nation, cls: cls}});
            console.log("Lower BR List: ", response.data);
            setLowerBrList(response.data.map((element) => element.toString()));
        }
    }

    // useEffect(() => {getData();},[]);

    useEffect(() => { 
        // console.log("Mode is"+mode); console.log("brRagne is" + brRange);
        setNation(null); setNationList([]); 
        console.log("Initial nation", nation);
        const isValid = areAllObjectsValid([mode, brRange]);
        setIsNationDisabled(!isValid);
        console.log("Nation enabled: ", isValid);
        if (isValid) {
            try {
                getNationList();
            } catch (error) {
                console.log(error);
                setIsNationDisabled(true);
            }
        }
    }, [mode, brRange]);
    
    useEffect(() => {
        setCls(null); setClsList([]);
        const isValid = !isNationDisabled && areAllObjectsValid([nation]);
        setIsClsDisabled(!isValid);
        if (isValid) {
            try {
                getClsList();
            } catch (error) {
                console.log(error);
                setIsClsDisabled(true);
            }
        }
        
    }, [nation]);

    useEffect(() => {
        setLowerBr(null); setLowerBrList([]);
        const isValid = !isClsDisabled && areAllObjectsValid([cls]);
        setIsLowerBrDisabled(!isValid);
        if (isValid) {
            try {
                getLowerBrList();
            } catch (error) {
                console.log(error);
                setIsLowerBrDisabled(true);
            }
        }
    }, [cls])

    useEffect(() => {
        setData(null);
        if (areAllObjectsValid([mode, brRange, nation, cls, lowerBr])) {
            try {
                getData();
            } catch (error) {
                console.log(error);
            }
        }
    }, [lowerBr])

    const options = {
        parsing: {
            xAxisKey: "date", 
            yAxisKey: "ydata",
        },
        plugins: {
            title: {
                display: true,
                text: "test",
            },
        },
        scales: {
            x: {
                // border: {
                //     color: "#d4d4d4",
                // },
                // ticks: {
                //     color: "#d4d4d4",
                // },
                type: "time",
                time: {
                    // parser: "yyyy-MM-dd",
                    // displayFormats: {
                    //     day: "yy-MM-dd",
                    // },
                    unit: "month",
                    tooltipFormat: "yy-MM-dd",
                },
                // title: {
                //     display: true,
                //     text: "Date",
                // }
                // ticks: {
                //     source: "data",
                // },
            },
            y: {
                // suggestedMin: 0,
                // suggestedMax: 13,
                border: {
                    color: "#d4d4d4",
                },
                ticks: {
                    color: "#d4d4d4",
                },
            },
        },
        elements: {
            point: {
                pointStyle: false,
            },
        },
        // clip: 2,
    }
    return (
        <div>
            <Autocomplete
                id='mode'
                options={modes}
                onChange={(event, newValue) => {
                    setMode(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Mode" />}
                sx={{width: 300}}
            />
            <Autocomplete
                id='brRange'
                options={brRanges}
                onChange={(event, newValue) => {
                    setBrRange(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="BR Range" />}
                sx={{width: 300}}
            />
            <Autocomplete
                value={nation}
                disabled={isNationDisabled}
                id='nation'
                options={nationList}
                onChange={(event, newValue) => {
                    setNation(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Nation" />}
                sx={{width: 300}}
            />
            <Autocomplete
                value={cls}
                disabled={isClsDisabled}
                id='cls'
                options={clsList}
                onChange={(event, newValue) => {
                    setCls(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Cls" />}
                sx={{width: 300}}
            />

            <Autocomplete
                value={lowerBr}
                disabled={isLowerBrDisabled}
                id='cls'
                options={lowerBrList}
                onChange={(event, newValue) => {
                    setLowerBr(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Lower Br" />}
                sx={{width: 300}}
            />
            <div width="800" height="400">
                {data?<Line data={data} options={options} />:null}
            </div>
        </div>
    )
}

export default Graph
