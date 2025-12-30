# 🎬 CINEHOME - Plataforma de Avaliação de Filmes e Séries

link de hospedagem : https://cinehomebr.com

https://leletzzz.github.io/CINEHOME---Homepage/



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
- **MongoDB**: Banco de dados NoSQL para armazenamento de usuários e reviews
- **Mongoose**: ODM para modelagem de dados MongoDB
- **JWT (JSON Web Tokens)**: Autenticação segura baseada em tokens
- **Bcrypt.js**: Criptografia de senhas
- **Nodemailer**: Envio de emails para recuperação de senha
- **Google OAuth 2.0**: Autenticação via Google
- **Axios**: Cliente HTTP para requisições

### APIs Externas & IA
- **TMDB API (The Movie Database)**: Integração para catálogo real de filmes e séries
- **GROQ AI**: Assistente virtual inteligente para recomendações e suporte

## ✨ Funcionalidades Principais

### 🔐 Sistema de Autenticação Completo
Sistema robusto de autenticação com:
- **Registro de usuários**: Cadastro com validação de email e senha criptografada
- **Login tradicional**: Autenticação via email e senha com geração de JWT
- **Login social**: Integração com Google OAuth para autenticação rápida
- **Recuperação de senha**: Sistema de código de 6 dígitos enviado por email
- **Proteção de rotas**: Middleware que garante acesso apenas a usuários autenticados

### 👤 Gerenciamento de Perfis
Sistema de múltiplos perfis inspirado nas plataformas líderes:
- **5 perfis por conta**: Cada usuário pode criar até 5 perfis diferentes
- **Avatares personalizados**: Biblioteca de avatares para cada perfil
- **Proteção por PIN**: Perfis podem ser protegidos com código de 4 dígitos
- **Seleção de perfil**: Interface intuitiva para trocar entre perfis

### ⭐ Sistema de Reviews e Avaliações
- **Avaliações por usuário**: Sistema completo de reviews com notas de 0 a 10
- **Comentários detalhados**: Usuários podem escrever reviews completos
- **Histórico de avaliações**: Visualização de todas as avaliações por filme
- **API RESTful**: Endpoints completos para CRUD de reviews

### 🤖 Assistência Virtual (GROQ AI)
- **Chat inteligente**: Assistente virtual para ajuda e recomendações
- **Integração TMDB**: Busca informações atualizadas sobre filmes
- **Contexto de filmes**: Conhecimento da base local de filmes da plataforma
- **Recomendações personalizadas**: Sugestões baseadas em preferências

### 🎬 Modal de Vídeo
- **Reprodução de trailers**: Integração com vídeos do YouTube
- **Controles personalizados**: Interface adaptada ao design da plataforma
- **Responsividade**: Funcionamento em todos os dispositivos

### 📧 Sistema de Notificações
- **Notificações em tempo real**: Sistema de toast notifications
- **Badge de contador**: Indica quantidade de notificações não lidas
- **Tipos variados**: Lançamentos, recomendações, avisos do sistema
- **Gerenciamento**: Marcar como lida, excluir, limpar todas

### 🔍 Busca e Navegação
- **Busca avançada**: Sistema de busca por título, gênero e ano
- **Categorias dinâmicas**: Navegação por categorias (Ação, Comédia, Terror, etc.)
- **Favoritos**: Sistema para salvar filmes favoritos
- **Detalhes completos**: Página dedicada com todas as informações do filme

## 📁 Estrutura do Projeto

