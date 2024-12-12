import React from 'react'
import Box from '@mui/material/Box';
import { AppBar, IconButton, Toolbar, Typography, useColorScheme, useMediaQuery, Grid2 as Grid, Button, Container } from '@mui/material';
import { useEffect } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const {mode, setMode} = useColorScheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  function modeSwitch() {
    if (mode === 'system') {
      if (prefersDarkMode) {
        setMode('light');
      } else {
        setMode('dark');
      }
    } else if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  }
  

  // useEffect(() => {
    // console.log("Mode", mode);
    // console.log("System perfer dark mode", prefersDarkMode);
  // }, [mode])

  function iconDisplay() {
    if (mode === 'system') {
      if (prefersDarkMode) {
        return (<DarkModeIcon></DarkModeIcon>);
      } else {
        return (<LightModeIcon></LightModeIcon>);
      }
    } else if (mode === 'light') {
      return (<LightModeIcon></LightModeIcon>);
    } else {
      return (<DarkModeIcon></DarkModeIcon>);
    }
  }

  return (
    <AppBar position="static" color='primary' sx={{
      mb: 5,
      // display: 'flex',
      width: '100%',
      // alignItems: 'center',
      // justifyContent: 'center',
      // bgcolor: 'background.default',
      // color: 'text.primary',
      // borderRadius: 1,
      // p: 0,
      minHeight: '56px',
    }}>
      <Container maxWidth='lg'>
          <Toolbar disableGutters variant='dense' sx={{width: '100%', display: 'flex'}}>
              <Grid container alignItems='center' sx={{width: '100%'}}>
                <Grid item display={"flex"}>
                  <Grid container spacing={1} alignItems={'center'}>

                    <Grid item>
                      {/* <Box sx={{height: '100%', display: 'flex', alignItems: 'center', textAlign: 'center'}}>
                        <Typography>WTGRAPH</Typography>
                      </Box> */}
                      <NavLink to='/'>
                        <Button variant='text' disableRipple color='secondary'>WTGRAPH</Button>
                      </NavLink>
                    </Grid>
                    <Grid item sx={{ display: {xs: 'none', md: 'flex'}}}>
                        <NavLink to='/test'>
                          <Button variant='text' color="secondary">Nation</Button>
                        </NavLink>
                        <NavLink to='/test1'>
                          <Button variant='text' color="secondary">Vehicle</Button>
                        </NavLink>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item size="grow" display={"flex"} justifyContent={"flex-end"}>
                      <IconButton onClick={modeSwitch} color='secondary'>
                        {iconDisplay()}
                      </IconButton>
                </Grid>
              </Grid>
            {/* <Box sx={{flexGrow: 1}}>
            </Box>
            <Box sx={{flexGrow: 0, p: 2}}>
            </Box> */}
          </Toolbar>
      </Container>
      </AppBar>
  )
}

export default NavBar
