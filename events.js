// Event Listeners
searchButton.addEventListener('click', searchScripts);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchScripts();
    }
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

copyButton.addEventListener('click', copyToClipboard);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Initial display
displayScripts();

// Game scanning functionality
document.getElementById('scanGamesButton').addEventListener('click', async () => {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    try {
        // Show loading state
        const scanButton = document.getElementById('scanGamesButton');
        const originalText = scanButton.innerHTML;
        scanButton.innerHTML = '<svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Scanning...';
        scanButton.disabled = true;

        // Fetch games based on search query or get popular games if no query
        const games = query 
            ? await robloxAPI.searchGames(query)
            : await robloxAPI.getPopularGames();

        // Update the game filter dropdown
        const gameFilter = document.getElementById('gameFilter');
        gameFilter.innerHTML = '<option value="">All Games</option>';
        
        games.forEach(game => {
            const option = document.createElement('option');
            option.value = game.id;
            option.textContent = game.name;
            gameFilter.appendChild(option);
        });

        // Show success message
        const scriptList = document.getElementById('scriptList');
        scriptList.innerHTML = `<div class="success-message">Found ${games.length} games. Select a game from the dropdown to view available scripts.</div>`;

    } catch (error) {
        console.error('Error scanning games:', error);
        const scriptList = document.getElementById('scriptList');
        scriptList.innerHTML = '<div class="error-message">Failed to scan games. Please try again later.</div>';
    } finally {
        // Reset button state
        const scanButton = document.getElementById('scanGamesButton');
        scanButton.innerHTML = originalText;
        scanButton.disabled = false;
    }
});

// Add event listener for game filter changes
document.getElementById('gameFilter').addEventListener('change', async (event) => {
    const gameId = event.target.value;
    if (!gameId) return;

    try {
        const gameDetails = await robloxAPI.getGameDetails(gameId);
        if (gameDetails) {
            // Update the script list with game-specific scripts
            const scriptList = document.getElementById('scriptList');
            scriptList.innerHTML = `<div class="game-info">
                <h2>${gameDetails.name}</h2>
                <p>${gameDetails.description || 'No description available'}</p>
                <p>Playing: ${gameDetails.playing || 0}</p>
            </div>`;
            
            // Here you would typically load scripts specific to this game
            // This would integrate with your existing script loading system
        }
    } catch (error) {
        console.error('Error loading game details:', error);
    }
});

// Data import/export functionality
document.getElementById('importButton').addEventListener('click', () => {
    document.getElementById('importData').click();
});

document.getElementById('importData').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const success = await dataStorage.importDataFromFile(file);
        if (success) {
            // Refresh the script list with imported data
            const scripts = dataStorage.getStoredScripts();
            displayScripts(scripts);
            showNotification('Data imported successfully!', 'success');
        } else {
            showNotification('Failed to import data. Invalid file format.', 'error');
        }
    } catch (error) {
        console.error('Error importing data:', error);
        showNotification('Error importing data. Please try again.', 'error');
    }
});

document.getElementById('exportButton').addEventListener('click', async () => {
    const scripts = dataStorage.getStoredScripts();
    if (scripts.length === 0) {
        showNotification('No data to export.', 'warning');
        return;
    }

    try {
        await dataStorage.saveScannedData(scripts);
        showNotification('Data exported successfully!', 'success');
    } catch (error) {
        console.error('Error exporting data:', error);
        showNotification('Error exporting data. Please try again.', 'error');
    }
});

// Update script scanning to use data storage
document.getElementById('scanScriptsButton').addEventListener('click', async () => {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    
    try {
        // Show loading state
        const scanButton = document.getElementById('scanScriptsButton');
        const originalText = scanButton.innerHTML;
        scanButton.innerHTML = '<svg class="animate-spin" width="20" height="20" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Scanning...';
        scanButton.disabled = true;

        // Check if we should use stored data
        if (!dataStorage.shouldScanAgain() && !query) {
            const storedScripts = dataStorage.getStoredScripts();
            if (storedScripts.length > 0) {
                displayScripts(storedScripts);
                showNotification('Using cached data. Click scan again to refresh.', 'info');
                return;
            }
        }

        // Fetch scripts based on search query or get latest scripts if no query
        const scripts = query 
            ? await scriptbloxAPI.searchScripts(query)
            : await scriptbloxAPI.getLatestScripts();

        // Save the scanned data
        if (!query) {
            await dataStorage.saveScannedData(scripts);
            dataStorage.updateLastScanTime();
        }

        // Display the scripts
        displayScripts(scripts);

    } catch (error) {
        console.error('Error scanning scripts:', error);
        showNotification('Failed to scan scripts. Please try again later.', 'error');
    } finally {
        // Reset button state
        const scanButton = document.getElementById('scanScriptsButton');
        scanButton.innerHTML = originalText;
        scanButton.disabled = false;
    }
});

