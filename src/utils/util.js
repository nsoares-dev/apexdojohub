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

  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00`));
};

export const getYear = (transacao) => Number(transacao.data.slice(0, 4));
export const getMonth = (transacao) => Number(transacao.data.slice(5, 7));

export function normalizeText(text = '') {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function getYearSummary(transacoes, ano) {
  const yearly = transacoes.filter((transacao) => getYear(transacao) === ano);
  const entrada = yearly.filter((transacao) => transacao.valor > 0).reduce((total, transacao) => total + transacao.valor, 0);
  const saida = yearly.filter((transacao) => transacao.valor < 0).reduce((total, transacao) => total + Math.abs(transacao.valor), 0);
  return { entrada, saida, resultado: entrada - saida };
}
