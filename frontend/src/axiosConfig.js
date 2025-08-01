import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true // send cookies!
});

export default axiosInstance;