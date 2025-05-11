// DOM Elements
const scriptList = document.getElementById('scriptList');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const modal = document.getElementById('scriptModal');
const modalTitle = document.getElementById('modalTitle');
const modalCode = document.getElementById('modalCode');
const modalGame = document.getElementById('modalGame');
const modalExecutors = document.getElementById('modalExecutors');
const closeButton = document.querySelector('.close-button');
const copyButton = document.getElementById('copyButton');
const gameFilter = document.getElementById('gameFilter');
const executorFilter = document.getElementById('executorFilter');
const sortFilter = document.getElementById('sortFilter');

// Initialize filters
function initializeFilters() {
    const games = [...new Set(scripts.map(script => script.game))];
    const executors = [...new Set(scripts.flatMap(script => script.executors))];
    
    games.forEach(game => {
        const option = document.createElement('option');
        option.value = game;
        option.textContent = game;
        gameFilter.appendChild(option);
    });
    
    executors.forEach(executor => {
        const option = document.createElement('option');
        option.value = executor;
        option.textContent = executor;
        executorFilter.appendChild(option);
    });
}

// Display scripts
function displayScripts(scriptsToShow = scripts) {
    scriptList.innerHTML = '';
    scriptsToShow.forEach(script => {
        const scriptCard = document.createElement('div');
        scriptCard.className = 'script-card';
        scriptCard.innerHTML = `
            <h3>${script.title}</h3>
            <p>${script.description}</p>
            <div class="game-info">Game: ${script.game}</div>
            <div class="executors">
                ${script.executors.map(executor => 
                    `<span class="executor-tag">${executor}</span>`
                ).join('')}
            </div>
        `;
        scriptCard.addEventListener('click', () => showScript(script));
        scriptList.appendChild(scriptCard);
    });
}

// Show script in modal
function showScript(script) {
    modalTitle.textContent = script.title;
    modalGame.textContent = `Game: ${script.game}`;
    modalExecutors.innerHTML = script.executors.map(executor => 
        `<span class="executor-tag">${executor}</span>`
    ).join('');
    modalCode.textContent = script.code;
    modal.style.display = 'block';
}

// Search and filter functionality
function searchScripts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedGame = gameFilter.value;
    const selectedExecutor = executorFilter.value;
    
    const filteredScripts = scripts.filter(script => {
        const matchesSearch = script.title.toLowerCase().includes(searchTerm) ||
                            script.description.toLowerCase().includes(searchTerm);
        const matchesGame = !selectedGame || script.game === selectedGame;
        const matchesExecutor = !selectedExecutor || script.executors.includes(selectedExecutor);
        
        return matchesSearch && matchesGame && matchesExecutor;
    });
    
    displayScripts(filteredScripts);
}

// Copy script to clipboard
function copyToClipboard() {
    const code = modalCode.textContent;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 2000);
    });
}

// Initialize the page
initializeFilters();

class UIHandler {
    constructor() {
        this.scriptList = document.getElementById('scriptList');
        this.searchInput = document.getElementById('searchInput');
        this.searchButton = document.getElementById('searchButton');
        this.gameFilter = document.getElementById('gameFilter');
        this.executorFilter = document.getElementById('executorFilter');
        this.sortFilter = document.getElementById('sortFilter');
        this.modal = document.getElementById('scriptModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalGame = document.getElementById('modalGame');
        this.modalExecutors = document.getElementById('modalExecutors');
        this.modalCode = document.getElementById('modalCode');
        this.copyButton = document.getElementById('copyButton');
        this.executeButton = document.getElementById('executeButton');
        this.closeButton = document.querySelector('.close-button');
        
        this.currentFilters = {
            game: '',
            executor: '',
            sort: 'popular',
            category: 'all',
            premium: false,
            patched: false,
            minRating: 0
        };
        
        this.setupEventListeners();
        this.setupCategoryTabs();
        this.setupAdditionalFilters();
        this.setupUserProfile();
        this.setupScriptManagement();
        this.setupNotifications();
        this.setupScriptEditor();
        this.setupCodeHighlighting();
        this.setupScriptVersioning();
    }

    setupEventListeners() {
        this.searchButton.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });

        this.gameFilter.addEventListener('change', (e) => {
            this.currentFilters.game = e.target.value;
            this.updateScriptList();
        });

        this.executorFilter.addEventListener('change', (e) => {
            this.currentFilters.executor = e.target.value;
            this.updateScriptList();
        });

        this.sortFilter.addEventListener('change', (e) => {
            this.currentFilters.sort = e.target.value;
            this.updateScriptList();
        });

