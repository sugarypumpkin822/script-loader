// Roblox Games Manager
class GamesManager {
    constructor() {
        this.games = [];
        this.categories = new Set();
        this.init();
    }

    init() {
        this.loadGames();
        this.setupEventListeners();
    }

    loadGames() {
        // Load all game data files
        this.games = [
            ...window.GAMES_DATA,
            ...window.GAMES_DATA_2,
            ...window.GAMES_DATA_3,
            ...window.GAMES_DATA_4,
            ...window.GAMES_DATA_5,
            ...window.GAMES_DATA_6,
            ...window.GAMES_DATA_7,
            ...window.GAMES_DATA_8,
            ...window.GAMES_DATA_9,
            ...window.GAMES_DATA_10,
            ...window.GAMES_DATA_11,
            ...window.GAMES_DATA_12,
            ...window.GAMES_DATA_13,
            ...window.GAMES_DATA_14,
            ...window.GAMES_DATA_15
        ];

        // Extract unique categories
        this.games.forEach(game => {
            this.categories.add(game.category);
        });
    }

    setupEventListeners() {
        // Listen for game selection events
        document.addEventListener('game:select', (event) => {
            const gameId = event.detail.gameId;
            this.selectGame(gameId);
        });

        // Listen for category filter events
        document.addEventListener('category:filter', (event) => {
            const category = event.detail.category;
            this.filterByCategory(category);
        });
    }

    // Game Management Methods
    getGame(id) {
        return this.games.find(game => game.id === id);
    }

    getAllGames() {
        return [...this.games];
    }

    getGamesByCategory(category) {
        return this.games.filter(game => game.category === category);
    }

    getCategories() {
        return Array.from(this.categories);
    }

    searchGames(query) {
        const searchTerm = query.toLowerCase();
        return this.games.filter(game => 
            game.name.toLowerCase().includes(searchTerm) ||
            game.description.toLowerCase().includes(searchTerm) ||
            game.creator.toLowerCase().includes(searchTerm)
        );
    }

    getPopularGames(limit = 10) {
        return [...this.games]
            .sort((a, b) => b.players - a.players)
            .slice(0, limit);
    }

    getMostVisitedGames(limit = 10) {
        return [...this.games]
            .sort((a, b) => b.visits - a.visits)
            .slice(0, limit);
    }

    // Game Selection and Filtering
    selectGame(gameId) {
        const game = this.getGame(gameId);
        if (game) {
            const event = new CustomEvent('game:selected', {
                detail: { game }
            });
            document.dispatchEvent(event);
        }
    }

    filterByCategory(category) {
        const filteredGames = category ? 
            this.getGamesByCategory(category) : 
            this.getAllGames();

        const event = new CustomEvent('games:filtered', {
            detail: { games: filteredGames, category }
        });
        document.dispatchEvent(event);
    }

    // Game Statistics
    getTotalGames() {
        return this.games.length;
    }

    getTotalPlayers() {
        return this.games.reduce((sum, game) => sum + game.players, 0);
    }

    getTotalVisits() {
        return this.games.reduce((sum, game) => sum + game.visits, 0);
    }

    getAveragePlayers() {
        return this.getTotalPlayers() / this.getTotalGames();
    }

    // Game Recommendations
    getRecommendedGames(gameId, limit = 5) {
        const game = this.getGame(gameId);
        if (!game) return [];

        return this.games
            .filter(g => g.id !== gameId && g.category === game.category)
            .sort((a, b) => b.players - a.players)
            .slice(0, limit);
    }

    // Game Categories Analysis
    getCategoryStats() {
        const stats = {};
        this.categories.forEach(category => {
            const games = this.getGamesByCategory(category);
            stats[category] = {
                count: games.length,
                totalPlayers: games.reduce((sum, game) => sum + game.players, 0),
                totalVisits: games.reduce((sum, game) => sum + game.visits, 0)
            };
        });
        return stats;
    }

    // Game Updates
    updateGameStats(gameId, stats) {
        const game = this.getGame(gameId);
        if (game) {
            Object.assign(game, stats);
            const event = new CustomEvent('game:updated', {
                detail: { game }
            });
            document.dispatchEvent(event);
        }
    }

    // Game Sorting
    sortGames(criteria = 'players', order = 'desc') {
        return [...this.games].sort((a, b) => {
            const multiplier = order === 'desc' ? -1 : 1;
            return multiplier * (a[criteria] - b[criteria]);
        });
    }
}

// Initialize games manager
const gamesManager = new GamesManager(); 