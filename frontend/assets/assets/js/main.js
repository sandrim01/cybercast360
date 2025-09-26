// Main JavaScript for CyberCast360

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeEpisodeFilters();
    initializeToolsFilters();
    initializeCategoryFilters();
    initializeContactForm();
    initializeFAQ();
    initializeBookmarks();
    initializeSearch();
});

// Episode Filters
function initializeEpisodeFilters() {
    const filterButtons = document.querySelectorAll('.episode-filters .filter-btn');
    const episodes = document.querySelectorAll('.episode-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter episodes
            episodes.forEach(episode => {
                const category = episode.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    episode.style.display = 'block';
                    episode.style.animation = 'fadeIn 0.5s ease';
                } else {
                    episode.style.display = 'none';
                }
            });
        });
    });
}

// Episode Search
function initializeSearch() {
    const searchInput = document.getElementById('episode-search');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const episodes = document.querySelectorAll('.episode-card');
        
        episodes.forEach(episode => {
            const title = episode.querySelector('.episode-title')?.textContent.toLowerCase() || '';
            const description = episode.querySelector('.episode-description')?.textContent.toLowerCase() || '';
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                episode.style.display = 'block';
            } else {
                episode.style.display = 'none';
            }
        });
    });
}

// Tools Filters
function initializeToolsFilters() {
    const filterButtons = document.querySelectorAll('.tools-filters .filter-btn');
    const tools = document.querySelectorAll('.tool-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter tools
            tools.forEach(tool => {
                const category = tool.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    tool.style.display = 'block';
                    tool.style.animation = 'fadeIn 0.5s ease';
                } else {
                    tool.style.display = 'none';
                }
            });
        });
    });
}

// Category Filters
function initializeCategoryFilters() {
    const filterButtons = document.querySelectorAll('.category-filters .filter-btn');
    const categories = document.querySelectorAll('.category-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter categories
            categories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                if (filter === 'all' || categoryType === filter) {
                    category.style.display = 'block';
                    category.style.animation = 'fadeIn 0.5s ease';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const statusDiv = document.getElementById('form-status');
        
        // Show loading state
        statusDiv.className = 'form-status';
        statusDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando mensagem...';
        statusDiv.classList.remove('hidden');
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            statusDiv.className = 'form-status success';
            statusDiv.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Responderemos em breve.';
            contactForm.reset();
        }, 2000);
    });
}

// FAQ Toggle
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            // Toggle active states
            question.classList.toggle('active');
            answer?.classList.toggle('active');
            
            // Animate icon
            if (question.classList.contains('active')) {
                icon.style.transform = 'rotate(180deg)';
            } else {
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

// Global FAQ toggle function
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    // Toggle active states
    element.classList.toggle('active');
    answer?.classList.toggle('active');
    
    // Animate icon
    if (element.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

// Bookmarks System
function initializeBookmarks() {
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
    
    bookmarkButtons.forEach(button => {
        const toolName = button.getAttribute('data-tool');
        if (!toolName) return;
        
        const isBookmarked = getBookmarkStatus(toolName);
        updateBookmarkButton(button, isBookmarked);
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const currentStatus = getBookmarkStatus(toolName);
            const newStatus = !currentStatus;
            
            setBookmarkStatus(toolName, newStatus);
            updateBookmarkButton(button, newStatus);
            
            // Show feedback
            showBookmarkFeedback(button, newStatus);
        });
    });
    
    // Update bookmarked tools section
    updateBookmarkedToolsSection();
}

function getBookmarkStatus(toolName) {
    const bookmarks = JSON.parse(localStorage.getItem('cybercast-bookmarks') || '[]');
    return bookmarks.includes(toolName);
}

