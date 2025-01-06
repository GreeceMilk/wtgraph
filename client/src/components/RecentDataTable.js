import { Paper, TableCell, TableContainer, TableHead, Typography, CircularProgress, Table, TableRow, Collapse, IconButton, TableBody, Box } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import api from '../api/axiosConfig';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';   

import { areAllObjectsValid } from '../Util';

function handleValue(value) {
    if (value === null || value === undefined) {
        return "N/A";
    }
    return value;   
}

const CollapsableRow = ({ groupName, keys, data }) => {
    const [open, setOpen] = React.useState(false);  
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

const RecentDataTable = ({vehicleName}) => {
    const [recentData, setRecentData] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    async function getRecentData() {
        if (areAllObjectsValid([vehicleName])) {
            try {
                const response = await api.get("/api/mostRecentData", {params: {name: vehicleName}});
                setRecentData(response.data);
                setLoading(false);
                console.log("RecentData: ", recentData);  
            } catch (error) {
                console.error(error);
            }
        }
    }


    function dataTable() {
        const keys = Object.keys(recentData).filter((key) => key !== "wk_name" && key !== "id");
        const abKeys = keys.filter((key) => key.includes("ab"));
        const rbKeys = keys.filter((key) => key.includes("rb"));
        const sbKeys = keys.filter((key) => key.includes("sb"));
        const otherKeys = keys.filter((key) => !abKeys.includes(key) && !rbKeys.includes(key) && !sbKeys.includes(key));
        return (
                <Table size='small'>
                    <caption>
                        The most recent data for the {vehicleName}
                    </caption>
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>Vehicle Name</TableCell>
                            <TableCell>{recentData?.wk_name}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {otherKeys.map((key) => {
                            return (
                                <TableRow>
                                    <TableCell/>
                                    <TableCell>{key.replaceAll("_", " ")}</TableCell>
                                    <TableCell>{handleValue(recentData[key]).toString().replaceAll("_", " ")}</TableCell>
                                </TableRow>
                            )
                        })}
                        <CollapsableRow groupName="AB Stats" keys={abKeys} data={recentData} />
                        <CollapsableRow groupName="RB Stats" keys={rbKeys} data={recentData} />
                        <CollapsableRow groupName="SB Stats" keys={sbKeys} data={recentData} />
                    </TableBody>
                </Table>
        )
    }
    
    function chooseDisplayContent() {
        console.log("VehicleName: ", vehicleName);
        if (vehicleName === null || vehicleName === undefined) {
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
        getRecentData();
    
    }, [vehicleName])
    

  return (
    <Paper sx={{p: 1}}>
        {chooseDisplayContent()}
    </Paper>
  )
}

export default RecentDataTable
