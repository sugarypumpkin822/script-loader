// Search manager
const search = {
    // Search scripts
    searchScripts: (query, scripts) => {
        if (!query) return scripts;

        const searchTerms = query.toLowerCase().split(' ');
        
        return scripts.filter(script => {
            const title = script.title.toLowerCase();
            const description = script.description.toLowerCase();
            const game = script.game.toLowerCase();
            const executors = script.executors.map(e => e.toLowerCase());

            return searchTerms.every(term => 
                title.includes(term) ||
                description.includes(term) ||
                game.includes(term) ||
                executors.some(e => e.includes(term))
            );
        });
    },

    // Sort scripts
    sortScripts: (scripts, sortBy = 'title', order = 'asc') => {
        return [...scripts].sort((a, b) => {
            let comparison = 0;
            
            switch (sortBy) {
                case 'title':
                    comparison = a.title.localeCompare(b.title);
                    break;
                case 'game':
                    comparison = a.game.localeCompare(b.game);
                    break;
                case 'executors':
                    comparison = a.executors.length - b.executors.length;
                    break;
                default:
                    comparison = 0;
            }

            return order === 'asc' ? comparison : -comparison;
        });
    },

    // Filter scripts by executor
    filterByExecutor: (scripts, executor) => {
        if (!executor) return scripts;
        return scripts.filter(script => 
            script.executors.includes(executor)
        );
    },

    // Filter scripts by game
    filterByGame: (scripts, game) => {
        if (!game) return scripts;
        return scripts.filter(script => 
            script.game === game
        );
    }
}; 