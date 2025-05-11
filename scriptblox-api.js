// ScriptBlox API Integration
class ScriptBloxAPI {
    constructor() {
        this.baseUrl = 'https://scriptblox.com/api';
    }

    async searchScripts(query, limit = 50) {
        try {
            const response = await fetch(`${this.baseUrl}/scripts/search?query=${encodeURIComponent(query)}&limit=${limit}`);
            if (!response.ok) throw new Error('Failed to fetch scripts');
            const data = await response.json();
            return data.scripts || [];
        } catch (error) {
            console.error('Error searching scripts:', error);
            return [];
        }
    }

    async getScriptDetails(scriptId) {
        try {
            const response = await fetch(`${this.baseUrl}/scripts/${scriptId}`);
            if (!response.ok) throw new Error('Failed to fetch script details');
            const data = await response.json();
            return data.script;
        } catch (error) {
            console.error('Error fetching script details:', error);
            return null;
        }
    }

    async getLatestScripts(limit = 50) {
        try {
            const response = await fetch(`${this.baseUrl}/scripts/latest?limit=${limit}`);
            if (!response.ok) throw new Error('Failed to fetch latest scripts');
            const data = await response.json();
            return data.scripts || [];
        } catch (error) {
            console.error('Error fetching latest scripts:', error);
            return [];
        }
    }

    async getPopularScripts(limit = 50) {
        try {
            const response = await fetch(`${this.baseUrl}/scripts/popular?limit=${limit}`);
            if (!response.ok) throw new Error('Failed to fetch popular scripts');
            const data = await response.json();
            return data.scripts || [];
        } catch (error) {
            console.error('Error fetching popular scripts:', error);
            return [];
        }
    }
}

// Initialize the API
const scriptbloxAPI = new ScriptBloxAPI();

// Export for use in other files
window.scriptbloxAPI = scriptbloxAPI; 