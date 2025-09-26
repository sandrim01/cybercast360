from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import jwt
import os
from functools import wraps
import logging

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configuração PostgreSQL Railway
DATABASE_URL = "postgresql://postgres:NSJVFpHARPiLTJPHPhlaTSUFFAKgAJLj@tramway.proxy.rlwy.net:31942/railway"

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'cybercast360-secret-key-2025'
app.config['JWT_SECRET_KEY'] = 'jwt-secret-cybercast360'

# Inicializar extensões
db = SQLAlchemy(app)
CORS(app, origins=["https://firebrick-pony-144038.hostingersite.com", "http://localhost:3000"])

# ====================================
# MODELOS DE DADOS
# ====================================

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), unique=True, nullable=False)
    senha = db.Column(db.String(255), nullable=False)
    tipo = db.Column(db.Enum('admin', 'editor', 'subscriber', name='user_types'), default='subscriber')
    avatar = db.Column(db.String(255))
    bio = db.Column(db.Text)
    ativo = db.Column(db.Boolean, default=True)
    email_verificado = db.Column(db.Boolean, default=False)
    token_verificacao = db.Column(db.String(100))
    token_reset_senha = db.Column(db.String(100))
    reset_senha_expira = db.Column(db.DateTime)
    ultimo_login = db.Column(db.DateTime)
    ip_ultimo_login = db.Column(db.String(45))
    tentativas_login = db.Column(db.Integer, default=0)
    bloqueado_ate = db.Column(db.DateTime)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    data_atualizacao = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Categoria(db.Model):
    __tablename__ = 'categorias'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(150), unique=True, nullable=False)
    descricao = db.Column(db.Text)
    cor = db.Column(db.String(7), default='#ff6b35')
    icone = db.Column(db.String(50), default='fas fa-folder')
    ativo = db.Column(db.Boolean, default=True)
    ordem = db.Column(db.Integer, default=0)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    data_atualizacao = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Post(db.Model):
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(300), unique=True, nullable=False)
    resumo = db.Column(db.Text)
    conteudo = db.Column(db.Text, nullable=False)
    tipo = db.Column(db.Enum('post', 'episode', 'tool', 'page', name='post_types'), default='post')
    status = db.Column(db.Enum('rascunho', 'publicado', 'arquivado', name='post_status'), default='rascunho')
    categoria_id = db.Column(db.Integer, db.ForeignKey('categorias.id'))
    autor_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    imagem_destaque = db.Column(db.String(255))
    meta_title = db.Column(db.String(255))
    meta_description = db.Column(db.String(300))
    meta_keywords = db.Column(db.Text)
    visualizacoes = db.Column(db.Integer, default=0)
    likes = db.Column(db.Integer, default=0)
    permitir_comentarios = db.Column(db.Boolean, default=True)
    featured = db.Column(db.Boolean, default=False)
    data_publicacao = db.Column(db.DateTime)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    data_atualizacao = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relacionamentos
    categoria = db.relationship('Categoria', backref='posts')
    autor = db.relationship('Usuario', backref='posts')

