const tabs = [
    { id: 'overview', label: 'Resumo' },
    { id: 'transacoes', label: 'Lançamentos' },
    { id: 'pagamentos', label: 'Mensalidades' },
    { id: 'alunos', label: 'Alunos' },
];

export function Layout({ activeTab, onTabChange, children }) {
    return (
        <>
            <header className="app-header">
                <div className="brand">
                    <h1>Apex Dojo Hub</h1>
                    <p className="sub">Jiu-Jitsu & Muay Thai · Controle Financeiro · Jandira</p>
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
