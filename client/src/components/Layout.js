import React from 'react';
import {Outlet} from 'react-router-dom';    
import NavBar from './NavBar';
import { Box } from '@mui/material';
import ScrollToTop from './ScrollToTop';

const Layout = () => {

  return (
    <main>
      <NavBar />
      <Outlet />
      <ScrollToTop />
      <Box sx={{height: '100px'}}></Box>
    </main>
  );
}

export default Layout;
