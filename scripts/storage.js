// scripts/storage.js
import { CONFIG } from './config.js';
import { ErrorHandler } from './utils.js';

/**
 * Zentrales LocalStorage Management
 */
export class StorageManager {
    constructor() {
        this.isSupported = this.checkLocalStorageSupport();
        this.prefix = 'klarkraft_';
    }

    /**
     * Prüft ob LocalStorage unterstützt wird
     */
    checkLocalStorageSupport() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            console.warn('LocalStorage is not supported');
            return false;
        }
    }

    /**
     * Sichere Methode zum Lesen aus LocalStorage
     */
    get(key, defaultValue = null) {
        if (!this.isSupported) return defaultValue;
        
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            ErrorHandler.logError(error, `StorageManager.get(${key})`);
            return defaultValue;
        }
    }

    /**
     * Sichere Methode zum Schreiben in LocalStorage
     */
    set(key, value) {
        if (!this.isSupported) return false;
        
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            ErrorHandler.logError(error, `StorageManager.set(${key})`);
            return false;
        }
    }

    /**
     * Sicheres Entfernen aus LocalStorage
     */
    remove(key) {
        if (!this.isSupported) return false;
        
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            ErrorHandler.logError(error, `StorageManager.remove(${key})`);
            return false;
        }
    }

    /**
     * Alle App-bezogenen Keys löschen
     */
    clear() {
        if (!this.isSupported) return false;
        
        try {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key);
                }
            });
            return true;
        } catch (error) {
            ErrorHandler.logError(error, 'StorageManager.clear()');
            return false;
        }
    }

    /**
     * Speicher-Statistiken abrufen
     */
    getStats() {
        if (!this.isSupported) return null;
        
        try {
            const keys = Object.keys(localStorage);
            const appKeys = keys.filter(key => key.startsWith(this.prefix));
            let totalSize = 0;
            
            appKeys.forEach(key => {
                totalSize += localStorage.getItem(key).length;
            });
            
            return {
                totalKeys: appKeys.length,
                totalSize: totalSize,
                approximateSizeKB: Math.round(totalSize / 1024)
            };
        } catch (error) {
            ErrorHandler.logError(error, 'StorageManager.getStats()');
            return null;
        }
    }
}

// Singleton Instance
export const storage = new StorageManager();

/**
 * Benutzer-Management
 */
export const UserStorage = {
    getUsers() {
        return storage.get(CONFIG.STORAGE_KEYS.USERS, []);
    },

    setUsers(users) {
        return storage.set(CONFIG.STORAGE_KEYS.USERS, users);
    },

    getCurrentUser() {
        return storage.get(CONFIG.STORAGE_KEYS.CURRENT_USER, null);
    },

    setCurrentUser(user) {
        return storage.set(CONFIG.STORAGE_KEYS.CURRENT_USER, user);
    },

    removeCurrentUser() {
        return storage.remove(CONFIG.STORAGE_KEYS.CURRENT_USER);
    },

    addUser(user) {
        const users = this.getUsers();
        users.push(user);
        return this.setUsers(users);
    },

    updateUser(updatedUser) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.customerId === updatedUser.customerId);
        if (index !== -1) {
            users[index] = updatedUser;
            return this.setUsers(users);
        }
        return false;
    },

    removeUser(customerId) {
        const users = this.getUsers();
        const filteredUsers = users.filter(u => u.customerId !== customerId);
        return this.setUsers(filteredUsers);
    },

    findUserByEmail(email) {
        const users = this.getUsers();
        return users.find(u => u.email === email);
    },

    findUserById(customerId) {
        const users = this.getUsers();
        return users.find(u => u.customerId === customerId);
    }
};

/**
 * Master-Management
 */
export const MasterStorage = {
    getCurrentMaster() {
        return storage.get(CONFIG.STORAGE_KEYS.CURRENT_MASTER, null);
    },

    setCurrentMaster(master) {
        return storage.set(CONFIG.STORAGE_KEYS.CURRENT_MASTER, master);
    },

    removeCurrentMaster() {
        return storage.remove(CONFIG.STORAGE_KEYS.CURRENT_MASTER);
    }
};

/**
 * Bestellungs-Management
 */
export const OrderStorage = {
    getOrders() {
        return storage.get(CONFIG.STORAGE_KEYS.ORDERS, []);
    },

    setOrders(orders) {
        return storage.set(CONFIG.STORAGE_KEYS.ORDERS, orders);
    },

    addOrder(order) {
        const orders = this.getOrders();
        orders.push(order);
        return this.setOrders(orders);
    },

    updateOrder(orderId, updates) {
        const orders = this.getOrders();
        const index = orders.findIndex(o => o.orderId === orderId);
        if (index !== -1) {
            orders[index] = { ...orders[index], ...updates };
            return this.setOrders(orders);
        }
        return false;
    },

    removeOrder(orderId) {
        const orders = this.getOrders();
        const filteredOrders = orders.filter(o => o.orderId !== orderId);
        return this.setOrders(filteredOrders);
    },

    findOrderById(orderId) {
        const orders = this.getOrders();
        return orders.find(o => o.orderId === orderId);
    },

    getOrdersByCustomer(customerId) {
        const orders = this.getOrders();
        return orders.filter(o => o.customerId === customerId);
    },

    getOrdersByStatus(status) {
        const orders = this.getOrders();
        return orders.filter(o => o.status === status);
    }
};