function setBookmarkStatus(toolName, isBookmarked) {
    let bookmarks = JSON.parse(localStorage.getItem('cybercast-bookmarks') || '[]');
    
    if (isBookmarked && !bookmarks.includes(toolName)) {
        bookmarks.push(toolName);
    } else if (!isBookmarked && bookmarks.includes(toolName)) {
        bookmarks = bookmarks.filter(name => name !== toolName);
    }
    
    localStorage.setItem('cybercast-bookmarks', JSON.stringify(bookmarks));
    updateBookmarkedToolsSection();
}

function updateBookmarkButton(button, isBookmarked) {
    const icon = button.querySelector('i');
    
    if (isBookmarked) {
        icon.className = 'fas fa-bookmark';
        button.style.color = '#ff6b35';
    } else {
        icon.className = 'far fa-bookmark';
        button.style.color = '';
    }
}

function showBookmarkFeedback(button, isBookmarked) {
    const feedback = document.createElement('div');
    feedback.className = 'bookmark-feedback';
    feedback.textContent = isBookmarked ? 'Adicionado aos favoritos!' : 'Removido dos favoritos!';
    feedback.style.cssText = `
        position: absolute;
        background: var(--accent-color);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.8rem;
        z-index: 1000;
        animation: fadeInOut 2s ease;
        pointer-events: none;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
    `;
    
    button.style.position = 'relative';
    button.appendChild(feedback);
    
    setTimeout(() => {
        if (feedback.parentNode) {
            feedback.parentNode.removeChild(feedback);
        }
    }, 2000);
}

function updateBookmarkedToolsSection() {
    const bookmarkedSection = document.querySelector('.bookmarked-tools');
    if (!bookmarkedSection) return;
    
    const bookmarks = JSON.parse(localStorage.getItem('cybercast-bookmarks') || '[]');
    const toolsList = bookmarkedSection.querySelector('.tools-list');
    
    if (bookmarks.length === 0) {
        bookmarkedSection.style.display = 'none';
        return;
    }
    
    bookmarkedSection.style.display = 'block';
    
    // Update the list (this would need to be implemented based on your tool data)
    if (toolsList) {
        toolsList.innerHTML = bookmarks.map(toolName => 
            `<div class="bookmarked-tool">${toolName}</div>`
        ).join('');
    }
}

// Add fade-in animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateY(-10px); }
        20%, 80% { opacity: 1; transform: translateY(-20px); }
    }
    
    .bookmark-feedback {
        animation: fadeInOut 2s ease;
    }
