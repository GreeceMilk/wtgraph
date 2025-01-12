import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import Graph from './Graph';
import { Box, Container, Paper, Grid2 as Grid, Typography } from '@mui/material';

import { convertSnakeToSpace } from '../Util';
import ImageDisplay from './ImageDisplay';
import nationbg from '../img/nationbg.jpg';
import vehiclebg from '../img/vehiclebg.jpg';
import { NavLink } from 'react-router-dom';

const Home = ({data, wkName, outputX, outputY}) => {
  
  return (
    <Box>
      <Container sx={{mb: 2}}>
        <Typography variant='h4' align='center'> Welcome to WTGRAPH </Typography>
        <Typography variant='h5' align='center'>A Comprehensive Visualization Website for War Thunder</Typography>
        <Typography variant='h6' align='center' sx={{mt: 3}}> Take a look at all time {convertSnakeToSpace(outputY)} of {convertSnakeToSpace(wkName)} </Typography>
      </Container>
      <Paper elevation={2} sx={{ p: 2}}>
        <Graph data={data} outputX={outputX}/>
      </Paper>
      <Grid container spacing={4} sx={{mt: 4}}>
        <Grid item size={{xs: 12, md: 6}}>
          <NavLink to='/nation' id='imageToNation'>
            <ImageDisplay image={nationbg} mainText={"Nation Graph"} subText={"Check out recent data about individual nations"}/>
          </NavLink>
        </Grid>
        <Grid item size={{xs: 12, md: 6}}>
          <NavLink to='/vehicle' id='imageToVehicle'>
            <ImageDisplay image={vehiclebg} mainText={"Vehicle Graph"} subText={"Interested in vehicle data? Click here"}/>
          </NavLink>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home
