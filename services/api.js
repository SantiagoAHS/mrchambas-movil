import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "https://mibackend-mchambas.onrender.com/api/",
  timeout: 10000,
});

// Interceptor para incluir el token automáticamente en cada petición
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default api;
