import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig.js';
import {Line} from 'react-chartjs-2';
import {Chart, registerables} from 'chart.js';
import "chartjs-adapter-date-fns";
import autocolors from 'chartjs-plugin-autocolors';
import {v4 as uuidv4} from 'uuid'

import {modes, convertSpaceToSnake} from '../Util.js';

import { Box, TextField, Autocomplete, Button, Slider } from '@mui/material';
// import { set } from 'date-fns';

import DatasetList from './DatasetList.js';
import { setDefaultOptions } from 'date-fns';

Chart.register(...registerables);

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

    const timeoutRef = React.useRef(null);
    const timeout = 500;

    function areAllObjectsValid(array) {
        return array.every((element) => element !== undefined && element !== null);
    }

    async function getData() {
        if (areAllObjectsValid([vehicle, outputX, outputY])) {
            try {
                const response = await api.get("/api/vehicleData", 
                    {params: {wkName: vehicle, outputX: convertSpaceToSnake(outputX), outputY: convertSpaceToSnake(outputY)}});
                let temp = {
                    id: uuidv4(),
                    label: "new dataset",
                    data: response.data,
                    saved: false,
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
        setOutputY(null);
        if (outputX) {
            const temp = outputXList.filter((element) => element !== outputX);
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
        resetLastDataset();
        getData();
        console.log("OutputX: ", outputX);
        console.log("OutputY: ", outputY);
    }, [outputX, outputY, vehicle])

    useEffect(() => {
        if (data.datasets.length > 0 && !data.datasets[data.datasets.length - 1].saved) {
            setIsDataSetNameDisabled(false);
            setDataSetName(vehicle+" "+outputX+" "+outputY);
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

    


    const options = {
        parsing: {
            xAxisKey: "xdata", 
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
                id='mode'
                value={mode}
                options={modes}
                onChange={(event, newValue) => {
                    setMode(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Mode" />}
                sx={{width: 300}}
            />
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

            <Autocomplete
                id='outputX'
                disabled={isOutputLocked}
                options={outputXList.map((element) => element.replaceAll("_", " "))}
                onChange={(event, newValue) => {
                    setOutputX(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Output field" />}
                sx={{width: 300}}
            />

            <Autocomplete
                id='outputY'
                disabled={isOutputLocked}
                options={outputYList.map((element) => element.replaceAll("_", " "))}
                onChange={(event, newValue) => {
                    setOutputY(newValue);
                }}
                renderInput={(params) => <TextField {...params} label="Output field" />}
                sx={{width: 300}}
            />

            <TextField required id="dataset name" label="Enter Dataset Name" variant="outlined" 
                        value={dataSetName} disabled={isDataSetNameDisabled} onChange={(event) => {setDataSetName(event.target.value)}}
                        sx={{width: 300}}/>

            <Button variant="outlined" onClick={saveDataset}>Save Data</Button>

            <div width="800" height="400">
                {data?<Line data={data} options={options} />:null}
            </div>
            <DatasetList datasets={data.datasets} deleteItem={deleteItem}/>
        </div>
    )
}

export default VehicleGraph
