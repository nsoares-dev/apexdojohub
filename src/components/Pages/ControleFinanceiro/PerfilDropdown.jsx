import { useState, useRef, useEffect } from 'react';
import { User, Sparkles, CreditCard, FileText, LogOut, CloudSync, CheckCircle, Loader2, X, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { syncService } from '../../Services/SyncService';
import { logService } from '../../Services/LogService';
import './LogModal.css';

export function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [usuario, setUsuario] = useState(null);

    const [isSyncing, setIsSyncing] = useState(false);
    const [showSyncSuccess, setShowSyncSuccess] = useState(false);

    // Estados do Log e Paginação
    const [isLogModalOpen, setIsLogModalOpen] = useState(false);
    const [isLoadingLogs, setIsLoadingLogs] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // O estado começa vazio, esperando a sua API
    const [logsSync, setLogsSync] = useState([]);

    // Trava o Scroll do fundo quando a modal abre
    useEffect(() => {
        if (isLogModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isLogModalOpen]);

    // Lógica da Paginação
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLogs = logsSync.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(logsSync.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    useEffect(() => {
        const usuarioStorage = sessionStorage.getItem('usuario');
        if (usuarioStorage) {
            try {
                setUsuario(JSON.parse(usuarioStorage));
            } catch (error) {
                console.error("Erro ao ler dados:", error);
            }
        }

        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSync = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsSyncing(true);

        try {
            await syncService.sincronizar();
            setIsOpen(false);
            setShowSyncSuccess(true);
            setTimeout(() => {
                setShowSyncSuccess(false);
                window.location.reload();
            }, 4000);
        } catch (error) {
            console.error("Erro ao sincronizar:", error);
        } finally {
            setIsSyncing(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('usuario');
        window.location.href = '/';
    };

    const handleAbrirLog = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        setCurrentPage(1);
        setIsLogModalOpen(true);
        setIsLoadingLogs(true);

        try {
            const dadosApi = await logService.logSync();
            setLogsSync(Array.isArray(dadosApi) ? dadosApi : []);
        } catch (error) {
            console.error("Erro ao buscar os logs na API:", error);
            setLogsSync([]);
        } finally {
            setIsLoadingLogs(false);
        }
    };

    const formatarData = (dataString) => {
        if (!dataString) return '-';
        const data = new Date(dataString);
        return data.toLocaleString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    if (!usuario) return null;

    const getIniciais = (nome) => {
        if (!nome) return 'AD';
        const partes = nome.split(' ');
        if (partes.length >= 2) return (partes[0][0] + partes[1][0]).toUpperCase();
        return nome.substring(0, 2).toUpperCase();
    };

    const nomeFormatado = usuario.nome || 'Apex Dojo Hub';
    const emailFormatado = usuario.email || usuario.login || 'Sem email cadastrado';

    return (
        <>
            <div className="kk-profile-wrapper" ref={dropdownRef}>
                <button type="button" className="kk-trigger" onClick={() => setIsOpen(!isOpen)}>
                    <div className="kk-trigger-info">
                        <span className="kk-trigger-name">{nomeFormatado}</span>
                        <span className="kk-trigger-email">{emailFormatado}</span>
                    </div>
                    <div className="kk-avatar-ring">
                        {usuario.fotoPerfil ? (
                            <img src={`data:image/jpeg;base64,${usuario.fotoPerfil}`} alt="Avatar" className="kk-avatar" />
                        ) : (
                            <div className="kk-avatar">{getIniciais(usuario.nome)}</div>
                        )}
                    </div>
                </button>

                {isOpen && (
                    <div className="kk-menu">
                        <button className="kk-menu-item" type="button">
                            <User size={18} strokeWidth={2} />
                            {usuario.nome}
                        </button>

                        <div className="kk-divider"></div>

                        <button className="kk-menu-item" type="button" onClick={(e) => handleSync(e)} disabled={isSyncing}>
                            {isSyncing ? (
                                <Loader2 size={18} strokeWidth={2} className="icon-spin" />
                            ) : (
                                <CloudSync size={18} strokeWidth={2} />
                            )}
                            {isSyncing ? 'Sincronizando...' : 'Sincronizar'}
                        </button>

                        <button className="kk-menu-item" type="button" onClick={handleAbrirLog}>
                            <FileText size={18} strokeWidth={2} />
                            Log de Sincronização
                        </button>

                        <div className="kk-divider"></div>

                        <button className="kk-menu-item kk-logout-btn" type="button" onClick={handleLogout}>
                            <LogOut size={18} strokeWidth={2} />
                            Sair
                        </button>
                    </div>
                )}
            </div>

            {showSyncSuccess && (
                <div className="sync-modal-overlay">
                    <div className="sync-modal-card">
                        <div className="sync-icon-wrapper">
                            <CheckCircle size={44} strokeWidth={2} color="#10b981" />
                        </div>
                        <h3 className="sync-title">Sincronização Concluída!</h3>
                        <p className="sync-message">A planilha foi sincronizada com o banco de dados com sucesso.</p>
                    </div>
                </div>
            )}

            {isLogModalOpen && (
                <div className="modal-overlay" onClick={() => setIsLogModalOpen(false)}>
                    <div className="modal-content" style={{ maxWidth: '1000px' }} onClick={(e) => e.stopPropagation()}>

                        <div className="modal-header">
                            <h2>Histórico de Sincronizações</h2>
                            <button className="btn-fechar-icon" onClick={() => setIsLogModalOpen(false)}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div style={{ overflowX: 'auto' }}>
                                <table className="tabela-log" style={{ minWidth: '800px' }}>
                                    <thead>
                                        <tr>
                                            <th>Data e Hora</th>
                                            <th>Status</th>
                                            <th>Usuário</th>
                                            <th style={{ textAlign: 'center' }} title="Alunos Sincronizados com Sucesso?">Sync Alunos</th>
                                            <th style={{ textAlign: 'center' }}>Qtd Alunos</th>
                                            <th style={{ textAlign: 'center' }} title="Fluxo Sincronizado com Sucesso?">Sync Fluxo</th>
                                            <th style={{ textAlign: 'center' }}>Qtd Fluxo</th>
                                            <th style={{ textAlign: 'center' }} title="Posição Sincronizada com Sucesso?">Sync Posição</th>
                                            <th style={{ textAlign: 'center' }}>Qtd Posição</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {isLoadingLogs ? (
                                            <tr>
                                                <td colSpan="9" style={{ textAlign: 'center', padding: '30px' }}>
                                                    <Loader2 size={24} className="icon-spin" style={{ margin: '0 auto', color: '#6b7280' }} />
                                                    <div style={{ marginTop: '10px', color: '#6b7280' }}>Carregando histórico...</div>
                                                </td>
                                            </tr>
                                        ) : currentLogs.length > 0 ? (
                                            currentLogs.map((log) => {

                                                const isSucesso = log.alunos && log.fluxoCaixa && log.posicaoAlunos;

                                                return (
                                                    <tr key={log.id}>
                                                        <td style={{ whiteSpace: 'nowrap' }}>{formatarData(log.dataSincronizacao)}</td>
                                                        <td>
                                                            <span className={isSucesso ? 'status-sucesso' : 'status-parcial'}>
                                                                {isSucesso ? 'Sucesso' : 'Processado Parcialmente'}
                                                            </span>
                                                        </td>
                                                        <td style={{ textTransform: 'capitalize' }}>{log.nomeUsuario}</td>

                                                        {/* ALUNOS: Ícone de Booleano e Quantidade */}
                                                        <td style={{ textAlign: 'center' }}>
                                                            {log.alunos ? <Check size={18} color="#059669" style={{ margin: '0 auto' }} /> : <X size={18} color="#dc2626" style={{ margin: '0 auto' }} />}
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>{log.alunosAtualizados ?? 0}</td>

                                                        {/* FLUXO: Ícone de Booleano e Quantidade */}
                                                        <td style={{ textAlign: 'center' }}>
                                                            {log.fluxoCaixa ? <Check size={18} color="#059669" style={{ margin: '0 auto' }} /> : <X size={18} color="#dc2626" style={{ margin: '0 auto' }} />}
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>{log.fluxoCaixaAtualizados ?? 0}</td>

                                                        {/* POSIÇÃO: Ícone de Booleano e Quantidade */}
                                                        <td style={{ textAlign: 'center' }}>
                                                            {log.posicaoAlunos ? <Check size={18} color="#059669" style={{ margin: '0 auto' }} /> : <X size={18} color="#dc2626" style={{ margin: '0 auto' }} />}
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>{log.posicaoAlunosAtualizados ?? 0}</td>
                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="9" style={{ textAlign: 'center', padding: '30px', color: '#6b7280' }}>
                                                    Nenhum registro de sincronização encontrado.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {totalPages > 1 && !isLoadingLogs && (
                                <div className="paginacao-container">
                                    <div className="paginacao-info">
                                        Mostrando <strong>{indexOfFirstItem + 1}</strong> a <strong>{Math.min(indexOfLastItem, logsSync.length)}</strong> de <strong>{logsSync.length}</strong>
                                    </div>
                                    <div className="paginacao-botoes">
                                        <button
                                            className="btn-paginacao"
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft size={16} /> Anterior
                                        </button>
                                        <button
                                            className="btn-paginacao"
                                            onClick={handleNextPage}
                                            disabled={currentPage === totalPages}
                                        >
                                            Próxima <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}