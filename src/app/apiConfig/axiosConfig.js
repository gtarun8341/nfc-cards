// apiConfig/axiosConfig.js
import axios from 'axios';

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace this with your actual base URL
});

export default api;