class Episode(db.Model):
    __tablename__ = 'episodes'
    
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(255), nullable=False)
    slug = db.Column(db.String(300), unique=True, nullable=False)
    descricao = db.Column(db.Text)
    numero_episodio = db.Column(db.Integer, nullable=False)
    temporada = db.Column(db.Integer, default=1)
    duracao = db.Column(db.String(20))
    arquivo_audio = db.Column(db.String(255))
    thumbnail = db.Column(db.String(255))
    status = db.Column(db.Enum('rascunho', 'publicado', 'arquivado', name='episode_status'), default='rascunho')
    featured = db.Column(db.Boolean, default=False)
    visualizacoes = db.Column(db.Integer, default=0)
    likes = db.Column(db.Integer, default=0)
    downloads = db.Column(db.Integer, default=0)
    data_publicacao = db.Column(db.DateTime)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    data_atualizacao = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Ferramenta(db.Model):
    __tablename__ = 'ferramentas'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(150), unique=True, nullable=False)
    descricao = db.Column(db.Text)
    categoria = db.Column(db.String(100))
    url_oficial = db.Column(db.String(255))
    url_download = db.Column(db.String(255))
    icone = db.Column(db.String(255))
    plataforma = db.Column(db.String(100))
    preco = db.Column(db.Enum('gratuito', 'pago', 'freemium', name='tool_price'), default='gratuito')
    nivel = db.Column(db.Enum('iniciante', 'intermediario', 'avancado', name='tool_level'), default='iniciante')
    rating = db.Column(db.Integer, default=5)
    featured = db.Column(db.Boolean, default=False)
    ativo = db.Column(db.Boolean, default=True)
    visualizacoes = db.Column(db.Integer, default=0)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    data_atualizacao = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Newsletter(db.Model):
    __tablename__ = 'newsletter'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    nome = db.Column(db.String(100))
    status = db.Column(db.Enum('ativo', 'inativo', 'cancelado', name='newsletter_status'), default='ativo')
    token_confirmacao = db.Column(db.String(100))
    ip_cadastro = db.Column(db.String(45))
    user_agent = db.Column(db.String(255))
    fonte = db.Column(db.String(50), default='website')
    data_confirmacao = db.Column(db.DateTime)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    data_atualizacao = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Contato(db.Model):
    __tablename__ = 'contatos'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    assunto = db.Column(db.String(200), nullable=False)
    mensagem = db.Column(db.Text, nullable=False)
    status = db.Column(db.Enum('novo', 'lido', 'respondido', 'arquivado', name='contact_status'), default='novo')
    ip_origem = db.Column(db.String(45))
    user_agent = db.Column(db.String(255))
    data_resposta = db.Column(db.DateTime)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    data_atualizacao = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Configuracao(db.Model):
    __tablename__ = 'configuracoes'
    
    id = db.Column(db.Integer, primary_key=True)
    chave = db.Column(db.String(100), unique=True, nullable=False)
    valor = db.Column(db.Text)
    tipo = db.Column(db.Enum('string', 'number', 'boolean', 'json', name='config_types'), default='string')
    descricao = db.Column(db.String(255))
    categoria = db.Column(db.String(50))
    editavel = db.Column(db.Boolean, default=True)
    data_criacao = db.Column(db.DateTime, default=datetime.utcnow)
    data_atualizacao = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

# ====================================
# FUNÇÕES AUXILIARES
# ====================================

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token necessário'}), 401
            
        try:
            if token.startswith('Bearer '):
                token = token[7:]
            data = jwt.decode(token, app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
            current_user = Usuario.query.get(data['user_id'])
            if not current_user:
                return jsonify({'message': 'Token inválido'}), 401
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expirado'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token inválido'}), 401
            
        return f(current_user, *args, **kwargs)
    return decorated

def admin_required(f):
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        if current_user.tipo != 'admin':
            return jsonify({'message': 'Acesso negado - apenas administradores'}), 403
        return f(current_user, *args, **kwargs)
    return decorated

