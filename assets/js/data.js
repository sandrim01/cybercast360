// Sistema de dados local para CyberCast360
// Usa localStorage para persistir dados

class DataManager {
    constructor() {
        this.initializeData();
    }

    // Inicializa dados padrão se não existirem
    initializeData() {
        if (!localStorage.getItem('cybercast_posts')) {
            const defaultPosts = [
                {
                    id: 1,
                    title: "Bem-vindo ao CyberCast360!",
                    content: "Este é o seu primeiro post no sistema. Você pode editá-lo ou criar novos posts através da área administrativa.",
                    author: "Admin",
                    date: new Date().toISOString(),
                    category: "Geral"
                },
                {
                    id: 2,
                    title: "Como usar o sistema",
                    content: "Este sistema funciona totalmente offline usando localStorage. Todos os seus dados ficam armazenados no navegador.",
                    author: "Sistema",
                    date: new Date().toISOString(),
                    category: "Tutorial"
                }
            ];
            localStorage.setItem('cybercast_posts', JSON.stringify(defaultPosts));
        }

        if (!localStorage.getItem('cybercast_episodes')) {
            const defaultEpisodes = [
                {
                    id: 1,
                    title: "Episódio #001 - Introdução à Cibersegurança",
                    description: "Neste primeiro episódio, falamos sobre os conceitos básicos de cibersegurança.",
                    duration: "25:30",
                    date: new Date().toISOString(),
                    audioUrl: "#",
                    category: "Introdução"
                },
                {
                    id: 2,
                    title: "Episódio #002 - Ataques mais comuns",
                    description: "Discutimos os principais tipos de ataques cibernéticos e como se proteger.",
                    duration: "32:15",
                    date: new Date().toISOString(),
                    audioUrl: "#",
                    category: "Segurança"
                }
            ];
            localStorage.setItem('cybercast_episodes', JSON.stringify(defaultEpisodes));
        }

        if (!localStorage.getItem('cybercast_tools')) {
            const defaultTools = [
                {
                    id: 1,
                    name: "Nmap",
                    description: "Scanner de rede para descoberta de hosts e serviços",
                    url: "https://nmap.org",
                    category: "Scanner",
                    type: "Gratuito"
                },
                {
                    id: 2,
                    name: "Wireshark",
                    description: "Analisador de protocolos de rede",
                    url: "https://wireshark.org",
                    category: "Análise",
                    type: "Gratuito"
                }
            ];
            localStorage.setItem('cybercast_tools', JSON.stringify(defaultTools));
        }

        if (!localStorage.getItem('cybercast_contacts')) {
            localStorage.setItem('cybercast_contacts', JSON.stringify([]));
        }

        if (!localStorage.getItem('cybercast_newsletter')) {
            localStorage.setItem('cybercast_newsletter', JSON.stringify([]));
        }

        if (!localStorage.getItem('cybercast_config')) {
            const defaultConfig = {
                siteName: "CyberCast360",
                siteDescription: "Seu portal de cibersegurança",
                adminPassword: "admin123", // Em produção, use hash
                theme: "dark"
            };
            localStorage.setItem('cybercast_config', JSON.stringify(defaultConfig));
        }
    }

    // Posts
    getPosts() {
        return JSON.parse(localStorage.getItem('cybercast_posts') || '[]');
    }

    getPost(id) {
        const posts = this.getPosts();
        return posts.find(post => post.id === parseInt(id));
    }

    savePost(post) {
        const posts = this.getPosts();
        if (post.id) {
            const index = posts.findIndex(p => p.id === post.id);
            if (index !== -1) {
                posts[index] = post;
            }
        } else {
            post.id = Math.max(...posts.map(p => p.id), 0) + 1;
            posts.push(post);
        }
        localStorage.setItem('cybercast_posts', JSON.stringify(posts));
        return post;
    }

    deletePost(id) {
        const posts = this.getPosts();
        const filtered = posts.filter(post => post.id !== parseInt(id));
        localStorage.setItem('cybercast_posts', JSON.stringify(filtered));
    }

    // Episodes
    getEpisodes() {
        return JSON.parse(localStorage.getItem('cybercast_episodes') || '[]');
    }

