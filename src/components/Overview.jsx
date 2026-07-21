import { MONTHS, formatCurrency, formatDate, getMonth, getYearSummary, formatarEixo } from '../utils/util';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { SectionTitle, StatCard } from './Layout';
import { useState } from 'react';

function Ranking({ titulo, transacoes, positivo }) {
    return <div>
        <div className="sect">
            <SectionTitle>{titulo}</SectionTitle>
            <table className='twrap'>
                {/* <thead>
                    <tr>
                        <th>Descrição</th>
                        <th className="money">Valor</th>
                    </tr>
                </thead> */}
                <tbody>
                    {transacoes?.map((transacao) =>
                        <tr key={transacao.id}>
                            <td className='desc'>{transacao.descricao}
                            </td>
                            <td className={`money ${positivo ? 'positivo' : 'negativo'}`}>
                                {formatCurrency(Math.abs(transacao.valor))}
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    </div>;
}

export function Overview({ transacoes, ano, onAnoChange }) {
    const anos = [...new Set(transacoes.map((transacao) => Number(transacao.data.slice(0, 4))))].sort((a, b) => b - a);

    const { entrada, saida, resultado } = getYearSummary(transacoes, ano);

    const saldo = transacoes?.reduce((total, transacao) => total + transacao.valor, 0);

    const monthly = MONTHS.map((nome, index) => {
        const current = transacoes?.filter((transacao) => Number(transacao.data.slice(0, 4)) === ano && getMonth(transacao) === index + 1);
        return { nome, entrada: current?.filter((item) => item.valor > 0).reduce((total, item) => total + item.valor, 0), saida: current?.filter((item) => item.valor < 0).reduce((total, item) => total + Math.abs(item.valor), 0) };
    });

    const max = Math.max(1, ...monthly.flatMap((item) => [item.entrada, item.saida]));

    const topEntrada = transacoes?.filter((item) => Number(item.data.slice(0, 4)) === ano && item.valor > 0).sort((a, b) => b.valor - a.valor).slice(0, 5);

    const topSaida = transacoes?.filter((item) => Number(item.data.slice(0, 4)) === ano && item.valor < 0).sort((a, b) => a.valor - b.valor).slice(0, 5);

    const dataAtualizada = transacoes.reduce((maisRecente, atual) => {
        return new Date(atual.data).getTime() > new Date(maisRecente.data).getTime() ? atual : maisRecente;
    });

    const data = dataAtualizada.data

    const mes = new Date().getMonth();

    const [hidden, setHidden] = useState({});

    const handleLegendaClick = ({ dataKey }) => {
        setHidden(prev => ({
            ...prev,
            [dataKey]: !prev[dataKey]
        }));
    };



    return <section>
        <div className="bar">
            <select value={anos} onChange={(event) => onYearChange(Number(event.target.value))}>
                {anos.map((item) =>
                    <option key={item}>{item}</option>)}
            </select>
            <span className="count">Visão consolidada de {anos}</span>
        </div>

        <div className="grid g4">
            <div className="card hero">
                <div>
                    <div className="lbl">Saldo acumulado (tudo desde 2023)</div>
                    <div className="val " id="kSaldo">{formatCurrency(entrada)}</div>
                </div>
                <div className="tip" id="kHoje">{`Atualizado com lançamentos até ${formatDate(data)}`}</div>
            </div>
            <div className="card">
                <div className="lbl">Recebido no ano</div>
                <div className="val positivo" id="kEnt">{formatCurrency(entrada)}</div>
            </div>
            <div className="card">
                <div className="lbl">Pago no ano</div>
                <div className="val negativo" id="kSai">-{formatCurrency(saida)}</div>
            </div>
            <div className="card">
                <div className="lbl">Resultado do ano</div>
                <div className={`val ${resultado >= 0 ? "positivo" : "negativo"}`} id="kRes">{formatCurrency(resultado)}</div>
            </div>
            <div className="card">
                <div className="lbl" id="kMesLbl">{MONTHS[mes - 1] + ' ' + data.slice(0, 4)}</div>
                <div className={`val ${resultado >= 0 ? "positivo" : "negativo"}`} id="kMes">{formatCurrency(resultado)}</div>
                <div className="note" id="kMesDet">{`Entrou ${formatCurrency(entrada)} · Saiu -${formatCurrency(saida)}`}</div>
            </div>
        </div>

        <div className='sect'>
            <h2>Mês a mês</h2>
        </div>

        <div className="chart rounded-xl border border-stone-300 bg-white p-5">
            <div style={{ width: '100%', height: 320 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={monthly}
                        margin={{ top: 10, right: 12, left: 8, bottom: 0 }}
                        barGap={6}
                    >
                        <CartesianGrid
                            vertical={false}
                            stroke="#e7e5e4"
                            strokeDasharray="3 3"
                        />

                        <XAxis
                            dataKey="nome"
                            tickFormatter={(nome) => nome.slice(0, 3)}
                            tick={{ fill: '#78716c', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                        />

                        <YAxis
                            tickFormatter={formatarEixo}
                            tick={{ fill: '#78716c', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            width={62}
                        />

                        <Tooltip
                            cursor={{ fill: '#f5f5f4' }}
                            formatter={(valor, nome) => [
                                formatCurrency(valor),
                                nome,
                            ]}
                            contentStyle={{
                                border: '1px solid #d6d3d1',
                                borderRadius: '8px',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                            }}
                            labelStyle={{ fontWeight: 700 }}
                        />

                        <Legend
                            onClick={handleLegendaClick}
                            verticalAlign="top"
                            align="right"
                            iconType="circle"
                            iconSize={9}
                            wrapperStyle={{
                                fontSize: '13px',
                                paddingBottom: '16px',
                                cursor: 'pointer'
                            }}
                        />

                        <Bar
                            dataKey="entrada"
                            name="Entradas"
                            fill="#1e7a4c"
                            radius={[5, 5, 0, 0]}
                            maxBarSize={36}
                            hide={hidden.entrada}
                        />

                        <Bar
                            dataKey="saida"
                            name="Saídas"
                            fill="#b3261e"
                            radius={[5, 5, 0, 0]}
                            maxBarSize={36}
                            hide={hidden.saida}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>

        <div className="grid g2" style={{ marginTop: '14px' }}>
            <Ranking titulo="Maiores despesas do ano" transacoes={topSaida} />
            <Ranking titulo="Maiores receitas do ano" transacoes={topEntrada} positive />
        </div>
    </section>;
}
