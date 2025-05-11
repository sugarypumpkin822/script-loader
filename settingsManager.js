// Settings manager
const settingsManager = {
    // Default settings
    defaultSettings: {
        // Display settings
        display: {
            showScriptCount: true,
            showExecutorCount: true,
            showGameCount: true,
            showCreationDate: true,
            showLastModified: true,
            showScriptPreview: true,
            previewLength: 200,
            maxRecentSearches: 10,
            maxRecentScripts: 5
        },
        // Search settings
        search: {
            searchDelay: 300,
            minSearchLength: 2,
            searchInTitle: true,
            searchInDescription: true,
            searchInCode: false,
            searchInGame: true,
            searchInExecutors: true,
            caseSensitive: false
        },
        // Code settings
        code: {
            syntaxHighlighting: true,
            lineNumbers: true,
            wordWrap: true,
            fontSize: 14,
            fontFamily: 'monospace',
            tabSize: 4,
            autoIndent: true
        },
        // Notification settings
        notifications: {
            enabled: true,
            duration: 5000,
            position: 'top-right',
            sound: false,
            desktop: false
        },
        // Export settings
        export: {
            defaultFormat: 'json',
            includeMetadata: true,
            includeCreationDate: true,
            includeLastModified: true,
            compressOutput: false
        },
        // Import settings
        import: {
            validateOnImport: true,
            overwriteExisting: false,
            createBackup: true,
            maxFileSize: 10485760 // 10MB
        },
        // Backup settings
        backup: {
            autoBackup: true,
            backupInterval: 3600000, // 1 hour
            maxBackups: 10,
            backupLocation: 'local'
        },
        // Security settings
        security: {
            requireConfirmation: true,
            confirmDelete: true,
            confirmUpdate: true,
            confirmImport: true,
            confirmExport: true,
            encryptBackups: false
        },
        // Performance settings
        performance: {
            lazyLoad: true,
            cacheResults: true,
            maxCachedResults: 100,
            debounceSearch: true,
            throttleUpdates: true
        },
        // UI settings
        ui: {
            compactMode: false,
            showTooltips: true,
            showShortcuts: true,
            showStatusBar: true,
            showSidebar: true,
            sidebarWidth: 250,
            sidebarPosition: 'left',
            showBreadcrumbs: true,
            showTags: true,
            showCategories: true
        }
    },

    // Current settings
    currentSettings: {},

    // Initialize settings
    init: () => {
        const savedSettings = storage.loadSettings();
        settingsManager.currentSettings = savedSettings || settingsManager.defaultSettings;
        settingsManager.applySettings();
    },

    // Save settings
    saveSettings: (settings) => {
        try {
            storage.saveSettings(settings);
            settingsManager.currentSettings = settings;
            settingsManager.applySettings();
            notifications.success('Settings saved successfully');
            return true;
        } catch (error) {
            console.error('Error saving settings:', error);
            notifications.error('Failed to save settings');
            return false;
        }
    },

    // Load settings
    loadSettings: () => {
        return settingsManager.currentSettings;
    },

    // Reset settings to default
    resetSettings: () => {
        settingsManager.currentSettings = settingsManager.defaultSettings;
        settingsManager.applySettings();
        notifications.success('Settings reset to default');
    },

    // Update specific setting
    updateSetting: (category, key, value) => {
        if (!settingsManager.currentSettings[category]) {
            settingsManager.currentSettings[category] = {};
        }
        settingsManager.currentSettings[category][key] = value;
        settingsManager.applySettings();
    },

    // Apply settings
    applySettings: () => {
        const settings = settingsManager.currentSettings;

        // Apply display settings
        document.documentElement.style.setProperty('--preview-length', `${settings.display.previewLength}px`);
        document.documentElement.style.setProperty('--font-size', `${settings.code.fontSize}px`);
        document.documentElement.style.setProperty('--font-family', settings.code.fontFamily);
        document.documentElement.style.setProperty('--sidebar-width', `${settings.ui.sidebarWidth}px`);

        // Apply UI settings
        document.body.classList.toggle('compact-mode', settings.ui.compactMode);
        document.body.classList.toggle('show-tooltips', settings.ui.showTooltips);
        document.body.classList.toggle('show-sidebar', settings.ui.showSidebar);
        document.body.classList.toggle('sidebar-right', settings.ui.sidebarPosition === 'right');

        // Apply code settings
        const codeBlocks = document.querySelectorAll('pre code');
        codeBlocks.forEach(block => {
            block.classList.toggle('line-numbers', settings.code.lineNumbers);
            block.classList.toggle('word-wrap', settings.code.wordWrap);
            block.style.tabSize = settings.code.tabSize;
        });

        // Update notification settings
        notifications.setDuration(settings.notifications.duration);
        notifications.setPosition(settings.notifications.position);
        notifications.setEnabled(settings.notifications.enabled);

        // Trigger settings change event
        const event = new CustomEvent('settingsChanged', { detail: settings });
        document.dispatchEvent(event);
    }
}; 