/**
 * Warenkorb-Management
 */
export const CartStorage = {
    getCart() {
        return storage.get(CONFIG.STORAGE_KEYS.CART, []);
    },

    setCart(cart) {
        return storage.set(CONFIG.STORAGE_KEYS.CART, cart);
    },

    clearCart() {
        return storage.remove(CONFIG.STORAGE_KEYS.CART);
    },

    addItem(product, quantity = 1) {
        const cart = this.getCart();
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...product, quantity });
        }
        
        return this.setCart(cart);
    },

    updateItemQuantity(productId, quantity) {
        const cart = this.getCart();
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                return this.removeItem(productId);
            } else {
                item.quantity = quantity;
                return this.setCart(cart);
            }
        }
        return false;
    },

    removeItem(productId) {
        const cart = this.getCart();
        const filteredCart = cart.filter(item => item.id !== productId);
        return this.setCart(filteredCart);
    }
};

/**
 * Aktivitäts-Logs
 */
export const ActivityStorage = {
    getLogs() {
        return storage.get(CONFIG.STORAGE_KEYS.ACTIVITY_LOGS, []);
    },

    setLogs(logs) {
        return storage.set(CONFIG.STORAGE_KEYS.ACTIVITY_LOGS, logs);
    },

    addLog(action, details, user = null) {
        const logs = this.getLogs();
        const log = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            user: user?.name || 'System',
            role: user?.role || 'System',
            action: action,
            details: details
        };
        
        logs.unshift(log);
        
        // Keep only last 100 logs
        if (logs.length > 100) {
            logs.splice(100);
        }
        
        return this.setLogs(logs);
    },

    clearLogs() {
        return storage.remove(CONFIG.STORAGE_KEYS.ACTIVITY_LOGS);
    }
};

/**
 * Einstellungen
 */
export const SettingsStorage = {
    getSettings() {
        return storage.get(CONFIG.STORAGE_KEYS.SETTINGS, {
            demoMode: false,
            notifications: true,
            theme: 'light',
            language: 'de'
        });
    },

    setSettings(settings) {
        return storage.set(CONFIG.STORAGE_KEYS.SETTINGS, settings);
    },

    getSetting(key, defaultValue = null) {
        const settings = this.getSettings();
        return settings[key] !== undefined ? settings[key] : defaultValue;
    },

    setSetting(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        return this.setSettings(settings);
    },

    // Demo Mode specific
    getDemoMode() {
        return this.getSetting('demoMode', false);
    },

    setDemoMode(enabled) {
        return this.setSetting('demoMode', enabled);
    }
};

/**
 * Daten Export/Import
 */
export const DataManager = {
    exportAllData() {
        try {
            const data = {
                users: UserStorage.getUsers(),
                orders: OrderStorage.getOrders(),
                activityLogs: ActivityStorage.getLogs(),
                settings: SettingsStorage.getSettings(),
                exportDate: new Date().toISOString(),
                version: CONFIG.VERSION
            };
            return data;
        } catch (error) {
            ErrorHandler.logError(error, 'DataManager.exportAllData()');
            return null;
        }
    },

    downloadExport() {
        const data = this.exportAllData();
        if (!data) return false;

        try {
            const dataStr = JSON.stringify(data, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `klarkraft_export_${new Date().toISOString().slice(0, 10)}.json`;
            link.click();
            
            return true;
        } catch (error) {
            ErrorHandler.logError(error, 'DataManager.downloadExport()');
            return false;
        }
    },

    importData(data) {
        try {
            if (data.users) UserStorage.setUsers(data.users);
            if (data.orders) OrderStorage.setOrders(data.orders);
            if (data.activityLogs) ActivityStorage.setLogs(data.activityLogs);
            if (data.settings) SettingsStorage.setSettings(data.settings);
            
            return true;
        } catch (error) {
            ErrorHandler.logError(error, 'DataManager.importData()');
            return false;
        }
    },

    clearAllData() {
        try {
            storage.clear();
            return true;
        } catch (error) {
            ErrorHandler.logError(error, 'DataManager.clearAllData()');
            return false;
        }
    },

    clearTestData() {
        try {
            // Clear only test orders
            const orders = OrderStorage.getOrders();
            const realOrders = orders.filter(order => !order.orderId.startsWith('TEST'));
            OrderStorage.setOrders(realOrders);
            
            return true;
        } catch (error) {
            ErrorHandler.logError(error, 'DataManager.clearTestData()');
            return false;
        }
    },

    /**
     * Migrates old data structure to new format
     */
    migrateData() {
        try {
            // Migrate users if needed
            const users = UserStorage.getUsers();
            let needsUpdate = false;
            
            users.forEach(user => {
                if (!user.customerId) {
                    user.customerId = 'KK' + Date.now().toString().slice(-8);
                    user.phone = user.phone || '';
                    user.country = user.country || 'Deutschland';
                    user.registrationDate = user.registrationDate || new Date().toISOString();
                    user.totalOrders = user.totalOrders || 0;
                    user.totalSpent = user.totalSpent || 0;
                    user.paymentMethods = user.paymentMethods || [];
                    needsUpdate = true;
                }
            });
            
            if (needsUpdate) {
                UserStorage.setUsers(users);
                console.log('✅ User data migrated to new format');
            }
            
            return true;
        } catch (error) {
            ErrorHandler.logError(error, 'DataManager.migrateData()');
            return false;
        }
    }
};