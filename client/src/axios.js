import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND || "http://localhost:5000",
  withCredentials: true, // ✅ ensures cookies (like JWT) are sent
});

export default instance;
