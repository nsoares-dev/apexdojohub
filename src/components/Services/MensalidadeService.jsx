import api from './ApiServices'; // Importando sua configuração global do Axios

export const mensalidadeService = {

    // Agora a função recebe o objeto de filtros
    getDashboard: async (filtros = {}) => {
        // Desestruturando as variáveis que precisamos
        const { mes, ano, status, busca } = filtros;

        // Chamando a rota usando a instância da sua API configurada
        const response = await api.get('/Mensalidades', {
            params: {
                mes: mes || undefined,
                ano: ano || undefined,
                status: status || undefined,
                busca: busca || undefined
            }
        });

        return response.data;
    }

    // Se no futuro você quiser criar funções para "marcar como pago manualmente" ou algo assim,
    // é só seguir o mesmo padrão:
    // atualizarStatusMensalidade: async (id, dados) => {
    //     const response = await api.put(`/Mensalidade/${id}`, dados);
    //     return response.data;
    // }
};