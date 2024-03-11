import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:5000'
});

const hostUrl = 'http://localhost:8080'

export {Axios ,hostUrl};