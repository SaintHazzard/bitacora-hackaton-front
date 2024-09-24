import axios from "axios";
import https from 'https'

const testURL = 'http://54.147.236.208'
const testURL2 = 'http://54.147.236.208'
const local = 'http://localhost:8080'



const instance = axios.create({
    baseURL: testURL2
})


instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    // console.log(token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    // console.log('Request made with ', config);
    return config;
}, (error) => {
    return Promise.reject(error)
});

export default instance;