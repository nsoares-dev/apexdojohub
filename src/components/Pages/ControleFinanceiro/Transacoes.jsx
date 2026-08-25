import { useMemo, useState, useEffect } from 'react';
import { formatCurrency, formatDate, getMonth, getYear, MONTHS, normalizeText } from '../../../utils/util';

// Atualizado com o modelo C#
const emptyTransaction = {
    dataEfetiva: new Date().toISOString().slice(0, 10),
    pagadorEstabelecimento: '',
    aluno: '',
    valor: '',
    banco: 'PagBank',
    tipoMovimentacao: 'Variável',
    situacao: 'Pago',
    observacao: ''
};


export function Transacoes({ transacoes, onCreate, onDelete }) {
    const [filtros, setFiltros] = useState({ query: '', ano: '', mes: '', direction: '', banco: '' });
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(emptyTransaction);

    // ==========================================
    // PAGINAÇÃO VISUAL (100 EM 100)
    // ==========================================
    const [visibleCount, setVisibleCount] = useState(100);

    // Volta para 100 itens sempre que o usuário digitar ou mudar algum filtro
    useEffect(() => {
        setVisibleCount(100);
    }, [filtros]);

    // ==========================================
    // FILTROS COM AS PROPRIEDADES DO C#
    // ==========================================
       const handleOpenModal = () => {
        setForm(emptyTransaction); // Reseta o formulário para um novo lançamento
        setShowModal(true); // Abre a modal já preenchida!
    };

    const handleEditClick = (item) => {
        setForm({
            id: item.id, // Guarda o ID para sabermos que é uma edição
            // O .slice(0, 10) garante que a data fique no formato YYYY-MM-DD pro input type="date"
            dataEfetiva: item.dataEfetiva ? item.dataEfetiva.slice(0, 10) : '',
            tipoMovimentacao: item.tipoMovimentacao || 'Variável',
            pagadorEstabelecimento: item.pagadorEstabelecimento || '',
            aluno: item.aluno || '',
            valor: item.valor || '',
            situacao: item.situacao || 'Pago',
            banco: item.banco || 'PagBank',
            observacao: item.observacao || ''
        });
        setShowModal(true); // Abre a modal já preenchida!
    };
    const filtrado = useMemo(() => {
        if (!transacoes) return [];

        return transacoes.filter((item) => {
            const textoBusca = normalizeText(`${item.pagadorEstabelecimento} ${item.aluno ?? ''} ${item.observacao ?? ''}`);
            const queryMatch = !filtros.query || textoBusca.includes(normalizeText(filtros.query));
            const anoMatch = !filtros.ano || getYear(item) === Number(filtros.ano);
            const mesMatch = !filtros.mes || getMonth(item) === Number(filtros.mes);
            const directionMatch = !filtros.direction || (filtros.direction === 'in' ? item.valor >= 0 : item.valor < 0);
            const bancoMatch = !filtros.banco || item.banco === filtros.banco;

            return queryMatch && anoMatch && mesMatch && directionMatch && bancoMatch;
        }).sort((a, b) => new Date(b.dataEfetiva) - new Date(a.dataEfetiva)); // Ordena pela data mais recente
    }, [filtros, transacoes]);

    // Corta a lista para exibir apenas a quantidade permitida no momento
    const dadosVisiveis = filtrado.slice(0, visibleCount);

    // ==========================================
    // FUNÇÕES DE APOIO
    // ==========================================
    const anos = [...new Set(transacoes?.map(item => getYear(item)))].sort((a, b) => b - a);
    const bancos = [...new Set(transacoes?.map((item) => item.banco).filter(Boolean))];

    const updateFilter = (key, value) => setFiltros((current) => ({ ...current, [key]: value }));

    const submit = (event) => {
        event.preventDefault();
        onCreate({ ...form, valor: Number(form.valor) });
        setShowModal(false);
        setForm(emptyTransaction);
    };

    const exportCsv = () => {
        const rows = [['Data', 'Descrição', 'Aluno', 'Valor', 'Situação', 'Banco', 'Observação'],
        ...filtrado.map((item) => [
            formatDate(item.dataEfetiva),
            item.pagadorEstabelecimento,
            item.aluno || '',
            item.valor,
            item.situacao,
            item.banco,
            item.observacao || ''
        ])];

        const url = URL.createObjectURL(new Blob([rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(';')).join('\n')],
            { type: 'text/csv;charset=utf-8' }));

        const link = document.createElement('a');
        link.href = url;
        link.download = 'lancamentos-apex-dojo.csv';
        link.click();
        URL.revokeObjectURL(url);
    };

    // Totais baseados na busca filtrada (mais coerente para o usuário)
    const total = filtrado.reduce((s, t) => s + t.valor, 0);
    const totalEntrada = filtrado.filter(t => t.valor >= 0).reduce((s, t) => s + t.valor, 0);
    const totalSaida = filtrado.filter(t => t.valor < 0).reduce((s, t) => s + t.valor, 0);
    const fmt = v => (v < 0 ? '-' : '') + 'R$ ' + Math.abs(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });


    return <section>
        <div className="bar">
            <input type='text' value={filtros.query} placeholder="Buscar por nome, descrição, observação…" onChange={(event) => updateFilter('query', event.target.value)} />

            <select value={filtros.ano} onChange={(event) => updateFilter('ano', event.target.value)}>
                <option value="">Todos os anos</option>{anos.map((item) => <option key={item}>{item}</option>)}
            </select>

            <select value={filtros.mes} onChange={(event) => updateFilter('mes', event.target.value)}>
                <option value="">Todos os meses</option>{MONTHS.map((item, index) => <option value={index + 1} key={item}>{item}</option>)}
            </select>

            <select value={filtros.direction} onChange={(event) => updateFilter('direction', event.target.value)}>
                <option value="">Entradas e saídas</option>
                <option value="in">Só entradas</option>
                <option value="out">Só saídas</option>
            </select>

            <select value={filtros.banco} onChange={(event) => updateFilter('banco', event.target.value)}>
                <option value="">Todos os bancos</option>{bancos.map((item) => <option key={item}>{item}</option>)}
            </select>

            <button className="btn red" onClick={() => handleOpenModal()}>+ Lançamento</button>
            <button className="btn ghost" onClick={exportCsv}>Exportar CSV</button>
        </div>

        <div className='bar' style={{ marginTop: '-6px' }}>
            <span className='count'>{filtrado.length} lançamentos encontrados · <b className='positivo'>{fmt(totalEntrada)}</b> entrou · <b className='negativo'>{fmt(totalSaida)}</b> saiu · resultado <b className={total >= 0 ? 'positivo' : 'negativo'}>{fmt(total)}</b>
            </span>
        </div>

        <div className="twrap">
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th className="money">Valor</th>
                        <th className="hide-mobile">Situação</th>
                        <th className="hide-mobile">Banco</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {dadosVisiveis.map((item) => <tr key={item.id}>
                        <td className='mut'>{formatDate(item.dataEfetiva)}</td>
                        <td className='desc'>
                            {item.pagadorEstabelecimento}
                            {item.aluno && <div className='mut'>Aluno: {item.aluno}</div>}
                            {item.observacao && <div className='mut'>{item.observacao}</div>}
                        </td>

                        <td className={`money ${item.valor >= 0 ? 'positivo' : 'negativo'}`}>
                            {formatCurrency(item.valor)}
                        </td>
                        <td className="hide-mobile">
                            {/* Ajustado para a propriedade 'situacao' da sua Model */}
                            <span className={`chip ${item.valor >= 0 ? 'ok' : 'no'}`}>
                                {item.situacao}
                            </span>
                        </td>
                        <td className="hide-mobile">{item.banco}</td>
                        <td className='rowbtns'>
                            <button title='editar' onClick={() => handleEditClick(item)}>✎</button>
                            <button title='excluir' onClick={() => onDelete && onDelete(item.id)}>✕</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>

            {/* BOTÃO CARREGAR MAIS */}
            {visibleCount < filtrado.length && (
                <div style={{ textAlign: 'center', padding: '16px', background: '#fff', borderTop: '1px solid #eee' }}>
                    <button
                        className="btn ghost"
                        onClick={() => setVisibleCount(prev => prev + 100)}
                    >
                        Carregar mais {Math.min(100, filtrado.length - visibleCount)} lançamentos...
                    </button>
                </div>
            )}
        </div>

        {/* MODAL CORRIGIDO */}
        {showModal &&
            <div className="overlay">
                <div className="modal" >
                    <h3>Novo Lançamento</h3>
                    <form className="frm" onSubmit={submit}>
                        <div>
                            <label>Data</label>
                            <input type="date" value={form.dataEfetiva} onChange={(event) => setForm({ ...form, dataEfetiva: event.target.value })} required />
                        </div>
                        <div>
                            <label>Tipo Movimentação</label>
                            <select value={form.tipoMovimentacao} onChange={(event) => setForm({ ...form, tipoMovimentacao: event.target.value })}>
                                <option>Fixo</option>
                                <option>Variável</option>
                            </select>
                        </div>

                        <div className="full">
                            <label>Descrição / pagador / estabelecimento</label>
                            <input value={form.pagadorEstabelecimento} onChange={(event) => setForm({ ...form, pagadorEstabelecimento: event.target.value })} required />
                        </div>
                        <div className="full">
                            <label>Aluno (opcional — liga o pagamento ao aluno)</label>
                            <input value={form.aluno} onChange={(event) => setForm({ ...form, aluno: event.target.value })} />
                        </div>
                        <div>
                            <label>Valor (R$)</label>
                            <input type="number" step="0.01" value={form.valor} onChange={(event) => setForm({ ...form, valor: event.target.value })} required />
                        </div>
                        <div>
                            <label>Situação</label>
                            <select value={form.situacao} onChange={(event) => setForm({ ...form, situacao: event.target.value })}>
                                <option>Pago</option>
                                <option>Pendente</option>
                                <option>Recebido</option>
                            </select>
                        </div>
                        <div>
                            <label>Banco</label>
                            <select value={form.banco} onChange={(event) => setForm({ ...form, banco: event.target.value })}>
                                <option>PagBank</option>
                                <option>InfinitePay</option>
                                <option>Caixa</option>
                            </select>
                        </div>
                        <div className="full">
                            <label>Observação (opcional)</label>
                            <input value={form.observacao} onChange={(event) => setForm({ ...form, observacao: event.target.value })} />
                        </div>

                    </form>
                         <div className="macts" style={{ marginTop: '16px' }}>
                            <button type="button" className="btn ghost" onClick={() => setShowModal(false)}>Cancelar</button>
                            <button type="submit" className="btn red">Salvar</button>
                        </div>
                </div>
            </div>}
    </section>;
}
