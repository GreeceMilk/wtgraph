import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import api from '../api/axiosConfig';
import Graph from './Graph';
import { Box, Container, Paper, Typography } from '@mui/material';

import { convertSnakeToSpace } from '../Util';

const Home = ({data, wkName, outputX, outputY}) => {
  
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
