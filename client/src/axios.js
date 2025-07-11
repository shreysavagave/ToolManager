import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  withCredentials: true, // ✅ this sends cookies
});

export default instance;