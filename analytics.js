// Analytics and Tracking Manager
class AnalyticsManager {
    constructor() {
        this.events = [];
        this.maxEvents = 1000;
        this.isInitialized = false;
        this.trackingEnabled = true;
        this.init();
    }

    init() {
        if (this.isInitialized) return;

        // Load tracking preferences
        this.trackingEnabled = storageManager.get('analytics_enabled', true);

        // Setup event listeners
        this.setupEventListeners();

        // Setup performance monitoring
        this.setupPerformanceMonitoring();

        this.isInitialized = true;
    }

    setupEventListeners() {
        // Track page views
        window.addEventListener('popstate', () => {
            this.trackPageView();
        });

        // Track clicks
        document.addEventListener('click', (event) => {
            const target = event.target.closest('a, button, [role="button"]');
            if (target) {
                this.trackEvent('click', {
                    element: target.tagName.toLowerCase(),
                    id: target.id,
                    class: target.className,
                    text: target.textContent.trim(),
                    href: target.href
                });
            }
        });

        // Track form submissions
        document.addEventListener('submit', (event) => {
            const form = event.target;
            this.trackEvent('form_submit', {
                formId: form.id,
                formAction: form.action,
                formMethod: form.method
            });
        });

        // Track route changes
        document.addEventListener('route:change', (event) => {
            this.trackPageView(event.detail.route.path);
        });
    }

    setupPerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const timing = performance.timing;
            const metrics = {
                dns: timing.domainLookupEnd - timing.domainLookupStart,
                tcp: timing.connectEnd - timing.connectStart,
                request: timing.responseEnd - timing.requestStart,
                dom: timing.domComplete - timing.domLoading,
                load: timing.loadEventEnd - timing.navigationStart
            };

            this.trackEvent('performance', metrics);
        });

        // Monitor resource timing
        if (window.PerformanceObserver) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    if (entry.initiatorType === 'resource') {
                        this.trackEvent('resource_timing', {
                            name: entry.name,
                            type: entry.initiatorType,
                            duration: entry.duration,
                            size: entry.transferSize
                        });
                    }
                });
            });

            observer.observe({ entryTypes: ['resource'] });
        }
    }

    trackEvent(name, data = {}) {
        if (!this.trackingEnabled) return;

        const event = {
            name,
            data,
            timestamp: new Date().toISOString(),
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
        };

        // Add user information if available
        if (authManager.isAuthenticated()) {
            event.user = {
                id: authManager.getUser().id,
                email: authManager.getUser().email
            };
        }

        this.events.push(event);

        // Trim events array if it exceeds maxEvents
        if (this.events.length > this.maxEvents) {
            this.events.shift();
        }

        // Send event to server
        this.sendEvent(event);

        return event;
    }

    trackPageView(path = window.location.pathname) {
        this.trackEvent('page_view', {
            path,
            referrer: document.referrer,
            title: document.title
        });
    }

    async sendEvent(event) {
        try {
            await apiManager.post('/api/analytics', event);
        } catch (error) {
            console.error('Failed to send analytics event:', error);
        }
    }

    enableTracking() {
        this.trackingEnabled = true;
        storageManager.set('analytics_enabled', true);
    }

    disableTracking() {
        this.trackingEnabled = false;
        storageManager.set('analytics_enabled', false);
    }

    isTrackingEnabled() {
        return this.trackingEnabled;
    }

    getEvents() {
        return [...this.events];
    }

    clearEvents() {
        this.events = [];
    }

    // Utility methods for common tracking scenarios
    trackError(error) {
        this.trackEvent('error', {
            message: error.message,
            stack: error.stack,
            type: error.name
        });
    }

    trackSearch(query, results) {
        this.trackEvent('search', {
            query,
            resultsCount: results.length
        });
    }

    trackUserAction(action, data = {}) {
        this.trackEvent('user_action', {
            action,
            ...data
        });
    }

    trackFeatureUsage(feature, data = {}) {
        this.trackEvent('feature_usage', {
            feature,
            ...data
        });
    }

    // Analytics reporting methods
    getEventCountByType() {
        const counts = {};
        this.events.forEach(event => {
            counts[event.name] = (counts[event.name] || 0) + 1;
        });
        return counts;
    }

    getEventRate(timeWindow = 3600000) { // 1 hour in milliseconds
        const now = Date.now();
        const recentEvents = this.events.filter(event => {
            const eventTime = new Date(event.timestamp).getTime();
            return now - eventTime < timeWindow;
        });
        return recentEvents.length / (timeWindow / 3600000); // events per hour
    }

    getPopularPages(count = 10) {
        const pageViews = this.events.filter(event => event.name === 'page_view');
        const counts = {};
        pageViews.forEach(event => {
            counts[event.data.path] = (counts[event.data.path] || 0) + 1;
        });
        return Object.entries(counts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, count)
            .map(([path, count]) => ({ path, count }));
    }

    getAverageSessionDuration() {
        const sessions = this.getSessions();
        if (sessions.length === 0) return 0;

        const totalDuration = sessions.reduce((sum, session) => {
            return sum + (session.endTime - session.startTime);
        }, 0);

        return totalDuration / sessions.length;
    }

    getSessions() {
        const sessions = [];
        let currentSession = null;

        this.events.forEach(event => {
            const eventTime = new Date(event.timestamp).getTime();

            if (!currentSession || eventTime - currentSession.endTime > 1800000) { // 30 minutes
                if (currentSession) {
                    sessions.push(currentSession);
                }
                currentSession = {
                    startTime: eventTime,
                    endTime: eventTime,
                    events: [event]
                };
            } else {
                currentSession.endTime = eventTime;
                currentSession.events.push(event);
            }
        });

        if (currentSession) {
            sessions.push(currentSession);
        }

        return sessions;
    }
}

// Initialize analytics manager
const analyticsManager = new AnalyticsManager(); 