// Settings component
const settingsComponent = {
    // Create settings panel
    createSettingsPanel: () => {
        const panel = document.createElement('div');
        panel.className = 'settings-panel';
        panel.innerHTML = `
            <div class="settings-header">
                <h2>Settings</h2>
                <button class="close-settings">&times;</button>
            </div>
            <div class="settings-content">
                <div class="settings-tabs">
                    <button class="tab-button active" data-tab="display">Display</button>
                    <button class="tab-button" data-tab="search">Search</button>
                    <button class="tab-button" data-tab="code">Code</button>
                    <button class="tab-button" data-tab="notifications">Notifications</button>
                    <button class="tab-button" data-tab="export">Export</button>
                    <button class="tab-button" data-tab="import">Import</button>
                    <button class="tab-button" data-tab="backup">Backup</button>
                    <button class="tab-button" data-tab="security">Security</button>
                    <button class="tab-button" data-tab="performance">Performance</button>
                    <button class="tab-button" data-tab="ui">UI</button>
                </div>
                <div class="settings-sections">
                    ${settingsComponent.createDisplaySection()}
                    ${settingsComponent.createSearchSection()}
                    ${settingsComponent.createCodeSection()}
                    ${settingsComponent.createNotificationsSection()}
                    ${settingsComponent.createExportSection()}
                    ${settingsComponent.createImportSection()}
                    ${settingsComponent.createBackupSection()}
                    ${settingsComponent.createSecuritySection()}
                    ${settingsComponent.createPerformanceSection()}
                    ${settingsComponent.createUISection()}
                </div>
            </div>
            <div class="settings-footer">
                <button class="reset-settings">Reset to Default</button>
                <button class="save-settings">Save Changes</button>
            </div>
        `;

        // Add event listeners
        settingsComponent.addEventListeners(panel);

        return panel;
    },

    // Create display settings section
    createDisplaySection: () => {
        const settings = settingsManager.loadSettings();
        return `
            <div class="settings-section" data-section="display">
                <h3>Display Settings</h3>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" name="showScriptCount" 
                            ${settings.display.showScriptCount ? 'checked' : ''}>
                        Show Script Count
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" name="showExecutorCount"
                            ${settings.display.showExecutorCount ? 'checked' : ''}>
                        Show Executor Count
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" name="showGameCount"
                            ${settings.display.showGameCount ? 'checked' : ''}>
                        Show Game Count
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" name="showCreationDate"
                            ${settings.display.showCreationDate ? 'checked' : ''}>
                        Show Creation Date
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" name="showLastModified"
                            ${settings.display.showLastModified ? 'checked' : ''}>
                        Show Last Modified
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" name="showScriptPreview"
                            ${settings.display.showScriptPreview ? 'checked' : ''}>
                        Show Script Preview
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        Preview Length:
                        <input type="number" name="previewLength" 
                            value="${settings.display.previewLength}" min="50" max="500">
                    </label>
                </div>
            </div>
        `;
    },

    // Create search settings section
    createSearchSection: () => {
        const settings = settingsManager.loadSettings();
        return `
            <div class="settings-section" data-section="search" style="display: none;">
                <h3>Search Settings</h3>
                <div class="setting-item">
                    <label>
                        Search Delay (ms):
                        <input type="number" name="searchDelay" 
                            value="${settings.search.searchDelay}" min="100" max="1000">
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        Minimum Search Length:
                        <input type="number" name="minSearchLength" 
                            value="${settings.search.minSearchLength}" min="1" max="10">
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" name="searchInTitle"
                            ${settings.search.searchInTitle ? 'checked' : ''}>
                        Search in Title
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" name="searchInDescription"
                            ${settings.search.searchInDescription ? 'checked' : ''}>
                        Search in Description
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" name="searchInCode"
                            ${settings.search.searchInCode ? 'checked' : ''}>
                        Search in Code
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" name="searchInGame"
                            ${settings.search.searchInGame ? 'checked' : ''}>
                        Search in Game
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" name="searchInExecutors"
                            ${settings.search.searchInExecutors ? 'checked' : ''}>
                        Search in Executors
                    </label>
                </div>
                <div class="setting-item">
                    <label>
                        <input type="checkbox" name="caseSensitive"
                            ${settings.search.caseSensitive ? 'checked' : ''}>
                        Case Sensitive Search
                    </label>
                </div>
            </div>
        `;
    },

    // Add event listeners
    addEventListeners: (panel) => {
        // Tab switching
        const tabButtons = panel.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tab = button.dataset.tab;
                settingsComponent.switchTab(panel, tab);
            });
        });

        // Close button
        const closeButton = panel.querySelector('.close-settings');
        closeButton.addEventListener('click', () => {
            panel.remove();
        });

        // Reset button
        const resetButton = panel.querySelector('.reset-settings');
        resetButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all settings to default?')) {
                settingsManager.resetSettings();
                settingsComponent.refreshSettings(panel);
            }
        });

        // Save button
        const saveButton = panel.querySelector('.save-settings');
        saveButton.addEventListener('click', () => {
            const settings = settingsComponent.collectSettings(panel);
            settingsManager.saveSettings(settings);
        });

        // Input changes
        const inputs = panel.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                const settings = settingsComponent.collectSettings(panel);
                settingsManager.updateSetting(
                    input.closest('.settings-section').dataset.section,
                    input.name,
                    input.type === 'checkbox' ? input.checked : input.value
                );
            });
        });
    },

    // Switch tab
    switchTab: (panel, tab) => {
        // Update active tab button
        const tabButtons = panel.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tab);
        });

        // Show selected section
        const sections = panel.querySelectorAll('.settings-section');
        sections.forEach(section => {
            section.style.display = section.dataset.section === tab ? 'block' : 'none';
        });
    },

    // Collect settings from form
    collectSettings: (panel) => {
        const settings = {};
        const sections = panel.querySelectorAll('.settings-section');
        
        sections.forEach(section => {
            const sectionName = section.dataset.section;
            settings[sectionName] = {};
            
            const inputs = section.querySelectorAll('input');
            inputs.forEach(input => {
                settings[sectionName][input.name] = input.type === 'checkbox' 
                    ? input.checked 
                    : input.value;
            });
        });

        return settings;
    },

    // Refresh settings display
    refreshSettings: (panel) => {
        const settings = settingsManager.loadSettings();
        const sections = panel.querySelectorAll('.settings-section');
        
        sections.forEach(section => {
            const sectionName = section.dataset.section;
            const inputs = section.querySelectorAll('input');
            
            inputs.forEach(input => {
                if (input.type === 'checkbox') {
                    input.checked = settings[sectionName][input.name];
                } else {
                    input.value = settings[sectionName][input.name];
                }
            });
        });
    }
}; 