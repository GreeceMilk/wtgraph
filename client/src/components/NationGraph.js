import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig.js';
import {Chart, registerables} from 'chart.js';
import "chartjs-adapter-date-fns";
import autocolors from 'chartjs-plugin-autocolors';
import {v4 as uuidv4} from 'uuid';
import {modes, brRanges, outputListNation as outputList} from '../Util.js';

import { Box, TextField, Autocomplete, Grid2 as Grid } from '@mui/material';
// import { set } from 'date-fns';

// import { parseISO } from 'date-fns';

// const modes = ['ab', 'rb', 'sb'];
// const brRanges = ['0', '1', 'all']
// const outputList = [
//     "win_rate",
//     "battles_sum",
//     "battles_mean",
//     "ground_frags_per_battle", 
//     "ground_frags_per_death",
//     "air_frags_per_battle",
//     "air_frags_per_death"]

Chart.register(...registerables, autocolors);

const NationGraph = ({data, setData, outputX, setOutputX, setDataSetName, setIsDataSetNameDisabled}) => {
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

    const [output, setOutput] = useState(null);
    // TODO: locking output after data is saved

    // const [dataSetName, setDataSetName] = useState("");
    // const [isDataSetNameDisabled, setIsDataSetNameDisabled] = useState(true);

    function areAllObjectsValid(array) {
        return array.every((element) => element !== undefined && element !== null);
    }

    async function getData() {
        if (areAllObjectsValid([mode, brRange, nation, cls, lowerBr, output])) {
            try {
                const response = await api.get("/api/nationData", 
                    {params: {mode: mode, brRange: brRange, nation: nation, cls: cls, output: mode+"_"+output.replaceAll(" ", "_"), lowerBr: lowerBr}});
                let temp = {
                    id: uuidv4(),
                    label: "dataset",
                    data: response.data,
                    saved: false,
                    hidden: false,
                };
                if (data.datasets.length === 0 || data.datasets[data.datasets.length - 1].saved) {
                    setData({datasets: [...data.datasets, temp]});
                } else {
                    let tempData = data.datasets;
                    tempData[tempData.length - 1] = temp;
                    setData({datasets: tempData});
                }
                console.log("Data received: ", response.data);
            } catch (error) {
                console.log(error);
                console.log("Parameter incorrect");
                console.log("mode: ", mode);
                console.log("brRange: ", brRange);
                console.log("nation: ", nation);
                console.log("cls: ", cls);
                console.log("lowerBr: ", lowerBr);
                console.log("output: ", output);
            }
        } else {
            console.log("Parameter is null or undefined");
        }
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

    function saveDataset() {
        if (data && data.datasets.length > 0) {
            console.log("Saving dataset: ", dataSetName);
            // data.datasets[data.datasets.length - 1].label = dataSetName;
            // data.datasets[data.datasets.length - 1].saved = true;
            setData({datasets: [...data.datasets.slice(0, data.datasets.length - 1), 
                {id: data.datasets[data.datasets.length - 1].id, label: dataSetName, data: data.datasets[data.datasets.length - 1].data, saved: true}]});
        } else {
            console.log("Data is not saved");
        }
        console.log("Data: ", data);
        setMode(null);
        setBrRange(null);
    }

    function resetLastDataset() {
        if (data.datasets.length > 0 && !data.datasets[data.datasets.length - 1].saved) {
            setData({datasets: data.datasets.slice(0, data.datasets.length - 1)});
        }
    }

    function deleteItem(id) {
        setData({datasets: data.datasets.filter((data) => data.id !== id)});
    }

    useEffect(() => {
      setOutputX("date");
    
    }, [])
    

    useEffect(() => { 
        // console.log("Mode is"+mode); console.log("brRagne is" + brRange);
        setNation(null); setNationList([]); 
        // console.log("Initial nation", nation);
        const isValid = areAllObjectsValid([mode, brRange]);
        setIsNationDisabled(!isValid);
        // console.log("Nation enabled: ", isValid);
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
        resetLastDataset();
        getData();
    }, [lowerBr])

    useEffect(() => {
        resetLastDataset();
        getData();
        console.log("Output: ", output);
    }, [output])

    useEffect(() => {
        if (data.datasets.length > 0 && !data.datasets[data.datasets.length - 1].saved) {
            setIsDataSetNameDisabled(false);
            setDataSetName(mode+" "+brRange+" "+nation+" "+cls+" "+lowerBr+" "+output);
        } else {
            setIsDataSetNameDisabled(true);
            setDataSetName("");
        }
        if (data.datasets.length > 0 && data.datasets[data.datasets.length - 1].saved) {
            setMode(null);
            setBrRange(null);
        }
    }, [data])

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
            autocolors,
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
        <Box>
            <Grid container spacing={2} direction={'column'}>
                <Grid item>
                    <Autocomplete
                        id='mode'
                        value={mode}
                        options={modes}
                        onChange={(event, newValue) => {
                            setMode(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Mode" />}
                        sx={{width: 300}}
                    />
                </Grid>
                <Grid item>
                    <Autocomplete
                        id='brRange'
                        value={brRange}
                        options={brRanges}
                        onChange={(event, newValue) => {
                            setBrRange(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="BR Range" />}
                        sx={{width: 300}}
                    />
                </Grid>
                <Grid item>
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
                </Grid>
                <Grid item>
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
                </Grid>
                <Grid item>
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
                </Grid>
                <Grid item>
                    <Autocomplete
                        id='output'
                        options={outputList.map((element) => element.replaceAll("_", " "))}
                        onChange={(event, newValue) => {
                            setOutput(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} label="Output field" />}
                        sx={{width: 300}}
                    />
                </Grid>
            </Grid>
            
        </Box>
    )
}

export default NationGraph
