import { Button, Card, Divider, TextField, Typography, Paper, Snackbar } from '@mui/material';
import { Box, Grid, styled } from '@mui/system';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Graph from './Graph';
import DatasetList from './DatasetList';
import WikiInfoCard from './WikiInfoCard';
import RecentDataTable from './RecentDataTable';
import VehicleGraph from './VehicleGraph';
import NationGraph from './NationGraph';
import MostPlayedVehicleList from './MostPlayedVehicleList';
import { set } from 'date-fns';
import PageTitle from './PageTitle';

const DisplayPanel = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    borderColor: theme.palette.primary.dark,
    padding: theme.spacing(2),
    // textAlign: 'center',
    height: '100%',
}));

const GraphLayout = ({Selector}) => {
    const [data, setData] = useState({datasets:[]});
    const [outputX, setOutputX] = useState(null);
    const [dataSetName, setDataSetName] = useState("");
    const [isDataSetNameDisabled, setIsDataSetNameDisabled] = useState(true);
    const [dataSavedBarOpen, setDataSavedBarOpen] = useState(false);
    const [selectedVehicleName, setSelectedVehicleName] = useState(null);
    const [selectedNationCls, setSelectedNationCls] = useState(null);

    function saveDataset() {
        if (data && data.datasets.length > 0) {
            console.log("Saving dataset: ", dataSetName);
            // data.datasets[data.datasets.length - 1].label = dataSetName;
            // data.datasets[data.datasets.length - 1].saved = true;
            setData({datasets: [...data.datasets.slice(0, data.datasets.length - 1), 
                {id: data.datasets[data.datasets.length - 1].id, label: dataSetName, data: data.datasets[data.datasets.length - 1].data, saved: true, hidden: false, vehicleName: data.datasets[data.datasets.length - 1].vehicleName}]});
        } else {
            console.log("Data is not saved");
        }
        console.log("Data: ", data);
        setDataSavedBarOpen(true);
        // setVehicle(null);
    }

    function deleteItem(id) {
        setData({datasets: data.datasets.filter((data) => data.id !== id)});
    }
    
    useEffect(() => {
        console.log("OutputX: ", outputX);
    }, [Selector])

    useEffect(() => {
    
      return () => {
        setSelectedVehicleName(null);
      }
    }, [])

    useEffect(() => {
        setData({datasets: []});
        setOutputX(null);
        setDataSetName("");
        setIsDataSetNameDisabled(true);
        setDataSavedBarOpen(false);
        setSelectedVehicleName(null);
        setSelectedNationCls(null);
    }, [Selector])
    

    function switchVisibility(id) {
        setData({datasets: data.datasets.map((data) => {
            if (data.id === id) {
                return {...data, hidden: !data.hidden};
            }
            return data;
        })});
    }

    function getSelectedVehicle() {
        if (Selector === VehicleGraph && typeof selectedVehicleName === "string") {
            return selectedVehicleName;
        }
        return null;
    }

    function getSelectedNation(){
        if (Selector === NationGraph) {
            return selectedNationCls?.nation;
        }
        return null;
    }

    function getSelectedCls() {
        if (Selector === NationGraph) {
            return selectedNationCls?.cls;
        }
        return null;
    }

    function selectionMethod() {
        if (Selector === VehicleGraph) {
            return setSelectedVehicleName;
        } else {
            return setSelectedNationCls;
        }
    }

    function additionalInfo() {
        if (Selector === VehicleGraph) {
            return (
                <Grid container spacing={5} sx={{mt: 4}}>
                    <Grid item size={{xs: 12, md: 6}}>
                        <WikiInfoCard vehicleName={getSelectedVehicle()}/>
                    </Grid>
                    <Grid item size={{xs: 12, md: 6}}>
                        <RecentDataTable inputName={getSelectedVehicle()} Selector={Selector}/>
                    </Grid>
                </Grid>
            )
        } else if (Selector === NationGraph) {
            return (
                <Grid container spacing={5} sx={{mt: 4}}>
                    <Grid item size={{xs: 12, md: 6}}>
                        <MostPlayedVehicleList nation={getSelectedNation()} cls={getSelectedCls()}/>
                    </Grid>
                    <Grid item size={{xs: 12, md: 6}}>
                        <RecentDataTable inputName={getSelectedNation()} Selector={Selector}/>
                    </Grid>
                </Grid>
            )
        }
        return;
    }

  return (
    <>
        <Box>
            <PageTitle text={Selector === VehicleGraph ? "Tracking performance for individual vehicle" : "Win rate, matched played, and other metrics for nations"}/>
            <Grid container spacing={5}>
                <Grid item size={{xs: 12, md: "auto"}}>
                    <DisplayPanel variant='outlined'>
                        <Typography variant='h5' color='secondary.dark' sx={{pl: 1, textAlign: "left", mb: 2}}>Filter</Typography>
                        <Selector data={data} setData={setData} outputX={outputX} setOutputX={setOutputX} 
                        setDataSetName={setDataSetName} setIsDataSetNameDisabled={setIsDataSetNameDisabled}/>
                    </DisplayPanel>
                </Grid>
                <Grid item size={{xs: 12, md: "grow"}} flexGrow={1}>
                    <Box sx={{height: '100%'}}>
                        <DisplayPanel variant="outlined">
                            <Typography variant='h5' color='secondary.dark' sx={{pl: 2, textAlign: "left"}}>Dataset List</Typography>
                            <DatasetList datasets={data.datasets} switchVisibility={switchVisibility} deleteItem={deleteItem} setSelectedVehicleName={selectionMethod()}/>
                        </DisplayPanel>
                    </Box>
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent={"center"} sx={{m: 6}}>
                <Grid item>
                    <TextField required id="dataset name" label="Enter Dataset Name" variant="outlined" 
                        value={dataSetName} disabled={isDataSetNameDisabled} onChange={(event) => {setDataSetName(event.target.value)}}
                        sx={{width: 300}}/>
                </Grid>
                <Grid item alignContent={"center"}>
                    <Button variant="outlined" onClick={saveDataset} size='large'>Save Data</Button>
                </Grid>
            </Grid>
            <Box>
                <Paper elevation={2} sx={{ p: 4}}>
                    <Graph data={data} outputX={outputX}></Graph>
                </Paper>
            </Box>
            {additionalInfo()}
        </Box>
        <Snackbar
            open={dataSavedBarOpen}
            autoHideDuration={5000}
            onClose={() => setDataSavedBarOpen(false)}
            message="Data Saved Successfully"
        />
    </>
    )
}

export default GraphLayout