    getEpisode(id) {
        const episodes = this.getEpisodes();
        return episodes.find(episode => episode.id === parseInt(id));
    }

    saveEpisode(episode) {
        const episodes = this.getEpisodes();
        if (episode.id) {
            const index = episodes.findIndex(e => e.id === episode.id);
            if (index !== -1) {
                episodes[index] = episode;
            }
        } else {
            episode.id = Math.max(...episodes.map(e => e.id), 0) + 1;
            episodes.push(episode);
        }
        localStorage.setItem('cybercast_episodes', JSON.stringify(episodes));
        return episode;
    }

    deleteEpisode(id) {
        const episodes = this.getEpisodes();
        const filtered = episodes.filter(episode => episode.id !== parseInt(id));
        localStorage.setItem('cybercast_episodes', JSON.stringify(filtered));
    }

    // Tools
    getTools() {
        return JSON.parse(localStorage.getItem('cybercast_tools') || '[]');
    }

    getTool(id) {
        const tools = this.getTools();
        return tools.find(tool => tool.id === parseInt(id));
    }

    saveTool(tool) {
        const tools = this.getTools();
        if (tool.id) {
            const index = tools.findIndex(t => t.id === tool.id);
            if (index !== -1) {
                tools[index] = tool;
            }
        } else {
            tool.id = Math.max(...tools.map(t => t.id), 0) + 1;
            tools.push(tool);
        }
        localStorage.setItem('cybercast_tools', JSON.stringify(tools));
        return tool;
    }

    deleteTool(id) {
        const tools = this.getTools();
        const filtered = tools.filter(tool => tool.id !== parseInt(id));
        localStorage.setItem('cybercast_tools', JSON.stringify(filtered));
    }

    // Contacts
    getContacts() {
        return JSON.parse(localStorage.getItem('cybercast_contacts') || '[]');
    }

    saveContact(contact) {
        const contacts = this.getContacts();
        contact.id = Date.now();
        contact.date = new Date().toISOString();
        contacts.push(contact);
        localStorage.setItem('cybercast_contacts', JSON.stringify(contacts));
        return contact;
    }

    deleteContact(id) {
        const contacts = this.getContacts();
        const filtered = contacts.filter(contact => contact.id !== parseInt(id));
        localStorage.setItem('cybercast_contacts', JSON.stringify(filtered));
    }

    // Newsletter
    getNewsletterSubscribers() {
        return JSON.parse(localStorage.getItem('cybercast_newsletter') || '[]');
    }

    subscribeNewsletter(email) {
        const subscribers = this.getNewsletterSubscribers();
        if (!subscribers.find(s => s.email === email)) {
            const subscriber = {
                id: Date.now(),
                email: email,
                date: new Date().toISOString()
            };
            subscribers.push(subscriber);
            localStorage.setItem('cybercast_newsletter', JSON.stringify(subscribers));
            return subscriber;
        }
        return null;
    }

    unsubscribeNewsletter(email) {
        const subscribers = this.getNewsletterSubscribers();
        const filtered = subscribers.filter(s => s.email !== email);
        localStorage.setItem('cybercast_newsletter', JSON.stringify(filtered));
    }

    // Config
    getConfig() {
        return JSON.parse(localStorage.getItem('cybercast_config') || '{}');
    }

    saveConfig(config) {
        localStorage.setItem('cybercast_config', JSON.stringify(config));
    }

    // Auth
    login(password) {
        const config = this.getConfig();
        if (password === config.adminPassword) {
            sessionStorage.setItem('cybercast_admin', 'true');
            return true;
        }
        return false;
    }

    logout() {
        sessionStorage.removeItem('cybercast_admin');
    }

    isLoggedIn() {
        return sessionStorage.getItem('cybercast_admin') === 'true';
    }

    // Categorias
    getCategories() {
        const posts = this.getPosts();
        const episodes = this.getEpisodes();
        const tools = this.getTools();
        
        const categories = new Set();
        
        posts.forEach(post => categories.add(post.category));
        episodes.forEach(episode => categories.add(episode.category));
        tools.forEach(tool => categories.add(tool.category));
        
        return Array.from(categories).filter(cat => cat);
    }
}

// Instância global
window.dataManager = new DataManager();