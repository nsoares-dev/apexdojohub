import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:7217/API",
  // baseURL: "http://192.168.100.19:5217/API"

  // A MÁGICA ACONTECE AQUI:
  // Isso avisa ao Axios e ao navegador para enviarem os cookies em todas as requisições
  withCredentials: true,
});

// 1. INTERCEPTOR DE REQUEST
api.interceptors.request.use((config) => {
  // Adeus, localStorage! O Authorization: Bearer sumiu daqui.
  // O navegador vai anexar o Cookie com o token automaticamente por debaixo dos panos.

  // Você só mantém esse interceptor se quiser adicionar outras configurações genéricas depois
  return config;
});

// 2. INTERCEPTOR DE RESPONSE
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("usuario");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
