import { useMemo, useState } from 'react';
import { formatCurrency, normalizeText } from '../utils/util';
import { SectionTitle, StatCard } from './Layout';

export function Pagamentos({ alunos, transacoes }) {
    const [month, setMonth] = useState('2026-07');

    const [filter, setFilter] = useState('');
    const [query, setQuery] = useState('');

    const pagamentoStatus = useMemo(() => alunos.filter((aluno) => aluno.status === 'Ativo').map((aluno) => ({
        ...aluno, pago: transacoes.some((transacao) => transacao.valor > 0 &&
            transacao.data.startsWith(month) &&
            normalizeText(`${transacao.descricao} ${transacao.descricao ?? ''}`).includes(normalizeText(aluno.nome)))
    })), [alunos, transacoes, month]);

    const listed = pagamentoStatus.filter((student) => (!filter || (filter === 'pago' ? student.pago : !student.pago))
        && normalizeText(student.name).includes(normalizeText(query)));

    const pago = pagamentoStatus.filter((student) => student.pago);

    const expected = pagamentoStatus.reduce((total, student) => total + student.fee, 0);

    const received = pago.reduce((total, student) => total + student.fee, 0);

    return <section>
        <div className="toolbar filters">
            <input type="month" value={month} onChange={(event) => setMonth(event.target.value)} />
            <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                <option value="">Todos os ativos</option>
                <option value="pending">Só pendentes</option>
                <option value="pago">Só quem pagou</option>
            </select>
            <input value={query} placeholder="Buscar aluno…" onChange={(event) => setQuery(event.target.value)} />
        </div>
        <div className="metrics-grid compact">
            <StatCard label="Ativos" valor={pagamentoStatus.length} />
            <StatCard label="Pagaram" tone="positive" valor={pago.length} />
            <StatCard label="Pendentes" tone="negative" valor={pagamentoStatus.length - pago.length} />
            <StatCard label="Previsão do mês" valor={formatCurrency(expected)} detalhe={`Confirmado: ${formatCurrency(received)}`} />
        </div>
        <SectionTitle action={<span className="count">Pagamento identificado por nome</span>}>Alunos ativos × pagamentos do mês</SectionTitle>
        <div className="table-wrap">
            <table className='twrap'>
                <thead>
                    <tr>
                        <th>Aluno</th>
                        <th className="hide-mobile">Modalidade</th>
                        <th className="hide-mobile">Venc.</th>
                        <th className="money">Mensalidade</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>{listed.map((aluno) => <tr key={aluno.id}>
                    <td>{aluno.nome}</td>
                    <td className="hide-mobile">
                        {aluno.modality}
                    </td>
                    <td className="hide-mobile">Dia {aluno.dueDay}</td>
                    <td className="money">{formatCurrency(aluno.fee)}</td>
                    <td>
                        <span className={`chip ${aluno.pago ? 'ok' : 'no'}`}>
                            {aluno.pago ? 'Pagou' : 'Pendente'}
                        </span>
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>
        <p className="note">O status é identificado pela combinação do nome do aluno com uma entrada no mês selecionado. Confirme casos de pagamento por terceiros.</p>
    </section>;
}
