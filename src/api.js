// src/api.js
import axios from "axios";

const API_BASE = "https://inventory-backend-h0i1.onrender.com/api";

// Product APIs
export const fetchProducts = () => axios.get(`${API_BASE}/products`);
export const createProduct = (data) => axios.post(`${API_BASE}/products`, data);
export const updateProduct = (data) => axios.put(`${API_BASE}/products`, data);
export const deleteProduct = (data) =>
  axios.delete(`${API_BASE}/products`, { data });

// Import Order APIs
export const fetchImportOrders = () => axios.get(`${API_BASE}/import-orders`);
export const createImportOrder = (data) =>
  axios.post(`${API_BASE}/import-orders`, data);
export const updateImportOrder = (data) =>
  axios.put(`${API_BASE}/import-orders`, data);
export const deleteImportOrder = (data) =>
  axios.delete(`${API_BASE}/import-orders`, { data });

// Export Order APIs
export const fetchExportOrders = () => axios.get(`${API_BASE}/export-orders`);
export const createExportOrder = (data) =>
  axios.post(`${API_BASE}/export-orders`, data);
export const updateExportOrder = (data) =>
  axios.put(`${API_BASE}/export-orders`, data);
export const deleteExportOrder = (data) =>
  axios.delete(`${API_BASE}/export-orders`, { data });
