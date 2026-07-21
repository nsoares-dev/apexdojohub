import { useMemo, useState } from 'react';
import { formatCurrency, normalizeText } from '../utils/util';
import { SectionTitle, StatCard } from './Layout';

export function Pagamentos({ alunos, transacoes }) {
    const [mes, setMes] = useState('2026-07');

    const [filter, setFilter] = useState('');
    const [query, setQuery] = useState('');

    const pagamentoStatus = useMemo(() => alunos.filter((aluno) => aluno.status === 'Ativo').map((aluno) => ({
        ...aluno, pago: transacoes.some((transacao) => transacao.valor > 0 &&
            transacao.data.startsWith(mes) &&
            normalizeText(`${transacao.descricao} ${transacao.descricao ?? ''}`).includes(normalizeText(aluno.nome)))
    })), [alunos, transacoes, mes]);

    const listed = pagamentoStatus.filter((aluno) => (!filter || (filter === 'pago' ? aluno.pago : !aluno.pago))
        && normalizeText(aluno.nome).includes(normalizeText(query)));

    const pago = pagamentoStatus.filter((aluno) => aluno.pago);

    const previsto = pagamentoStatus.reduce((total, aluno) => total + aluno.fee, 0);

    const recebido = pago.reduce((total, aluno) => total + aluno.fee, 0);

    const hoje = new Date();
    const hojeString = hoje.toISOString().slice(0, 7);
    const mesAno = hojeString.slice(5) + '/' + hojeString.slice(0, 4);

    console.log(pagamentoStatus);

    return <section>
        <div className="bar filters">
            <input type="month" value={mes} onChange={(event) => setMes(event.target.value)} />
            <select value={filter} onChange={(event) => setFilter(event.target.value)}>
                <option value="">Todos os ativos</option>
                <option value="pendente">Só pendentes</option>
                <option value="pago">Só quem pagou</option>
            </select>
            <input type="text" value={query} placeholder="Buscar aluno…" onChange={(event) => setQuery(event.target.value)} />
        </div>
        <div className="grid g4">
            <StatCard label="Ativos" valor={pagamentoStatus.length} />
            <StatCard label={`Pagaram em ${mesAno}`} tone="positivo" valor={pago.length} detalhe={`Pendentes: ${pagamentoStatus.length}`} />
            <StatCard label="Recebido (desses alunos)" tone="positivo" valor={formatCurrency(recebido)} />
            <StatCard label="Previsto (MENSALIDADES)" valor={formatCurrency(previsto)} />
        </div>

        <div class="sect">
            <h2>Alunos ativos × pagamentos do mês</h2>
            <span class="count">confere entradas do fluxo com o nome do aluno</span>
        </div>
        <div className="twrap">
            <table>
                <thead>
                    <tr>
                        <th>Aluno</th>
                        <th className="hide-mobile">Modalidade</th>
                        <th className="hide-mobile">Venc.</th>
                        <th className="money">Mensalidade</th>
                        <th>Status</th>
                        <th></th>
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
                        <span className={`chip no${aluno.pago ? ' ok' : ''}`}>
                            {aluno.pago ? 'Pagou' : 'Pendente'}
                        </span>
                    </td>
                    <td>
                        <a className="wa" target="_blank" href={`https://wa.me/55${aluno.phone}`}>
                            Cobrar no Whatsapp
                        </a>
                    </td>
                </tr>)}
                </tbody>
            </table>
        </div>
        <p className="note">O status é identificado pela combinação do nome do aluno com uma entrada no mês selecionado. Confirme casos de pagamento por terceiros.</p>
    </section>;
}
