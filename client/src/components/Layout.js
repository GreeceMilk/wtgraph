import React from 'react';
import {Outlet} from 'react-router-dom';    
import NavBar from './NavBar';
import { Box } from '@mui/material';

const Layout = () => {

  return (
    <main>
      <NavBar />
      <Outlet />
      <Box sx={{height: '100px'}}></Box>
    </main>
  );
}

export default Layout;
