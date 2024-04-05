import axios from 'axios';

const Axios = axios.create({
    //baseURL: 'http://localhost:5000'
    withCredentials: true
});


Axios.interceptors.request.use(
    (config) => {
        config.headers.authorization = 'token';
        config.headers['Access-Control-Allow-Origin'] = '*';  // CORS 설정(모든 리소스 허용)
        return config;
    }
)

const hostUrl = 'http://localhost:8080'

export {Axios ,hostUrl};