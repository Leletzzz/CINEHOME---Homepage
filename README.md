# 🎬 CineHome - Plataforma de Avaliação de Filmes


<img width="600" height="600" alt="CINEHOME - Apresentação" src="https://github.com/user-attachments/assets/77c92402-03ef-4cbe-a4d2-53a50cc2ede2" />


## 🚀 Tecnologias Utilizadas

### Frontend
- **HTML5**: Estruturação semântica e acessível das páginas
- **CSS3**: Estilização moderna com gradientes, animações e responsividade
- **JavaScript (Vanilla)**: Lógica de interação, manipulação do DOM e consumo de APIs
- **Google Fonts (Poppins)**: Tipografia moderna e legível

### Backend
- **Node.js**: Ambiente de execução JavaScript no servidor
- **Express.js**: Framework web minimalista e flexível
- **MongoDB**: Banco de dados NoSQL para armazenamento de usuários
- **Mongoose**: ODM para modelagem de dados MongoDB
- **JWT (JSON Web Tokens)**: Autenticação segura baseada em tokens
- **Bcrypt.js**: Criptografia de senhas
- **Nodemailer**: Envio de emails para recuperação de senha
- **Google OAuth 2.0**: Autenticação via Google
- **Axios**: Cliente HTTP para requisições

### APIs Externas
- **TMDB API (The Movie Database)**: Integração para catálogo real de filmes e séries

## ✨ Funcionalidades Principais

### 🔐 Sistema de Autenticação Completo
Implementei um sistema robusto de autenticação com:
- **Registro de usuários**: Cadastro com validação de email e senha criptografada
- **Login tradicional**: Autenticação via email e senha com geração de JWT
- **Login social**: Integração com Google OAuth para autenticação rápida
- **Recuperação de senha**: Sistema de código de 6 dígitos enviado por email
- **Proteção de rotas**: Middleware que garante acesso apenas a usuários autenticados

### 👤 Gerenciamento de Perfis
Criei um sistema de múltiplos perfis inspirado nas plataformas líderes:
- **5 perfis por conta**: Cada usuário pode criar até 5 perfis diferentes
- **Avatares personalizados**: Biblioteca de avatares para cada perfil
- **Proteção por PIN**: Perfis podem ser protegidos com código de 4 dígitos
- **Seleção de perfil**: Interface intuitiva para trocar entre perfis



### 🎬 Modal de Vídeo

- **Reprodução de trailers**: Integração com vídeos do YouTube
- **Controles personalizados**: Interface adaptada ao design da plataforma
- **Responsividade**: Funcionamento em todos os dispositivos

### 📧 Sistema de Notificações

- **Notificações em tempo real**: Sistema de toast notifications
- **Badge de contador**: Indica quantidade de notificações não lidas
- **Tipos variados**: Lançamentos, recomendações, avisos do sistema
- **Gerenciamento**: Marcar como lida, excluir, limpar todas


## 📁 Estrutura do Projeto

### Frontend (CINEHOME---Homepage)
```
├── index.html              # Página inicial (landing page)
├── home.html              # Página principal (após login)
├── login.html             # Página de login e registro
├── profil.html            # Seleção de perfil
├── manage-profiles.html   # Gerenciamento de perfis
├── conta.html             # Configurações da conta
├── reset.html             # Recuperação de senha
├── style.css              # Estilos globais
├── layout.css             # Layout base
├── index.css              # Estilos da landing page
├── auth.js                # Módulo de autenticação
├── carousel.js            # Lógica dos carrosséis
├── search.js              # Sistema de busca
├── categories.js          # Navegação por categorias
├── video-modal.js         # Modal de vídeo
├── profile-menu.js        # Menu de perfis
├── notifications.js       # Sistema de notificações
├── confirm-modal.js       # Modais de confirmação
├── translations.js        # Internacionalização
├── data.js                # Dados estáticos dos filmes
└── config.js              # Configurações globais
```

### Backend (CINEHOMEBACK)
```
├── src/
│   ├── app.js                    # Configuração do servidor Express
│   ├── email.js                  # Rotas OAuth e email
│   ├── config/
│   │   └── db.js                 # Conexão MongoDB
│   ├── controllers/
│   │   └── userControllers.js    # Lógica de autenticação
│   ├── models/
│   │   └── userModel.js          # Modelo de usuário
│   ├── routes/
│   │   └── userRoutes.js         # Rotas de API
│   └── services/
│       └── emailService.js       # Serviço de envio de email
├── public/                        # Arquivos estáticos servidos
├── package.json                   # Dependências Node.js
└── .env                          # Variáveis de ambiente (não versionado)
```

## 🔧 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 14 ou superior)
- MongoDB Atlas (ou MongoDB local)
- Conta TMDB (para API key)
- Conta Google Cloud (para OAuth, opcional)

### Configuração do Backend

1. **Clone o repositório**
```bash
git clone https://github.com/eliswilliam/cinehome.git
cd cinehome/CINEHOMEBACK
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do CINEHOMEBACK:
```env
# MongoDB
MONGO_URI=sua_connection_string_mongodb_atlas

# JWT
JWT_SECRET=sua_chave_secreta_jwt

# Email (Nodemailer)
EMAIL_USER=seu_email@gmail.com
EMAIL_PASSWORD=sua_senha_aplicacao_gmail

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=seu_client_id_google
GOOGLE_CLIENT_SECRET=seu_client_secret_google

# Porta (opcional, padrão: 3001)
PORT=3001
```

4. **Inicie o servidor**
```bash
npm start
# ou para desenvolvimento com auto-reload
npm run dev
```

### Configuração do Frontend


2. **Atualize o arquivo config.js**
```javascript
const API_BASE_URL = 'http://localhost:3001'; // ou sua URL de produção
```

3. **Abra o projeto**
Você pode usar um servidor local como:
- Live Server (VS Code)
- http-server (npm)
- Ou simplesmente abrir `index.html` no navegador

## 🌐 Deploy

O projeto está preparado para deploy em plataformas como:
- **Render** (backend): Configurado para escutar em `0.0.0.0` com porta dinâmica
- **Vercel/Netlify** (frontend): Arquivos estáticos prontos
- **MongoDB Atlas**: Banco de dados em nuvem configurado

## 🎯 Desafios 


1. **Integração OAuth**: Implementei autenticação Google com callback seguro
2. **Gerenciamento de estado**: Coordenação entre múltiplos perfis e autenticação
3. **Carrosséis responsivos**: Criação de carrosséis fluidos que funcionam em todos os dispositivos
4. **Segurança**: Implementação de JWT, criptografia de senhas e proteção de rotas
5. **Envio de emails**: Configuração do Nodemailer com Gmail e tratamento de erros
6. **Acessibilidade**: Garantia de que toda a aplicação seja navegável por teclado

## 🔒 Segurança

Implementei várias camadas de segurança:
- Senhas criptografadas com bcrypt (salt rounds: 10)
- Tokens JWT com expiração de 1 hora
- Validação de dados no backend
- Proteção contra XSS e CSRF
- CORS configurado adequadamente
- Variáveis sensíveis em .env (não versionadas)

## 🚧 Melhorias Futuras

Planejo implementar:
- [ ] Sistema de favoritos e watchlist
- [ ] Histórico de visualização
- [ ] Recomendações personalizadas baseadas em ML
- [ ] Player de vídeo próprio (sem dependência do YouTube)
- [ ] Modo offline com Service Workers
- [ ] Testes automatizados (Jest, Cypress)
- [ ] Integração com mais APIs de streaming
- [ ] Sistema de comentários e avaliações
- [ ] Filtro de comentários nas avaliações

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de portfólio.


