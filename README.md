# 🎧 CyberCast360# 🚀 CyberCast360 - Arquitetura Separada



**Podcast brasileiro de cibersegurança, hacking ético e tecnologia**Sistema completo de podcast com arquitetura moderna separando frontend e backend.



Um site estático moderno e totalmente offline para podcast de cibersegurança, construído com HTML5, CSS3 e JavaScript puro.## 📋 Visão Geral



## 🚀 Características- **Frontend**: HTML5/CSS3/JavaScript → Hostinger

- **Backend**: Python/Flask API → Railway

- **💾 Totalmente Offline**: Funciona com localStorage - não precisa de banco de dados- **Banco**: PostgreSQL → Railway

- **📱 Responsivo**: Design adaptável para desktop, tablet e mobile- **Repository**: GitHub

- **🎨 Moderno**: Interface clean com animações suaves

- **⚡ Rápido**: Carregamento instantâneo, sem dependências externas## 🏗️ Arquitetura

- **🔒 Sistema Admin**: Painel administrativo completo para gerenciar conteúdo

- **🎵 Player Integrado**: Interface para reprodução de episódios```

- **📧 Formulário de Contato**: Sistema de mensagens integradoCyberCast360/

├── frontend/              # Site estático (Hostinger)

## 📁 Estrutura do Projeto│   ├── assets/

│   │   ├── css/

```│   │   ├── js/

cybercast360/│   │   └── images/

├── index.html              # Página inicial│   ├── index.html

├── episodes.html           # Lista de episódios│   ├── episodes.html

├── episode.html            # Página individual do episódio│   ├── ferramentas.html

├── ferramentas.html        # Ferramentas de cibersegurança│   ├── contato.html

├── categorias.html         # Categorias de conteúdo│   └── admin.html

├── artigo.html            # Artigos individuais├── api/                   # API Python (Railway)

├── contato.html           # Formulário de contato│   ├── app.py

├── sobre.html             # Sobre o podcast│   ├── requirements.txt

├── solucoes-admin.html    # Painel administrativo│   ├── Procfile

├── assets/│   └── README.md

│   ├── css/└── README.md

│   │   └── style.css      # Estilos principais```

│   ├── js/

│   │   ├── data.js        # Sistema de dados com localStorage## 🔧 Configuração

│   │   └── main.js        # JavaScript principal

│   └── images/### Frontend (Hostinger)

│       └── logo.png       # Logo do podcast- Upload da pasta `frontend/` para `public_html/`

└── uploads/               # Diretório para uploads- Configurar API URL no arquivo `api.js`

```- SSL automático do Hostinger



## 🎯 Funcionalidades### Backend (Railway)

- Deploy da pasta `api/` no Railway

### 📺 Frontend- PostgreSQL automático

- **Home**: Episódios e artigos recentes- Variáveis de ambiente configuradas

- **Episódios**: Lista completa com filtros e busca

- **Página Individual**: Detalhes completos do episódio com transcrição## 🗄️ Banco de Dados

- **Ferramentas**: Catálogo de ferramentas de cibersegurança

- **Categorias**: Organização por tópicos**PostgreSQL Railway:**

- **Contato**: Formulário funcional```

- **Busca**: Sistema de pesquisa em tempo realHost: tramway.proxy.rlwy.net

Port: 31942  

### ⚙️ Sistema AdministrativoDatabase: railway

- **Gerenciar Posts**: CRUD completo de artigosUser: postgres

- **Gerenciar Episódios**: Adicionar/editar/remover episódiosPassword: NSJVFpHARPiLTJPHPhlaTSUFFAKgAJLj

- **Gerenciar Ferramentas**: Catálogo de ferramentas```

- **Ver Contatos**: Mensagens recebidas

- **Autenticação**: Sistema de login simples## 🚀 Deploy



## 🔧 Como Usar### 1. API (Railway)

```bash

### Instalação# Conectar ao Railway

1. Clone ou baixe o repositóriorailway login

2. Abra `index.html` em um navegadorrailway link

3. Pronto! O site está funcionandorailway up

```

### Configuração Inicial

- **Senha Admin**: `admin123` (altere em `data.js`)### 2. Frontend (Hostinger)

- **Dados Iniciais**: Posts e episódios de exemplo já inclusos```bash

- **Customização**: Edite `data.js` para alterar conteúdo inicial# Upload via FTP ou cPanel File Manager

# Pasta: public_html/

## 🔐 Sistema Administrativo```



### Acesso## 🔗 URLs

1. Clique no botão "ADMIN" no menu

2. Digite a senha: `admin123`- **Site**: https://firebrick-pony-144038.hostingersite.com/

3. Gerencie todo o conteúdo pela interface web- **API**: https://your-api.railway.app/

- **Admin**: https://firebrick-pony-144038.hostingersite.com/admin.html

### Funcionalidades Admin

- ✅ Criar/editar/excluir posts## 📝 Endpoints API

- ✅ Gerenciar episódios com descrição completa

