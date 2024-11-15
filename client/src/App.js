import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'; 
import {createTheme, ThemeProvider, useColorScheme} from '@mui/material/styles';

import Layout from './components/Layout';
import Home from './components/Home';
import NationGraph from './components/NationGraph';
import VehicleGraph from './components/VehicleGraph';

function App() {
  const theme = createTheme(
    {
      colorSchemes: {
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

  const {mode, setMode} = useColorScheme();
  const [t, setT] = useState();

  async function getT() {
    try {
      const response = await api.get("/api/v1/test");
      setT(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } 
  }
  // useEffect(() => {getT();},[]);
  return (
    <ThemeProvider theme={theme} defaultMode='light'>
      <div className="App">
        <Routes>
          <Route path="/" element = {<Layout/>}>
            <Route path="/" element={<Home/>}> </Route>
            <Route path="/test" element={<NationGraph/>}></Route>
            <Route path="/test1" element={<VehicleGraph/>}></Route>
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
