import { useState } from 'react';
import { formatCurrency, normalizeText } from '../utils/util';
import { Modal } from './Modal';
import { SectionTitle, StatCard } from './Layout';

const emptyStudent = { name: '', modality: 'Jiu-Jitsu', belt: 'Branca', plan: 'Mensal', fee: 180, dueDay: 10, phone: '', status: 'Ativo' };

export function Alunos({ alunos, onCreate, onDelete }) {
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('Ativo');
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(emptyStudent);
    const lista = alunos.filter((aluno) => (!status || aluno.status === status) && normalizeText(`${aluno.nome} ${aluno.phone}`).includes(normalizeText(query)));
    const hoje = new Date();
    const mesNum = ('0' + (hoje.getMonth() + 1)).slice(-2);
    const niver = alunos.filter(a => a.status == 'Ativo' && a.dataAn && a.dataAn.slice(5, 7) === mesNum)
        .map(a => String(a.nome).split(' ')[0] + ' (' + a.dataAn.slice(8, 10) + ')');
    const alunosCad = alunos.filter(a => a.status == 'Ativo').length;

    const submit = (event) => {
        event.preventDefault();
        onCreate({ ...form, fee: Number(form.fee), dueDay: Number(form.dueDay) });
        setShowModal(false);
        setForm(emptyStudent);
    };

    return <section>
        <div className="bar filters">
            <input type='text' value={query} placeholder="Buscar aluno ou telefone…" onChange={(event) => setQuery(event.target.value)} />
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
                <option value="Ativo">Ativos</option>
                <option value="Inativo">Inativos</option>
                <option value="">Todos</option>
            </select>
            <select className="modalidade" value={status} /*onChange={(event) => setStatus(event.target.value)} */>
                <option value="">Todas as modalidades</option>
                <option>2 Modalidades</option>
                <option>Jiu-jitsu</option>
                <option>Kids Jiu-jitsu</option>
                <option>Kids Muay Thai</option>
                <option>Muay Thai</option>
                <option>Teens Jiu-jitsu</option>
            </select>
            <button className="btn red" onClick={() => setShowModal(true)}>+ Aluno</button>
        </div>
        <div className="bar" style={{ marginBottom: '5px' }}>
            <span className="count" id="aTot">{alunosCad > 1 ? `${alunosCad} Alunos ativos` : `${alunosCad} Aluno ativo`} </span>
        </div>
        <span className="count" style={{ marginTop: '-6px' }} id="aNiver" >🎂 Aniversariantes do mês: '{niver.join(', ')}</span>

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
                <tbody>{lista.map((aluno) =>
                    <tr key={aluno.id}>
                        <td>{aluno.nome}</td>
                        <td className="hide-mobile mut">{aluno.modality}</td>
                        <td className="hide-mobile mut">{aluno.belt}</td>
                        <td className="mut">{aluno.plan}</td>
                        <td className="money">{formatCurrency(aluno.fee)}</td>
                        <td className="hide-mobile mut">{aluno.dueDay}</td>
                        <td><a className="wa" target="_blank" href={`https://wa.me/55${aluno.phone}`}>{aluno.phone}</a></td>
                        {/* <td><button className="text-button delete" onClick={() => onDelete(aluno.id)}>Excluir</button></td></tr>)} */}
                        <td className="rowbtns">
                            <button title="Editar" onClick={() => onDelete(aluno.id)}>✎</button>
                            <button title="Excluir" onClick={() => onDelete(aluno.id)}>✕</button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
        {
            showModal &&
            <div className="overlay">
                <div className="modal" onClose={() => setShowModal(false)}>
                    <h3>Novo Aluno</h3>
                    <div className="frm" onSubmit={submit}>
                        <div className="full">
                            <label>Nome</label>
                            <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
                        </div>

                        <div>
                            <label>Status</label>
                            <select>
                                <option selected="">Ativo</option>
                                <option>Inativo</option>
                            </select>
                        </div>
                        <div>
                            <label> Modalidade</label>
                            <select >
                                <option selected="">Jiu-jitsu</option>
                                <option>Muay Thai</option><option>Kids Jiu-jitsu</option><option>Kids Muay Thai</option><option>Teens Jiu-jitsu</option><option>2 Modalidades</option></select>
                        </div>

                        <div>
                            <label>Graduação</label>
                            <input value={form.belt} onChange={(event) => setForm({ ...form, belt: event.target.value })} />
                        </div>

                        <div>
                            <label>Plano</label>
                            <select>
                                <option selected="">Mensal</option>
                                <option>Semestral</option>
                                <option>Anual</option>
                                <option>Gympass</option>
                                <option>Freepass</option>
                                <option>Personal</option>
                            </select>
                        </div>

                        <div>
                            <label>Valor Mensal(R$)</label>
                            <input type="number" min="1" max="31" value={form.dueDay} onChange={(event) => setForm({ ...form, dueDay: event.target.value })} required />
                        </div>

                        <div>
                            <label>Dia do Vencimento</label>
                            <input type="number" min="1" max="31" value={form.dueDay} onChange={(event) => setForm({ ...form, dueDay: event.target.value })} required />
                        </div>

                        <div>
                            <label>Celular</label>
                            <input placeholder="11999999999" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
                        </div>

                        <div>
                            <label>Contato de Emergência</label>
                            <input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
                        </div>

                        <div>
                            <label>Aniversário</label>
                            <input type="date" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
                        </div>
                        <div>
                            <label>Matrícula</label>
                            <input type="date" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
                        </div>

                    </div>
                    <div className="macts">
                        <button type="button" className="btn ghost" onClick={() => setShowModal(false)}>Cancelar</button>
                        <button className="btn red">Salvar</button>
                    </div>
                </div>
            </div>
        }</section >;
}
