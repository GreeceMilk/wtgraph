import axios from 'axios';

export default axios.create({
    baseURL: 'https://wtgraph-fjgcb0gzgabsbpcw.canadacentral-01.azurewebsites.net',
    headers: { "ngrok-skip-browser-warning": "true" }
});