        this.copyButton.addEventListener('click', () => this.copyScript());
        this.executeButton.addEventListener('click', () => this.executeScript());
        this.closeButton.addEventListener('click', () => this.closeModal());

        // Infinite scroll
        window.addEventListener('scroll', () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 1000) {
                this.loadMoreScripts();
            }
        });
    }

    setupCategoryTabs() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.dataset.category;
                this.currentFilters.category = category;
                this.updateScriptList();
                
                // Update active state
                navLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    setupAdditionalFilters() {
        // Add premium filter
        const premiumFilter = document.createElement('div');
        premiumFilter.className = 'filter-checkbox';
        premiumFilter.innerHTML = `
            <input type="checkbox" id="premiumFilter">
            <label for="premiumFilter">Premium Only</label>
        `;
        document.querySelector('.filter-container').appendChild(premiumFilter);

        // Add rating filter
        const ratingFilter = document.createElement('select');
        ratingFilter.id = 'ratingFilter';
        ratingFilter.innerHTML = `
            <option value="0">Any Rating</option>
            <option value="3">3+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="4.5">4.5+ Stars</option>
        `;
        document.querySelector('.filter-container').appendChild(ratingFilter);

        // Add event listeners
        document.getElementById('premiumFilter').addEventListener('change', (e) => {
            this.currentFilters.premium = e.target.checked;
            this.updateScriptList();
        });

        ratingFilter.addEventListener('change', (e) => {
            this.currentFilters.minRating = parseFloat(e.target.value);
            this.updateScriptList();
        });
    }

    async handleSearch() {
        const query = this.searchInput.value.trim();
        if (!query) return;

        const results = scriptManager.searchScripts(query);
        this.displayScripts(results);
    }

    async loadMoreScripts() {
        const newScripts = await scriptManager.loadMoreScripts();
        if (newScripts.length > 0) {
            this.appendScripts(newScripts);
        }
    }

    updateScriptList() {
        let filteredScripts = scriptManager.filterScripts(this.currentFilters);
        filteredScripts = scriptManager.sortScripts(this.currentFilters.sort);
        this.displayScripts(filteredScripts);
    }

    displayScripts(scripts) {
        this.scriptList.innerHTML = '';
        this.appendScripts(scripts);
    }

    appendScripts(scripts) {
        scripts.forEach(script => {
            const card = this.createScriptCard(script);
            this.scriptList.appendChild(card);
        });
    }

    createScriptCard(script) {
        const card = document.createElement('div');
        card.className = 'script-card';
        if (script.isPremium) card.classList.add('premium');
        if (script.isPatched) card.classList.add('patched');
        if (script.verified) card.classList.add('verified');

        card.innerHTML = `
            <div class="script-header">
                <h3 class="script-title">${script.title}</h3>
                <div class="script-badges">
                    ${script.isPremium ? '<span class="badge premium">Premium</span>' : ''}
                    ${script.verified ? '<span class="badge verified">Verified</span>' : ''}
                    ${script.isPatched ? '<span class="badge patched">Patched</span>' : ''}
                </div>
            </div>
            <p class="script-description">${script.description}</p>
            <div class="script-meta">
                <span class="game-info">${script.game}</span>
                <div class="script-stats">
                    <span class="stat-item" data-tooltip="Likes">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        ${script.likes}
                    </span>
                    <span class="stat-item" data-tooltip="Views">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                        </svg>
                        ${script.views}
                    </span>
                    <span class="stat-item" data-tooltip="Downloads">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                        </svg>
                        ${script.downloads}
                    </span>
                    <span class="stat-item" data-tooltip="Rating">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                        ${script.rating.toFixed(1)}
                    </span>
                </div>
            </div>
            <div class="script-tags">
                ${script.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="executors">
                ${script.executors.map(executor => `
                    <span class="executor-badge">${executor}</span>
                `).join('')}
            </div>
            <div class="script-footer">
                <button class="favorite-btn ${scriptManager.isFavorite(script.id) ? 'active' : ''}" 
                        onclick="event.stopPropagation(); uiHandler.toggleFavorite('${script.id}')">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>
                <span class="last-tested">Last tested: ${script.lastTested ? new Date(script.lastTested).toLocaleDateString() : 'Unknown'}</span>
            </div>
        `;

        card.addEventListener('click', () => this.openModal(script));
        return card;
    }

    openModal(script) {
        scriptManager.addToRecentlyViewed(script);
        
        this.modalTitle.textContent = script.title;
        this.modalGame.textContent = script.game;
        this.modalExecutors.innerHTML = script.executors.map(executor => 
            `<span class="executor-badge">${executor}</span>`
        ).join('');
        this.modalCode.textContent = script.code;
        
        // Add script metadata
        const metadata = document.createElement('div');
        metadata.className = 'script-metadata';
        metadata.innerHTML = `
            <div class="metadata-item">
                <span class="label">Author:</span>
                <span class="value">${script.author}</span>
            </div>
            <div class="metadata-item">
                <span class="label">Created:</span>
                <span class="value">${script.createdAt.toLocaleDateString()}</span>
            </div>
            <div class="metadata-item">
                <span class="label">Last Updated:</span>
                <span class="value">${script.updatedAt.toLocaleDateString()}</span>
            </div>
            <div class="metadata-item">
                <span class="label">Rating:</span>
                <span class="value">${script.rating.toFixed(1)}/5</span>
            </div>
            <div class="metadata-item">
                <span class="label">Downloads:</span>
                <span class="value">${script.downloads}</span>
            </div>
        `;
        
        this.modal.querySelector('.modal-header').appendChild(metadata);
        this.modal.style.display = 'block';
    }

    closeModal() {
        this.modal.style.display = 'none';
    }

    copyScript() {
        const code = this.modalCode.textContent;
        navigator.clipboard.writeText(code).then(() => {
            this.copyButton.textContent = 'Copied!';
            setTimeout(() => {
                this.copyButton.textContent = 'Copy Script';
            }, 2000);
        });
    }

    executeScript() {
        const code = this.modalCode.textContent;
        // Implementation for script execution would go here
        // This would typically involve sending the code to a Roblox executor
        console.log('Executing script:', code);
    }

    toggleFavorite(scriptId) {
        scriptManager.toggleFavorite(scriptId);
        this.updateScriptList(); // Refresh the list to update favorite status
    }

    setupUserProfile() {
        const navAuth = document.querySelector('.nav-auth');
        navAuth.innerHTML = `
            <div class="user-profile">
                <div class="user-info">
                    <img src="https://scriptblox.com/static/default-avatar.png" alt="User Avatar" class="user-avatar">
                    <span class="username">Guest</span>
                </div>
                <div class="user-menu">
                    <a href="#" class="menu-item" data-action="profile">Profile</a>
                    <a href="#" class="menu-item" data-action="my-scripts">My Scripts</a>
                    <a href="#" class="menu-item" data-action="favorites">Favorites</a>
                    <a href="#" class="menu-item" data-action="recent">Recently Viewed</a>
                    <a href="#" class="menu-item" data-action="settings">Settings</a>
                    <div class="menu-divider"></div>
                    <a href="#" class="menu-item" data-action="login">Login</a>
                    <a href="#" class="menu-item" data-action="signup">Sign Up</a>
                </div>
            </div>
        `;

        // Add event listeners for user menu
        const userProfile = document.querySelector('.user-profile');
        userProfile.addEventListener('click', (e) => {
            const menu = userProfile.querySelector('.user-menu');
            menu.classList.toggle('active');
        });

        // Handle menu actions
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const action = e.target.dataset.action;
                this.handleUserAction(action);
            });
        });
    }

    setupScriptManagement() {
        // Add script management buttons
        const scriptList = document.getElementById('scriptList');
        const managementBar = document.createElement('div');
        managementBar.className = 'script-management';
        managementBar.innerHTML = `
            <div class="management-actions">
                <button class="action-btn" data-action="create">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                    Create Script
                </button>
                <button class="action-btn" data-action="import">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                    </svg>
                    Import Script
                </button>
                <button class="action-btn" data-action="export">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/>
                    </svg>
                    Export Scripts
                </button>
            </div>
            <div class="view-options">
                <button class="view-btn active" data-view="grid">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 11h5V5H4v6zm0 7h5v-6H4v6zm6 0h5v-6h-5v6zm6 0h5v-6h-5v6zm-6-7h5V5h-5v6zm6-6v6h5V5h-5z"/>
                    </svg>
                </button>
                <button class="view-btn" data-view="list">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                    </svg>
                </button>
            </div>
        `;
        scriptList.parentNode.insertBefore(managementBar, scriptList);

        // Add event listeners for management actions
        document.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.closest('.action-btn').dataset.action;
                this.handleScriptAction(action);
            });
        });

        // Add event listeners for view options
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.closest('.view-btn').dataset.view;
                this.changeView(view);
            });
        });
    }

    setupNotifications() {
        const notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        document.body.appendChild(notificationContainer);

        // Add notification bell to navbar
        const navAuth = document.querySelector('.nav-auth');
        const notificationBell = document.createElement('div');
        notificationBell.className = 'notification-bell';
        notificationBell.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
            </svg>
            <span class="notification-count">0</span>
        `;
        navAuth.insertBefore(notificationBell, navAuth.firstChild);

        // Add event listener for notification bell
        notificationBell.addEventListener('click', () => {
            this.showNotifications();
        });
    }

    handleUserAction(action) {
        switch (action) {
            case 'profile':
                this.showProfile();
                break;
            case 'my-scripts':
                this.showMyScripts();
                break;
            case 'favorites':
                this.showFavorites();
                break;
            case 'recent':
                this.showRecentlyViewed();
                break;
            case 'settings':
                this.showSettings();
                break;
            case 'login':
                this.showLoginModal();
                break;
            case 'signup':
                this.showSignupModal();
                break;
        }
    }

    handleScriptAction(action) {
        switch (action) {
            case 'create':
                this.showCreateScriptModal();
                break;
            case 'import':
                this.showImportScriptModal();
                break;
            case 'export':
                this.exportScripts();
                break;
        }
    }

    changeView(view) {
        const scriptList = document.getElementById('scriptList');
        scriptList.className = `script-list ${view}-view`;
        
        // Update active state
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        document.querySelector('.notification-container').appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        });
    }

    setupScriptEditor() {
        const editorContainer = document.createElement('div');
        editorContainer.className = 'script-editor-container';
        editorContainer.innerHTML = `
            <div class="editor-header">
                <div class="editor-tabs">
                    <button class="editor-tab active" data-tab="editor">Editor</button>
                    <button class="editor-tab" data-tab="preview">Preview</button>
                </div>
                <div class="editor-actions">
                    <button class="editor-btn" data-action="format">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zM13 21v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zM21 13v-2H11v2h10zM15 9h2V7h4V5h-4V3h-2v6z"/>
                        </svg>
                        Format
                    </button>
                    <button class="editor-btn" data-action="minify">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                        Minify
                    </button>
                    <button class="editor-btn" data-action="beautify">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                        </svg>
                        Beautify
                    </button>
                </div>
            </div>
            <div class="editor-content">
                <div class="editor-main">
                    <div class="line-numbers"></div>
                    <textarea class="code-editor" spellcheck="false"></textarea>
                </div>
                <div class="editor-sidebar">
                    <div class="sidebar-section">
                        <h3>Script Info</h3>
                        <div class="info-item">
                            <label>Title</label>
                            <input type="text" class="script-title-input">
                        </div>
                        <div class="info-item">
                            <label>Description</label>
                            <textarea class="script-description-input"></textarea>
                        </div>
                        <div class="info-item">
                            <label>Game</label>
                            <select class="script-game-select"></select>
                        </div>
                        <div class="info-item">
                            <label>Tags</label>
                            <div class="tag-input-container">
                                <input type="text" class="tag-input" placeholder="Add tags...">
                                <div class="tag-list"></div>
                            </div>
                        </div>
                    </div>
                    <div class="sidebar-section">
                        <h3>Settings</h3>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" class="premium-toggle">
                                Premium Script
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>
                                <input type="checkbox" class="verified-toggle">
                                Verified Script
                            </label>
                        </div>
                        <div class="setting-item">
                            <label>Auto-save</label>
                            <select class="autosave-select">
                                <option value="off">Off</option>
                                <option value="1">Every minute</option>
                                <option value="5">Every 5 minutes</option>
                                <option value="15">Every 15 minutes</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(editorContainer);

        // Add event listeners for editor actions
        document.querySelectorAll('.editor-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.closest('.editor-btn').dataset.action;
                this.handleEditorAction(action);
            });
        });

        // Add event listeners for editor tabs
        document.querySelectorAll('.editor-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchEditorTab(tabName);
            });
        });

        // Setup autosave
        this.setupAutosave();
    }

    setupCodeHighlighting() {
        // Add Prism.js for syntax highlighting
        const prismScript = document.createElement('script');
        prismScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js';
        document.head.appendChild(prismScript);

        const prismStyle = document.createElement('link');
        prismStyle.rel = 'stylesheet';
        prismStyle.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism-tomorrow.min.css';
        document.head.appendChild(prismStyle);

        // Add custom theme overrides
        const customStyle = document.createElement('style');
        customStyle.textContent = `
            .code-editor {
                font-family: 'Fira Code', monospace;
                line-height: 1.5;
                tab-size: 4;
            }
            .line-numbers {
                font-family: 'Fira Code', monospace;
                color: var(--text-secondary);
                text-align: right;
                padding-right: 8px;
                user-select: none;
            }
        `;
        document.head.appendChild(customStyle);
    }

    setupScriptVersioning() {
        const versioningContainer = document.createElement('div');
        versioningContainer.className = 'versioning-container';
        versioningContainer.innerHTML = `
            <div class="version-header">
                <h3>Version History</h3>
                <button class="version-btn" data-action="new-version">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                    </svg>
                    New Version
                </button>
            </div>
            <div class="version-list"></div>
        `;

        document.querySelector('.editor-sidebar').appendChild(versioningContainer);

        // Add event listener for new version button
        document.querySelector('.version-btn').addEventListener('click', () => {
            this.createNewVersion();
        });
    }

    handleEditorAction(action) {
        switch (action) {
            case 'format':
                this.formatCode();
                break;
            case 'minify':
                this.minifyCode();
                break;
            case 'beautify':
                this.beautifyCode();
                break;
        }
    }

    switchEditorTab(tabName) {
        const tabs = document.querySelectorAll('.editor-tab');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        // Update editor content based on tab
        if (tabName === 'preview') {
            this.updatePreview();
        }
    }

    setupAutosave() {
        const autosaveSelect = document.querySelector('.autosave-select');
        let autosaveInterval;

        autosaveSelect.addEventListener('change', (e) => {
            const interval = parseInt(e.target.value);
            if (autosaveInterval) {
                clearInterval(autosaveInterval);
            }
            if (interval > 0) {
                autosaveInterval = setInterval(() => {
                    this.autosaveScript();
                }, interval * 60 * 1000);
            }
        });
    }

    formatCode() {
        const editor = document.querySelector('.code-editor');
        const code = editor.value;
        // Implement code formatting logic
        editor.value = this.formatLuaCode(code);
        this.updateLineNumbers();
    }

    minifyCode() {
        const editor = document.querySelector('.code-editor');
        const code = editor.value;
        // Implement code minification logic
        editor.value = this.minifyLuaCode(code);
        this.updateLineNumbers();
    }

    beautifyCode() {
        const editor = document.querySelector('.code-editor');
        const code = editor.value;
        // Implement code beautification logic
        editor.value = this.beautifyLuaCode(code);
        this.updateLineNumbers();
    }

    updateLineNumbers() {
        const editor = document.querySelector('.code-editor');
        const lineNumbers = document.querySelector('.line-numbers');
        const lines = editor.value.split('\n');
        
        lineNumbers.innerHTML = lines.map((_, i) => i + 1).join('\n');
    }

    createNewVersion() {
        const editor = document.querySelector('.code-editor');
        const code = editor.value;
        const version = {
            code,
            timestamp: new Date(),
            description: prompt('Enter version description:')
        };

        this.saveVersion(version);
        this.updateVersionList();
    }

    saveVersion(version) {
        const versions = JSON.parse(localStorage.getItem('scriptVersions') || '[]');
        versions.push(version);
        localStorage.setItem('scriptVersions', JSON.stringify(versions));
    }

    updateVersionList() {
        const versionList = document.querySelector('.version-list');
        const versions = JSON.parse(localStorage.getItem('scriptVersions') || '[]');

        versionList.innerHTML = versions.map((version, index) => `
            <div class="version-item">
                <div class="version-info">
                    <span class="version-number">v${versions.length - index}</span>
                    <span class="version-date">${new Date(version.timestamp).toLocaleString()}</span>
                </div>
                <div class="version-description">${version.description}</div>
                <div class="version-actions">
                    <button class="version-action" data-action="restore" data-index="${index}">
                        Restore
                    </button>
                    <button class="version-action" data-action="compare" data-index="${index}">
                        Compare
                    </button>
                </div>
            </div>
        `).join('');

        // Add event listeners for version actions
        versionList.querySelectorAll('.version-action').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                const index = parseInt(e.target.dataset.index);
                this.handleVersionAction(action, index);
            });
        });
    }

    handleVersionAction(action, index) {
        const versions = JSON.parse(localStorage.getItem('scriptVersions') || '[]');
        const version = versions[index];

        switch (action) {
            case 'restore':
                this.restoreVersion(version);
                break;
            case 'compare':
                this.compareVersions(version);
                break;
        }
    }

    restoreVersion(version) {
        const editor = document.querySelector('.code-editor');
        editor.value = version.code;
        this.updateLineNumbers();
        this.showNotification('Version restored successfully', 'success');
    }

    compareVersions(version) {
        const editor = document.querySelector('.code-editor');
        const currentCode = editor.value;
        
        // Implement diff comparison logic
        const diff = this.compareCode(currentCode, version.code);
        this.showDiff(diff);
    }
}

// Initialize UI handler
const uiHandler = new UIHandler();

// Export for use in other files
window.uiHandler = uiHandler; 