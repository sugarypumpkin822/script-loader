// Script Categories and Filtering System
class ScriptCategories {
    constructor() {
        this.categories = {
            'game-hacks': {
                name: 'Game Hacks',
                icon: '🎮',
                description: 'Scripts for game modifications and enhancements'
            },
            'auto-farm': {
                name: 'Auto Farm',
                icon: '🤖',
                description: 'Automated farming and resource collection scripts'
            },
            'teleport': {
                name: 'Teleport',
                icon: '🚀',
                description: 'Teleportation and movement scripts'
            },
            'esp': {
                name: 'ESP',
                icon: '👁️',
                description: 'Player and item tracking scripts'
            },
            'gui': {
                name: 'GUI',
                icon: '🎨',
                description: 'User interface and menu scripts'
            },
            'utility': {
                name: 'Utility',
                icon: '🛠️',
                description: 'General utility and helper scripts'
            }
        };

        this.filters = {
            verified: false,
            premium: false,
            patched: false,
            category: 'all',
            minRating: 0,
            minViews: 0
        };
    }

    getCategoryIcon(category) {
        return this.categories[category]?.icon || '📜';
    }

    getCategoryName(category) {
        return this.categories[category]?.name || 'Uncategorized';
    }

    getCategoryDescription(category) {
        return this.categories[category]?.description || 'No description available';
    }

    filterScripts(scripts) {
        return scripts.filter(script => {
            // Apply category filter
            if (this.filters.category !== 'all' && script.category !== this.filters.category) {
                return false;
            }

            // Apply verification filter
            if (this.filters.verified && !script.verified) {
                return false;
            }

            // Apply premium filter
            if (this.filters.premium && !script.premium) {
                return false;
            }

            // Apply patched filter
            if (this.filters.patched && !script.patched) {
                return false;
            }

            // Apply rating filter
            if (script.rating < this.filters.minRating) {
                return false;
            }

            // Apply views filter
            if (script.views < this.filters.minViews) {
                return false;
            }

            return true;
        });
    }

    updateFilter(key, value) {
        this.filters[key] = value;
    }

    resetFilters() {
        this.filters = {
            verified: false,
            premium: false,
            patched: false,
            category: 'all',
            minRating: 0,
            minViews: 0
        };
    }
}

// Initialize the categories
const scriptCategories = new ScriptCategories();

// Export for use in other files
window.scriptCategories = scriptCategories; 