# ====================================
# ROTAS DE AUTENTICAÇÃO
# ====================================

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        senha = data.get('password')
        
        if not email or not senha:
            return jsonify({'message': 'Email e senha são obrigatórios'}), 400
            
        user = Usuario.query.filter_by(email=email).first()
        
        if not user or not check_password_hash(user.senha, senha):
            return jsonify({'message': 'Credenciais inválidas'}), 401
            
        if not user.ativo:
            return jsonify({'message': 'Usuário desativado'}), 401
            
        # Gerar token JWT
        payload = {
            'user_id': user.id,
            'email': user.email,
            'tipo': user.tipo,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }
        token = jwt.encode(payload, app.config['JWT_SECRET_KEY'], algorithm='HS256')
        
        # Atualizar último login
        user.ultimo_login = datetime.utcnow()
        user.ip_ultimo_login = request.remote_addr
        user.tentativas_login = 0
        db.session.commit()
        
        return jsonify({
            'message': 'Login realizado com sucesso',
            'token': token,
            'user': {
                'id': user.id,
                'nome': user.nome,
                'email': user.email,
                'tipo': user.tipo
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Erro no login: {str(e)}")
        return jsonify({'message': 'Erro interno do servidor'}), 500

@app.route('/api/auth/me', methods=['GET'])
@token_required
def get_current_user(current_user):
    return jsonify({
        'user': {
            'id': current_user.id,
            'nome': current_user.nome,
            'email': current_user.email,
            'tipo': current_user.tipo,
            'avatar': current_user.avatar
        }
    }), 200

# ====================================
# ROTAS DE POSTS
# ====================================

@app.route('/api/posts', methods=['GET'])
def get_posts():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        status = request.args.get('status', 'publicado')
        
        query = Post.query.filter_by(status=status)
        posts = query.paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'posts': [{
                'id': post.id,
                'titulo': post.titulo,
                'slug': post.slug,
                'resumo': post.resumo,
                'autor': post.autor.nome if post.autor else None,
                'categoria': post.categoria.nome if post.categoria else None,
                'imagem_destaque': post.imagem_destaque,
                'visualizacoes': post.visualizacoes,
                'likes': post.likes,
                'featured': post.featured,
                'data_publicacao': post.data_publicacao.isoformat() if post.data_publicacao else None,
                'data_criacao': post.data_criacao.isoformat()
            } for post in posts.items],
            'pagination': {
                'page': posts.page,
                'pages': posts.pages,
                'per_page': posts.per_page,
                'total': posts.total,
                'has_next': posts.has_next,
                'has_prev': posts.has_prev
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Erro ao buscar posts: {str(e)}")
        return jsonify({'message': 'Erro interno do servidor'}), 500

@app.route('/api/posts', methods=['POST'])
@token_required
@admin_required
def create_post(current_user):
    try:
        data = request.get_json()
        
        post = Post(
            titulo=data['titulo'],
            slug=data['slug'],
            resumo=data.get('resumo'),
            conteudo=data['conteudo'],
            categoria_id=data.get('categoria_id'),
            autor_id=current_user.id,
            status=data.get('status', 'rascunho'),
            imagem_destaque=data.get('imagem_destaque'),
            meta_title=data.get('meta_title'),
            meta_description=data.get('meta_description'),
            featured=data.get('featured', False),
            data_publicacao=datetime.utcnow() if data.get('status') == 'publicado' else None
        )
        
        db.session.add(post)
        db.session.commit()
        
        return jsonify({
            'message': 'Post criado com sucesso',
            'post': {
                'id': post.id,
                'titulo': post.titulo,
                'slug': post.slug,
                'status': post.status
            }
        }), 201
        
    except Exception as e:
        logger.error(f"Erro ao criar post: {str(e)}")
        db.session.rollback()
        return jsonify({'message': 'Erro interno do servidor'}), 500

# ====================================
# ROTAS DE EPISÓDIOS
# ====================================

@app.route('/api/episodes', methods=['GET'])
def get_episodes():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        status = request.args.get('status', 'publicado')
        
        query = Episode.query.filter_by(status=status).order_by(Episode.numero_episodio.desc())
        episodes = query.paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'episodes': [{
                'id': episode.id,
                'titulo': episode.titulo,
                'slug': episode.slug,
                'descricao': episode.descricao,
                'numero_episodio': episode.numero_episodio,
                'temporada': episode.temporada,
                'duracao': episode.duracao,
                'thumbnail': episode.thumbnail,
                'visualizacoes': episode.visualizacoes,
                'likes': episode.likes,
                'downloads': episode.downloads,
                'featured': episode.featured,
                'data_publicacao': episode.data_publicacao.isoformat() if episode.data_publicacao else None
            } for episode in episodes.items],
            'pagination': {
                'page': episodes.page,
                'pages': episodes.pages,
                'per_page': episodes.per_page,
                'total': episodes.total
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Erro ao buscar episódios: {str(e)}")
        return jsonify({'message': 'Erro interno do servidor'}), 500

# ====================================
# ROTAS DE FERRAMENTAS
# ====================================

@app.route('/api/tools', methods=['GET'])
def get_tools():
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        categoria = request.args.get('categoria')
        featured = request.args.get('featured')
        
        query = Ferramenta.query.filter_by(ativo=True)
        
        if categoria:
            query = query.filter_by(categoria=categoria)
        if featured:
            query = query.filter_by(featured=True)
            
        tools = query.paginate(page=page, per_page=per_page, error_out=False)
        
        return jsonify({
            'tools': [{
                'id': tool.id,
                'nome': tool.nome,
                'slug': tool.slug,
                'descricao': tool.descricao,
                'categoria': tool.categoria,
                'url_oficial': tool.url_oficial,
                'icone': tool.icone,
                'plataforma': tool.plataforma,
                'preco': tool.preco,
                'nivel': tool.nivel,
                'rating': tool.rating,
                'featured': tool.featured,
                'visualizacoes': tool.visualizacoes
            } for tool in tools.items],
            'pagination': {
                'page': tools.page,
                'pages': tools.pages,
                'total': tools.total
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Erro ao buscar ferramentas: {str(e)}")
        return jsonify({'message': 'Erro interno do servidor'}), 500

# ====================================
# ROTAS DE CONTATO
# ====================================

@app.route('/api/contact', methods=['POST'])
def create_contact():
    try:
        data = request.get_json()
        
        contato = Contato(
            nome=data['nome'],
            email=data['email'],
            assunto=data['assunto'],
            mensagem=data['mensagem'],
            ip_origem=request.remote_addr,
            user_agent=request.headers.get('User-Agent', '')
        )
        
        db.session.add(contato)
        db.session.commit()
        
        return jsonify({
            'message': 'Mensagem enviada com sucesso'
        }), 201
        
    except Exception as e:
        logger.error(f"Erro ao criar contato: {str(e)}")
        db.session.rollback()
        return jsonify({'message': 'Erro interno do servidor'}), 500

# ====================================
# ROTAS DE NEWSLETTER
# ====================================

@app.route('/api/newsletter/subscribe', methods=['POST'])
def subscribe_newsletter():
    try:
        data = request.get_json()
        email = data.get('email')
        nome = data.get('nome', '')
        
        if not email:
            return jsonify({'message': 'Email é obrigatório'}), 400
            
        # Verificar se já existe
        existing = Newsletter.query.filter_by(email=email).first()
        if existing:
            return jsonify({'message': 'Email já cadastrado'}), 409
            
        newsletter = Newsletter(
            email=email,
            nome=nome,
            ip_cadastro=request.remote_addr,
            user_agent=request.headers.get('User-Agent', ''),
            data_confirmacao=datetime.utcnow()
        )
        
        db.session.add(newsletter)
        db.session.commit()
        
        return jsonify({
            'message': 'Inscrição realizada com sucesso'
        }), 201
        
    except Exception as e:
        logger.error(f"Erro ao inscrever newsletter: {str(e)}")
        db.session.rollback()
        return jsonify({'message': 'Erro interno do servidor'}), 500

# ====================================
# ROTA DE HEALTH CHECK
# ====================================

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'online',
        'timestamp': datetime.utcnow().isoformat(),
        'service': 'CyberCast360 API'
    }), 200

# ====================================
# INICIALIZAÇÃO
# ====================================

def init_db():
    """Criar tabelas e dados iniciais"""
    try:
        db.create_all()
        logger.info("Tabelas criadas com sucesso")
        
        # Criar usuário admin se não existir
        admin = Usuario.query.filter_by(email='admin@cybercast360.com').first()
        if not admin:
            admin = Usuario(
                nome='Administrador',
                email='admin@cybercast360.com',
                senha=generate_password_hash('admin123!@#'),
                tipo='admin',
                ativo=True,
                email_verificado=True
            )
            db.session.add(admin)
            db.session.commit()
            logger.info("Usuário admin criado")
            
    except Exception as e:
        logger.error(f"Erro ao inicializar banco: {str(e)}")

if __name__ == '__main__':
    with app.app_context():
        init_db()
    
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)