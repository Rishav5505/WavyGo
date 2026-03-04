import axios from 'axios';

const API = axios.create({
    baseURL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:5000/api'
        : 'https://wavygo.onrender.com/api'
});

// Add token to requests if available
API.interceptors.request.use((req) => {
    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
        req.headers.Authorization = `Bearer ${JSON.parse(storedUser).token}`;
    }
    return req;
});

export default API;
