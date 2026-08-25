import { useState } from 'react';
import { formatCurrency } from '../../../utils/util';
import {Loading} from '../../../utils/Loading';
// Atualizado para bater EXATAMENTE com as propriedades do C#
const emptyStudent = { 
    alunoId: 0,
    nome: '', 
    modalidade: 'Jiu-jitsu', 
    graduacao: 'Branca', 
    plano: 'Mensal', 
    mensalidade: 180, 
    vencimento: 10, 
    celular: '', 
    contatoEmergencia: '', // Novo
    status: 'Ativo',
    dataNascimento: new Date().toISOString().slice(0, 10),
    dataMatricula: new Date().toISOString().slice(0, 10) // Novo
};

export function Alunos({ dados, loading, filtros, onSave, onDelete }) {
    const { status, setStatus, modalidade, setModalidade, busca, setBusca } = filtros;
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(emptyStudent);
    
    // Calcula aniversariantes olhando para a lista que veio da API
    const hoje = new Date();
    const mesNum = ('0' + (hoje.getMonth() + 1)).slice(-2);
    const niver = dados
        .filter(a => a.status === 'Ativo' && a.dataNascimento && a.dataNascimento.slice(5, 7) === mesNum)
        .map(a => String(a.nome).split(' ')[0] + ' (' + a.dataNascimento.slice(8, 10) + ')');
    
    const alunosAtivosCount = dados.filter(a => a.status === 'Ativo').length;

    const handleOpenModal = (aluno = null) => {
        if (aluno) {
            // Se passou um aluno, é edição. Pega os dados e formata as datas para o input type="date"
            setForm({
                ...aluno,
                dataNascimento: aluno.dataNascimento ? aluno.dataNascimento.slice(0, 10) : '',
                dataMatricula: aluno.dataMatricula ? aluno.dataMatricula.slice(0, 10) : ''
            });
        } else {
            // Se não, é criação
            setForm(emptyStudent);
        }
        setShowModal(true);
    };

    const submit = (event) => {
        event.preventDefault();
        onSave({ 
            ...form, 
            mensalidade: Number(form.mensalidade), 
            vencimento: Number(form.vencimento) 
        });
        setShowModal(false);
        setForm(emptyStudent);
    };

    return (
        <section>
            <div className="bar filters">
                <input 
                    type='text' 
                    value={busca} 
                    placeholder="Buscar aluno ou telefone…" 
                    onChange={(e) => setBusca(e.target.value)} 
                />
                
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="ativos">Ativos</option>
                    <option value="inativos">Inativos</option>
                    <option value="todos">Todos</option>
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
                
                <button className="btn red" onClick={() => handleOpenModal()}>+ Aluno</button>
            </div>

            <div className="bar" style={{ marginBottom: '5px' }}>
                <span className="count" id="aTot">
                    {alunosAtivosCount > 1 ? `${alunosAtivosCount} Alunos ativos` : `${alunosAtivosCount} Aluno ativo`} 
                </span>
            </div>
            
            {niver.length > 0 && (
                <span className="count" style={{ marginTop: '-6px' }} id="aNiver">
                    🎂 Aniversariantes do mês: {niver.join(', ')}
                </span>
            )}

            {loading ? (
                <Loading />
            ) : (
                <div className="twrap" style={{ marginTop: '10px' }}>
                    <table>
                        <thead>
                            <tr>
                                <th>Aluno</th>
                                <th className="hide-mobile">Modalidade</th>
                                <th className="hide-mobile">Graduação</th>
                                <th>Plano</th>
                                <th className="money">Valor</th>
                                <th className="hide-mobile">Venc.</th>
                                <th>Contato</th>
                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            {dados.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>Nenhum aluno encontrado.</td>
                                </tr>
                            ) : (
                                dados.map((aluno) => (
                                    <tr key={aluno.alunoId}>
                                        <td>{aluno.nome}</td>
                                        <td className="hide-mobile mut">{aluno.modalidade}</td>
                                        <td className="hide-mobile mut">{aluno.graduacao}</td>
                                        <td className="mut">{aluno.plano}</td>
                                        <td className="money">{formatCurrency(aluno.mensalidade)}</td>
                                        <td className="hide-mobile mut">{aluno.vencimento}</td>
                                        <td>
                                            {aluno.celular && (
                                                <a className="wa" target="_blank" rel="noreferrer" href={`https://wa.me/55${aluno.celular.replace(/\D/g, '')}`}>
                                                    {aluno.celular}
                                                </a>
                                            )}
                                        </td>
                                        <td className="rowbtns">
                                            <button title="Editar" onClick={() => handleOpenModal(aluno)}>✎</button>
                                            <button title="Excluir" onClick={() => onDelete(aluno.alunoId)}>✕</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* MODAL CORRIGIDO */}
            {showModal && (
                <div className="overlay">
                    <div className="modal">
                        <h3>{form.alunoId ? 'Editar Aluno' : 'Novo Aluno'}</h3>
                        <form className="frm" onSubmit={submit}>
                            <div className="full">
                                <label>Nome</label>
                                <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required />
                            </div>

                            <div>
                                <label>Status</label>
                                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                                    <option value="Ativo">Ativo</option>
                                    <option value="Inativo">Inativo</option>
                                </select>
                            </div>

                            <div>
                                <label>Modalidade</label>
                                <select value={form.modalidade} onChange={(e) => setForm({ ...form, modalidade: e.target.value })}>
                                    <option value="Jiu-jitsu">Jiu-jitsu</option>
                                    <option value="Muay Thai">Muay Thai</option>
                                    <option value="Kids Jiu-jitsu">Kids Jiu-jitsu</option>
                                    <option value="Kids Muay Thai">Kids Muay Thai</option>
                                    <option value="Teens Jiu-jitsu">Teens Jiu-jitsu</option>
                                    <option value="2 Modalidades">2 Modalidades</option>
                                </select>
                            </div>

                            <div>
                                <label>Graduação</label>
                                <input value={form.graduacao} onChange={(e) => setForm({ ...form, graduacao: e.target.value })} />
                            </div>

                            <div>
                                <label>Plano</label>
                                <select value={form.plano} onChange={(e) => setForm({ ...form, plano: e.target.value })}>
                                    <option value="Mensal">Mensal</option>
                                    <option value="Semestral">Semestral</option>
                                    <option value="Anual">Anual</option>
                                    <option value="Gympass">Gympass</option>
                                    <option value="Freepass">Freepass</option>
                                    <option value="Personal">Personal</option>
                                </select>
                            </div>

                            <div>
                                <label>Valor Mensal (R$)</label>
                                <input type="number" step="0.01" value={form.mensalidade} onChange={(e) => setForm({ ...form, mensalidade: e.target.value })} required />
                            </div>

                            <div>
                                <label>Dia do Vencimento</label>
                                <input type="number" min="1" max="31" value={form.vencimento} onChange={(e) => setForm({ ...form, vencimento: e.target.value })} required />
                            </div>

                            <div>
                                <label>Celular</label>
                                <input placeholder="11999999999" value={form.celular} onChange={(e) => setForm({ ...form, celular: e.target.value })} />
                            </div>

                            <div>
                                <label>Contato de Emergência</label>
                                <input value={form.contatoEmergencia} onChange={(e) => setForm({ ...form, contatoEmergencia: e.target.value })} />
                            </div>

                            <div>
                                <label>Aniversário</label>
                                <input type="date" value={form.dataNascimento} onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })} />
                            </div>
                            
                            <div>
                                <label>Matrícula</label>
                                <input type="date" value={form.dataMatricula} onChange={(e) => setForm({ ...form, dataMatricula: e.target.value })} />
                            </div>

                            <div className="macts full">
                                <button type="button" className="btn ghost" onClick={() => setShowModal(false)}>Cancelar</button>
                                <button type="submit" className="btn red">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}
