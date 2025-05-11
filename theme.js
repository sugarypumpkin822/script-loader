// Theme manager
const theme = {
    // Available themes
    themes: {
        dark: {
            background: '#1a1a1a',
            text: '#ffffff',
            primary: '#ff4d4d',
            secondary: '#2a2a2a',
            accent: '#4dff4d'
        },
        light: {
            background: '#ffffff',
            text: '#1a1a1a',
            primary: '#ff4d4d',
            secondary: '#f0f0f0',
            accent: '#4dff4d'
        },
        blue: {
            background: '#1a1a2e',
            text: '#ffffff',
            primary: '#4d4dff',
            secondary: '#2a2a4a',
            accent: '#4dff4d'
        }
    },

    // Current theme
    current: 'dark',

    // Apply theme
    apply: (themeName) => {
        const selectedTheme = theme.themes[themeName];
        if (!selectedTheme) return;

        document.documentElement.style.setProperty('--background-color', selectedTheme.background);
        document.documentElement.style.setProperty('--text-color', selectedTheme.text);
        document.documentElement.style.setProperty('--primary-color', selectedTheme.primary);
        document.documentElement.style.setProperty('--secondary-color', selectedTheme.secondary);
        document.documentElement.style.setProperty('--accent-color', selectedTheme.accent);

        theme.current = themeName;
        storage.savePreferences({ theme: themeName });
    },

    // Initialize theme
    init: () => {
        const preferences = storage.loadPreferences();
        if (preferences && preferences.theme) {
            theme.apply(preferences.theme);
        } else {
            theme.apply('dark');
        }
    }
}; 