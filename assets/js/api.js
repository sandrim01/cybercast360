// CyberCast360 API Integration
// Comunicação com API Python/Flask no Railway

class CyberCastAPI {
    constructor() {
        this.baseURL = 'https://your-railway-api-url.railway.app/api';
        this.token = localStorage.getItem('cybercast_token');
    }

    // Configurar headers padrão
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };
        
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        
        return headers;
    }

    // Fazer requisições HTTP
    async request(endpoint, options = {}) {
        try {
            const url = `${this.baseURL}${endpoint}`;
            const config = {
                headers: this.getHeaders(),
                ...options
            };

            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro na requisição');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // ====================================
    // AUTENTICAÇÃO
    // ====================================

    async login(email, password) {
        try {
            const data = await this.request('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            if (data.token) {
                this.token = data.token;
                localStorage.setItem('cybercast_token', this.token);
                localStorage.setItem('cybercast_user', JSON.stringify(data.user));
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.request('/auth/me');
        } catch (error) {
            this.logout();
            throw error;
        }
    }

    logout() {
        this.token = null;
        localStorage.removeItem('cybercast_token');
        localStorage.removeItem('cybercast_user');
    }

    isAuthenticated() {
        return !!this.token;
    }

    getStoredUser() {
        const user = localStorage.getItem('cybercast_user');
        return user ? JSON.parse(user) : null;
    }

    // ====================================
    // POSTS/ARTIGOS
    // ====================================

    async getPosts(page = 1, perPage = 10, status = 'publicado') {
        return await this.request(`/posts?page=${page}&per_page=${perPage}&status=${status}`);
    }

    async getPost(id) {
        return await this.request(`/posts/${id}`);
    }

    async createPost(postData) {
        return await this.request('/posts', {
            method: 'POST',
            body: JSON.stringify(postData)
        });
    }

    async updatePost(id, postData) {
        return await this.request(`/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(postData)
        });
    }

    async deletePost(id) {
        return await this.request(`/posts/${id}`, {
            method: 'DELETE'
        });
    }

    // ====================================
    // EPISÓDIOS
    // ====================================

    async getEpisodes(page = 1, perPage = 10, status = 'publicado') {
        return await this.request(`/episodes?page=${page}&per_page=${perPage}&status=${status}`);
    }

    async getEpisode(id) {
        return await this.request(`/episodes/${id}`);
    }

    async createEpisode(episodeData) {
        return await this.request('/episodes', {
            method: 'POST',
            body: JSON.stringify(episodeData)
        });
    }

    // ====================================
    // FERRAMENTAS
    // ====================================

    async getTools(page = 1, perPage = 20, categoria = null, featured = null) {
        let url = `/tools?page=${page}&per_page=${perPage}`;
        if (categoria) url += `&categoria=${categoria}`;
        if (featured) url += `&featured=${featured}`;
        
        return await this.request(url);
    }

    async getTool(id) {
        return await this.request(`/tools/${id}`);
    }

    async createTool(toolData) {
        return await this.request('/tools', {
            method: 'POST',
            body: JSON.stringify(toolData)
        });
    }

    // ====================================
    // CONTATO
    // ====================================

    async sendContact(contactData) {
        return await this.request('/contact', {
            method: 'POST',
            body: JSON.stringify(contactData)
        });
    }

    // ====================================
    // NEWSLETTER
    // ====================================

    async subscribeNewsletter(email, nome = '') {
        return await this.request('/newsletter/subscribe', {
            method: 'POST',
            body: JSON.stringify({ email, nome })
        });
    }

    // ====================================
    // ESTATÍSTICAS
    // ====================================

    async getStats() {
        return await this.request('/stats');
    }

    // ====================================
    // HEALTH CHECK
    // ====================================

    async healthCheck() {
        return await this.request('/health');
    }
}

// Instância global da API
const api = new CyberCastAPI();

// ====================================
// FUNÇÕES DE UI
// ====================================

// Carregar posts na página inicial
async function loadHomePosts() {
    try {
        showLoading('posts-container');
        const response = await api.getPosts(1, 6);
        
        if (response.posts && response.posts.length > 0) {
            renderPosts(response.posts, 'posts-container');
        } else {
            showEmptyState('posts-container', 'Nenhum post encontrado');
        }
    } catch (error) {
        console.error('Erro ao carregar posts:', error);
        showError('posts-container', 'Erro ao carregar posts');
    }
}

// Carregar episódios na página inicial
async function loadHomeEpisodes() {
    try {
        showLoading('episodes-container');
        const response = await api.getEpisodes(1, 3);
        
        if (response.episodes && response.episodes.length > 0) {
            renderEpisodes(response.episodes, 'episodes-container');
        } else {
            showEmptyState('episodes-container', 'Nenhum episódio encontrado');
        }
    } catch (error) {
        console.error('Erro ao carregar episódios:', error);
        showError('episodes-container', 'Erro ao carregar episódios');
    }
}

// Carregar ferramentas em destaque
async function loadFeaturedTools() {
    try {
        showLoading('tools-container');
        const response = await api.getTools(1, 6, null, true);
        
        if (response.tools && response.tools.length > 0) {
            renderTools(response.tools, 'tools-container');
        } else {
            showEmptyState('tools-container', 'Nenhuma ferramenta encontrada');
        }
    } catch (error) {
        console.error('Erro ao carregar ferramentas:', error);
        showError('tools-container', 'Erro ao carregar ferramentas');
    }
}

// Renderizar posts
function renderPosts(posts, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = posts.map(post => `
        <article class="card">
            <div class="card-header">
                ${post.categoria ? `<div class="card-category">${post.categoria}</div>` : ''}
                <h3 class="card-title">
                    <a href="post.html?slug=${post.slug}" style="color: white; text-decoration: none;">
                        ${post.titulo}
                    </a>
                </h3>
                <div class="card-meta">
                    <span><i class="fas fa-calendar"></i> ${formatDate(post.data_publicacao || post.data_criacao)}</span>
                    ${post.visualizacoes ? `<span><i class="fas fa-eye"></i> ${post.visualizacoes}</span>` : ''}
                </div>
            </div>
            <div class="card-content">
                ${post.resumo ? `<div class="card-description">${post.resumo}</div>` : ''}
                <a href="post.html?slug=${post.slug}" class="btn btn-primary">
                    <i class="fas fa-arrow-right"></i> Ler Mais
                </a>
            </div>
        </article>
    `).join('');
}

// Renderizar episódios
function renderEpisodes(episodes, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = episodes.map(episode => `
        <article class="episode-card">
            <div class="episode-header">
                <span class="episode-number">#${String(episode.numero_episodio).padStart(3, '0')}</span>
                <span class="episode-season">Temporada ${episode.temporada}</span>
            </div>
            <h3 class="episode-title">${episode.titulo}</h3>
            ${episode.descricao ? `<p class="episode-description">${episode.descricao}</p>` : ''}
            <div class="episode-meta">
                <span><i class="fas fa-calendar"></i> ${formatDate(episode.data_publicacao || episode.data_criacao)}</span>
                ${episode.duracao ? `<span><i class="fas fa-clock"></i> ${episode.duracao}</span>` : ''}
                ${episode.visualizacoes ? `<span><i class="fas fa-eye"></i> ${episode.visualizacoes}</span>` : ''}
            </div>
            <a href="episode.html?slug=${episode.slug}" class="btn btn-primary">
                <i class="fas fa-play"></i> Ouvir Episódio
            </a>
        </article>
    `).join('');
}

// Renderizar ferramentas
function renderTools(tools, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = tools.map(tool => `
        <article class="tool-card">
            <div class="tool-icon">
                ${tool.icone ? `<img src="${tool.icone}" alt="${tool.nome}">` : '<i class="fas fa-wrench"></i>'}
            </div>
            <h3 class="tool-title">${tool.nome}</h3>
            ${tool.descricao ? `<p class="tool-description">${tool.descricao}</p>` : ''}
            ${tool.categoria ? `<div class="tool-category">${tool.categoria}</div>` : ''}
            <div class="tool-meta">
                ${tool.preco ? `<span class="tool-price">${tool.preco}</span>` : ''}
                ${tool.nivel ? `<span class="tool-level">${tool.nivel}</span>` : ''}
            </div>
            <a href="${tool.url_oficial || '#'}" class="btn btn-primary" ${tool.url_oficial ? 'target="_blank"' : ''}>
                <i class="fas fa-external-link-alt"></i> Ver Ferramenta
            </a>
        </article>
    `).join('');
}

// Funções auxiliares de UI
function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '<div class="loading">Carregando...</div>';
    }
}

function showError(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `<div class="error">Erro: ${message}</div>`;
    }
}

function showEmptyState(containerId, message) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `<div class="empty-state">${message}</div>`;
    }
}

function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// ====================================
// FORMULÁRIOS
// ====================================

// Formulário de contato
async function handleContactForm(formData) {
    try {
        await api.sendContact(formData);
        showSuccessMessage('Mensagem enviada com sucesso!');
        return true;
    } catch (error) {
        showErrorMessage(error.message || 'Erro ao enviar mensagem');
        return false;
    }
}

// Formulário de newsletter
async function handleNewsletterForm(email, nome = '') {
    try {
        await api.subscribeNewsletter(email, nome);
        showSuccessMessage('Inscrição realizada com sucesso!');
        return true;
    } catch (error) {
        if (error.message.includes('já cadastrado')) {
            showInfoMessage('Este e-mail já está cadastrado!');
        } else {
            showErrorMessage(error.message || 'Erro ao inscrever na newsletter');
        }
        return false;
    }
}

// Funções de notificação
function showSuccessMessage(message) {
    showNotification(message, 'success');
}

function showErrorMessage(message) {
    showNotification(message, 'error');
}

function showInfoMessage(message) {
    showNotification(message, 'info');
}

function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Remover após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// ====================================
// INICIALIZAÇÃO
// ====================================

// Inicializar quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Verificar qual página estamos
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'index.html':
        case '':
            loadHomePosts();
            loadHomeEpisodes();
            loadFeaturedTools();
            break;
        case 'episodes.html':
            loadAllEpisodes();
            break;
        case 'ferramentas.html':
            loadAllTools();
            break;
        case 'contato.html':
            initContactForm();
            break;
    }
    
    // Inicializar formulário de newsletter em todas as páginas
    initNewsletterForm();
});

// Função global para debug
window.cybercastAPI = api;