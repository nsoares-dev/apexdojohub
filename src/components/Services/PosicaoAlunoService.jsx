import api from './ApiServices';

export const posicaoAlunoService = {
    getPosicoes: async (filtros = {}) => {
        const { ano, status, modalidade, plano, busca } = filtros;
        
        const response = await api.get('/AlunosPosicao/ConsultarAlunosPosicao', {
            params: {
                ano: ano || undefined,
                status: status || undefined,
                modalidade: modalidade || undefined,
                plano: plano || undefined,
                busca: busca || undefined
            }
        });
        
        return response.data;
    }
};