`;
document.head.appendChild(style);
        
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                this.classList.toggle('active');
            });
        }
    },
    
    // Inicializar componentes
    initializeComponents: function() {
        // Tooltips
        this.initTooltips();
        
        // Modais
        this.initModals();
        
        // Carrossel/Slider
        this.initSliders();
        
        // Formulários
        this.initForms();
    },
    
    // Lazy Loading para imagens
    setupLazyLoading: function() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    },
    
    // Inicializar tooltips
    initTooltips: function() {
        const tooltipTriggers = document.querySelectorAll('[data-tooltip]');
        
        tooltipTriggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', function() {
                this.showTooltip(trigger);
            }.bind(this));
            
            trigger.addEventListener('mouseleave', function() {
                this.hideTooltip();
            }.bind(this));
        });
    },
    
    // Mostrar tooltip
    showTooltip: function(element) {
        const tooltipText = element.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;
        tooltip.id = 'active-tooltip';
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        
        setTimeout(() => {
            tooltip.classList.add('visible');
        }, 10);
    },
    
    // Esconder tooltip
    hideTooltip: function() {
        const tooltip = document.getElementById('active-tooltip');
        if (tooltip) {
            tooltip.classList.remove('visible');
            setTimeout(() => {
                if (tooltip.parentNode) {
                    tooltip.parentNode.removeChild(tooltip);
                }
            }, 300);
        }
    },
    
    // Inicializar modais
    initModals: function() {
        // Abrir modal
        document.addEventListener('click', function(e) {
            if (e.target.matches('[data-modal-target]')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('data-modal-target');
                this.openModal(targetId);
            }
        }.bind(this));
        
        // Fechar modal
        document.addEventListener('click', function(e) {
            if (e.target.matches('.modal-close') || e.target.matches('.modal-overlay')) {
                this.closeModal();
            }
        }.bind(this));
        
        // Fechar modal com ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        }.bind(this));
    },
    
    // Abrir modal
    openModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
        }
    },
    
    // Fechar modal
    closeModal: function() {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
            
            setTimeout(() => {
                activeModal.style.display = 'none';
            }, 300);
        }
    },
    
    // Inicializar sliders/carrossel
    initSliders: function() {
        const sliders = document.querySelectorAll('.slider');
        
        sliders.forEach(slider => {
            this.createSlider(slider);
        });
    },
    
    // Criar slider
    createSlider: function(slider) {
        const slides = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        const indicators = slider.querySelector('.slider-indicators');
        
        let currentSlide = 0;
        
        // Criar indicadores
        if (indicators && slides.length > 1) {
            slides.forEach((_, index) => {
                const indicator = document.createElement('button');
                indicator.className = 'indicator';
                if (index === 0) indicator.classList.add('active');
                indicator.addEventListener('click', () => this.goToSlide(slider, index));
                indicators.appendChild(indicator);
            });
        }
        
        // Botões de navegação
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = currentSlide > 0 ? currentSlide - 1 : slides.length - 1;
                this.goToSlide(slider, currentSlide);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
                this.goToSlide(slider, currentSlide);
            });
        }
        
        // Auto-play
        if (slider.hasAttribute('data-autoplay')) {
            const interval = parseInt(slider.getAttribute('data-autoplay')) || 5000;
            setInterval(() => {
                currentSlide = currentSlide < slides.length - 1 ? currentSlide + 1 : 0;
                this.goToSlide(slider, currentSlide);
            }, interval);
        }
    },
    
    // Ir para slide específico
    goToSlide: function(slider, slideIndex) {
        const slides = slider.querySelectorAll('.slide');
        const indicators = slider.querySelectorAll('.indicator');
        
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === slideIndex);
        });
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === slideIndex);
        });
    },
    
    // Inicializar formulários
    initForms: function() {
        const forms = document.querySelectorAll('form[data-ajax]');
        
        forms.forEach(form => {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        });
        
        // Validação em tempo real
        document.addEventListener('input', function(e) {
            if (e.target.matches('.form-input, .form-textarea, .form-select')) {
                this.validateField(e.target);
            }
        }.bind(this));
    },
    
    // Manipular envio de formulário
    handleFormSubmit: function(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Validar formulário
        if (!this.validateForm(form)) {
            return;
        }
        
        // Estado de carregamento
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading"></span> Enviando...';
        
        // Enviar dados
        fetch(form.action || window.location.href, {
            method: form.method || 'POST',
            body: formData,
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                this.showAlert('success', data.message || 'Formulário enviado com sucesso!');
                form.reset();
            } else {
                this.showAlert('error', data.message || 'Erro ao enviar formulário.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            this.showAlert('error', 'Erro interno. Tente novamente mais tarde.');
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        });
    },
    
    // Validar campo
    validateField: function(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let message = '';
        
        // Remover validação anterior
        this.clearFieldValidation(field);
        
        // Validações
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'Este campo é obrigatório.';
        } else if (type === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            message = 'Digite um email válido.';
        } else if (field.hasAttribute('minlength') && value.length < parseInt(field.getAttribute('minlength'))) {
            isValid = false;
            message = `Mínimo de ${field.getAttribute('minlength')} caracteres.`;
        }
        
        // Aplicar validação visual
        if (!isValid) {
            this.showFieldError(field, message);
        }
        
        return isValid;
    },
    
    // Validar formulário completo
    validateForm: function(form) {
        const fields = form.querySelectorAll('.form-input, .form-textarea, .form-select');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    },
    
    // Mostrar erro no campo
    showFieldError: function(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    },
    
    // Limpar validação do campo
    clearFieldValidation: function(field) {
        field.classList.remove('error');
        
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    },
    
    // Validar email
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },
    
    // Mostrar alerta
    showAlert: function(type, message, duration = 5000) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.innerHTML = `
            ${message}
            <button type="button" class="close" aria-label="Fechar">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Inserir no topo da página
        const container = document.querySelector('.container') || document.body;
        container.insertBefore(alert, container.firstChild);
        
        // Auto-remover
        setTimeout(() => {
            if (alert.parentNode) {
                alert.style.opacity = '0';
                setTimeout(() => {
                    alert.remove();
                }, 300);
            }
        }, duration);
    },
    
    // Funções de compartilhamento
    shareContent: function(platform, title, url, description = '') {
        let shareUrl = '';
        const encodedTitle = encodeURIComponent(title);
        const encodedUrl = encodeURIComponent(url);
        const encodedDesc = encodeURIComponent(description);
        
        switch(platform) {
            case 'twitter':
                shareUrl = `${this.shareConfig.twitter}?text=${encodedTitle}&url=${encodedUrl}`;
                break;
            case 'linkedin':
                shareUrl = `${this.shareConfig.linkedin}?url=${encodedUrl}`;
                break;
            case 'whatsapp':
                shareUrl = `${this.shareConfig.whatsapp}?text=${encodedTitle} ${encodedUrl}`;
                break;
            case 'telegram':
                shareUrl = `${this.shareConfig.telegram}?url=${encodedUrl}&text=${encodedTitle}`;
                break;
            case 'facebook':
                shareUrl = `${this.shareConfig.facebook}?u=${encodedUrl}`;
                break;
        }
        
        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
        }
    },
    
    // Copiar para clipboard
    copyToClipboard: function(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showAlert('success', 'Copiado para a área de transferência!');
            });
        } else {
            // Fallback para navegadores mais antigos
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showAlert('success', 'Copiado para a área de transferência!');
        }
    },
    
    // Formatação de data
    formatDate: function(dateString, format = 'dd/mm/yyyy') {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        switch(format) {
            case 'dd/mm/yyyy':
                return `${day}/${month}/${year}`;
            case 'mm/dd/yyyy':
                return `${month}/${day}/${year}`;
            case 'yyyy-mm-dd':
                return `${year}-${month}-${day}`;
            default:
                return date.toLocaleDateString('pt-BR');
        }
    },
    
    // Debounce para otimizar eventos
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle para otimizar eventos
    throttle: function(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Utilitários
    utils: {
        // Slugify string
        slugify: function(text) {
            return text
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
        },
        
        // Truncar texto
        truncate: function(text, length = 100, suffix = '...') {
            if (text.length <= length) return text;
            return text.substring(0, length).trim() + suffix;
        },
        
        // Escapar HTML
        escapeHtml: function(text) {
            const map = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            };
            return text.replace(/[&<>"']/g, function(m) { return map[m]; });
        },
        
        // Gerar ID único
        generateId: function(prefix = 'id') {
            return prefix + '_' + Math.random().toString(36).substr(2, 9);
        }
    }
};

// Funções globais para compatibilidade
function shareEpisode(platform, title, url) {
    CyberCast360.shareContent(platform, decodeURIComponent(title), decodeURIComponent(url));
}

function shareTool(platform, name, url) {
    const title = `Confira esta ferramenta de segurança: ${decodeURIComponent(name)}`;
    CyberCast360.shareContent(platform, title, decodeURIComponent(url));
}

function shareArticle(platform, title, url) {
    const shareTitle = `Leia este artigo: ${decodeURIComponent(title)}`;
    CyberCast360.shareContent(platform, shareTitle, decodeURIComponent(url));
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        CyberCast360.init();
    });
} else {
    CyberCast360.init();
}

// Exportar para uso em módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CyberCast360;
}