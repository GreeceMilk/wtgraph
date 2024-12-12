import { Button, Divider, TextField, Typography } from '@mui/material';
import { Box, Grid } from '@mui/system';
import React from 'react'
import { useState } from 'react';
import Graph from './Graph';
import DatasetList from './DatasetList';

const GraphLayout = ({Selector}) => {
    const [data, setData] = useState({datasets:[]});
    const [outputX, setOutputX] = useState(null);
    const [dataSetName, setDataSetName] = useState("");
    const [isDataSetNameDisabled, setIsDataSetNameDisabled] = useState(true);

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
        // setVehicle(null);
    }

    function deleteItem(id) {
        setData({datasets: data.datasets.filter((data) => data.id !== id)});
    }

  return (
    <Box mx={10}>
        <Grid container spacing={5}>
            <Grid item sx={{ border: 2, borderColor: 'secondary.dark', borderRadius: 5, p: 2, textAlign: 'center', height: '100%'}}>
                <Selector data={data} setData={setData} outputX={outputX} setOutputX={setOutputX} 
                    setDataSetName={setDataSetName} setIsDataSetNameDisabled={setIsDataSetNameDisabled}/>
            </Grid>
            <Grid item size={"grow"} flexGrow={1}>
                <Box sx={{ border: 2, borderColor: 'secondary.dark', borderRadius: 5, p: 2, textAlign: 'center', height: '100%'}}>
                    <Typography variant='h6' color='secondary.dark'>Dataset List</Typography>
                    <Divider variant='middle' sx={{bgcolor: 'primary.main', mt: 2, mb: 2}}/>
                    <DatasetList datasets={data.datasets} deleteItem={deleteItem}/>
                </Box>
            </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent={"center"} sx={{mt: 10}}>
            <Grid item>
                <TextField required id="dataset name" label="Enter Dataset Name" variant="outlined" 
                    value={dataSetName} disabled={isDataSetNameDisabled} onChange={(event) => {setDataSetName(event.target.value)}}
                    sx={{width: 300}}/>
            </Grid>
            <Grid item alignContent={"center"}>
                <Button variant="outlined" onClick={saveDataset} size='large'>Save Data</Button>
            </Grid>
        </Grid>
        <Box sx={{mt: 10}}>
            <Graph data={data} outputX={outputX}></Graph>
        </Box>
    </Box>
    )
}

export default GraphLayout
