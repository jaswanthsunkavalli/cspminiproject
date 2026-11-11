import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token interceptor
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('kuntamukkala_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 unauthorized gracefully
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      // Clear token if invalid
      if (error.config && !error.config.url?.includes('/auth/login')) {
        localStorage.removeItem('kuntamukkala_token');
        localStorage.removeItem('kuntamukkala_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
