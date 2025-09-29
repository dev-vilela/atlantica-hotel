// src/services/api.js
import axios from "axios";

// Coloque aqui a URL base da sua API Spring Boot
const api = axios.create({
  baseURL: "http://localhost:8080/atlantica", 
});

export default api;
