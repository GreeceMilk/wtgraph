import './App.css';
import api from './api/axiosConfig';
import {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'; 
import Layout from './components/Layout';
import Home from './components/Home';

function App() {
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
  useEffect(() => {getT();},[]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element = {<Layout/>}>
          <Route path="/" element={<Home/>}> </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
