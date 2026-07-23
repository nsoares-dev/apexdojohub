import React, { useState, useEffect } from 'react';
const tabs = [
    { id: 'overview', label: 'Resumo' },
    { id: 'transacoes', label: 'Lançamentos' },
    { id: 'pagamentos', label: 'Mensalidades' },
    { id: 'alunos', label: 'Alunos' },
];

export function Layout({ activeTab, onTabChange, children }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [usuario, setUsuario] = useState(null);

    // Quando o Layout carrega, ele busca quem está logado
    useEffect(() => {
        const userSalvo = localStorage.getItem('usuario');
        if (userSalvo) {
            setUsuario(JSON.parse(userSalvo));
        }
    }, []);

    // Pega as iniciais para o avatar se a pessoa não tiver foto
    const getIniciais = (nome) => {
        if (!nome) return 'AD'; // Apex Dojo fallback
        const partes = nome.split(' ');
        if (partes.length >= 2) {
            return (partes[0][0] + partes[1][0]).toUpperCase();
        }
        return nome.substring(0, 2).toUpperCase();
    };

    return (
        <>
            <header className="app-header">
                <div className="header-content">
                    <div className="brand">
                        <h1>Apex Dojo Hub</h1>
                        <p className="sub">Jiu-Jitsu & Muay Thai · Controle Financeiro · Jandira</p>
                    </div>

                    {/* PERFIL DO USUÁRIO NO CANTO DIREITO */}
                    {usuario && (
                        <div className="user-profile" onClick={() => setIsModalOpen(true)}>
                            <div className="user-info-header">
                                <span className="user-name">{usuario.nome?.split(' ')[0]}</span>
                            </div>
                            <div className="user-avatar">
                                {usuario.fotoPerfil ? (
                                    <img src={`data:image/jpeg;base64,${usuario.fotoPerfil}`} alt="Avatar" />
                                ) : (
                                    <span>{getIniciais(usuario.nome)}</span>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="belt" />
            </header>

            <nav>
                <div className="tabs">
                    {tabs.map((tab) =>
                        <button key={tab.id}
                            className={activeTab === tab.id ? 'on ' : ''}
                            onClick={() => onTabChange(tab.id)}>{tab.label}
                        </button>)}
                </div>
            </nav>

            <main>{children}</main>

            {/* MODAL DE PERFIL */}
            {isModalOpen && usuario && (
                <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                    <div className="user-modal animated-fade-down" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setIsModalOpen(false)}>×</button>
                        
                        <div className="modal-avatar-large">
                             {usuario.fotoPerfil ? (
                                    <img src={`data:image/jpeg;base64,${usuario.fotoPerfil}`} alt="Avatar" />
                                ) : (
                                    <span>{getIniciais(usuario.nome)}</span>
                                )}
                        </div>
                        
                        <h2 className="modal-name">{usuario.nome}</h2>
                        <p className="modal-email">{usuario.email || usuario.login}</p>
                        
                        <div className="modal-badge">
                            {usuario.tipoUsuario === 'Admin' ? 'Administrador' : 'Professor / Staff'}
                        </div>

                        <hr className="modal-divider" />

                        <button className="btn-logout" onClick={() => {
                            localStorage.removeItem('usuario');
                            window.location.href = '/login';
                        }}>
                            Sair do Sistema
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export function SectionTitle({ children, action }) {
    return <div className="section-title">
        <h2>{children}</h2>{action}
    </div>;
}


export function StatCard({ label, valor, tone = '', detalhe, hero = false }) {
    return <div className={`card${hero ? ' hero' : ''}`}>
        <div>
            <div className="lbl">{label}</div>
            <div className={`val ${tone}`}>{valor}</div>
        </div>

        {detalhe && <small className="tip">{detalhe}</small>}
    </div>;
}
