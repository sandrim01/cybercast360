# 🚀 CyberCast360 - Arquitetura Separada

Sistema completo de podcast com arquitetura moderna separando frontend e backend.

## 📋 Visão Geral

- **Frontend**: HTML5/CSS3/JavaScript → Hostinger
- **Backend**: Python/Flask API → Railway
- **Banco**: PostgreSQL → Railway
- **Repository**: GitHub

## 🏗️ Arquitetura

```
CyberCast360/
├── frontend/              # Site estático (Hostinger)
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   ├── index.html
│   ├── episodes.html
│   ├── ferramentas.html
│   ├── contato.html
│   └── admin.html
├── api/                   # API Python (Railway)
│   ├── app.py
│   ├── requirements.txt
│   ├── Procfile
│   └── README.md
└── README.md
```

## 🔧 Configuração

### Frontend (Hostinger)
- Upload da pasta `frontend/` para `public_html/`
- Configurar API URL no arquivo `api.js`
- SSL automático do Hostinger

### Backend (Railway)
- Deploy da pasta `api/` no Railway
- PostgreSQL automático
- Variáveis de ambiente configuradas

## 🗄️ Banco de Dados

**PostgreSQL Railway:**
```
Host: tramway.proxy.rlwy.net
Port: 31942  
Database: railway
User: postgres
Password: NSJVFpHARPiLTJPHPhlaTSUFFAKgAJLj
```

## 🚀 Deploy

### 1. API (Railway)
```bash
# Conectar ao Railway
railway login
railway link
railway up
```

### 2. Frontend (Hostinger)
```bash
# Upload via FTP ou cPanel File Manager
# Pasta: public_html/
```

## 🔗 URLs

- **Site**: https://firebrick-pony-144038.hostingersite.com/
- **API**: https://your-api.railway.app/
- **Admin**: https://firebrick-pony-144038.hostingersite.com/admin.html

## 📝 Endpoints API

### Autenticação
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Usuário atual

### Conteúdo
- `GET /api/posts` - Listar posts
- `GET /api/episodes` - Listar episódios
- `GET /api/tools` - Listar ferramentas

### Interação
- `POST /api/contact` - Enviar contato
- `POST /api/newsletter/subscribe` - Newsletter

### Admin (Autenticado)
- `POST /api/posts` - Criar post
- `PUT /api/posts/:id` - Editar post
- `DELETE /api/posts/:id` - Deletar post

## 🔐 Credenciais Admin

```
Email: admin@cybercast360.com
Senha: admin123!@#
```

## 🛠️ Desenvolvimento Local

### API
```bash
cd api/
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend/
python -m http.server 3000
```

## 📦 Dependências

### Python (API)
- Flask 2.3.3
- Flask-SQLAlchemy 3.0.5
- Flask-CORS 4.0.0
- psycopg2-binary 2.9.7
- PyJWT 2.8.0

### Frontend
- Vanilla JavaScript
- Font Awesome 6.0.0
- CSS3 Grid/Flexbox

## 🔄 Fluxo de Dados

```
Frontend (Hostinger) 
    ↓ HTTPS requests
API (Railway) 
    ↓ SQL queries  
PostgreSQL (Railway)
```

## ✅ Features

### ✅ Implementadas
- [x] API completa Python/Flask
- [x] Frontend com integração API
- [x] Autenticação JWT
- [x] CORS configurado
- [x] Modelos SQLAlchemy
- [x] Endpoints REST

### 🔄 Em Desenvolvimento
- [ ] Admin interface completa
- [ ] Upload de imagens
- [ ] Cache Redis
- [ ] Rate limiting
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