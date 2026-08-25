import { MONTHS, formatCurrency, formatDate, formatCurrencyCompacto } from '../../../utils/util';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SectionTitle } from './Layout';
import { useState } from 'react';

function Ranking({ titulo, transacoes, positivo }) {
    return <div>
        <div className="sect">
            <SectionTitle>{titulo}</SectionTitle>
            <table className='twrap'>
                <tbody>
                    {transacoes?.map((transacao, index) =>
                        <tr key={index}>
                            <td className='desc'>{transacao.observacao}</td>
                            <td className={`money ${positivo ? 'positivo' : 'negativo'}`}>
                                {formatCurrency(Math.abs(transacao.valor))}
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    </div>;
}

export function Overview({ resumoDados, loading, ano, onAnoChange }) {
    const [hidden, setHidden] = useState({});
    if (loading || !resumoDados) {
        return <div style={{ padding: '20px', textAlign: 'center' }}>Carregando painel...</div>;
    }

    // Extraindo as 4 tabelas que vieram da sua API
    const { cards, grafico, maioresDespesas, maioresReceitas } = resumoDados;

    // Como não estamos mais lendo do mock, geramos uma lista de anos para o select 
    // (Pode ajustar os anos conforme a realidade da academia)
    const anosDisponiveis = [2030, 2029, 2028, 2027, 2026, 2025, 2024, 2023];

    // Adaptando o nome das variáveis do gráfico para bater com as chaves que o Recharts espera no seu código
    const monthly = grafico?.map(item => ({
        nome: item.mesNome,
        entrada: item.entradas,
        saida: Math.abs(item.saidas)
    })) || [];

    const handleLegendaClick = ({ dataKey }) => {
        setHidden(prev => ({
            ...prev,
            [dataKey]: !prev[dataKey]
        }));
    };

    return <section>
        <div className="bar">
            {/* Corrigido para value={ano} e usando a prop onAnoChange correta */}
            <select value={ano} onChange={(event) => onAnoChange(Number(event.target.value))}>
                {anosDisponiveis.map((item) =>
                    <option key={item} value={item}>{item}</option>)}
            </select>
            <span className="count">Visão consolidada de {ano}</span>
        </div>

        <div className="grid g4">
            <div className="card hero">
                <div>
                    <div className="lbl">Saldo acumulado (tudo desde 2023)</div>
                    <div className="val" id="kSaldo">{formatCurrency(cards.saldoAcumulado)}</div>
                </div>
                <div className="tip" id="kHoje">
                    {cards.ultimaAtualizacao
                        ? `Atualizado com lançamentos até ${formatDate(cards.ultimaAtualizacao)}`
                        : 'Nenhum lançamento registrado'}
                </div>
            </div>

            <div className="card">
                <div className="lbl">Recebido no ano</div>
                <div className="val positivo" id="kEnt">{formatCurrency(cards.recebidoAno)}</div>
            </div>

            <div className="card">
                <div className="lbl">Pago no ano</div>
                <div className="val negativo" id="kSai">{formatCurrency(cards.pagoAno)}</div>
            </div>

            <div className="card">
                <div className="lbl">Resultado do ano</div>
                <div className={`val ${cards.resultadoAno >= 0 ? "positivo" : "negativo"}`} id="kRes">
                    {formatCurrency(cards.resultadoAno)}
                </div>
            </div>

            {/* Card do Mês Específico */}
            <div className="card">
                <div className="lbl" id="kMesLbl">
                    {cards.mesReferencia ? `${MONTHS[cards.mesReferencia - 1]} ${ano}` : `Mês Atual`}
                </div>
                <div className={`val ${cards.resultadoMes >= 0 ? "positivo" : "negativo"}`} id="kMes">
                    {formatCurrency(cards.resultadoMes)}
                </div>
                <div className="note" id="kMesDet">
                    {`Entrou ${formatCurrency(cards.entrouMes)} · Saiu -${formatCurrency(cards.saiuMes)}`}
                </div>
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
                            tickFormatter={formatCurrencyCompacto}
                            tick={{ fill: '#78716c', fontSize: 12 }}
                            tickLine={false}
                            axisLine={false}
                            width={62}
                        />

                        <Tooltip
                            cursor={{ fill: '#f5f5f4' }}
                            formatter={(valor, nome) => [
                                nome === 'Saídas' ? `-${formatCurrency(valor)}` : formatCurrency(valor),
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
            <Ranking titulo="Maiores despesas do ano" transacoes={maioresDespesas} />
            <Ranking titulo="Maiores receitas do ano" transacoes={maioresReceitas} positivo />
        </div>
    </section>;
}
