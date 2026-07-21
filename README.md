# 💰 Controle Financeiro

Aplicação web desenvolvida em **React** e **JavaScript** para gerenciamento e acompanhamento financeiro.

O projeto permite controlar transações, pagamentos e visualizar informações gerais de forma organizada, utilizando componentes reutilizáveis e armazenamento 
de dados no microsoft Access (futuramente)

Este projeto foi desenvolvido para **apexdojohub**, com o objetivo de fazer o controle financeiro da academia.

---

## 🚀 Demonstração

🔗 **Deploy:** _(https://github.com/nsoares-dev/apexdojohub)_

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
git clone https://github.com/nsoares-dev/apexdojohub
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
*temporário*

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

- [x] Integração com API
- [x] Sistema de autenticação de usuários
- [x] Banco de dados real
- [x] Filtros avançados de transações
- [x] Exportação de relatórios financeiros
- [x] Melhorias na responsividade

---

## 👨‍💻 Autor

Desenvolvido por **Nicolas Oliveira**

Projeto criado para controle financeiro.

---

## 📄 Licença

Este projeto está privado apenas para desenvolvedores e proprietário do projeto.