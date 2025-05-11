document.addEventListener('DOMContentLoaded', async () => {
    // Show loading state
    const scriptList = document.getElementById('scriptList');
    scriptList.innerHTML = '<div class="loading">Loading scripts...</div>';

    try {
        // Initial load of scripts
        const initialScripts = await scriptManager.fetchScripts(1);
        if (initialScripts.length > 0) {
            uiHandler.displayScripts(initialScripts);
        } else {
            scriptList.innerHTML = '<div class="error">No scripts found. Please try again later.</div>';
        }

        // Load more scripts in the background
        for (let i = 2; i <= 20; i++) { // Load 20 pages (400 scripts)
            await scriptManager.fetchScripts(i);
            uiHandler.appendScripts(scriptManager.scripts.slice(-20)); // Show last 20 scripts
        }
    } catch (error) {
        console.error('Error initializing scripts:', error);
        scriptList.innerHTML = '<div class="error">Failed to load scripts. Please refresh the page.</div>';
    }
}); 