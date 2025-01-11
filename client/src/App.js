import './App.css';
import api from './api/axiosConfig';
import {useState, createContext, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'; 
import {createTheme, ThemeProvider} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import React from 'react';

import Layout from './components/Layout';
import Home from './components/Home';
import NationGraph from './components/NationGraph';
import VehicleGraph from './components/VehicleGraph';
import GraphLayout from './components/GraphLayout';

import UpdateInfoContext from './contexts/UpdateInfoContext';

const headingFont = "Monda, sans-serif";
const bodyFont = "Inter, sans-serif";

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
    }, 
    typography: {
      fontFamily: [
        'Inter',
        'Monda',
        'Roboto',
        'Noto Sans'
      ].join(','),
      h1: {
        fontFamily: headingFont,
      },
      h2: {
        fontFamily: headingFont,
      },
      h3: {
        fontFamily: headingFont,
      },
      h4: {
        fontFamily: headingFont,
      },
      h5: {
        fontFamily: headingFont,
      },
      h6: {
        fontFamily: headingFont,
      },
      body1: {
        fontFamily: bodyFont,
      },
      body2: {
        fontFamily: bodyFont,
      },
      subtitle1: {
        fontFamily: bodyFont,
      },
      subtitle2: {
        fontFamily: bodyFont,
      },
      button: {
        fontFamily: bodyFont,
      },
      caption: {
        fontFamily: bodyFont,
      },
      overline: {
        fontFamily: bodyFont,
      }
    }, 
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiStack: {
        defaultProps: {
          useFlexGap: true,
        }
      }
    }
  }
)

function App() {
  const [homeData, setHomeData] = useState({datasets: []});
  const [homeWkName, setHomeWkName] = useState("");
  const [homeOutputX, setHomeOutputX] = useState("");
  const [homeOutputY, setHomeOutputY] = useState("");

  const [updates, setUpdates] = useState([]);

  async function getUpdates() {
    try {
      const response = await api.get('/api/majorUpdates');
      setUpdates(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getRandomData = async () => {
      try {
        const response = await api.get('/api/randomVehicleData');
        let temp = {
          data: response.data.vehicleData,
          label: "Random Vehicle Data",
          id: "randomVehicleData",
        };
        setHomeWkName(response.data.vehicleName.label);
        setHomeData({datasets: [temp]});
        setHomeOutputX(response.data.outputX);
        setHomeOutputY(response.data.outputY);
      } catch (error) {
        console.log(error);
      }
    }

  useEffect(() => {
      getRandomData();
      getUpdates();
  }, []);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <UpdateInfoContext.Provider value={updates}>
          <div className="App">
            <Routes>
              <Route path="/" element = {<Layout/>}>
                <Route path="/" element={<Home data={homeData} wkName={homeWkName} outputX={homeOutputX} outputY={homeOutputY}/>}> </Route>
                <Route path="/nation" element={<GraphLayout Selector={NationGraph}/>}></Route>
                <Route path="/vehicle" element={<GraphLayout Selector={VehicleGraph}/>}></Route>
              </Route>
            </Routes>
          </div>
        </UpdateInfoContext.Provider>
      </ThemeProvider>
  )

}

export default App;
