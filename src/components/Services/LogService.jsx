import api from './ApiServices';

export const logService = {
    logSync: async () => {
        // O withCredentials manda o navegador enviar o Cookie de segurança automaticamente para o C#
        const response = await api.get('/Log', {}, {
            withCredentials: true 
        });
        
        return response.data;
    }
};