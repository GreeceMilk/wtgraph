import React from 'react';
import {Outlet} from 'react-router-dom';    
import NavBar from './NavBar';
import { Box, Container } from '@mui/material';
import ScrollToTop from './ScrollToTop';

const Layout = () => {

  return (
    <main>
      <NavBar />
      <Box sx={{ml: 4, mr: 4}}>
        <Outlet />
      </Box>
      <ScrollToTop />
      <Box sx={{height: '100px'}}></Box>
    </main>
  );
}

export default Layout;
