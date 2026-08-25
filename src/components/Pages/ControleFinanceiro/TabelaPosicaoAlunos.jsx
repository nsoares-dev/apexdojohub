import React from 'react';
import { formatCurrency } from '../../../utils/util';

export function TabelaPosicaoAlunos({ dados, loading, filtros }) {
  const { ano, setAno, busca, setBusca, status, setStatus, modalidade, setModalidade, plano, setPlano } = filtros;

  const renderizarCelulaMes = (valor) => {
    if (!valor || valor === '-') {
      return <td className="text-center mut">-</td>;
    }

    const valorUpper = valor.toString().toUpperCase();

    if (valorUpper.includes('PENDENTE')) {
      return (
        <td className="text-center">
          <span className="chip no">{valor}</span>
        </td>
      );
    }

    if (valorUpper.includes('INATIV') || valorUpper.includes('NO CLASS')) {
      return (
        <td className="text-center">
          <span className="chip mut">{valor}</span>
        </td>
      );
    }

    return <td className="text-center">{valor}</td>;
  };

  return (
    <section className="posicao-section">

      {/* BARRA DE FILTROS */}
      <div className="bar filters">
        <input
          type="text"
          placeholder="Buscar aluno ou telefone…"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Todos os status</option>
          <option value="Ativo">Ativos</option>
          <option value="Inativo">Inativos</option>
        </select>

        <select className="modalidade" value={modalidade} onChange={(e) => setModalidade(e.target.value)}>
          <option value="">Todas as modalidades</option>
          <option value="2 Modalidades">2 Modalidades</option>
          <option value="Jiu-jitsu">Jiu-jitsu</option>
          <option value="Kids Jiu-jitsu">Kids Jiu-jitsu</option>
          <option value="Kids Muay Thai">Kids Muay Thai</option>
          <option value="Muay Thai">Muay Thai</option>
          <option value="Teens Jiu-jitsu">Teens Jiu-jitsu</option>
        </select>

        <select value={plano} onChange={(e) => setPlano(e.target.value)}>
          <option value="">Todos os planos</option>
          <option value="Mensal">Mensal</option>
          <option value="Semestral">Semestral</option>
          <option value="Anual">Anual</option>
        </select>

        {/* FILTRO DE ANO LIVRE */}
        <select value={ano} onChange={(e) => setAno(Number(e.target.value))}>
          <option value={2024}>Ano: 2024</option>
          <option value={2025}>Ano: 2025</option>
          <option value={2026}>Ano: 2026</option>
          <option value={2027}>Ano: 2027</option>
          <option value={2028}>Ano: 2028</option>
          <option value={2029}>Ano: 2029</option>
          <option value={2030}>Ano: 2030</option>
        </select>
      </div>

      {/* CONTADOR */}
      <div className="bar contador-posicao">
        <span className="count">
          {dados.length > 1 ? `${dados.length} Alunos na posição selecionada` : `${dados.length} Aluno na posição selecionada`}
        </span>
      </div>

      {/* TABELA COM SCROLL */}
      <div className="twrap twrap-posicao">
        {loading ? (
          <div className="empty-state">Carregando dados da posição...</div>
        ) : (
          <table className="tabela-posicao">

            <thead>
              <tr>
                <th className="quina-aluno">Aluno</th>
                <th className="hide-mobile">Modalidade</th>
                <th className="hide-mobile">Venc.</th>
                <th>Status</th>
                <th>Plano</th>
                <th className="text-center">Acerto Ant.</th>
                <th className="text-center">Jan</th>
                <th className="text-center">Fev</th>
                <th className="text-center">Mar</th>
                <th className="text-center">Abr</th>
                <th className="text-center">Mai</th>
                <th className="text-center">Jun</th>
                <th className="text-center">Jul</th>
                <th className="text-center">Ago</th>
                <th className="text-center">Set</th>
                <th className="text-center">Out</th>
                <th className="text-center">Nov</th>
                <th className="text-center">Dez</th>
                <th className="money">Total</th>
              </tr>
            </thead>

            <tbody>
              {dados.length === 0 ? (
                <tr>
                  <td colSpan="19" className="empty-state">
                    Nenhum aluno encontrado.
                  </td>
                </tr>
              ) : (
                dados.map((aluno, idx) => (
                  <tr key={aluno.alunoId || idx}>

                    <td className="coluna-aluno">{aluno.nome}</td>

                    <td className="hide-mobile mut">{aluno.modalidade}</td>
                    <td className="hide-mobile mut">{aluno.vencimento}</td>
                    <td className="mut">{aluno.status}</td>
                    <td className="mut">{aluno.plano}</td>
                    <td className="text-center mut">{aluno.acertoAnterior}</td>

                    {renderizarCelulaMes(aluno.janeiro)}
                    {renderizarCelulaMes(aluno.fevereiro)}
                    {renderizarCelulaMes(aluno.marco)}
                    {renderizarCelulaMes(aluno.abril)}
                    {renderizarCelulaMes(aluno.maio)}
                    {renderizarCelulaMes(aluno.junho)}
                    {renderizarCelulaMes(aluno.julho)}
                    {renderizarCelulaMes(aluno.agosto)}
                    {renderizarCelulaMes(aluno.setembro)}
                    {renderizarCelulaMes(aluno.outubro)}
                    {renderizarCelulaMes(aluno.novembro)}
                    {renderizarCelulaMes(aluno.dezembro)}

                    <td className="money">
                      {aluno.total ? formatCurrency(aluno.total) : '-'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}