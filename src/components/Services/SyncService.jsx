import api from './ApiServices';

export const syncService = {
    sincronizar: async () => {
        // O withCredentials manda o navegador enviar o Cookie de segurança automaticamente para o C#
        const response = await api.post('/Sincronizar/rodar-sync', {}, {
            withCredentials: true
        });

        return response.data;
    }
};