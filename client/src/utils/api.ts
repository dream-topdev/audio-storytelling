import axios from 'axios';
import { LoginCredentials, SignupCredentials } from '../../../shared/types/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const api = {
  auth: {
    login: async (credentials: LoginCredentials) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) throw new Error('Login failed');
      return response.json();
    },

    signup: async (credentials: SignupCredentials) => {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) throw new Error('Signup failed');
      return response.json();
    },

    verify: async () => {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Verification failed');
      return response.json();
    },

    logout: () => axios.post(`${API_BASE_URL}/auth/logout`),
  },

  audio: {
    getTracks: async () => {
      const response = await fetch(`${API_BASE_URL}/audio/tracks`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch tracks');
      return response.json();
    }
  }
}; 