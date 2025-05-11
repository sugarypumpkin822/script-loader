// Data Storage Management
class DataStorage {
    constructor() {
        this.storageKey = 'scriptblox_data';
        this.lastScanKey = 'scriptblox_last_scan';
        this.scanInterval = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    }

    async saveScannedData(scripts) {
        try {
            const data = {
                scripts: scripts,
                timestamp: Date.now(),
                version: '1.0'
            };
            
            // Save to localStorage
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            
            // Save to file
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `scriptblox_data_${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(a.href);

            return true;
        } catch (error) {
            console.error('Error saving scanned data:', error);
            return false;
        }
    }

    async loadStoredData() {
        try {
            const storedData = localStorage.getItem(this.storageKey);
            if (!storedData) return null;
            
            return JSON.parse(storedData);
        } catch (error) {
            console.error('Error loading stored data:', error);
            return null;
        }
    }

    shouldScanAgain() {
        const lastScan = localStorage.getItem(this.lastScanKey);
        if (!lastScan) return true;
        
        const timeSinceLastScan = Date.now() - parseInt(lastScan);
        return timeSinceLastScan >= this.scanInterval;
    }

    updateLastScanTime() {
        localStorage.setItem(this.lastScanKey, Date.now().toString());
    }

    async importDataFromFile(file) {
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            
            // Validate data structure
            if (!data.scripts || !Array.isArray(data.scripts)) {
                throw new Error('Invalid data format');
            }
            
            // Save to localStorage
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }

    getStoredScripts() {
        const data = this.loadStoredData();
        return data ? data.scripts : [];
    }
}

// Initialize the storage
const dataStorage = new DataStorage();

// Export for use in other files
window.dataStorage = dataStorage; 