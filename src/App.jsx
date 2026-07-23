import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { inicialAlunos, inicialTransacoes } from './data/seed';
import { useLocalStorage } from './components/hooks/useLocalStorage';
import { Layout } from './components/Layout';
import { Overview } from './components/Overview';
import { Pagamentos } from './components/Pagamentos';
import { Alunos } from './components/Alunos';
import { Transacoes } from './components/Transacoes';
import Login from './components/Login';

// ==========================================
// 1. O GUARDA-COSTAS (ROTA PROTEGIDA)
// ==========================================
const RotaProtegida = ({ children }) => {
  const usuarioLogado = localStorage.getItem("usuario");
  
  // Se não encontrar o usuário no cache do navegador, expulsa para o login
  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }
  
  // Se encontrou, renderiza o sistema (children)
  return children;
};

// ==========================================
// 2. O SEU SISTEMA ATUAL (ÁREA RESTRITA)
// ==========================================
// Mudei o nome da sua função App para SistemaLogado. 
// O código dentro dela é EXATAMENTE o que você já havia feito!
function SistemaLogado() {
  const [activeTab, setActiveTab] = useState('overview');
  const [transacoes, setTransacoes] = useLocalStorage('apex-transacoes', inicialTransacoes);
  const [alunos, setAlunos] = useLocalStorage('apex-alunos', inicialAlunos);
  const [ano, setAno] = useState(2026);
  
  const addTransaction = (transacoes) => setTransacoes((items) => [{ ...transacoes, id: crypto.randomUUID(), status: transacoes.valor >= 0 ? 'Recebido' : 'Pago' }, ...items]);
  const addStudent = (student) => setAlunos((items) => [{ ...student, id: crypto.randomUUID() }, ...items]);
  
  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {activeTab === 'overview' && (
        <Overview transacoes={transacoes} ano={ano} onAnoChange={setAno} />
      )}
      {activeTab === 'transacoes' && (
        <Transacoes 
          transacoes={transacoes}
          onCreate={addTransaction} 
          onDelete={(id) => setTransacoes((items) => items.filter((item) => item.id !== id))} 
        />
      )}
      {activeTab === 'pagamentos' && (
        <Pagamentos alunos={alunos} transacoes={transacoes} />
      )}
      {activeTab === 'alunos' && (
        <Alunos 
          alunos={alunos}
          onCreate={addStudent} 
          onDelete={(id) => setAlunos((items) => items.filter((item) => item.id !== id))} 
        />
      )}
    </Layout>
  );
}

// ==========================================
// 3. O NOVO APP (GERENCIADOR DE ROTAS)
// ==========================================
// Esse é o componente principal que o React vai carregar primeiro
export function App() {
  return (
    <Router>
      <Routes>
        {/* Rota Pública: Qualquer um pode acessar a tela de Login */}
        <Route path="/login" element={<Login />} />

        {/* Rota Privada: Só acessa se passar pelo Guarda-costas */}
        <Route 
          path="/" 
          element={
            <RotaProtegida>
              <SistemaLogado />
            </RotaProtegida>
          } 
        />

        {/* Redirecionamento de segurança: Se a pessoa digitar uma URL que não existe (ex: /teste), manda de volta pra raiz */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}