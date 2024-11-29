import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'; 
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import Layout from './components/Layout';
import Home from './components/Home';
import NationGraph from './components/NationGraph';
import VehicleGraph from './components/VehicleGraph';

function AppWorker() {
  return (
      <div className="App">
        <Routes>
          <Route path="/" element = {<Layout/>}>
            <Route path="/" element={<Home/>}> </Route>
            <Route path="/test" element={<NationGraph/>}></Route>
            <Route path="/test1" element={<VehicleGraph/>}></Route>
          </Route>
        </Routes>
      </div>
  );
}

const theme = createTheme(
  {
    colorSchemes: {
      light: true, 
      dark: true,
      light: {
        palette: {
          primary: {
            main: '#00838f',
          },
          secondary: {
            main: '#ffc400',
          },
        },
      },
      dark: {
        palette: {
          primary: {
            main: '#00838f',
          },
          secondary: {
            main: '#ffc400',
          },
        },
      },
    }
  }
)

function App() {

  const light = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1a2939',
      },
      secondary: {
        main: '#d8a807',
      },
    },
  });

  const dark = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#699bd8',
      },
      secondary: {
        main: '#d8a807',
      },
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <AppWorker/>
    </ThemeProvider>
  )

}

export default App;
