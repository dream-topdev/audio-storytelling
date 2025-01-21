import axios from 'axios';
import { LoginCredentials, SignupCredentials } from '../../../shared/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create a default axios instance
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Include credentials with requests
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const api = {
  auth: {
    login: async (credentials: LoginCredentials) => {
      const response = await axiosInstance.post('/auth/login', credentials);
      return response.data; // Return the response data directly
    },

    signup: async (credentials: SignupCredentials) => {
      const response = await axiosInstance.post('/auth/signup', credentials);
      return response.data; // Return the response data directly
    },

    verify: async () => {
      const response = await axiosInstance.get('/auth/verify');
      return response.data; // Return the response data directly
    },

    logout: async () => {
      const response = await axiosInstance.post('/auth/logout');
      return response.data; // Return the response data directly
    },
  },

  audio: {
    getTracks: async () => {
      const response = await axiosInstance.get('/audio/tracks');
      return response.data; // Return the response data directly
    }
  }
}; 