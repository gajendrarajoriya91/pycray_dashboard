import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getProperties = () => api.get("/properties");
export const createProperty = (propertyData) =>
  api.post("/properties", propertyData);
export const getProperty = (id) => api.get(`/properties/${id}`);
export const updateProperty = (id, propertyData) =>
  api.put(`/properties/${id}`, propertyData);
export const deleteProperty = (id) => api.delete(`/properties/${id}`);

export const getPropertyFinancials = (id) =>
  api.get(`/properties/${id}/financials`);

export const getFinancials = () => api.get("/financials");
export const createFinancial = (financialData) =>
  api.post("/financials", financialData);
export const getFinancial = (id) => api.get(`/financials/${id}`);
export const updateFinancial = (id, financialData) =>
  api.put(`/financials/${id}`, financialData);
export const deleteFinancial = (id) => api.delete(`/financials/${id}`);

export default api;
