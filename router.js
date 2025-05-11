// Router and Navigation Manager
class Router {
    constructor() {
        this.routes = new Map();
        this.currentRoute = null;
        this.params = {};
        this.query = {};
        this.history = [];
        this.maxHistoryLength = 50;
        this.init();
    }

    init() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (event) => {
            this.handleRoute(window.location.pathname, false);
        });

        // Handle initial route
        this.handleRoute(window.location.pathname, false);

        // Setup link click handler
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (link && link.getAttribute('href').startsWith('/')) {
                event.preventDefault();
                this.navigate(link.getAttribute('href'));
            }
        });
    }

    addRoute(path, handler, options = {}) {
        const route = {
            path,
            handler,
            options: {
                requiresAuth: false,
                roles: [],
                permissions: [],
                ...options
            }
        };

        this.routes.set(path, route);
        return this;
    }

    async handleRoute(path, pushState = true) {
        // Parse query parameters
        const [pathname, search] = path.split('?');
        this.query = search ? this.parseQueryString(search) : {};

        // Find matching route
        const route = this.findMatchingRoute(pathname);
        if (!route) {
            this.handleNotFound();
            return;
        }

        // Check authentication
        if (route.options.requiresAuth && !authManager.isAuthenticated()) {
            this.navigate('/login', { redirect: path });
            return;
        }

        // Check roles
        if (route.options.roles.length > 0) {
            const hasRole = route.options.roles.some(role => authManager.hasRole(role));
            if (!hasRole) {
                this.handleUnauthorized();
                return;
            }
        }

        // Check permissions
        if (route.options.permissions.length > 0) {
            const hasPermission = route.options.permissions.some(
                permission => authManager.hasPermission(permission)
            );
            if (!hasPermission) {
                this.handleUnauthorized();
                return;
            }
        }

        // Update current route
        this.currentRoute = route;
        
        // Update browser history
        if (pushState) {
            window.history.pushState(null, '', path);
            this.addToHistory(path);
        }

        // Trigger route change event
        const event = new CustomEvent('route:change', {
            detail: { route, params: this.params, query: this.query }
        });
        document.dispatchEvent(event);

        // Execute route handler
        try {
            await route.handler(this.params, this.query);
        } catch (error) {
            console.error('Route handler error:', error);
            this.handleError(error);
        }
    }

    findMatchingRoute(pathname) {
        for (const [routePath, route] of this.routes) {
            const pattern = this.pathToPattern(routePath);
            const match = pathname.match(pattern);
            
            if (match) {
                // Extract route parameters
                this.params = {};
                const paramNames = this.getParamNames(routePath);
                paramNames.forEach((name, index) => {
                    this.params[name] = match[index + 1];
                });
                
                return route;
            }
        }
        return null;
    }

    pathToPattern(path) {
        return new RegExp(
            '^' + path.replace(/:[^/]+/g, '([^/]+)') + '$'
        );
    }

    getParamNames(path) {
        const matches = path.match(/:[^/]+/g) || [];
        return matches.map(param => param.slice(1));
    }

    parseQueryString(query) {
        const params = {};
        new URLSearchParams(query).forEach((value, key) => {
            params[key] = value;
        });
        return params;
    }

    navigate(path, options = {}) {
        const { replace = false } = options;
        
        if (replace) {
            window.history.replaceState(null, '', path);
        }
        
        this.handleRoute(path, !replace);
    }

    goBack() {
        window.history.back();
    }

    goForward() {
        window.history.forward();
    }

    addToHistory(path) {
        this.history.push(path);
        if (this.history.length > this.maxHistoryLength) {
            this.history.shift();
        }
    }

    getHistory() {
        return [...this.history];
    }

    clearHistory() {
        this.history = [];
    }

    async handleNotFound() {
        const notFoundRoute = this.routes.get('/404');
        if (notFoundRoute) {
            await notFoundRoute.handler();
        } else {
            console.error('404 route not found');
        }
    }

    async handleUnauthorized() {
        const unauthorizedRoute = this.routes.get('/403');
        if (unauthorizedRoute) {
            await unauthorizedRoute.handler();
        } else {
            console.error('403 route not found');
        }
    }

    async handleError(error) {
        const errorRoute = this.routes.get('/500');
        if (errorRoute) {
            await errorRoute.handler(error);
        } else {
            console.error('500 route not found');
        }
    }

    getCurrentRoute() {
        return this.currentRoute;
    }

    getParams() {
        return { ...this.params };
    }

    getQuery() {
        return { ...this.query };
    }

    // Utility method to generate URL with parameters
    generateUrl(path, params = {}) {
        let url = path;
        
        // Replace path parameters
        Object.entries(params).forEach(([key, value]) => {
            url = url.replace(`:${key}`, value);
        });

        return url;
    }
}

// Initialize router
const router = new Router();

// Add default routes
router
    .addRoute('/404', () => {
        document.title = 'Page Not Found';
        // Handle 404 page
    })
    .addRoute('/403', () => {
        document.title = 'Access Denied';
        // Handle 403 page
    })
    .addRoute('/500', (error) => {
        document.title = 'Server Error';
        // Handle 500 page
    }); 