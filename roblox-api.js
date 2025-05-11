// Roblox API Integration
class RobloxAPI {
    constructor() {
        this.baseUrl = 'https://games.roblox.com/v1';
    }

    async searchGames(query, limit = 50) {
        try {
            const response = await fetch(`${this.baseUrl}/games/search?keyword=${encodeURIComponent(query)}&limit=${limit}`);
            if (!response.ok) throw new Error('Failed to fetch games');
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error searching games:', error);
            return [];
        }
    }

    async getGameDetails(gameId) {
        try {
            const response = await fetch(`${this.baseUrl}/games?universeIds=${gameId}`);
            if (!response.ok) throw new Error('Failed to fetch game details');
            const data = await response.json();
            return data.data[0];
        } catch (error) {
            console.error('Error fetching game details:', error);
            return null;
        }
    }

    async getPopularGames(limit = 50) {
        try {
            const response = await fetch(`${this.baseUrl}/games/list?model.sortToken=Popular&model.startRows=0&model.maxRows=${limit}`);
            if (!response.ok) throw new Error('Failed to fetch popular games');
            const data = await response.json();
            return data.data;
        } catch (error) {
            console.error('Error fetching popular games:', error);
            return [];
        }
    }
}

// Initialize the API
const robloxAPI = new RobloxAPI();

// Export for use in other files
window.robloxAPI = robloxAPI; 