// Storage and Cache Manager
class StorageManager {
    constructor() {
        this.storage = window.localStorage;
        this.sessionStorage = window.sessionStorage;
        this.cache = new Map();
        this.cacheExpiry = new Map();
        this.defaultTTL = 3600; // 1 hour in seconds
    }

    // Local Storage Methods
    set(key, value) {
        try {
            const serialized = JSON.stringify(value);
            this.storage.setItem(key, serialized);
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    }

    get(key, defaultValue = null) {
        try {
            const serialized = this.storage.getItem(key);
            return serialized ? JSON.parse(serialized) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    }

    remove(key) {
        try {
            this.storage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }

    clear() {
        try {
            this.storage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }

    // Session Storage Methods
    setSession(key, value) {
        try {
            const serialized = JSON.stringify(value);
            this.sessionStorage.setItem(key, serialized);
            return true;
        } catch (error) {
            console.error('Error saving to sessionStorage:', error);
            return false;
        }
    }

    getSession(key, defaultValue = null) {
        try {
            const serialized = this.sessionStorage.getItem(key);
            return serialized ? JSON.parse(serialized) : defaultValue;
        } catch (error) {
            console.error('Error reading from sessionStorage:', error);
            return defaultValue;
        }
    }

    removeSession(key) {
        try {
            this.sessionStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from sessionStorage:', error);
            return false;
        }
    }

    clearSession() {
        try {
            this.sessionStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing sessionStorage:', error);
            return false;
        }
    }

    // Cache Methods
    setCache(key, value, ttl = this.defaultTTL) {
        this.cache.set(key, value);
        this.cacheExpiry.set(key, Date.now() + (ttl * 1000));
    }

    getCache(key, defaultValue = null) {
        if (!this.cache.has(key)) {
            return defaultValue;
        }

        const expiry = this.cacheExpiry.get(key);
        if (Date.now() > expiry) {
            this.cache.delete(key);
            this.cacheExpiry.delete(key);
            return defaultValue;
        }

        return this.cache.get(key);
    }

    removeCache(key) {
        this.cache.delete(key);
        this.cacheExpiry.delete(key);
    }

    clearCache() {
        this.cache.clear();
        this.cacheExpiry.clear();
    }

    // Cookie Methods
    setCookie(name, value, options = {}) {
        const {
            expires = 7, // days
            path = '/',
            domain = '',
            secure = false,
            sameSite = 'Lax'
        } = options;

        let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

        if (expires) {
            const date = new Date();
            date.setTime(date.getTime() + (expires * 24 * 60 * 60 * 1000));
            cookie += `; expires=${date.toUTCString()}`;
        }

        if (path) cookie += `; path=${path}`;
        if (domain) cookie += `; domain=${domain}`;
        if (secure) cookie += '; secure';
        if (sameSite) cookie += `; samesite=${sameSite}`;

        document.cookie = cookie;
    }

    getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
            if (cookieName === name) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    }

    removeCookie(name, options = {}) {
        this.setCookie(name, '', { ...options, expires: -1 });
    }

    // IndexedDB Methods
    async initDB(dbName, version = 1) {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(dbName, version);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                // Create object stores here
            };
        });
    }

    async addToStore(dbName, storeName, data) {
        const db = await this.initDB(dbName);
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getFromStore(dbName, storeName, key) {
        const db = await this.initDB(dbName);
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async updateStore(dbName, storeName, data) {
        const db = await this.initDB(dbName);
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async deleteFromStore(dbName, storeName, key) {
        const db = await this.initDB(dbName);
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    // Utility Methods
    getStorageSize() {
        let total = 0;
        for (let key in this.storage) {
            if (this.storage.hasOwnProperty(key)) {
                total += this.storage[key].length;
            }
        }
        return total;
    }

    getSessionStorageSize() {
        let total = 0;
        for (let key in this.sessionStorage) {
            if (this.sessionStorage.hasOwnProperty(key)) {
                total += this.sessionStorage[key].length;
            }
        }
        return total;
    }

    getCacheSize() {
        let total = 0;
        for (let [key, value] of this.cache) {
            total += JSON.stringify(value).length;
        }
        return total;
    }

    // Event Handlers
    setupStorageEventHandlers() {
        window.addEventListener('storage', (event) => {
            if (event.storageArea === this.storage) {
                // Handle localStorage changes
                const event = new CustomEvent('storage:change', {
                    detail: {
                        key: event.key,
                        oldValue: event.oldValue,
                        newValue: event.newValue,
                        url: event.url
                    }
                });
                document.dispatchEvent(event);
            }
        });
    }
}

// Initialize storage manager
const storageManager = new StorageManager(); 