import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import api from '../api/axiosConfig';
import Graph from './Graph';
import { Box, Container, Paper, Typography } from '@mui/material';

import { convertSnakeToSpace } from '../Util';

const Home = () => {
  const [data, setData] = React.useState({datasets: []});
  const [wkName, setWkName] = React.useState("");
  const [outputX, setOutputX] = React.useState("");
  const [outputY, setOutputY] = React.useState("");
  
  const getRandomData = async () => {
      try {
        const response = await api.get('/api/randomVehicleData');
        let temp = {data: response.data.vehicleData};
        setWkName(response.data.vehicleName.label);
        setData({datasets: [temp]});
        setOutputX(response.data.outputX);
        setOutputY(response.data.outputY);
      } catch (error) {
        console.log(error);
      }
    }

  useEffect(() => {
      getRandomData();
  }, []);

  return (
    <Box>
      <Container sx={{mb: 4}}>
        <Typography variant='h4' align='center'> Welcome to WTGRAPH </Typography>
        <Typography variant='h6' align='center'> Take a look at all time {convertSnakeToSpace(outputY)} of {convertSnakeToSpace(wkName)} </Typography>
      </Container>
      <Paper elevation={2} sx={{ p: 2, m: 4, borderRadius: 4}}>
        <Graph data={data} outputX={outputX}/>
      </Paper>
    </Box>
  )
}

export default Home
