import api from './ApiServices'; // Importe a sua configuração do Axios aqui

export const overviewService = {

    getVisaoGeral: async (ano, mes) => {
        let url = `/Overview/resumo?ano=${ano}`;
        if (mes) {
            url += `&mes=${mes}`;
        }
        const response = await api.get(url);
        return response.data;
    }
};