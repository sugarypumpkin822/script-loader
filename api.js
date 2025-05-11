// API Request Handler
class ApiManager {
    constructor() {
        this.baseUrl = '/api';
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        this.setupInterceptors();
    }

    setupInterceptors() {
        // Add auth token to requests if available
        this.addRequestInterceptor((config) => {
            const token = localStorage.getItem('auth_token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        });

        // Handle response errors
        this.addResponseInterceptor((response) => {
            if (response.status === 401) {
                // Handle unauthorized access
                localStorage.removeItem('auth_token');
                window.location.href = '/login';
            }
            return response;
        });
    }

    addRequestInterceptor(interceptor) {
        this.requestInterceptor = interceptor;
    }

    addResponseInterceptor(interceptor) {
        this.responseInterceptor = interceptor;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const config = {
            ...options,
            headers: {
                ...this.defaultHeaders,
                ...options.headers
            }
        };

        // Apply request interceptor
        if (this.requestInterceptor) {
            Object.assign(config, this.requestInterceptor(config));
        }

        try {
            const response = await fetch(url, config);
            
            // Apply response interceptor
            if (this.responseInterceptor) {
                return this.responseInterceptor(response);
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // HTTP Methods
    async get(endpoint, params = {}) {
        const queryString = new URLSearchParams(params).toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;
        return this.request(url, { method: 'GET' });
    }

    async post(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async put(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async patch(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }

    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }

    // File Upload
    async uploadFile(endpoint, file, onProgress = null) {
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        
        return new Promise((resolve, reject) => {
            xhr.upload.addEventListener('progress', (event) => {
                if (onProgress && event.lengthComputable) {
                    const progress = (event.loaded / event.total) * 100;
                    onProgress(progress);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(new Error(`Upload failed with status ${xhr.status}`));
                }
            });

            xhr.addEventListener('error', () => {
                reject(new Error('Upload failed'));
            });

            xhr.open('POST', `${this.baseUrl}${endpoint}`);
            
            // Add auth token if available
            const token = localStorage.getItem('auth_token');
            if (token) {
                xhr.setRequestHeader('Authorization', `Bearer ${token}`);
            }

            xhr.send(formData);
        });
    }

    // WebSocket Connection
    connectWebSocket(endpoint, handlers = {}) {
        const ws = new WebSocket(`${this.baseUrl.replace('http', 'ws')}${endpoint}`);
        
        ws.onopen = () => {
            if (handlers.onOpen) handlers.onOpen();
        };

        ws.onmessage = (event) => {
            if (handlers.onMessage) {
                const data = JSON.parse(event.data);
                handlers.onMessage(data);
            }
        };

        ws.onerror = (error) => {
            if (handlers.onError) handlers.onError(error);
        };

        ws.onclose = () => {
            if (handlers.onClose) handlers.onClose();
        };

        return ws;
    }

    // Cache Management
    setCache(key, data, ttl = 3600) {
        const item = {
            data,
            timestamp: Date.now(),
            ttl: ttl * 1000
        };
        localStorage.setItem(key, JSON.stringify(item));
    }

    getCache(key) {
        const item = localStorage.getItem(key);
        if (!item) return null;

        const { data, timestamp, ttl } = JSON.parse(item);
        if (Date.now() - timestamp > ttl) {
            localStorage.removeItem(key);
            return null;
        }

        return data;
    }

    clearCache(key) {
        if (key) {
            localStorage.removeItem(key);
        } else {
            // Clear all API cache
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('api_cache_')) {
                    localStorage.removeItem(key);
                }
            });
        }
    }
}

// Initialize API manager
const apiManager = new ApiManager(); 