# 🐍 CyberCast360 API - Python/Flask

API backend para o sistema CyberCast360 usando Flask e PostgreSQL no Railway.

## 🚀 Deploy no Railway

### 1. Conectar Repositório
```bash
# No Railway Dashboard:
# 1. New Project
# 2. Deploy from GitHub repo
# 3. Selecionar: sandrim01/cybercast360
# 4. Root directory: /api
```

### 2. Configurar Variáveis de Ambiente
```bash
# No Railway, adicionar estas variáveis:
DATABASE_URL=postgresql://postgres:NSJVFpHARPiLTJPHPhlaTSUFFAKgAJLj@tramway.proxy.rlwy.net:31942/railway
SECRET_KEY=cybercast360-secret-key-2025
JWT_SECRET_KEY=jwt-secret-cybercast360
FLASK_ENV=production
PORT=5000
```

### 3. Deploy Automático
```bash
# Railway detectará automaticamente:
# - requirements.txt
# - Procfile
# - Fará deploy da API
```

## 🗄️ Banco de Dados

### PostgreSQL Railway
```
Host: tramway.proxy.rlwy.net
Port: 31942
Database: railway
User: postgres  
Password: NSJVFpHARPiLTJPHPhlaTSUFFAKgAJLj
URL: postgresql://postgres:NSJVFpHARPiLTJPHPhlaTSUFFAKgAJLj@tramway.proxy.rlwy.net:31942/railway
```

### Inicialização Automática
A API criará automaticamente:
- ✅ Todas as tabelas necessárias
- ✅ Usuário admin padrão
- ✅ Configurações iniciais

## 🔗 Endpoints

### Públicos
```bash
GET  /api/health           # Status da API
GET  /api/posts            # Listar posts
GET  /api/episodes         # Listar episódios  
GET  /api/tools            # Listar ferramentas
POST /api/contact          # Enviar contato
POST /api/newsletter/subscribe  # Newsletter
```

### Autenticados (Admin)
```bash
POST /api/auth/login       # Login admin
GET  /api/auth/me          # Dados do usuário
POST /api/posts            # Criar post
PUT  /api/posts/:id        # Editar post
DELETE /api/posts/:id      # Deletar post
```

## 🔐 Autenticação

### Login Admin
```bash
curl -X POST https://your-api.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@cybercast360.com",
    "password": "admin123!@#"
  }'
```

### Usar Token
```bash
curl -X GET https://your-api.railway.app/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🧪 Testes

### Health Check
```bash
curl https://your-api.railway.app/api/health
```

### Listar Posts
```bash
curl https://your-api.railway.app/api/posts
```

### Enviar Contato
```bash
curl -X POST https://your-api.railway.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste",
    "email": "teste@exemplo.com", 
    "assunto": "Teste API",
    "mensagem": "Mensagem de teste"
  }'
```

## 🏗️ Desenvolvimento Local

### 1. Instalar Dependências
```bash
cd api/
pip install -r requirements.txt
```

### 2. Configurar Variáveis
```bash
# Criar arquivo .env
DATABASE_URL=postgresql://postgres:NSJVFpHARPiLTJPHPhlaTSUFFAKgAJLj@tramway.proxy.rlwy.net:31942/railway
SECRET_KEY=dev-secret-key
JWT_SECRET_KEY=dev-jwt-secret
```

### 3. Executar API
```bash
python app.py
# API rodará em: http://localhost:5000
```

## 📊 Modelos de Dados

### Usuário
```python
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True)
    senha = db.Column(db.String(255), nullable=False)
    tipo = db.Column(db.Enum('admin', 'editor', 'subscriber'))
    # ... outros campos
```

### Post
```python
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(300), unique=True)
    conteudo = db.Column(db.Text, nullable=False)
    status = db.Column(db.Enum('rascunho', 'publicado', 'arquivado'))
    # ... outros campos
```

## 🔧 Configurações

### CORS
```python
CORS(app, origins=[
    "https://firebrick-pony-144038.hostingersite.com",
    "http://localhost:3000"
])
```

### JWT
```python
# Token expira em 24 horas
'exp': datetime.utcnow() + timedelta(hours=24)
```

### Database
```python
# Pool de conexões automático
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    'pool_pre_ping': True,
    'pool_recycle': 300,
}
```

## 📈 Monitoramento

### Logs Railway
```bash
railway logs
```

### Métricas
- CPU/Memória no Dashboard Railway
- Queries de banco de dados
- Tempo de resposta das APIs

## 🚨 Troubleshooting

### API não responde
1. Verificar logs Railway
2. Confirmar variáveis de ambiente
3. Testar conexão com banco

### Erro 500
1. Verificar logs de aplicação
2. Validar DATABASE_URL
3. Confirmar dependências instaladas

### CORS Error
1. Verificar origem da requisição
2. Atualizar lista de origens permitidas
3. Confirmar headers de request

---

**Status**: ✅ Pronto para deploy no Railway!