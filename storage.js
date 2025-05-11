// Storage utility
const storage = {
    // Save scripts to local storage
    saveScripts: (scripts) => {
        try {
            localStorage.setItem('scripts', JSON.stringify(scripts));
            return true;
        } catch (error) {
            console.error('Error saving scripts:', error);
            return false;
        }
    },

    // Load scripts from local storage
    loadScripts: () => {
        try {
            const scripts = localStorage.getItem('scripts');
            return scripts ? JSON.parse(scripts) : [];
        } catch (error) {
            console.error('Error loading scripts:', error);
            return [];
        }
    },

    // Save theme preference
    saveTheme: (theme) => {
        try {
            localStorage.setItem('theme', theme);
            return true;
        } catch (error) {
            console.error('Error saving theme:', error);
            return false;
        }
    },

    // Load theme preference
    loadTheme: () => {
        try {
            return localStorage.getItem('theme') || 'light';
        } catch (error) {
            console.error('Error loading theme:', error);
            return 'light';
        }
    },

    // Save recent searches
    saveRecentSearches: (searches) => {
        try {
            localStorage.setItem('recentSearches', JSON.stringify(searches));
            return true;
        } catch (error) {
            console.error('Error saving recent searches:', error);
            return false;
        }
    },

    // Load recent searches
    loadRecentSearches: () => {
        try {
            const searches = localStorage.getItem('recentSearches');
            return searches ? JSON.parse(searches) : [];
        } catch (error) {
            console.error('Error loading recent searches:', error);
            return [];
        }
    },

    // Add recent search
    addRecentSearch: (search) => {
        try {
            const searches = storage.loadRecentSearches();
            const index = searches.indexOf(search);
            
            if (index !== -1) {
                searches.splice(index, 1);
            }
            
            searches.unshift(search);
            
            if (searches.length > 10) {
                searches.pop();
            }
            
            return storage.saveRecentSearches(searches);
        } catch (error) {
            console.error('Error adding recent search:', error);
            return false;
        }
    },

    // Clear all data
    clearAll: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing storage:', error);
            return false;
        }
    }
}; 