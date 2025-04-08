// // frontend/src/services/api.js
// import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export const getProducts = () => api.get('/products');
// export const getRaceData = (raceId) => api.get(`/race-data/${raceId}`);
// export const createOrder = (orderData) => api.post('/orders', orderData);
// export const getProductById = (id) => api.get(`/products/${id}`);

// frontend/src/services/api.js
import axios from 'axios';
import { mockProducts, mockRaceData } from '../mock/data';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Helper to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async () => {
  if (process.env.REACT_APP_USE_MOCK_DATA === 'true') {
    await delay(500); // Simulate network delay
    return { data: mockProducts };
  }
  return api.get('/products');
};

export const getRaceData = async (raceId) => {
  if (process.env.REACT_APP_USE_MOCK_DATA === 'true') {
    await delay(500);
    return { data: mockRaceData[raceId] || [] };
  }
  return api.get(`/race-data/${raceId}`);
};

export const createOrder = async (orderData) => {
  if (process.env.REACT_APP_USE_MOCK_DATA === 'true') {
    await delay(500);
    return { data: { orderId: 'mock-order-123', ...orderData } };
  }
  return api.post('/orders', orderData);
};
