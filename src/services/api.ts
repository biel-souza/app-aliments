import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    Accept: 'Application/json',
  },
});

export default api;
