// src/services/api.js
import axios from "axios";

// Base URL for all API requests
const API_BASE = "http://localhost:4000/api";

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token automatically if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // token stored on login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // set auth header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
