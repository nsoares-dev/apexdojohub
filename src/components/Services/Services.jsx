import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7217/API",
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
    // Se a API retornar 401 (Unauthorized), significa que o cookie expirou ou é inválido
    if (error.response?.status === 401) {
      // Como o token não está mais no localStorage, não precisamos dar um removeItem("token").
      // Se você guardou os DADOS do usuário (nome, foto) no localStorage, apague-os aqui:
      localStorage.removeItem("usuario"); 
      
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;