- ✅ Adicionar ferramentas ao catálogo### Autenticação

- ✅ Visualizar mensagens de contato- `POST /api/auth/login` - Login

- ✅ Sistema de autenticação- `GET /api/auth/me` - Usuário atual



## 🎵 Episódios Disponíveis### Conteúdo

- `GET /api/posts` - Listar posts

### Episódio #001: Introdução à Segurança da Informação- `GET /api/episodes` - Listar episódios

- **Duração**: 35:42- `GET /api/tools` - Listar ferramentas

- **Categoria**: Introdução

- **Conteúdo**: ### Interação

  - Notícias recentes de cibersegurança- `POST /api/contact` - Enviar contato

  - Pilares fundamentais (Confidencialidade, Integridade, Disponibilidade)- `POST /api/newsletter/subscribe` - Newsletter

  - Dicas práticas sobre senhas fortes

  - Importância da autenticação de dois fatores### Admin (Autenticado)

- `POST /api/posts` - Criar post

## 🌐 Deploy- `PUT /api/posts/:id` - Editar post

- `DELETE /api/posts/:id` - Deletar post

### Hostinger/cPanel

1. Faça upload de todos os arquivos## 🔐 Credenciais Admin

2. Aponte o domínio para `index.html`

3. Pronto!```

Email: admin@cybercast360.com

### GitHub PagesSenha: admin123!@#

1. Ative GitHub Pages no repositório```

2. O site estará disponível em `username.github.io/cybercast360`

## 🛠️ Desenvolvimento Local

### Qualquer Servidor Web

- Apache, Nginx, IIS - todos compatíveis### API

- Não precisa de PHP, Node.js ou Python```bash

- Apenas HTML estático com JavaScriptcd api/

pip install -r requirements.txt

## 🎨 Customizaçãopython app.py

```

### Cores e Tema

Edite `assets/css/style.css` para alterar:### Frontend

- Cores principais```bash

- Fontescd frontend/

- Layout responsivopython -m http.server 3000

- Animações```



### Conteúdo Inicial## 📦 Dependências

Edite `assets/js/data.js` para:

- Alterar posts padrão### Python (API)

- Modificar episódios iniciais- Flask 2.3.3

- Configurar ferramentas- Flask-SQLAlchemy 3.0.5

- Personalizar configurações- Flask-CORS 4.0.0

- psycopg2-binary 2.9.7

### Funcionalidades- PyJWT 2.8.0

Edite `assets/js/main.js` para:

- Adicionar novas páginas### Frontend

- Modificar comportamentos- Vanilla JavaScript

- Integrar com APIs externas- Font Awesome 6.0.0

- Personalizar interface- CSS3 Grid/Flexbox



## 📱 Redes Sociais## 🔄 Fluxo de Dados



- **Instagram**: @cybercast360```

- **Blog**: cybercast360.com.brFrontend (Hostinger) 

- **GitHub**: https://github.com/sandrim01/cybercast360    ↓ HTTPS requests

API (Railway) 

## 📄 Licença    ↓ SQL queries  

PostgreSQL (Railway)

Este projeto é de código aberto. Sinta-se livre para usar, modificar e distribuir.```



## 🤝 Contribuição## ✅ Features



1. Fork o projeto### ✅ Implementadas

2. Crie uma branch (`git checkout -b feature/nova-feature`)- [x] API completa Python/Flask

3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)- [x] Frontend com integração API

4. Push para a branch (`git push origin feature/nova-feature`)- [x] Autenticação JWT

5. Abra um Pull Request- [x] CORS configurado

- [x] Modelos SQLAlchemy

## 📞 Suporte- [x] Endpoints REST



Para dúvidas ou suporte, entre em contato através do formulário no site ou abra uma issue no GitHub.### 🔄 Em Desenvolvimento

- [ ] Admin interface completa

---- [ ] Upload de imagens

- [ ] Cache Redis

**Desenvolvido com ❤️ para a comunidade de cibersegurança**- [ ] Rate limiting
- [ ] Monitoramento

## 🧪 Testes

### API
```bash
curl https://your-api.railway.app/api/health
curl https://your-api.railway.app/api/posts
```

### Frontend
```bash
# Abrir DevTools
# Verificar console para erros
# Testar formulários
```

## 📊 Monitoramento

- **API**: Railway Dashboard
- **Frontend**: Hostinger cPanel
- **Logs**: Railway Logs
- **Performance**: Web Vitals

## 🚀 Vantagens da Arquitetura

### Performance
- ✅ Frontend estático (rápido)
- ✅ API dedicada (escalável) 
- ✅ CDN automático (Hostinger)
- ✅ Cache de banco (Railway)

### Segurança
- ✅ Separação de responsabilidades
- ✅ CORS configurado
- ✅ JWT tokens
- ✅ HTTPS forçado

### Manutenção
- ✅ Deploy independente
- ✅ Código organizado
- ✅ Logs centralizados
- ✅ Backup automático

---

**Status**: ✅ Configurado e pronto para deploy!