```
CINEHOME/
├── README.md
├── render.yaml                    # Configuração para deploy no Render
├── backend-api/                   # Backend Node.js/Express
│   ├── app.js                     # Configuração principal do servidor
│   ├── start-server.js            # Script de inicialização
│   ├── email.js                   # Rotas OAuth e recuperação de senha
│   ├── groqai.js                  # Integração com GROQ AI (Assistente Virtual)
│   ├── package.json               # Dependências do backend
│   ├── render.yaml                # Configuração Render para backend
│   ├── DEPLOY-RENDER.md           # Guia de deploy
│   │
│   ├── config/
│   │   └── db.js                  # Conexão MongoDB Atlas
│   │
│   ├── controllers/
│   │   ├── userControllers.js     # Lógica de autenticação
│   │   └── reviewController.js    # Lógica de reviews/avaliações
│   │
│   ├── models/
│   │   ├── userModel.js           # Schema de usuário
│   │   └── reviewModel.js         # Schema de reviews
│   │
│   ├── routes/
│   │   ├── userRoutes.js          # Rotas de autenticação
│   │   ├── reviewRoutes.js        # Rotas de reviews
│   │   ├── searchRoutes.js        # Rotas de busca
│   │   └── tmdbRoutes.js          # Rotas TMDB
│   │
│   ├── services/
│   │   ├── emailService.js        # Serviço de envio de email
│   │   └── tmdbService.js         # Serviço de integração TMDB
│   │
│   ├── scripts/
│   │   └── simulateReset.js       # Scripts utilitários
│   │
│   └── public/                    # Frontend servido pelo backend
│       ├── index.html             # Landing page
│       ├── home.html              # Página principal
│       ├── login.html             # Login/Registro
│       ├── profil.html            # Seleção de perfil
│       ├── manage-profiles.html   # Gerenciamento de perfis
│       ├── profile-settings.html  # Configurações de perfil
│       ├── conta.html             # Configurações da conta
│       ├── reset.html             # Recuperação de senha
│       ├── movie-details.html     # Detalhes do filme
│       ├── favoritos.html         # Página de favoritos
│       ├── ajuda.html             # Central de ajuda (Chat AI)
│       ├── ajuda-setup.html       # Setup inicial
│       │
│       ├── style.css              # Estilos globais
│       ├── layout.css             # Layout base
│       ├── index.css              # Landing page styles
│       ├── categories.css         # Estilos de categorias
│       ├── movie-details.css      # Estilos página de detalhes
│       ├── movie-details-modal.css # Modal de detalhes
│       ├── video-modal.css        # Modal de vídeo
│       ├── profile-menu.css       # Menu de perfis
│       ├── profile-settings.css   # Configurações de perfil
│       ├── notifications.css      # Sistema de notificações
│       ├── confirm-modal.css      # Modais de confirmação
│       ├── favoritos.css          # Página de favoritos
│       ├── favoritos-page.css     # Estilos favoritos
│       ├── search-combined.css    # Busca combinada
│       ├── search-results.css     # Resultados de busca
│       ├── ajuda.css              # Chat de ajuda
│       ├── footer-content.css     # Footer
│       │
│       ├── auth.js                # Autenticação
│       ├── config.js              # Configurações API
│       ├── main.js                # Script principal
│       ├── index.js               # Landing page logic
│       ├── script.js              # Scripts globais
│       ├── carousel.js            # Carrosséis
│       ├── search.js              # Sistema de busca
│       ├── categories.js          # Navegação categorias
│       ├── categories-tmdb.js     # Categorias TMDB
│       ├── categories-tmdb-manager.js # Gerenciador TMDB
│       ├── movie-details.js       # Detalhes do filme
│       ├── movie-details-modal.js # Modal de detalhes
│       ├── video-modal.js         # Modal de vídeo
│       ├── profile-menu.js        # Menu de perfis
│       ├── notifications.js       # Notificações
│       ├── notifications-guide.js # Guia de notificações
│       ├── confirm-modal.js       # Modais de confirmação
│       ├── favoritos.js           # Sistema de favoritos
│       ├── favoritos-page.js      # Página de favoritos
│       ├── footer.js              # Footer
│       ├── footer-content.js      # Conteúdo footer
│       ├── user-reviews.js        # Sistema de reviews
│       ├── data.js                # Dados estáticos
│       ├── moviesData.js          # Base de filmes
│       ├── categories-data.js     # Dados de categorias
│       ├── auto-config-tmdb.js    # Auto-configuração TMDB
│       ├── enrich-data.html       # Enriquecimento de dados
│       ├── enrich-categories-data.js
│       ├── setup-tmdb-key.html    # Setup chave TMDB
│       ├── docs-auto-config-tmdb.html
│       │
│       ├── imagens/               # Imagens do projeto
│       └── backup/                # Backups de código
│
└── .gitignore                     # Arquivos ignorados pelo Git
```

## 🔧 Como Executar o Projeto

### Pré-requisitos
- Node.js (versão 14 ou superior)
- MongoDB Atlas (ou MongoDB local)
- Conta TMDB (para API key)
- Conta Google Cloud (para OAuth)
- Conta GROQ AI (para assistente virtual)

### Configuração do Backend

1. **Clone o repositório**
```bash
git clone https://github.com/eliswilliam/CINEHOME.git
cd CINEHOME/backend-api
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do backend-api:
```env
# MongoDB
MONGO_URI=mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/?retryWrites=true&w=majority

# JWT
JWT_SECRET=sua_chave_secreta_jwt

