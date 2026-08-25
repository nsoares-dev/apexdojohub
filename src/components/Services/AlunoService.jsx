import api from './ApiServices';

export const alunoService = {
    getAlunos: async (filtros = {}) => {
        const { status, modalidade, busca } = filtros;
        
        const response = await api.get('/Alunos/ConsultarAlunos', {
            params: {
                status: status || undefined,
                modalidade: modalidade || undefined,
                busca: busca || undefined
            }
        });
        
        return response.data;
    },

    criarAluno: async (dados) => {
        const response = await api.post('/Alunos', dados);
        return response.data;
    },

    atualizarAluno: async (id, dados) => {
        const response = await api.put(`/Alunos/${id}`, dados);
        return response.data;
    },

    excluirAluno: async (id) => {
        const response = await api.delete(`/Alunos/${id}`);
        return response.data;
    }
};