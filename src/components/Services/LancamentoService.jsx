import api from './ApiServices'; 


export const lancamentoService = {
    getLancamentos: async (filtros = {}) => {
        const { busca, ano, mes, tipo, banco } = filtros;

        const response = await api.get('/Lancamento', {
            params: {
                busca: busca || undefined,
                ano: ano || undefined,
                mes: mes || undefined,
                tipo: tipo || undefined,
                banco: banco || undefined
            }
        });

        return response.data;
    },

    criarLancamento: async (dados) => {
        const response = await api.post('/lancamentos', dados);
        return response.data;
    },

    excluirLancamento: async (id) => {
        const response = await api.delete(`/lancamentos/${id}`);
        return response.data;
    }
};