# Email (Nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=seu_email@gmail.com
EMAIL_PASSWORD=sua_senha_aplicacao_gmail

# Frontend URLs
FRONTEND_URL=https://cinehome.onrender.com/reset.html
FRONTEND_LOGIN_URL=https://cinehome.onrender.com/profil.html

# Google OAuth
GOOGLE_CLIENT_ID=seu_client_id_google.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=seu_client_secret_google
GOOGLE_CALLBACK_URL=https://cinehome.onrender.com/auth/google/callback
GOOGLE_LOGIN_CALLBACK_URL=https://cinehome.onrender.com/auth/google/login/callback
GOOGLE_SIGNUP_CALLBACK_URL=https://cinehome.onrender.com/auth/google/signup/callback

# APIs
TMDB_API_KEY=sua_chave_tmdb
GROQ_API_KEY=sua_chave_groq

# Server
NODE_ENV=production
PORT=10000
```

4. **Inicie o servidor**
```bash
npm start
# ou para desenvolvimento com auto-reload
npm run dev
```

### Configuração do Frontend

O frontend está integrado no backend e é servido estaticamente pela pasta `public/`.

1. **Atualize o arquivo config.js** (se necessário para desenvolvimento local)
```javascript
const CONFIG = {
  API_BASE_URL: 'http://localhost:10000', // ou https://cinehome.onrender.com
  // ...
};
```

2. **Acesse a aplicação**
```
http://localhost:10000
```

## 🌐 Deploy

### Backend no Render

O projeto está configurado para deploy automático no Render:

1. **Conecte seu repositório GitHub ao Render**
2. **Configure as variáveis de ambiente** no painel do Render (todas as do `.env`)
3. **Deploy automático**: O `render.yaml` está configurado para:
   - Build: `npm install`
   - Start: `npm start`
   - Root Directory: `backend-api`
   - Port: `10000`

### Configuração Google OAuth

No Google Cloud Console, adicione as URIs de redireção autorizadas:
- `https://cinehome.onrender.com/auth/google/callback`
- `https://cinehome.onrender.com/auth/google/login/callback`
- `https://cinehome.onrender.com/auth/google/signup/callback`

## 📡 API Endpoints

### Autenticação
- `POST /api/users/register` - Registro de usuário
- `POST /api/users/login` - Login
- `POST /api/users/forgot-password` - Solicitar código de recuperação
- `POST /api/users/verify-reset-code` - Verificar código
- `POST /api/users/reset-password` - Redefinir senha
- `GET /auth/google/login` - Login com Google
- `GET /auth/google/signup` - Cadastro com Google

### Reviews
- `GET /api/reviews/:movieId` - Buscar reviews de um filme
- `POST /api/reviews` - Criar review
- `PUT /api/reviews/:id` - Atualizar review
- `DELETE /api/reviews/:id` - Deletar review

### Chat AI
- `POST /api/chat` - Conversar com assistente virtual

### Health Check
- `GET /health` - Verificar status do servidor

## 🎯 Funcionalidades Implementadas

1. **Sistema de Autenticação Completo**: JWT, Google OAuth, recuperação de senha via email
2. **Gerenciamento de Perfis**: 5 perfis por conta com proteção por PIN
3. **Sistema de Reviews**: Avaliações completas com notas e comentários
4. **Assistente Virtual AI**: Chat inteligente com GROQ AI para suporte e recomendações
5. **Integração TMDB**: Catálogo completo de filmes e séries
6. **Sistema de Favoritos**: Salvar e gerenciar filmes favoritos
7. **Busca Avançada**: Busca por título, gênero, ano
8. **Carrosséis Dinâmicos**: Navegação fluida por categorias
9. **Modal de Vídeo**: Reprodução de trailers integrada
10. **Sistema de Notificações**: Alertas em tempo real
11. **Design Responsivo**: Funciona perfeitamente em todos os dispositivos
12. **Segurança Robusta**: Criptografia, validação, proteção de rotas

## 🔒 Segurança

Camadas de segurança implementadas:
- ✅ Senhas criptografadas com bcrypt (salt rounds: 10)
- ✅ Tokens JWT com expiração configurável
- ✅ Validação de dados no backend
- ✅ Proteção contra XSS e CSRF
- ✅ CORS configurado adequadamente
- ✅ Variáveis sensíveis em .env (não versionadas)
- ✅ Rate limiting em endpoints sensíveis
- ✅ OAuth 2.0 com Google



## 📄 Licença

Este projeto foi desenvolvido para fins educacionais e de portfólio.


---

