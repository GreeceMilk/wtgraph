import {Outlet} from 'react-router-dom';    
import Box from '@mui/material/Box';
import { AppBar, IconButton, Toolbar, Typography, useColorScheme, useMediaQuery } from '@mui/material';
import { useEffect } from 'react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Layout = () => {
  const {mode, setMode} = useColorScheme();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  

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

  if (!mode) {
    return (
      <main>

      </main>
    );
  }

  return (
    <main>
        <Box
    sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        // borderRadius: 1,
        // p: 0,
        minHeight: '56px',
      }}>
          <AppBar position="static" sx={{mb: 5}}>
            <Toolbar disableGutters>
              <Box sx={{flexGrow: 1}}>
                <Typography>WTGRAPH</Typography>
              </Box>
              <Box sx={{flexGrow: 0, p: 2}}>
                <IconButton onClick={modeSwitch}>
                  {iconDisplay()}
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
        <Outlet />
    </main>
  );
}

export default Layout;