// Filter event listeners
document.getElementById('categoryFilter').addEventListener('change', (e) => {
    scriptCategories.updateFilter('category', e.target.value);
    const scripts = dataStorage.getStoredScripts();
    const filteredScripts = scriptCategories.filterScripts(scripts);
    displayScripts(filteredScripts);
});

document.getElementById('verifiedFilter').addEventListener('change', (e) => {
    scriptCategories.updateFilter('verified', e.target.checked);
    const scripts = dataStorage.getStoredScripts();
    const filteredScripts = scriptCategories.filterScripts(scripts);
    displayScripts(filteredScripts);
});

document.getElementById('premiumFilter').addEventListener('change', (e) => {
    scriptCategories.updateFilter('premium', e.target.checked);
    const scripts = dataStorage.getStoredScripts();
    const filteredScripts = scriptCategories.filterScripts(scripts);
    displayScripts(filteredScripts);
});

document.getElementById('patchedFilter').addEventListener('change', (e) => {
    scriptCategories.updateFilter('patched', e.target.checked);
    const scripts = dataStorage.getStoredScripts();
    const filteredScripts = scriptCategories.filterScripts(scripts);
    displayScripts(filteredScripts);
});

// Update displayScripts function to include comparison functionality
function displayScripts(scripts) {
    const scriptList = document.getElementById('scriptList');
    if (scripts.length === 0) {
        scriptList.innerHTML = '<div class="error-message">No scripts found. Try a different search term.</div>';
        return;
    }

    scriptList.innerHTML = scripts.map(script => `
        <div class="script-card" data-script-id="${script.id}">
            <div class="script-header">
                <div class="script-title">${script.title}</div>
                <div class="script-badges">
                    ${script.verified ? '<span class="badge verified">Verified</span>' : ''}
                    ${script.premium ? '<span class="badge premium">Premium</span>' : ''}
                    ${script.patched ? '<span class="badge patched">Patched</span>' : ''}
                </div>
            </div>
            <div class="script-description">${script.description || 'No description available'}</div>
            <div class="script-meta">
                <div class="script-stats">
                    <span>👥 ${script.views || 0} views</span>
                    <span>⭐ ${script.rating || 0}</span>
                </div>
                <div class="script-tags">
                    ${script.tags ? script.tags.map(tag => `<span class="script-tag">${tag}</span>`).join('') : ''}
                </div>
            </div>
            <div class="script-footer">
                <button class="compare-btn" data-script-id="${script.id}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                    </svg>
                    Compare
                </button>
                <span class="last-tested">Last tested: ${script.lastTested || 'Unknown'}</span>
            </div>
        </div>
    `).join('');

    // Add click handlers for script cards
    document.querySelectorAll('.script-card').forEach(card => {
        card.addEventListener('click', async (e) => {
            // Don't open modal if clicking compare button
            if (e.target.closest('.compare-btn')) {
                e.stopPropagation();
                const scriptId = e.target.closest('.compare-btn').dataset.scriptId;
                const script = scripts.find(s => s.id === scriptId);
                if (script) {
                    scriptComparison.addToComparison(script);
                    showNotification('Script added to comparison', 'success');
                }
                return;
            }

            const scriptId = card.dataset.scriptId;
            try {
                const scriptDetails = await scriptbloxAPI.getScriptDetails(scriptId);
                if (scriptDetails) {
                    // Update modal with script details
                    document.getElementById('modalTitle').textContent = scriptDetails.title;
                    document.getElementById('modalCode').textContent = scriptDetails.code;
                    document.getElementById('modalGame').textContent = scriptDetails.game || 'Unknown Game';
                    
                    // Show executors if available
                    const executorsDiv = document.getElementById('modalExecutors');
                    executorsDiv.innerHTML = scriptDetails.executors 
                        ? scriptDetails.executors.map(exec => `<span class="executor-badge">${exec}</span>`).join('')
                        : '';

                    // Show the modal
                    document.getElementById('scriptModal').style.display = 'block';
                }
            } catch (error) {
                console.error('Error loading script details:', error);
                showNotification('Error loading script details. Please try again.', 'error');
            }
        });
    });
}

// Helper function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    const container = document.querySelector('.notification-container') || (() => {
        const container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
        return container;
    })();

    container.appendChild(notification);

    // Add close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    });

    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
} 