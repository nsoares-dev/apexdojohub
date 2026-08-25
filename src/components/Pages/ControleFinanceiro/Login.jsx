import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Services/ApiServices"; // Importe a sua configuração do Axios aqui


const Login = () => {
  const navigate = useNavigate();
  const [loginOuEmail, setLoginOuEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrarSenha, setLembrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      // Faz a requisição usando o Axios já configurado com withCredentials
      const response = await api.post("/Usuario/Login", {
        loginOuEmail,
        senha,
      });

      // Se der sucesso, o cookie foi salvo pelo navegador.
      // Redireciona para o Dashboard do Apex Dojo Hub
      sessionStorage.setItem("usuario", JSON.stringify(response.data.usuario));
      navigate("/adminfinanceiro", { replace: true });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setErro("Login ou senha inválidos.");
      } else {
        setErro("Erro de conexão com o servidor.");
        console.log(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card animated-fade-in">
        <div className="login-header">
          <h1>APEX DOJO HUB</h1>
          <p>Arte Marciais · JIU-JITSU & MUAY THAI</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {erro && <div className="login-error">{erro}</div>}

          <div className="input-group">
            <label htmlFor="login">Login ou E-mail</label>
            <input
              id="login"
              type="text"
              value={loginOuEmail}
              onChange={(e) => setLoginOuEmail(e.target.value)}
              placeholder="Digite seu login ou e-mail"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          <div className="login-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                checked={lembrarSenha}
                onChange={(e) => setLembrarSenha(e.target.checked)}
              />
              <span className="checkmark"></span>
              Lembrar-me
            </label>
            
            {/* O link para a futura rota de recuperar senha */}
            <a href="/recuperar-senha" className="forgot-password">
              Esqueceu a senha?
            </a>
          </div>

          <button 
            type="submit" 
            className={`login-button ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Entrando..." : "ENTRAR"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
