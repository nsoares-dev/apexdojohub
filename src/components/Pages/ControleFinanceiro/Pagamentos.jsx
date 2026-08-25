import { useState, useEffect } from 'react';
import { formatCurrency } from '../../../utils/util';
import { StatCard } from './Layout';
import { Loading } from '../../../utils/Loading';

export function Pagamentos({ dados, loading, filtros }) {
    const { mesAno, setMesAno, statusFiltro, setStatusFiltro, busca, setBusca } = filtros;
    const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const [visibleCount, setVisibleCount] = useState(20);

    useEffect(() => {
        setVisibleCount(20);
    }, [dados]);

    const gerarLinkWhatsApp = (aluno) => {
        // Pega o primeiro nome do aluno
        const primeiroNome = aluno.nome ? String(aluno.nome).split(' ')[0] : 'Aluno';
        const mesIndex = mesAno ? parseInt(mesAno.split('-')[1], 10) - 1 : new Date().getMonth();
        const nomeMes = MESES[mesIndex];
        const vencTexto = aluno.vencimento && aluno.vencimento > 0 ? `(vencimento dia ${aluno.vencimento})` : '';
        const mensagem = `Olá ${primeiroNome}! Deus abençoe 🙏 Passando pra lembrar da mensalidade de ${nomeMes} ${vencTexto}.\nPIX: 11991370886 - Herbert Oliveira. Qualquer coisa me chama!`;
        const celularLimpo = aluno.celular ? String(aluno.celular).replace(/\D/g, '') : '';

        return `https://wa.me/55${celularLimpo}?text=${encodeURIComponent(mensagem)}`;
    };


    const mesDisplay = mesAno ? `${mesAno.split('-')[1]}/${mesAno.split('-')[0]}` : '';

    return (
        <section>
            {/* BARRA DE FILTROS */}
            <div className="bar filters">
                <input
                    type="month"
                    value={mesAno}
                    onChange={(e) => setMesAno(e.target.value)}
                />
                <select
                    value={statusFiltro}
                    onChange={(e) => setStatusFiltro(e.target.value)}
                >
                    <option value="ativos">Todos os ativos</option>
                    <option value="inativos">Inativos</option>
                    <option value="todos">Todos</option>
                </select>
                <input
                    type="text"
                    placeholder="Buscar aluno…"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                />
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                    <Loading />
                </div>
            ) : dados && (
                <>
                    {/* CARTÕES DE RESUMO */}
                    <div className="grid g4">
                        <StatCard label="Ativos" valor={dados.resumo.totalAtivos} />
                        <StatCard
                            label={`Pagaram em ${mesDisplay}`}
                            tone="positivo"
                            valor={dados.resumo.pagaram}
                            detalhe={`Pendentes: ${dados.resumo.pendentes}`}
                        />
                        <StatCard
                            label="Recebido"
                            tone="positivo"
                            valor={formatCurrency(dados.resumo.valorRecebido)}
                        />
                        <StatCard
                            label="Previsto"
                            valor={formatCurrency(dados.resumo.valorPrevisto)}
                        />
                    </div>

                    <div className="sect">
                        <h2>Alunos ativos × pagamentos do mês</h2>
                        <span className="count">confere entradas do fluxo com o nome do aluno</span>
                    </div>

                    {/* TABELA */}
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
                            <tbody>
                                {dados.alunos.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                                            Nenhum aluno encontrado.
                                        </td>
                                    </tr>
                                ) : (
                                    dados.alunos.slice(0, visibleCount).map((aluno) => (
                                        <tr key={aluno.alunoId}>
                                            <td>{aluno.nome}</td>
                                            <td className="hide-mobile">{aluno.modalidade}</td>
                                            <td className="hide-mobile">Dia {aluno.vencimento}</td>
                                            <td className="money">{formatCurrency(aluno.mensalidade)}</td>
                                            <td>
                                                <span className={`chip ${aluno.status === 'Pago' ? 'ok' : 'no'}`}>
                                                    {aluno.status === 'Pago' ? 'Pagou' : 'Pendente'}
                                                </span>
                                            </td>
                                            <td>
                                                {/* {aluno.status === 'Pendente' && ( */}
                                                <a
                                                    className="wa"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    href={gerarLinkWhatsApp(aluno)}
                                                >
                                                    Cobrar no Whatsapp
                                                </a>
                                                {/* )} */}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                        {/* BOTÃO CARREGAR MAIS - EXATAMENTE IGUAL AO TRANSACOES.JSX */}
                        {visibleCount < dados.alunos.length && (
                            <div style={{ textAlign: 'center', padding: '16px', background: '#fff', borderTop: '1px solid #eee' }}>
                                <button
                                    className="btn ghost"
                                    onClick={() => setVisibleCount(prev => prev + 20)}
                                >
                                    Carregar mais {Math.min(20, dados.alunos.length - visibleCount)} alunos...
                                </button>
                            </div>
                        )}
                    </div>

                    <p className="note">
                        O status é identificado pela combinação do nome do aluno com uma entrada no mês selecionado. Confirme casos de pagamento por terceiros.
                    </p>
                </>
            )}
        </section>
    );
}