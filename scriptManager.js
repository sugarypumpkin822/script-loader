// Script manager
const scriptManager = {
    // Add new script
    addScript: (script) => {
        const validationError = validation.validateScript(script);
        if (validationError) {
            notifications.error(validationError);
            return false;
        }

        const scripts = storage.loadScripts() || [];
        scripts.push({
            ...script,
            id: helpers.generateId(),
            createdAt: new Date().toISOString()
        });

        if (storage.saveScripts(scripts)) {
            notifications.success('Script added successfully');
            return true;
        } else {
            notifications.error('Failed to save script');
            return false;
        }
    },

    // Update existing script
    updateScript: (id, updates) => {
        const scripts = storage.loadScripts() || [];
        const index = scripts.findIndex(s => s.id === id);
        
        if (index === -1) {
            notifications.error('Script not found');
            return false;
        }

        const updatedScript = { ...scripts[index], ...updates };
        const validationError = validation.validateScript(updatedScript);
        
        if (validationError) {
            notifications.error(validationError);
            return false;
        }

        scripts[index] = updatedScript;

        if (storage.saveScripts(scripts)) {
            notifications.success('Script updated successfully');
            return true;
        } else {
            notifications.error('Failed to update script');
            return false;
        }
    },

    // Delete script
    deleteScript: (id) => {
        const scripts = storage.loadScripts() || [];
        const filteredScripts = scripts.filter(s => s.id !== id);

        if (scripts.length === filteredScripts.length) {
            notifications.error('Script not found');
            return false;
        }

        if (storage.saveScripts(filteredScripts)) {
            notifications.success('Script deleted successfully');
            return true;
        } else {
            notifications.error('Failed to delete script');
            return false;
        }
    },

    // Get script by ID
    getScript: (id) => {
        const scripts = storage.loadScripts() || [];
        return scripts.find(s => s.id === id);
    },

    // Get all scripts
    getAllScripts: () => {
        return storage.loadScripts() || [];
    }
}; 