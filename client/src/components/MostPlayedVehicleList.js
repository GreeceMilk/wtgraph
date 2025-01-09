import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig.js';
import { Paper, Grid2 as Grid, Button, CircularProgress, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

import { areAllObjectsValid, convertSnakeToSpace } from '../Util.js';   
import InfoItem from './InfoItem.js';

const MostPlayedVehicleList = ({nation, cls, setVehicleName}) => {
    const [vehicleList, setVehicleList] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getVehicleList() {
        if (areAllObjectsValid([nation, cls])) {
            try {
                const response = await api.get("/api/mostPlayedVehicleList", {params: {nation: nation, cls: cls}});
                setVehicleList(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        }
    }

    // function queryParams(name, wkName) {
    //     return new URLSearchParams({
    //         name: name, 
    //         label: wkName+"("+name+")"
    //     })
    // }

    function gridContents() {
        return vehicleList.map((vehicle) => {
            return (
                <Grid item size={{xs: 12, md: 6}}>
                    {/* <NavLink to={`/vehicle?${queryParams(vehicle?.name, vehicle?.label)}`}> */}
                        <Button sx={{width: '100%', borderRadius: 0}} variant='text' color='secondary' disableTouchRipple> 
                            {convertSnakeToSpace(vehicle?.label)}
                        </Button>
                    {/* </NavLink> */}
                </Grid>
            )
        })  
    }

    function chooseDisplayContent() {
        if (!areAllObjectsValid([nation, cls])) {
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
        if (vehicleList === null || vehicleList === undefined) {
            return (
                <Typography>An error occurred while fetching data</Typography>
            )
        }
        return (
        <>
            <Typography variant='h5'>
                Here are the most played vehicles for
            </Typography>
            <Grid container sx={{ml: 4, mr: 4, mb: 2}}>
                <Grid item size={{xs: 12, md: 6}}>
                    <InfoItem name="Nation" content={nation}/>
                </Grid>
                <Grid item size={{xs: 12, md: 6}}>
                    <InfoItem name="Class" content={cls}/>
                </Grid>
            </Grid>
                <Grid container sx={{
                    '--Grid-borderWidth': '1px',
                    borderTop: 'var(--Grid-borderWidth) solid',
                    borderLeft: 'var(--Grid-borderWidth) solid',
                    borderColor: 'divider',
                    '& > div': {
                        borderRight: 'var(--Grid-borderWidth) solid',
                        borderBottom: 'var(--Grid-borderWidth) solid',
                        borderColor: 'divider',
                    },
                    }}>
                    {gridContents()}
                </Grid>
            </>
        );
    }


    useEffect(() => {
        setLoading(true);
        getVehicleList();
    }, [nation, cls])

    
  return (
    <Paper sx={{p: 1}}>
        {chooseDisplayContent()}
    </Paper>
  )
}

export default MostPlayedVehicleList
