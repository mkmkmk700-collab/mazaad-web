import axios from 'axios';

const API = axios.create({
  baseURL: 'https://mazaad-backend.onrender.com/api',
});

export const fetchAds = async () => {
  const response = await API.get('/ads');
  return response.data;
};

export const createAd = async (adData) => {
  const response = await API.post('/ads', adData);
  return response.data;
};