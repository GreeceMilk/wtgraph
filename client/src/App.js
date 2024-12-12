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
import GraphLayout from './components/GraphLayout';


const theme = createTheme(
  {
    colorSchemes: {
      light: true, 
      dark: true,
      light: {
        palette: {
          background: {
            default: '#f5f5f5',
          },
          primary: {
            main: '#333333',
          },
          secondary: {
            main: '#228bda',
          },
        },
      },
      dark: {
        palette: {
          background: {
            default: '#121212',
          },
          primary: {
            main: '#eeeeee',
          },
          secondary: {
            main: '#00bcd4',
          },
        },
      },
    }
  }
)

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className="App">
        <Routes>
          <Route path="/" element = {<Layout/>}>
            <Route path="/" element={<Home/>}> </Route>
            <Route path="/nation" element={<NationGraph/>}></Route>
            <Route path="/vehicle" element={<GraphLayout Selector={VehicleGraph}/>}></Route>
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  )

}

export default App;
