
import { useMemo, useState } from 'react';
import { formatCurrency, formatDate, getMonth, getYear, MONTHS, normalizeText } from '../utils/util';
import { Modal } from './Modal';
import { SectionTitle } from './Layout';

const emptyTransaction = { date: new Date().toISOString().slice(0, 10), person: '', amount: '', bank: 'PagBank', type: 'Variável', notes: '' };

export function Transacoes({ transacoes, onCreate, onDelete }) {
    const [filtros, setFiltros] = useState({ query: '', ano: '', mes: '', direction: '', banco: '' });

    const [showModal, setShowModal] = useState(false);

    const [form, setForm] = useState(emptyTransaction);

    const filtrado = useMemo(() => transacoes.filter((item) => (!filtros.query || normalizeText(`${item.descricao} ${item.aluno ?? ''} ${item.observacao ?? ''}`)
        .includes(normalizeText(filtros.query))) &&
        (!filtros.year || getYear(item) === Number(filtros.year)) && (!filtros.month || getMonth(item) === Number(filtros.month)) &&
        (!filtros.direction || (filtros.direction === 'in' ? item.amount > 0 : item.amount < 0)) &&
        (!filtros.bank || item.bank === filtros.bank)).sort((a, b) => b.data.localeCompare(a.data)), [filtros, transacoes]);

    const anos = [...new Set(transacoes.map(getYear))].sort((a, b) => b - a);

    const bancos = [...new Set(transacoes.map((item) => item.bank))];

    const updateFilter = (key, value) =>
        setFiltros((current) =>
            ({ ...current, [key]: value }));

    const submit = (event) => { event.preventDefault(); onCreate({ ...form, amount: Number(form.amount) }); setShowModal(false); setForm(emptyTransaction); };

    console.log(transacoes);

    const exportCsv = () => {
        const rows = [['Data', 'Descrição', 'Valor', 'Situação', 'Banco'],
        ...filtrado.map((item) => [item.data, item.aluno, item.valor, item.status, item.bank])];

        const url = URL.createObjectURL(new Blob([rows.map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(';')).join('\n')],
            { type: 'text/csv;charset=utf-8' }));

        const link = document.createElement('a');
        link.href = url;
        link.download = 'lancamentos-apex-dojo.csv';
        link.click();
        URL.revokeObjectURL(url);
    };

    const total = transacoes.reduce((s, t) => s + t.valor, 0);
    const totalEntrada = transacoes.filter(t => t.valor >= 0).reduce((s, t) => s + t.valor, 0);
    const totalSaida = transacoes.filter(t => t.valor < 0).reduce((s, t) => s + t.valor, 0);
    const fmt = v => (v < 0 ? '-' : '') + 'R$ ' + Math.abs(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    console.log(filtrado)
    return <section>
        <div className="bar">
            <input type='text' value={filtros.query} placeholder="Buscar por nome, descrição, observação…" onChange={(event) => updateFilter('query', event.target.value)} />
            <select value={filtros.ano} onChange={(event) => updateFilter('ano', event.target.value)}>
                <option value="">Todos os anos</option>{anos.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={filtros.month} onChange={(event) => updateFilter('mes', event.target.value)}>
                <option value="">Todos os meses</option>{MONTHS.map((item, index) => <option value={index + 1} key={item}>{item}</option>)}
            </select>
            <select value={filtros.direction} onChange={(event) => updateFilter('direction', event.target.value)}>
                <option value="">Entradas e saídas</option>
                <option value="in">Só entradas</option>
                <option value="out">Só saídas</option>
            </select>
            <select value={filtros.banco} onChange={(event) => updateFilter('bank', event.target.value)}>
                <option value="">Todos os bancos</option>{bancos.map((item) => <option key={item}>{item}</option>)}
            </select>
            <button className="btn red" onClick={() => setShowModal(true)}>+ Lançamento</button>
            <button className="btn ghost" onClick={exportCsv}>Exportar CSV</button>
        </div>
        <div className='bar' style={{ marginTop: '-6px' }}>

            <span className='count'>{transacoes.length} lançamentos · <b className='positivo'>{fmt(totalEntrada)}</b> entrou · <b className='negativo'>{fmt(totalSaida)}</b> saiu · resultado <b className={total >= 0 ? 'positivo' : 'negativo'}>{fmt(total)}</b>
            </span>

        </div>
        {/* <SectionTitle action={<span className="count">{filtrado.length} lançamento(s)</span>}>Fluxo financeiro</SectionTitle> */}
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
                    {filtrado.map((item) => <tr key={item.id}>
                        <td className='mut'>{formatDate(item.data)}</td>
                        <td className='desc'>{item.descricao}
                            {item.aluno && <div className='mut'>Aluno: {item.aluno}</div>}
                            {item.observacao && <div className='mut'>{item.observacao}</div>}
                        </td>

                        <td className={`money ${item.valor >= 0 ? 'positivo' : 'negativo'}`}>
                            {formatCurrency(item.valor)}</td>
                        <td className="hide-mobile">
                            <span className={`chip ${item.valor >= 0 ? 'ok' : 'no'}`}>
                                {item.valor >= 0 ? "Recebido" : "Pago"}
                            </span>
                        </td>
                        <td className="hide-mobile">{item.banco}</td>
                        <td className='rowbtns'>
                            <button title='editar' onClick={() => onEdit(item.id)}>✎</button>
                            <button title='excluir' onClick={() => onDelete(item.id)}>✕</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
        {showModal &&
            <Modal title="Novo lançamento"
                onClose={() => setShowModal(false)}>
                <form className="form-grid" onSubmit={submit}>
                    <label>
                        Data<input type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required />
                    </label>
                    <label>
                        Valor<input type="number" step="0.01" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} required />
                    </label>
                    <label className="full">
                        Descrição<input value={form.person} onChange={(event) => setForm({ ...form, person: event.target.value })} required />
                    </label>
                    <label>
                        Banco<input value={form.bank} onChange={(event) => setForm({ ...form, bank: event.target.value })} required />
                    </label>
                    <label>
                        Tipo<select value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })}>
                            <option>Fixo</option><option>Variável</option>
                        </select>
                    </label>
                    <div className="modal-actions"><button type="button" className="button ghost" onClick={() => setShowModal(false)}>Cancelar</button>
                        <button className="button red">Salvar</button></div></form></Modal>}</section>;
}
