import { Paper, TableCell, TableContainer, TableHead, Typography, CircularProgress, Table, TableRow, Collapse, IconButton, TableBody, Box } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import api from '../api/axiosConfig';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';   
import VehicleGraph from './VehicleGraph';
import NationGraph from './NationGraph';

import { areAllObjectsValid } from '../Util';

function handleValue(value) {
    if (value === null || value === undefined) {
        return "N/A";
    }
    return value;   
}

const CollapsableRow = ({ groupName, data }) => {
    const [open, setOpen] = React.useState(false);  
    const keys = Object.keys(data);
    return (
    <React.Fragment>
            <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton size='small' onClick={() => setOpen(!open)}>
                        {open ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell>{groupName}</TableCell>
                <TableCell/>
            </TableRow>
            <TableRow>
                <TableCell colSpan={3} sx={{p: 0}}>
                    <Box >

                        <Collapse in={open} timeout={"auto"} unmountOnExit>
                            <Table size='small'>
                                <TableBody>
                                    {keys.map((key) => {
                                        return (
                                                    <TableRow>
                                                        <TableCell/>
                                                        <TableCell/>
                                                        <TableCell align='left'>{key.replaceAll("_", " ")}</TableCell>
                                                        <TableCell align='left'>{handleValue(data[key]).toString().replaceAll("_", " ")}</TableCell>
                                                    </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </Collapse>
                    </Box>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const RecentDataTable = ({inputName, Selector}) => {
    const [recentData, setRecentData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const vehicleUrl = "/api/mostRecentVehicleData";
    const nationUrl = "/api/mostRecentNationData";  

    async function getRecentVehicleData() {
        if (areAllObjectsValid([inputName])) {
            try {
                const response = await api.get(vehicleUrl, {params: {name: inputName}});
                const data = response.data;
                const keys = Object.keys(data).filter((key) => key !== "wk_name" && key !== "id");
                const abKeys = keys.filter((key) => key.includes("ab"));
                const rbKeys = keys.filter((key) => key.includes("rb"));
                const sbKeys = keys.filter((key) => key.includes("sb"));
                const otherKeys = keys.filter((key) => !abKeys.includes(key) && !rbKeys.includes(key) && !sbKeys.includes(key));
                setRecentData({
                    name: data.wk_name,
                    ab: formatVehicleData(abKeys, data),
                    rb: formatVehicleData(rbKeys, data),
                    sb: formatVehicleData(sbKeys, data),
                    other: formatVehicleData(otherKeys, data),
                })
                setLoading(false);
                console.log("RecentData: ", recentData);  
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function getRecentNationData() {
        if (areAllObjectsValid([inputName])) {
            try {
                const response = await api.get(nationUrl, {params: {nation: inputName}});
                const data = response.data;
                for (let key in data) {
                    delete data[key].id;
                }
                setRecentData(data)
                setLoading(false);
                // console.log("RecentData: ", recentData);  
            } catch (error) {
                console.error(error);
            }
        }
    }

    function formatVehicleData(keys, data) {
        let result = {};
        keys.forEach((key) => {
            result[key] = data[key];
        });
        return result;
    }


    function dataTable() {
        // const keys = Object.keys(recentData).filter((key) => key !== "wk_name" && key !== "id");
        // const abKeys = keys.filter((key) => key.includes("ab"));
        // const rbKeys = keys.filter((key) => key.includes("rb"));
        // const sbKeys = keys.filter((key) => key.includes("sb"));
        // const otherKeys = keys.filter((key) => !abKeys.includes(key) && !rbKeys.includes(key) && !sbKeys.includes(key));
        return (
                <Table size='small'>
                    <caption>
                        The most recent data for the {inputName}
                    </caption>
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>Vehicle Name</TableCell>
                            <TableCell>{recentData?.name}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recentData?.other ? Object.keys(recentData.other).map((key) => {
                            return (
                                <TableRow>
                                    <TableCell/>
                                    <TableCell>{key.replaceAll("_", " ")}</TableCell>
                                    <TableCell>{handleValue(recentData?.other[key]).toString().replaceAll("_", " ")}</TableCell>
                                </TableRow>
                            )
                        }): null}
                        <CollapsableRow groupName="AB Stats" data={recentData?.ab} />
                        <CollapsableRow groupName="RB Stats" data={recentData?.rb} />
                        <CollapsableRow groupName="SB Stats" data={recentData?.sb} />
                    </TableBody>
                </Table>
        )
    }
    
    function chooseDisplayContent() {
        console.log("VehicleName: ", inputName);
        if (inputName === null || inputName === undefined) {
            return (
                <Typography>
                    Please select a vehicle
                </Typography>
            )

        }
        if (loading){
            return (
                <CircularProgress  sx={{mt: 4, mb: 4}}/>
            )
        }
        if (recentData === null || recentData === undefined) {
            return (
                <Typography>An error occurred while fetching data</Typography>
            )
        }
        return dataTable();
    }

    useEffect(() => {
        setLoading(true);
        if (Selector === VehicleGraph) {
            getRecentVehicleData();
        } else if (Selector === NationGraph) {
            getRecentNationData();
        }
    
    }, [inputName])
    

  return (
    <Paper sx={{p: 1}}>
        {chooseDisplayContent()}
    </Paper>
  )
}

export default RecentDataTable
