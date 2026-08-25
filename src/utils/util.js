export const MONTHS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

export const formatCurrency = (value) => 
  new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}).format(value);

export const formatCurrencyCompacto = (value) => 
  new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  notation: 'compact'
}).format(value);

export const formatDate = (value) => {
  if (!value) return '-';

  // Verifica se o valor já tem o 'T' (padrão da API C#). Se não tiver, adiciona.
  const dataString = value.includes('T') ? value : `${value}T00:00:00`;

  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC', 
  }).format(new Date(dataString));
};

export const getYear = (transacao) => {
    // Pega a data da API nova (dataEfetiva) ou do mock antigo (data)
    const dataString = transacao.dataEfetiva || transacao.data;
    return dataString ? Number(dataString.slice(0, 4)) : 0;
};

export const getMonth = (transacao) => {
    const dataString = transacao.dataEfetiva || transacao.data;
    return dataString ? Number(dataString.slice(5, 7)) : 0;
};

export function normalizeText(text = '') {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function getYearSummary(transacoes, ano) {
  const yearly = transacoes.filter((transacao) => getYear(transacao) === ano);
  const entrada = yearly.filter((transacao) => transacao.valor > 0).reduce((total, transacao) => total + transacao.valor, 0);
  const saida = yearly.filter((transacao) => transacao.valor < 0).reduce((total, transacao) => total + Math.abs(transacao.valor), 0);
  return { entrada, saida, resultado: entrada - saida };
}
