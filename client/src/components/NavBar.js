import React from 'react'
import { AppBar, IconButton, Toolbar, Slide, useScrollTrigger, useColorScheme, useMediaQuery, Grid2 as Grid, Button, Container } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { NavLink } from 'react-router-dom';

import { currentColorMode } from '../Util';

function HideOnScroll(props) {
    const { children } = props;
    const trigger = useScrollTrigger({threshold: 75});

    return (
        <Slide appear={false} direction="down" in={!trigger}>
        {children}
        </Slide>
    );
}

const NavBar = () => {
  const {mode, setMode} = useColorScheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  function modeSwitch() {
    if (currentColorMode(mode, prefersDarkMode) === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  }
  
  function iconDisplay() {
    if (currentColorMode(mode, prefersDarkMode) === 'light') {
      return (<LightModeIcon></LightModeIcon>);
    } else {
      return (<DarkModeIcon></DarkModeIcon>);
    }
  }

  return (
    <HideOnScroll>
      <AppBar color='primary' sx={{
        mb: 2,
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
                      <Grid item sx={{ display: 'flex'}}>
                          <NavLink to='/nation'>
                            <Button variant='text' color="secondary">Nation</Button>
                          </NavLink>
                          <NavLink to='/vehicle'>
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

    </HideOnScroll>
  )
}

export default NavBar
