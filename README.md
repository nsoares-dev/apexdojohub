# 💰 Controle Financeiro

Aplicação web desenvolvida em **React** e **JavaScript** para gerenciamento e acompanhamento financeiro.

O projeto permite controlar transações, pagamentos e visualizar informações gerais de forma organizada, utilizando componentes reutilizáveis e armazenamento local dos dados.

Este projeto foi desenvolvido durante os estudos na **ApexDojoHub**, com o objetivo de praticar conceitos modernos do desenvolvimento Front-end utilizando React.

---

## 🚀 Demonstração

🔗 **Deploy:** _(adicione aqui o link quando publicar)_

---

## 📌 Funcionalidades

- ✅ Visualização geral das informações financeiras
- ✅ Cadastro e gerenciamento de transações
- ✅ Controle de pagamentos
- ✅ Organização dos dados financeiros
- ✅ Persistência de informações utilizando LocalStorage
- ✅ Componentes reutilizáveis em React
- ✅ Interface dinâmica e responsiva
- ✅ Manipulação de dados para geração de informações e gráficos

---

## 🛠️ Tecnologias utilizadas

### Front-end

- ⚛️ React
- 🟨 JavaScript (ES6+)
- 🎨 CSS
- 📊 Recharts
- 💾 LocalStorage

### Ferramentas

- Vite
- ESLint
- npm

---

## 📂 Estrutura do projeto

```bash
src/
│
├── assets/                 # Arquivos estáticos e imagens
│
├── components/             # Componentes da aplicação
│   │
│   ├── hooks/              # Hooks personalizados
│   │   └── useLocalStorage.js
│   │
│   ├── Alunos.jsx          # Gerenciamento de alunos
│   ├── Layout.jsx          # Estrutura principal da aplicação
│   ├── Modal.jsx           # Componente de modal
│   ├── Overview.jsx        # Resumo das informações
│   ├── Pagamentos.jsx      # Controle de pagamentos
│   └── Transacoes.jsx      # Gerenciamento das transações
│
├── data/
│   └── seed.js             # Dados iniciais da aplicação
│
├── utils/                  # Funções auxiliares
│
├── App.jsx                 # Componente principal
├── main.jsx                # Entrada da aplicação
├── App.css                 # Estilos do componente principal
└── styles.css              # Estilos globais
```

---

## ⚙️ Como executar o projeto

### Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

### Acesse a pasta do projeto

```bash
cd seu-repositorio
```

### Instale as dependências

```bash
npm install
```

### Execute o projeto

```bash
npm run dev
```

A aplicação será iniciada em:

```bash
http://localhost:5173
```

---

## 🧠 Conceitos aplicados

Durante o desenvolvimento foram utilizados conceitos importantes do ecossistema React:

- Componentização
- Hooks (`useState`, `useEffect`, `useMemo`)
- Criação de hooks personalizados
- Renderização condicional
- Manipulação de arrays (`map`, `filter`, `reduce`)
- Gerenciamento de estados
- Persistência de dados com LocalStorage
- Organização de componentes
- Separação de responsabilidades

---

## 📊 Gráficos e visualização de dados

A aplicação utiliza gráficos para facilitar a visualização das informações financeiras, permitindo acompanhar entradas, saídas e outros dados de forma mais intuitiva.

---

## 💾 Persistência de dados

Os dados são armazenados utilizando **LocalStorage**, permitindo que as informações permaneçam disponíveis mesmo após atualizar ou fechar o navegador.

---

## 📚 Objetivo do projeto

O principal objetivo foi desenvolver uma aplicação próxima de um cenário real, praticando:

- Criação de interfaces utilizando React
- Organização de projetos Front-end
- Manipulação de dados
- Desenvolvimento de componentes reutilizáveis
- Aplicação de boas práticas de código

---

## 🔮 Próximas melhorias

Algumas funcionalidades que podem ser adicionadas futuramente:

- [ ] Integração com API
- [ ] Sistema de autenticação de usuários
- [ ] Banco de dados real
- [ ] Filtros avançados de transações
- [ ] Exportação de relatórios financeiros
- [ ] Melhorias na responsividade

---

## 👨‍💻 Autor

Desenvolvido por **Gabriel**

Projeto criado para fins de estudo e evolução no desenvolvimento Front-end.

---

## 📄 Licença

Este projeto está disponível para estudos e aprendizado.