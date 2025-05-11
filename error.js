// Error Tracking and Logging Manager
class ErrorManager {
    constructor() {
        this.errors = [];
        this.maxErrors = 100;
        this.isInitialized = false;
        this.init();
    }

    init() {
        if (this.isInitialized) return;

        // Setup global error handlers
        window.addEventListener('error', (event) => {
            this.handleError(event.error || new Error(event.message), {
                type: 'uncaught',
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, {
                type: 'unhandledrejection'
            });
        });

        // Setup console overrides
        this.setupConsoleOverrides();

        this.isInitialized = true;
    }

    setupConsoleOverrides() {
        const originalConsole = {
            error: console.error,
            warn: console.warn,
            info: console.info,
            debug: console.debug
        };

        console.error = (...args) => {
            this.handleError(args[0], {
                type: 'console',
                level: 'error',
                args: args.slice(1)
            });
            originalConsole.error.apply(console, args);
        };

        console.warn = (...args) => {
            this.handleError(args[0], {
                type: 'console',
                level: 'warning',
                args: args.slice(1)
            });
            originalConsole.warn.apply(console, args);
        };

        console.info = (...args) => {
            this.log('info', args[0], args.slice(1));
            originalConsole.info.apply(console, args);
        };

        console.debug = (...args) => {
            this.log('debug', args[0], args.slice(1));
            originalConsole.debug.apply(console, args);
        };
    }

    handleError(error, context = {}) {
        const errorInfo = this.formatError(error, context);
        this.errors.push(errorInfo);

        // Trim errors array if it exceeds maxErrors
        if (this.errors.length > this.maxErrors) {
            this.errors.shift();
        }

        // Send error to server
        this.reportError(errorInfo);

        // Trigger error event
        const event = new CustomEvent('error:occurred', {
            detail: errorInfo
        });
        document.dispatchEvent(event);

        return errorInfo;
    }

    formatError(error, context) {
        const errorInfo = {
            timestamp: new Date().toISOString(),
            message: error.message || 'Unknown error',
            stack: error.stack,
            type: context.type || 'unknown',
            level: context.level || 'error',
            context: {
                ...context,
                url: window.location.href,
                userAgent: navigator.userAgent,
                language: navigator.language,
                platform: navigator.platform,
                screenSize: {
                    width: window.innerWidth,
                    height: window.innerHeight
                },
                viewport: {
                    width: document.documentElement.clientWidth,
                    height: document.documentElement.clientHeight
                }
            }
        };

        // Add additional context if available
        if (authManager.isAuthenticated()) {
            errorInfo.context.user = {
                id: authManager.getUser().id,
                email: authManager.getUser().email
            };
        }

        return errorInfo;
    }

    async reportError(errorInfo) {
        try {
            await apiManager.post('/api/errors', errorInfo);
        } catch (error) {
            console.error('Failed to report error:', error);
        }
    }

    log(level, message, args = []) {
        const logInfo = {
            timestamp: new Date().toISOString(),
            level,
            message,
            args,
            context: {
                url: window.location.href,
                userAgent: navigator.userAgent
            }
        };

        // Store log in storage
        const logs = storageManager.get('app_logs', []);
        logs.push(logInfo);
        storageManager.set('app_logs', logs);

        return logInfo;
    }

    getErrors() {
        return [...this.errors];
    }

    clearErrors() {
        this.errors = [];
    }

    getLogs() {
        return storageManager.get('app_logs', []);
    }

    clearLogs() {
        storageManager.remove('app_logs');
    }

    // Utility method to check if an error is a network error
    isNetworkError(error) {
        return error instanceof TypeError && error.message.includes('fetch');
    }

    // Utility method to check if an error is a timeout
    isTimeoutError(error) {
        return error instanceof TypeError && error.message.includes('timeout');
    }

    // Utility method to check if an error is a validation error
    isValidationError(error) {
        return error.name === 'ValidationError';
    }

    // Utility method to check if an error is an authentication error
    isAuthError(error) {
        return error.status === 401 || error.status === 403;
    }

    // Utility method to get error count by type
    getErrorCountByType() {
        const counts = {};
        this.errors.forEach(error => {
            counts[error.type] = (counts[error.type] || 0) + 1;
        });
        return counts;
    }

    // Utility method to get error count by level
    getErrorCountByLevel() {
        const counts = {};
        this.errors.forEach(error => {
            counts[error.level] = (counts[error.level] || 0) + 1;
        });
        return counts;
    }

    // Utility method to get recent errors
    getRecentErrors(count = 10) {
        return this.errors.slice(-count);
    }

    // Utility method to get error rate
    getErrorRate(timeWindow = 3600000) { // 1 hour in milliseconds
        const now = Date.now();
        const recentErrors = this.errors.filter(error => {
            const errorTime = new Date(error.timestamp).getTime();
            return now - errorTime < timeWindow;
        });
        return recentErrors.length / (timeWindow / 3600000); // errors per hour
    }
}

// Initialize error manager
const errorManager = new ErrorManager(); 