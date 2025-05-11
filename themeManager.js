// Theme manager
const themeManager = {
    // Available themes
    themes: {
        light: {
            background: '#ffffff',
            text: '#333333',
            primary: '#4a90e2',
            secondary: '#f5f5f5',
            accent: '#e74c3c',
            border: '#dddddd'
        },
        dark: {
            background: '#1a1a1a',
            text: '#ffffff',
            primary: '#4a90e2',
            secondary: '#2d2d2d',
            accent: '#e74c3c',
            border: '#404040'
        }
    },

    // Current theme
    currentTheme: 'light',

    // Initialize theme
    init: () => {
        const savedTheme = storage.loadTheme();
        themeManager.setTheme(savedTheme);
    },

    // Set theme
    setTheme: (theme) => {
        if (!themeManager.themes[theme]) {
            console.error('Invalid theme:', theme);
            return false;
        }

        themeManager.currentTheme = theme;
        const colors = themeManager.themes[theme];

        // Update CSS variables
        document.documentElement.style.setProperty('--background-color', colors.background);
        document.documentElement.style.setProperty('--text-color', colors.text);
        document.documentElement.style.setProperty('--primary-color', colors.primary);
        document.documentElement.style.setProperty('--secondary-color', colors.secondary);
        document.documentElement.style.setProperty('--accent-color', colors.accent);
        document.documentElement.style.setProperty('--border-color', colors.border);

        // Save theme preference
        storage.saveTheme(theme);

        // Update theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
        }

        return true;
    },

    // Toggle theme
    toggleTheme: () => {
        const newTheme = themeManager.currentTheme === 'light' ? 'dark' : 'light';
        return themeManager.setTheme(newTheme);
    },

    // Get current theme
    getCurrentTheme: () => {
        return themeManager.currentTheme;
    }
}; 