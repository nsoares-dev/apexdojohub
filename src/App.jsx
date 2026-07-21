import { useState } from 'react';
import { inicialAlunos, inicialTransacoes } from './data/seed';
import { useLocalStorage } from './components/hooks/useLocalStorage';
import { Layout } from './components/Layout';
import { Overview } from './components/Overview';
import { Pagamentos } from './components/Pagamentos';
import { Alunos } from './components/Alunos';
import { Transacoes } from './components/Transacoes';

export function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [transacoes, setTransacoes] = useLocalStorage('apex-transacoes', inicialTransacoes);
  const [alunos, setAlunos] = useLocalStorage('apex-alunos', inicialAlunos);
  const [ano, setAno] = useState(2026);
  const addTransaction = (transacoes) => setTransacoes((items) => [{ ...transaction, id: crypto.randomUUID(), status: transaction.amount >= 0 ? 'Recebido' : 'Pago' }, ...items]);
  const addStudent = (student) => setAlunos((items) => [{ ...student, id: crypto.randomUUID() }, ...items]);
  return <Layout activeTab={activeTab} onTabChange={setActiveTab}>
    {
      activeTab === 'overview' && <Overview transacoes={transacoes} ano={ano} onAnoChange={setAno} />
    }
    {
      activeTab === 'transacoes' &&
      <Transacoes transacoes={transacoes}
        onCreate={addTransaction} onDelete={(id) => setTransacoes((items) => items.filter((item) => item.id !== id))} />
    }
    {
      activeTab === 'pagamentos' &&
      <Pagamentos alunos={alunos}
        transacoes={transacoes} />
    }
    {
      activeTab === 'alunos' &&
      <Alunos alunos={alunos}
        onCreate={addStudent} onDelete={(id) => setAlunos((items) => items.filter((item) => item.id !== id))} />
    }
  </Layout>;
}
