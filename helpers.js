// Helper utility
const helpers = {
    // Generate unique ID
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Format date
    formatDate: (date) => {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(date).toLocaleDateString(undefined, options);
    },

    // Truncate text
    truncateText: (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    },

    // Copy text to clipboard
    copyToClipboard: async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            return false;
        }
    },

    // Debounce function
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function
    throttle: (func, limit) => {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Sanitize HTML
    sanitizeHTML: (html) => {
        const temp = document.createElement('div');
        temp.textContent = html;
        return temp.innerHTML;
    },

    // Get file extension
    getFileExtension: (filename) => {
        return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
    },

    // Check if string is valid JSON
    isValidJSON: (str) => {
        try {
            JSON.parse(str);
            return true;
        } catch (error) {
            return false;
        }
    },

    // Get random color
    getRandomColor: () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

    // Format text to title case
    toTitleCase: (str) => {
        return str.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },

    // Format code with syntax highlighting
    formatCode: (code) => {
        // Basic syntax highlighting for Lua
        return code
            .replace(/(local|function|end|if|then|else|for|do|while|repeat|until|return|break)(\s|$)/g, '<span class="keyword">$1</span>$2')
            .replace(/(--.*$)/gm, '<span class="comment">$1</span>')
            .replace(/(["'])(.*?)\1/g, '<span class="string">$1$2$1</span>')
            .replace(/(\d+)/g, '<span class="number">$1</span>');
    }
}; 