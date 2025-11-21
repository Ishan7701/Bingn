// Storage management for BIN Generator
class StorageManager {
    constructor() {
        this.storageKey = 'binGeneratorData';
        this.historyKey = 'binGeneratorHistory';
        this.settingsKey = 'binGeneratorSettings';
        this.init();
    }

    init() {
        // Initialize storage if not exists
        if (!this.getData()) {
            this.setData({
                generatedCards: [],
                totalGenerated: 0,
                uniqueCards: 0,
                lastGenerated: null,
                settings: this.getDefaultSettings()
            });
        }

        if (!this.getHistory()) {
            this.setHistory([]);
        }

        if (!this.getSettings()) {
            this.setSettings(this.getDefaultSettings());
        }
    }

    // Default settings
    getDefaultSettings() {
        return {
            autoCopy: false,
            autoSave: true,
            maxHistory: 1000,
            theme: 'light',
            defaultCountry: 'US',
            defaultCardType: 'visa',
            defaultQuantity: 5,
            showDetails: true,
            enableSound: false,
            animationSpeed: 'normal'
        };
    }

    // Main data operations
    getData() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey));
        } catch (error) {
            console.error('Error reading data from storage:', error);
            return null;
        }
    }

    setData(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving data to storage:', error);
            return false;
        }
    }

    // History operations
    getHistory() {
        try {
            return JSON.parse(localStorage.getItem(this.historyKey)) || [];
        } catch (error) {
            console.error('Error reading history from storage:', error);
            return [];
        }
    }

    setHistory(history) {
        try {
            localStorage.setItem(this.historyKey, JSON.stringify(history));
            return true;
        } catch (error) {
            console.error('Error saving history to storage:', error);
            return false;
        }
    }

    addToHistory(card) {
        const history = this.getHistory();
        const maxHistory = this.getSettings().maxHistory || 1000;

        // Add new card to beginning of array
        history.unshift({
            ...card,
            timestamp: new Date().toISOString(),
            id: this.generateId()
        });

        // Limit history size
        if (history.length > maxHistory) {
            history.splice(maxHistory);
        }

        return this.setHistory(history);
    }

    clearHistory() {
        return this.setHistory([]);
    }

    // Settings operations
    getSettings() {
        try {
            return JSON.parse(localStorage.getItem(this.settingsKey)) || this.getDefaultSettings();
        } catch (error) {
            console.error('Error reading settings from storage:', error);
            return this.getDefaultSettings();
        }
    }

    setSettings(settings) {
        try {
            localStorage.setItem(this.settingsKey, JSON.stringify(settings));
            return true;
        } catch (error) {
            console.error('Error saving settings to storage:', error);
            return false;
        }
    }

    updateSetting(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        return this.setSettings(settings);
    }

    // Statistics operations
    updateStats(generatedCount, uniqueCount) {
        const data = this.getData() || {};
        data.totalGenerated = (data.totalGenerated || 0) + generatedCount;
        data.uniqueCards = (data.uniqueCards || 0) + uniqueCount;
        data.lastGenerated = new Date().toISOString();
        return this.setData(data);
    }

    getStats() {
        const data = this.getData() || {};
        return {
            totalGenerated: data.totalGenerated || 0,
            uniqueCards: data.uniqueCards || 0,
            lastGenerated: data.lastGenerated || null
        };
    }

    // Export/Import operations
    exportData() {
        const data = {
            version: '1.0',
            exportedAt: new Date().toISOString(),
            data: this.getData(),
            history: this.getHistory(),
            settings: this.getSettings()
        };
        return JSON.stringify(data, null, 2);
    }

    importData(jsonData) {
        try {
            const importedData = JSON.parse(jsonData);
            
            if (importedData.data) {
                this.setData(importedData.data);
            }
            if (importedData.history) {
                this.setHistory(importedData.history);
            }
            if (importedData.settings) {
                this.setSettings(importedData.settings);
            }
            
            return true;
        } catch (error) {
            console.error('Error importing data:', error);
            return false;
        }
    }

    // Utility methods
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Check if storage is available
    isStorageAvailable() {
        try {
            const test = 'test';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            return false;
        }
    }

    // Get storage usage
    getStorageUsage() {
        try {
            let totalSize = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    totalSize += localStorage[key].length * 2; // UTF-16 characters use 2 bytes
                }
            }
            return totalSize;
        } catch (error) {
            return 0;
        }
    }

    // Clear all data
    clearAllData() {
        try {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.historyKey);
            localStorage.removeItem(this.settingsKey);
            this.init(); // Reinitialize with defaults
            return true;
        } catch (error) {
            console.error('Error clearing all data:', error);
            return false;
        }
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = StorageManager;
}
