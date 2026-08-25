import { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Pages/ControleFinanceiro/Layout';
import Login from './components/Pages/ControleFinanceiro/Login';
import { overviewService } from './components/Services/OverviewService';
import { lancamentoService } from './components/Services/LancamentoService';
import { mensalidadeService } from './components/Services/MensalidadeService';
import { alunoService } from './components/Services/AlunoService';
import { posicaoAlunoService } from './components/Services/PosicaoAlunoService';
import { Loading } from './utils/Loading';
import VitrineHome from './components/Pages/Vitrine/Home';

const Overview = lazy(() =>
  import('./components/Pages/ControleFinanceiro/Overview').then((module) => ({ default: module.Overview })),
);
const Pagamentos = lazy(() =>
  import('./components/Pages/ControleFinanceiro/Pagamentos').then((module) => ({ default: module.Pagamentos })),
);
const Alunos = lazy(() =>
  import('./components/Pages/ControleFinanceiro/Alunos').then((module) => ({ default: module.Alunos })),
);
const Transacoes = lazy(() =>
  import('./components/Pages/ControleFinanceiro/Transacoes').then((module) => ({ default: module.Transacoes })),
);
const TabelaPosicaoAlunos = lazy(() =>
  import('./components/Pages/ControleFinanceiro/TabelaPosicaoAlunos').then((module) => ({ default: module.TabelaPosicaoAlunos })),
);

// ==========================================
// 1. O GUARDA-COSTAS (ROTA PROTEGIDA)
// ==========================================
const RotaProtegida = ({ children }) => {
  const usuarioLogado = sessionStorage.getItem("usuario");

  // Se não encontrar o usuário no cache do navegador, expulsa para o login
  if (!usuarioLogado) {
    return <Navigate to="/login" replace />;
  }

  // Se encontrou, renderiza o sistema (children)
  return children;
};

const AreaFinanceira = ({ children }) => (
  <div className="finance-app">{children}</div>
);

// ==========================================
// 2. O SEU SISTEMA ATUAL (ÁREA RESTRITA)
// ==========================================
function SistemaLogado() {
  const [activeTab, setActiveTab] = useState('overview');
  const [ano, setAno] = useState(2026);
  const mes = null;

  // ==========================================
  // OVERVIEW
  // ==========================================
  const [resumoDados, setResumoDados] = useState(null);
  const [loadingResumo, setLoadingResumo] = useState(false);


  // ==========================================
  // Lançamentos/Transações
  // ==========================================
  const [lancamentosDados, setLancamentosDados] = useState([]);
  const [loadingLancamentos, setLoadingLancamentos] = useState(false);


  // ==========================================
  // Pagamentos/Mensalidades
  // ==========================================
  const [statusFiltroMensalidade, setStatusFiltroMensalidade] = useState('ativos');
  const [buscaMensalidade, setBuscaMensalidade] = useState('');
  const [dadosMensalidade, setDadosMensalidade] = useState(null);
  const [loadingMensalidade, setLoadingMensalidade] = useState(true);
  const [mesAnoMensalidade, setMesAnoMensalidade] = useState(() => {
    const hoje = new Date();
    return hoje.toISOString().slice(0, 7);
  });

  // ==========================================
  // Alunos
  // ==========================================
  const [statusAluno, setStatusAluno] = useState('ativos');
  const [modalidadeAluno, setModalidadeAluno] = useState('');
  const [buscaAluno, setBuscaAluno] = useState('');
  const [dadosAlunos, setDadosAlunos] = useState([]);
  const [loadingAlunos, setLoadingAlunos] = useState(true);

  // ==========================================
  // Posição Alunos
  // ==========================================

  const [anoPosicao, setAnoPosicao] = useState(new Date().getFullYear());
  const [buscaPosicao, setBuscaPosicao] = useState('');
  const [statusPosicao, setStatusPosicao] = useState('');
  const [modalidadePosicao, setModalidadePosicao] = useState('');
  const [planoPosicao, setPlanoPosicao] = useState('');

  const [dadosPosicao, setDadosPosicao] = useState([]);
  const [loadingPosicao, setLoadingPosicao] = useState(true);


  // Ações locais (Mock)
  const addTransaction = (novaTransacao) => {
    setLancamentosDados((items) => [{ ...novaTransacao, id: crypto.randomUUID(), situacao: novaTransacao.valor >= 0 ? 'Recebido' : 'Pago' }, ...items]);
  };

  const deleteTransaction = (id) => {
    setLancamentosDados((items) => items.filter((item) => item.id !== id));
  };

  // Efeito: Buscar Resumo (Overview)
  useEffect(() => {
    if (activeTab === 'overview') {
      const buscarResumo = async () => {
        setLoadingResumo(true);
        try {
          const dadosAPI = await overviewService.getVisaoGeral(ano, mes);
          setResumoDados(dadosAPI);
        } catch (error) {
          console.error("Erro ao buscar o resumo do dashboard:", error);
        } finally {
          setLoadingResumo(false);
        }
      };

      buscarResumo();
    }
  }, [activeTab, ano, mes]);

  // Efeito: Buscar Lançamentos (Transações)
  useEffect(() => {
    if (activeTab === 'transacoes') {
      const buscarLancamentos = async () => {
        setLoadingLancamentos(true);
        try {
          const dadosAPI = await lancamentoService.getLancamentos();
          setLancamentosDados(dadosAPI);
        } catch (error) {
          console.error("Erro ao buscar lançamentos:", error);
        } finally {
          setLoadingLancamentos(false);
        }
      };

      buscarLancamentos();
    }
  }, [activeTab]);


  // Efeito: Buscar Pagamentos/Mensalidades 
  useEffect(() => {
    const fetchMensalidades = async () => {
      setLoadingMensalidade(true);
      try {
        // Divide '2026-08' em ano='2026' e mes='08'
        const [ano, mes] = mesAnoMensalidade.split('-');

        const response = await mensalidadeService.getDashboard({
          mes: mes,
          ano: ano,
          status: statusFiltroMensalidade,
          busca: buscaMensalidade
        });

        setDadosMensalidade(response);
      } catch (error) {
        console.error("Erro ao buscar dados de mensalidades no App:", error);
      } finally {
        setLoadingMensalidade(false);
      }
    };

    // Delay de 500ms para não floodar a API enquanto o usuário digita na busca
    const delayBusca = setTimeout(() => {
      fetchMensalidades();
    }, 500);

    return () => clearTimeout(delayBusca);
  }, [mesAnoMensalidade, statusFiltroMensalidade, buscaMensalidade]);


  useEffect(() => {
    // 1. Declaramos a função
    const fetchAlunos = async () => {
      setLoadingAlunos(true);
      try {
        const response = await alunoService.getAlunos({
          status: statusAluno,
          modalidade: modalidadeAluno,
          busca: buscaAluno
        });
        setDadosAlunos(response);
      } catch (error) {
        console.error("Erro ao buscar dados de alunos no App:", error);
      } finally {
        setLoadingAlunos(false);
      }
    };
    const delayBusca = setTimeout(() => {
      fetchAlunos();
    }, 500);
    return () => clearTimeout(delayBusca);
  }, [statusAluno, modalidadeAluno, buscaAluno]);

  useEffect(() => {
    const fetchPosicoes = async () => {
      setLoadingPosicao(true);
      try {
        const response = await posicaoAlunoService.getPosicoes({
          ano: anoPosicao,
          busca: buscaPosicao,
          status: statusPosicao,
          modalidade: modalidadePosicao,
          plano: planoPosicao
        });
        setDadosPosicao(response);
      } catch (error) {
        console.error("Erro ao buscar dados de posição no App:", error);
      } finally {
        setLoadingPosicao(false);
      }
    };

    const delayBusca = setTimeout(() => {
      fetchPosicoes();
    }, 500);

    return () => clearTimeout(delayBusca);
  }, [anoPosicao, buscaPosicao, statusPosicao, modalidadePosicao, planoPosicao]);


  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <Suspense fallback={<Loading />}>

      {/* ABA OVERVIEW */}
      {activeTab === 'overview' && (
        loadingResumo ? (
          <Loading />
        ) : (
          <Overview
            resumoDados={resumoDados}
            ano={ano}
            onAnoChange={setAno}
          />
        )
      )}

      {/* ABA TRANSAÇÕES */}
      {activeTab === 'transacoes' && (
        loadingLancamentos ? (
          <Loading />
        ) : (
          <Transacoes
            transacoes={lancamentosDados}
            onCreate={addTransaction}
            onDelete={deleteTransaction}
          />
        )
      )}

      {/* DEMAIS ABAS */}
      {activeTab === 'pagamentos' && (

        <Pagamentos dados={dadosMensalidade}
          loading={loadingMensalidade}
          filtros={{
            mesAno: mesAnoMensalidade,
            setMesAno: setMesAnoMensalidade,
            statusFiltro: statusFiltroMensalidade,
            setStatusFiltro: setStatusFiltroMensalidade,
            busca: buscaMensalidade,
            setBusca: setBuscaMensalidade
          }} />
      )}

      {activeTab === 'alunos' && (
        loadingAlunos ? (
          <Loading />
        ) : (
          <Alunos
            dados={dadosAlunos}
            loading={loadingAlunos}
            filtros={{
              status: statusAluno, setStatus: setStatusAluno,
              modalidade: modalidadeAluno, setModalidade: setModalidadeAluno,
              busca: buscaAluno, setBusca: setBuscaAluno
            }}
          // onSave={handleCriarOuEditarAluno}
          // onDelete={handleExcluirAluno}
          />
        )
      )}

      {activeTab === 'posicaoAlunos' && (
        loadingPosicao ? (
          <Loading />
        ) : (
          <TabelaPosicaoAlunos dados={dadosPosicao}
            loading={loadingPosicao}
            filtros={{
              ano: anoPosicao, setAno: setAnoPosicao,
              busca: buscaPosicao, setBusca: setBuscaPosicao,
              status: statusPosicao, setStatus: setStatusPosicao,
              modalidade: modalidadePosicao, setModalidade: setModalidadePosicao,
              plano: planoPosicao, setPlano: setPlanoPosicao
            }} />
        )
      )}

      </Suspense>

    </Layout>
  );
}

// ==========================================
// 3. O NOVO APP (GERENCIADOR DE ROTAS)
// ==========================================
export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VitrineHome />} />
        <Route
          path="/login"
          element={
            <AreaFinanceira>
              <Login />
            </AreaFinanceira>
          }
        />
        <Route
          path="/adminfinanceiro"
          element={
            <RotaProtegida>
              <AreaFinanceira>
                <SistemaLogado />
              </AreaFinanceira>
            </RotaProtegida>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
