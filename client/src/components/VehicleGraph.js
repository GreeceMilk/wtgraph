import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig.js';
import {Line, Scatter} from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js';
import "chartjs-adapter-date-fns";
import autocolors from 'chartjs-plugin-autocolors';
import {v4 as uuidv4} from 'uuid'
import Graph from './Graph.js';

import {modes, convertSpaceToSnake, chooseGraph, graphOptions} from '../Util.js';

import { Box, TextField, Autocomplete, Button, Slider, Container, Grid2 as Grid, Stack, Typography, FormGroup, FormControlLabel, Switch } from '@mui/material';
// import { set } from 'date-fns';

import DatasetList from './DatasetList.js';
import { setDefaultOptions } from 'date-fns';

Chart.register(...registerables, autocolors);

const VehicleGraph = () => {
    const [data, setData] = useState({datasets:[]});
    const [mode, setMode] = useState("rb");

    const [nation, setNation] = useState("USA");
    const [nationList, setNationList] = useState([]);
    // const [isNationDisabled, setIsNationDisabled] = useState(true);

    const [cls, setCls] = useState("Ground_vehicles");
    const [isClsDisabled, setIsClsDisabled] = useState(true);
    const [clsList, setClsList] = useState([]);

    const [brRange, setBrRange] = useState([0, 0]);
    const [brList, setBrList] = useState([]);
    const [isBrListDisabled, setIsBrListDisabled] = useState(true);

    const [vehicle, setVehicle] = useState(null);
    const [isVehicleDisabled, setIsVehicleDisabled] = useState(true);
    const [vehicleList, setVehicleList] = useState([]);
    const [isVehicleListLoading, setIsVehicleListLoading] = useState(false);

    const [outputX, setOutputX] = useState(null);
    const [outputXList, setOutputXList] = useState([]);
    const [outputY, setOutputY] = useState(null);
    const [outputYList, setOutputYList] = useState([]);

    const [isOutputLocked, setIsOutputLocked] = useState(false);

    const [dataSetName, setDataSetName] = useState("");
    const [isDataSetNameDisabled, setIsDataSetNameDisabled] = useState(true);

    const [toExcludeZeros, setToExcludeZeros] = useState(false);

    const timeoutRef = React.useRef(null);
    const timeout = 500;

    function areAllObjectsValid(array) {
        return array.every((element) => element !== undefined && element !== null);
    }

    async function getData() {
        if (areAllObjectsValid([vehicle, outputX, outputY])) {
            try {
                const response = await api.get(outputX === "date"?"/api/vehicleData":"/api/vehicleDataWithCount", 
                    {params: {name: vehicle.name, outputX: convertSpaceToSnake(outputX), outputY: convertSpaceToSnake(outputY)}});
                let temp = {
                    id: uuidv4(),
                    label: "new dataset",
                    data: response.data,
                    saved: false,
                };
                if (data.datasets.length === 0 || data.datasets[data.datasets.length - 1].saved) {
                    setData({datasets: [...data.datasets, temp]});
                    console.log("Dataset added", temp);
                } else {
                    setData({datasets: [...data.datasets.slice(0, data.datasets.length - 1), temp]});
                    console.log("Dataset replaced", temp);
                }
            } catch (error) {
                console.log(error);
                console.log("Parameter incorrect");
                console.log("Vehicle: ", vehicle);
                console.log("OutputX: ", outputX);
                console.log("OutputY: ", outputY);
            }
        } else {
            console.log("Parameter is null or undefined");
        }
    }

    async function getNationList() {
        if (areAllObjectsValid([mode, brRange])) {
            const response = await api.get("/api/nationList", {params: {mode: "rb", brRange: "1"}});
            console.log("Nation List: ", response.data);
            setNationList(response.data);
        }
    }

    async function getClsList() {
        if (areAllObjectsValid([mode, brRange, nation])) {
            const response = await api.get("/api/clsList", {params: {mode: mode, brRange: "1", nation: nation}});
            console.log("Cls List: ", response.data);
            setClsList(response.data);
        }
    }

    async function getBrList() {
        if (areAllObjectsValid([mode])) {
            const response = await api.get("/api/vehicleBrList", {params: {mode: mode}});
            console.log("Br List received: ", response.data.map(element => parseFloat(element)));
            setBrList(response.data.map(element => parseFloat(element)));
        } else {
            console.log("Mode is null or undefined");
        }
    }

    async function getVehicleList() {
        if (areAllObjectsValid([mode, brRange, nation, cls])) {
            setIsVehicleListLoading(true);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(async () => {
                const response = await api.get("/api/vehicleList", {params: {nation: nation, cls: cls, mode: mode, lowerBr: brRange[0], upperBr: brRange[1]}});
                console.log("Vehicle List: ", response.data);
                setVehicleList(response.data);
                setIsVehicleListLoading(false);
            }, timeout);
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
        setVehicle(null);
    }

    async function getOutputList() {
        const response = await api.get("/api/outputList");
        console.log("Output List: ", response.data);
        setOutputXList(response.data);
    }

    function resetLastDataset() {
        if (data.datasets.length > 0 && !data.datasets[data.datasets.length - 1].saved) {
            setData({datasets: data.datasets.slice(0, data.datasets.length - 1)});
        }
    }

    function deleteItem(id) {
        setData({datasets: data.datasets.filter((data) => data.id !== id)});
    }

    function setDefaultBrRange() {
        console.log("Br List: ", brList);
        setBrRange([parseFloat(brList[0]), parseFloat(brList[brList.length - 1])]);
    }

    function excludeZeros() {
        let temp = data.datasets[data.datasets.length - 1].data.filter((element) => element.ydata !== 0);
        setData({datasets: [...data.datasets.slice(0, data.datasets.length - 1), 
            {id: data.datasets[data.datasets.length - 1].id, label: data.datasets[data.datasets.length - 1].label, data: temp, saved: false}]});
    }

    useEffect(() => {
        getBrList();
        getNationList();
        getOutputList();
    }, []);

    useEffect(() => {
        if (brList.length > 0) {
        setDefaultBrRange();
        }
    }, [brList])

    useEffect(() => {
      return () => {
         if (timeoutRef.current) {
             clearTimeout(timeoutRef.current);
         }
      }
    }, [])
    
    
    useEffect(() => {
        resetLastDataset();
        setOutputY(null);
        if (outputX) {
            const temp = outputXList.filter((element) => element !== outputX && element !== "date");
            setOutputYList(temp);
        }
    }, [outputX])

    // useEffect(() => { 
    //     setNation(null); setNationList([]); 
    //     const isValid = areAllObjectsValid([mode, brRange]);
    //     setIsNationDisabled(!isValid);
    //     if (isValid) {
    //         try {
    //             getNationList();
    //         } catch (error) {
    //             console.log(error);
    //             setIsNationDisabled(true);
    //         }
    //     }
    // }, [mode, brRange,]);
    
    useEffect(() => {
        setCls(null); setClsList([]);
        const isValid = areAllObjectsValid([nation]);
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
        setVehicle(null); setVehicleList([]);
        const isValid = !isClsDisabled && areAllObjectsValid([cls]);
        setIsVehicleDisabled(!isValid);
        if (isValid) {
            try {
                getVehicleList();
            } catch (error) {
                console.log(error);
            }
        }
    }, [mode, brRange, nation, cls]);

    useEffect(() => {
        // resetLastDataset();
        getData();
        console.log("OutputX: ", outputX);
        console.log("OutputY: ", outputY);
    }, [outputY, vehicle])

    useEffect(() => {
        if (data.datasets.length > 0 && !data.datasets[data.datasets.length - 1].saved) {
            setIsDataSetNameDisabled(false);
            setDataSetName(vehicle.label+" "+outputX+" "+outputY);
        } else {
            setIsDataSetNameDisabled(true);
            setDataSetName("");
        }
        if (data.datasets.length === 0 || (data.datasets.length === 1 && !data.datasets[data.datasets.length - 1].saved)) {
            setIsOutputLocked(false);
        } else {
            setIsOutputLocked(true);
        }
    }, [data])

    useEffect(() => {
        setIsBrListDisabled(brList.length === 0 || brRange.length !== 2);
        console.log("Br range: ", brRange);
    }, [brList, brRange])

    
    // useEffect(() => {
    //     if (toExcludeZeros && data.datasets.length > 0 && !data.datasets[data.datasets.length - 1].saved) {
    //         excludeZeros();
    //     } else {
    //         getData();
    //         console.log("Get data");
    //         console.log("To exclude zeros: ", toExcludeZeros);
    //     }
    // }, [toExcludeZeros])
    

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid size={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Box sx={{border: 2, borderColor: "info.light", borderRadius: 5,  p: 2, textAlign: 'center'}}>
                            <Grid container direction={"column"} spacing={2}>
                                <Grid size={'auto'}>
                                    <Autocomplete
                                        value={nation}
                                        // disabled={isNationDisabled}
                                        id='nation'
                                        options={nationList}
                                        onChange={(event, newValue) => {
                                            setNation(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Nation" />}
                                        sx={{width: 300}}
                                    />

                                </Grid>
                                <Grid size={'auto'}>
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
                                <Grid size={'auto'}>
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
                                <Grid size={'auto'}>
                                    <Box sx={{width: 300}}>
                                        <Slider 
                                            disabled={isBrListDisabled}
                                            step={null}
                                            marks={isBrListDisabled?null:brList.map((element) => {return {value: parseFloat(element)}})}
                                            valueLabelDisplay='auto'
                                            value={brRange}
                                            onChange={(event, newValue) => {setBrRange(newValue)}}
                                            min={isBrListDisabled?0:parseFloat(brList[0])}
                                            max={isBrListDisabled?0:parseFloat(brList[brList.length - 1])}
                                        />
                                    </Box> 

                                </Grid>
                                <Grid size={'auto'}>
                                    <Autocomplete
                                        loading={isVehicleListLoading}
                                        value={vehicle}
                                        disabled={isVehicleDisabled}
                                        id='vehicle'
                                        options={vehicleList}
                                        onChange={(event, newValue) => {
                                            setVehicle(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Vehicle" />}
                                        sx={{width: 300}}
                                    />

                                </Grid>
                                <Grid size={'auto'}>
                                    <Autocomplete
                                        id='outputX'
                                        value={outputX}
                                        disabled={isOutputLocked}
                                        options={outputXList.map((element) => element.replaceAll("_", " "))}
                                        onChange={(event, newValue) => {
                                            setOutputX(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Output field" />}
                                        sx={{width: 300}}
                                    />

                                </Grid>
                                <Grid size={'auto'}> 
                                    <Autocomplete
                                        id='outputY'
                                        value={outputY}
                                        disabled={isOutputLocked}
                                        options={outputYList.map((element) => element.replaceAll("_", " "))}
                                        onChange={(event, newValue) => {
                                            setOutputY(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} label="Output field" />}
                                        sx={{width: 300}}
                                    />

                                

                                </Grid>
                                {/* <Grid size={'auto'}>
                                    <FormGroup>
                                        <FormControlLabel control={<Switch checked={toExcludeZeros} onChange={(event, newValue) => {setToExcludeZeros(newValue)}}/>} label="Exclude Zeros"/> 
                                    </FormGroup>
                                </Grid> */}

                            </Grid>
                        </Box>


                </Grid>
                <Grid size={"grow"} flexGrow={1}>
                    <Box sx={{ border: 2, borderColor: 'info.light', borderRadius: 5, p: 2, textAlign: 'center', height: '100%'}}>
                        <Typography>Dataset List</Typography>
                        <DatasetList datasets={data.datasets} deleteItem={deleteItem}/>
                    </Box>
                </Grid>
                <Grid size={12}>
                    <Box sx={{p: 2, textAlign: 'center'}}>
                        <TextField required id="dataset name" label="Enter Dataset Name" variant="outlined" 
                                    value={dataSetName} disabled={isDataSetNameDisabled} onChange={(event) => {setDataSetName(event.target.value)}}
                                    sx={{width: 300}}/>
                        <Button variant="outlined" onClick={saveDataset}>Save Data</Button>
                    </Box>
                </Grid>
                <Grid size={12}>
                    <div width="800" height="400">
                        <Graph data={data} outputX={outputX}></Graph>
                    </div>
                </Grid>


            </Grid>
            
        </Container>
    )
}

export default VehicleGraph
