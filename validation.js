// Validation utility
const validation = {
    // Validate script object
    validateScript: (script) => {
        if (!script) return 'Script is required';
        if (!script.title) return 'Title is required';
        if (!script.description) return 'Description is required';
        if (!script.code) return 'Code is required';
        if (!script.game) return 'Game is required';
        if (!Array.isArray(script.executors) || script.executors.length === 0) {
            return 'At least one executor is required';
        }

        // Validate title length
        if (script.title.length < 3 || script.title.length > 100) {
            return 'Title must be between 3 and 100 characters';
        }

        // Validate description length
        if (script.description.length < 10 || script.description.length > 1000) {
            return 'Description must be between 10 and 1000 characters';
        }

        // Validate code length
        if (script.code.length < 10) {
            return 'Code must be at least 10 characters';
        }

        // Validate game
        if (script.game.length < 3 || script.game.length > 100) {
            return 'Game name must be between 3 and 100 characters';
        }

        // Validate executors
        for (const executor of script.executors) {
            if (typeof executor !== 'string' || executor.length === 0) {
                return 'Invalid executor';
            }
        }

        return null;
    },

    // Validate search query
    validateSearchQuery: (query) => {
        if (!query) return 'Search query is required';
        if (query.length < 2) return 'Search query must be at least 2 characters';
        if (query.length > 100) return 'Search query must be less than 100 characters';
        return null;
    },

    // Validate executor name
    validateExecutor: (executor) => {
        if (!executor) return 'Executor name is required';
        if (executor.length < 2) return 'Executor name must be at least 2 characters';
        if (executor.length > 50) return 'Executor name must be less than 50 characters';
        return null;
    },

    // Validate game name
    validateGame: (game) => {
        if (!game) return 'Game name is required';
        if (game.length < 2) return 'Game name must be at least 2 characters';
        if (game.length > 100) return 'Game name must be less than 100 characters';
        return null;
    }
}; 