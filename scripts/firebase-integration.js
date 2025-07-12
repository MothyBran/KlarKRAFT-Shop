// ========== KLARKRAFT FIREBASE CLOUD SYNCHRONISATION (DEBUG VERSION) ==========
// Verbesserte Integration mit erweiterten Debugging-Features

// ========== DEBUG & LOGGING ==========
const DEBUG_MODE = true;
function debugLog(message, data = null) {
    if (DEBUG_MODE) {
        const timestamp = new Date().toLocaleTimeString();
        console.log(`🔧 [${timestamp}] Firebase Debug:`, message, data || '');
    }
}

// ========== FIREBASE INITIALIZATION ==========
let firebaseApp = null;
let firestore = null;
let isFirebaseAvailable = false;
let lastSyncTime = null;
let syncInProgress = false;
let autoSyncInterval = null;
let initializationAttempts = 0;
const MAX_INIT_ATTEMPTS = 5;

// Verbesserte Firebase-Initialisierung
async function initializeFirebase() {
    initializationAttempts++;
    debugLog(`Initialisierung Versuch ${initializationAttempts}/${MAX_INIT_ATTEMPTS}`);
    
    try {
        // Schritt 1: Prüfe ob Firebase App verfügbar ist
        if (!window.firebaseApp) {
            debugLog('❌ window.firebaseApp nicht verfügbar');
            updateSyncStatus('offline', 'Firebase App nicht gefunden');
            return false;
        }
        
        firebaseApp = window.firebaseApp;
        debugLog('✅ Firebase App gefunden', firebaseApp);
        
        // Schritt 2: Importiere Firestore dynamisch
        debugLog('📦 Importiere Firestore...');
        const firestoreModule = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
        debugLog('✅ Firestore-Modul importiert', Object.keys(firestoreModule));
        
        // Schritt 3: Initialisiere Firestore
        firestore = firestoreModule.getFirestore(firebaseApp);
        debugLog('✅ Firestore initialisiert', firestore);
        
        // Schritt 4: Teste Verbindung
        debugLog('🔍 Teste Firestore-Verbindung...');
        const testResult = await testFirestoreConnection(firestoreModule);
        
        if (testResult) {
            isFirebaseAvailable = true;
            debugLog('🎉 Firebase erfolgreich initialisiert!');
            updateSyncStatus('available', 'Erfolgreich initialisiert');
            
            // Auto-Sync starten
            startAutoSync();
            
            // Initial-Sync nach kurzer Verzögerung
            setTimeout(() => {
                if (window.currentMaster) {
                    debugLog('👔 Master erkannt - starte Initial-Sync');
                    manualSync();
                }
            }, 3000);
            
            return true;
        } else {
            throw new Error('Firestore-Verbindungstest fehlgeschlagen');
        }
        
    } catch (error) {
        debugLog('❌ Firebase Initialisierung fehlgeschlagen:', error);
        updateSyncStatus('error', `Init-Fehler: ${error.message}`);
        
        // Retry-Mechanismus
        if (initializationAttempts < MAX_INIT_ATTEMPTS) {
            debugLog(`🔄 Retry in 3 Sekunden... (${initializationAttempts}/${MAX_INIT_ATTEMPTS})`);
            setTimeout(() => {
                initializeFirebase();
            }, 3000);
        } else {
            debugLog('💀 Maximale Versuche erreicht - Firebase bleibt deaktiviert');
            updateSyncStatus('offline', 'Initialisierung fehlgeschlagen');
        }
        
        return false;
    }
}

// Teste Firestore-Verbindung
async function testFirestoreConnection(firestoreModule) {
    try {
        const { doc, getDoc, setDoc } = firestoreModule;
        const testRef = doc(firestore, 'system', 'connection_test');
        
        // Schreibe Test-Dokument
        await setDoc(testRef, {
            test: true,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        });
        
        // Lese Test-Dokument
        const testDoc = await getDoc(testRef);
        const success = testDoc.exists();
        
        debugLog('🔍 Verbindungstest:', success ? '✅ Erfolgreich' : '❌ Fehlgeschlagen');
        return success;
        
    } catch (error) {
        debugLog('❌ Verbindungstest-Fehler:', error);
        return false;
    }
}

// ========== SYNC STATUS MANAGEMENT ==========
function updateSyncStatus(status, message, lastSync = null) {
    debugLog(`📊 Status Update: ${status} - ${message}`);
    
    const statusElement = document.getElementById('cloudStatusText');
    const firebaseElement = document.getElementById('firebaseAvailable');
    const lastSyncElement = document.getElementById('lastSyncTime');
    
    if (statusElement) {
        switch(status) {
            case 'available':
                statusElement.textContent = '✅ Verbunden';
                statusElement.style.color = '#4caf50';
                break;
            case 'syncing':
                statusElement.textContent = '🔄 Synchronisiert...';
                statusElement.style.color = '#ff9800';
                break;
            case 'error':
                statusElement.textContent = '❌ Fehler';
                statusElement.style.color = '#f44336';
                break;
            case 'offline':
                statusElement.textContent = '📴 Nicht verfügbar';
                statusElement.style.color = '#9e9e9e';
                break;
            case 'testing':
                statusElement.textContent = '🔍 Wird geprüft...';
                statusElement.style.color = '#2196f3';
                break;
            default:
                statusElement.textContent = '❓ Unbekannt';
                statusElement.style.color = '#9e9e9e';
        }
    }
    
    if (firebaseElement) {
        firebaseElement.textContent = isFirebaseAvailable ? '✅' : '❌';
    }
    
    if (lastSyncElement) {
        if (lastSync) {
            lastSyncTime = lastSync;
            lastSyncElement.textContent = new Date(lastSync).toLocaleString('de-DE');
        } else if (lastSyncTime) {
            lastSyncElement.textContent = new Date(lastSyncTime).toLocaleString('de-DE');
        } else {
            lastSyncElement.textContent = 'Nie';
        }
    }
    
    // Update Sync UI
    updateSyncUI();
}

// ========== COLLECTION HELPERS ==========
class FirebaseCollection {
    constructor(collectionName, localStorageKey) {
        this.collectionName = collectionName;
        this.localStorageKey = localStorageKey;
        debugLog(`📁 Collection erstellt: ${collectionName} -> ${localStorageKey}`);
    }
    
    getLocalData() {
        try {
            const data = JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
            debugLog(`📥 Lokale Daten geladen: ${this.localStorageKey} (${data.length} Einträge)`);
            return data;
        } catch (error) {
            debugLog(`❌ Fehler beim Laden lokaler Daten für ${this.localStorageKey}:`, error);
            return [];
        }
    }
    
    setLocalData(data) {
        try {
            localStorage.setItem(this.localStorageKey, JSON.stringify(data));
            debugLog(`💾 Lokale Daten gespeichert: ${this.localStorageKey} (${data.length} Einträge)`);
            return true;
        } catch (error) {
            debugLog(`❌ Fehler beim Speichern lokaler Daten für ${this.localStorageKey}:`, error);
            return false;
        }
    }
    
    async getCloudData() {
        if (!isFirebaseAvailable) {
            debugLog(`⚠️ Firebase nicht verfügbar für ${this.collectionName}`);
            return [];
        }
        
        try {
            const { collection, getDocs, query, orderBy } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
            const collectionRef = collection(firestore, this.collectionName);
            const q = query(collectionRef, orderBy('lastModified', 'desc'));
            const snapshot = await getDocs(q);
            
            const cloudData = [];
            snapshot.forEach(doc => {
                cloudData.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            debugLog(`☁️ Cloud-Daten geladen: ${this.collectionName} (${cloudData.length} Einträge)`);
            return cloudData;
            
        } catch (error) {
            debugLog(`❌ Fehler beim Laden der Cloud-Daten für ${this.collectionName}:`, error);
            throw error;
        }
    }
    
    async saveToCloud(docId, data) {
        if (!isFirebaseAvailable) {
            debugLog(`⚠️ Firebase nicht verfügbar - überspringe Cloud-Speicherung für ${docId}`);
            return false;
        }
        
        try {
            const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
            const docRef = doc(firestore, this.collectionName, docId);
            
            const dataWithTimestamp = {
                ...data,
                lastModified: new Date().toISOString(),
                syncedAt: new Date().toISOString()
            };
            
            await setDoc(docRef, dataWithTimestamp, { merge: true });
            debugLog(`☁️ Cloud-Speicherung erfolgreich: ${this.collectionName}/${docId}`);
            return true;
            
        } catch (error) {
            debugLog(`❌ Fehler beim Speichern in Cloud für ${this.collectionName}/${docId}:`, error);
            throw error;
        }
    }
    
    async batchSaveToCloud(dataArray) {
        if (!isFirebaseAvailable || dataArray.length === 0) {
            debugLog(`⚠️ Batch-Upload übersprungen: Firebase=${isFirebaseAvailable}, Items=${dataArray.length}`);
            return false;
        }
        
        try {
            const { writeBatch, doc } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
            const batch = writeBatch(firestore);
            
            const batchSize = 50; // Firestore Limit
            const items = dataArray.slice(0, batchSize);
            
            for (const item of items) {
                const docId = this.getDocumentId(item);
                const docRef = doc(firestore, this.collectionName, docId);
                
                const dataWithTimestamp = {
                    ...item,
                    lastModified: new Date().toISOString(),
                    syncedAt: new Date().toISOString()
                };
                
                batch.set(docRef, dataWithTimestamp, { merge: true });
            }
            
            await batch.commit();
            debugLog(`📦 Batch-Upload erfolgreich: ${this.collectionName} (${items.length} Items)`);
            return true;
            
        } catch (error) {
            debugLog(`❌ Fehler beim Batch-Upload für ${this.collectionName}:`, error);
            throw error;
        }
    }
    
    getDocumentId(item) {
        if (this.collectionName === 'klarkraft_users') {
            return item.customerId || item.email || `user_${Date.now()}`;
        } else if (this.collectionName === 'klarkraft_orders') {
            return item.orderId || `order_${Date.now()}`;
        } else if (this.collectionName === 'klarkraft_activity_logs') {
            return item.id?.toString() || `log_${Date.now()}`;
        } else {
            return item.id?.toString() || `doc_${Date.now()}`;
        }
    }
}

// ========== SYNC MANAGER ==========
class SyncManager {
    constructor() {
        this.collections = {
            users: new FirebaseCollection('klarkraft_users', 'klarkraft_users'),
            orders: new FirebaseCollection('klarkraft_orders', 'klarkraft_orders'),
            activityLogs: new FirebaseCollection('klarkraft_activity_logs', 'klarkraft_activity_logs')
        };
        debugLog('🎯 SyncManager initialisiert');
    }
    
    async fullSync() {
        if (syncInProgress) {
            debugLog('⏳ Synchronisation bereits aktiv, überspringe...');
            return false;
        }
        
        if (!isFirebaseAvailable) {
            debugLog('⚠️ Firebase nicht verfügbar für Synchronisation');
            return false;
        }
        
        syncInProgress = true;
        updateSyncStatus('syncing', 'Vollständige Synchronisation läuft...');
        debugLog('🚀 Starte vollständige Synchronisation');
        
        try {
            let syncResults = {
                users: { uploaded: 0, downloaded: 0, errors: 0 },
                orders: { uploaded: 0, downloaded: 0, errors: 0 },
                activityLogs: { uploaded: 0, downloaded: 0, errors: 0 }
            };
            
            // Upload lokale Änderungen
            debugLog('📤 Starte Upload-Phase...');
            for (const [key, collection] of Object.entries(this.collections)) {
                try {
                    const uploadResult = await this.uploadLocalChanges(collection);
                    syncResults[key].uploaded = uploadResult;
                    debugLog(`📤 ${key}: ${uploadResult} Items hochgeladen`);
                } catch (error) {
                    debugLog(`❌ Upload-Fehler für ${key}:`, error);
                    syncResults[key].errors++;
                }
            }
            
            // Download Cloud-Änderungen
            debugLog('📥 Starte Download-Phase...');
            for (const [key, collection] of Object.entries(this.collections)) {
                try {
                    const downloadResult = await this.downloadCloudChanges(collection);
                    syncResults[key].downloaded = downloadResult;
                    debugLog(`📥 ${key}: ${downloadResult} Items heruntergeladen`);
                } catch (error) {
                    debugLog(`❌ Download-Fehler für ${key}:`, error);
                    syncResults[key].errors++;
                }
            }
            
            // System-Einstellungen synchronisieren
            debugLog('⚙️ Synchronisiere System-Einstellungen...');
            await this.syncSystemSettings();
            
            const now = new Date().toISOString();
            lastSyncTime = now;
            localStorage.setItem('klarkraft_last_sync', now);
            
            const totalUploaded = Object.values(syncResults).reduce((sum, result) => sum + result.uploaded, 0);
            const totalDownloaded = Object.values(syncResults).reduce((sum, result) => sum + result.downloaded, 0);
            const totalErrors = Object.values(syncResults).reduce((sum, result) => sum + result.errors, 0);
            
            updateSyncStatus('available', `Sync erfolgreich: ↑${totalUploaded} ↓${totalDownloaded}`, now);
            debugLog(`✅ Synchronisation abgeschlossen: ${totalUploaded}↑ ${totalDownloaded}↓ ${totalErrors}❌`);
            
            // UI aktualisieren falls Master Dashboard offen
            if (window.currentMaster && document.getElementById('masterDashboardModal')?.style.display === 'block') {
                setTimeout(() => {
                    if (typeof window.loadMasterOverview === 'function') {
                        window.loadMasterOverview();
                    }
                }, 1000);
            }
            
            return true;
            
        } catch (error) {
            debugLog('❌ Synchronisation fehlgeschlagen:', error);
            updateSyncStatus('error', `Sync-Fehler: ${error.message}`);
            return false;
        } finally {
            syncInProgress = false;
        }
    }
    
    async uploadLocalChanges(collection) {
        const localData = collection.getLocalData();
        if (localData.length === 0) return 0;
        
        const unsyncedData = localData.filter(item => {
            return !item.syncedAt || (item.lastModified && item.lastModified > item.syncedAt);
        });
        
        if (unsyncedData.length === 0) return 0;
        
        debugLog(`📤 Upload ${unsyncedData.length} unsynced items für ${collection.collectionName}`);
        
        let uploadedCount = 0;
        const batchSize = 50;
        
        for (let i = 0; i < unsyncedData.length; i += batchSize) {
            const batch = unsyncedData.slice(i, i + batchSize);
            try {
                await collection.batchSaveToCloud(batch);
                uploadedCount += batch.length;
                
                // Lokale Daten als synchronisiert markieren
                batch.forEach(item => {
                    const localIndex = localData.findIndex(localItem => 
                        collection.getDocumentId(localItem) === collection.getDocumentId(item)
                    );
                    if (localIndex !== -1) {
                        localData[localIndex].syncedAt = new Date().toISOString();
                    }
                });
            } catch (error) {
                debugLog(`❌ Batch-Upload-Fehler für ${collection.collectionName}:`, error);
            }
        }
        
        collection.setLocalData(localData);
        return uploadedCount;
    }
    
    async downloadCloudChanges(collection) {
        try {
            const cloudData = await collection.getCloudData();
            const localData = collection.getLocalData();
            
            let downloadedCount = 0;
            let mergedData = [...localData];
            
            cloudData.forEach(cloudItem => {
                const docId = collection.getDocumentId(cloudItem);
                const localIndex = mergedData.findIndex(localItem => 
                    collection.getDocumentId(localItem) === docId
                );
                
                if (localIndex === -1) {
                    mergedData.push(cloudItem);
                    downloadedCount++;
                } else {
                    const localItem = mergedData[localIndex];
                    const cloudModified = new Date(cloudItem.lastModified || 0);
                    const localModified = new Date(localItem.lastModified || 0);
                    
                    if (cloudModified > localModified) {
                        mergedData[localIndex] = { ...cloudItem };
                        downloadedCount++;
                    }
                }
            });
            
            collection.setLocalData(mergedData);
            return downloadedCount;
            
        } catch (error) {
            debugLog(`❌ Download-Fehler für ${collection.collectionName}:`, error);
            throw error;
        }
    }
    
    async syncSystemSettings() {
        try {
            const settings = {
                demoMode: localStorage.getItem('klarkraft_demo_mode') === 'true',
                lastSync: lastSyncTime,
                version: '1.0.0',
                syncedBy: window.currentMaster?.name || 'System',
                lastModified: new Date().toISOString()
            };
            
            const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
            const settingsRef = doc(firestore, 'klarkraft_settings', 'system');
            await setDoc(settingsRef, settings, { merge: true });
            
            debugLog('⚙️ System-Einstellungen synchronisiert');
            return true;
        } catch (error) {
            debugLog('❌ Fehler beim Synchronisieren der System-Einstellungen:', error);
            return false;
        }
    }
}

// ========== GLOBAL SYNC MANAGER ==========
const syncManager = new SyncManager();

// ========== AUTO SYNC FUNCTIONS ==========
function startAutoSync() {
    if (autoSyncInterval) {
        clearInterval(autoSyncInterval);
    }
    
    if (!isFirebaseAvailable) {
        debugLog('⚠️ Auto-Sync nicht gestartet - Firebase nicht verfügbar');
        return;
    }
    
    autoSyncInterval = setInterval(async () => {
        if (isFirebaseAvailable && !syncInProgress) {
            debugLog('🔄 Automatische Synchronisation...');
            await syncManager.fullSync();
        }
    }, 30000); // 30 Sekunden
    
    debugLog('✅ Automatische Synchronisation gestartet (alle 30s)');
}

function stopAutoSync() {
    if (autoSyncInterval) {
        clearInterval(autoSyncInterval);
        autoSyncInterval = null;
        debugLog('⏹️ Automatische Synchronisation gestoppt');
    }
}

// ========== PUBLIC API FUNCTIONS ==========

async function manualSync() {
    debugLog('🔄 Manuelle Synchronisation gestartet');
    
    if (!isFirebaseAvailable) {
        const message = 'Firebase nicht verfügbar. Internetverbindung prüfen!';
        if (window.showNotification) {
            window.showNotification(message, 'error');
        }
        updateSyncStatus('offline', 'Firebase nicht verfügbar');
        return false;
    }
    
    if (syncInProgress) {
        if (window.showNotification) {
            window.showNotification('Synchronisation läuft bereits...', 'info');
        }
        return false;
    }
    
    try {
        if (window.showNotification) {
            window.showNotification('🔄 Manuelle Synchronisation gestartet...', 'sync');
        }
        
        const success = await syncManager.fullSync();
        
        if (success) {
            if (window.showNotification) {
                window.showNotification('✅ Synchronisation erfolgreich abgeschlossen!', 'success');
            }
        } else {
            if (window.showNotification) {
                window.showNotification('⚠️ Synchronisation mit Fehlern abgeschlossen.', 'warning');
            }
        }
        
        return success;
    } catch (error) {
        debugLog('❌ Fehler bei manueller Synchronisation:', error);
        if (window.showNotification) {
            window.showNotification('❌ Synchronisation fehlgeschlagen: ' + error.message, 'error');
        }
        return false;
    }
}

function triggerAutoSyncOnChange(dataType) {
    if (!isFirebaseAvailable || syncInProgress) return;
    
    debugLog(`🔄 Auto-Sync getriggert durch ${dataType}-Änderung`);
    
    clearTimeout(window.autoSyncTimeout);
    window.autoSyncTimeout = setTimeout(async () => {
        debugLog(`🔄 Auto-Sync ausgeführt für ${dataType}`);
        await syncManager.fullSync();
    }, 5000);
}

async function checkCloudStatus() {
    debugLog('🔍 Prüfe Cloud-Status...');
    updateSyncStatus('testing', 'Verbindung wird geprüft...');
    
    try {
        if (!window.firebaseApp) {
            updateSyncStatus('offline', 'Firebase App nicht gefunden');
            return false;
        }
        
        // Reset initialization attempts
        initializationAttempts = 0;
        const available = await initializeFirebase();
        
        if (available) {
            updateSyncStatus('available', 'Verbindung erfolgreich');
            
            const lastSync = localStorage.getItem('klarkraft_last_sync');
            if (lastSync) {
                lastSyncTime = lastSync;
                updateSyncStatus('available', 'Verbindung erfolgreich', lastSync);
            }
            
            return true;
        } else {
            updateSyncStatus('offline', 'Verbindung fehlgeschlagen');
            return false;
        }
    } catch (error) {
        debugLog('❌ Fehler beim Prüfen des Cloud-Status:', error);
        updateSyncStatus('error', 'Statusprüfung fehlgeschlagen');
        return false;
    }
}

function updateSyncUI() {
    const syncBtn = document.getElementById('manualSyncBtn');
    const syncProgress = document.getElementById('syncProgress');
    
    if (syncInProgress) {
        if (syncBtn) {
            syncBtn.disabled = true;
            syncBtn.textContent = '🔄 Synchronisiert...';
            syncBtn.style.opacity = '0.6';
        }
        
        if (syncProgress) {
            syncProgress.style.display = 'block';
        }
    } else {
        if (syncBtn) {
            syncBtn.disabled = false;
            syncBtn.textContent = '🔄 Manuell synchronisieren';
            syncBtn.style.opacity = '1';
        }
        
        if (syncProgress) {
            syncProgress.style.display = 'none';
        }
    }
}

// ========== NETWORK MONITORING ==========
function setupNetworkMonitoring() {
    window.addEventListener('online', async () => {
        debugLog('🌐 Internetverbindung wiederhergestellt');
        if (window.showNotification) {
            window.showNotification('🌐 Internetverbindung wiederhergestellt', 'info');
        }
        
        setTimeout(async () => {
            const available = await checkCloudStatus();
            if (available) {
                await manualSync();
            }
        }, 2000);
    });
    
    window.addEventListener('offline', () => {
        debugLog('📴 Internetverbindung verloren');
        if (window.showNotification) {
            window.showNotification('📴 Offline-Modus: Daten werden lokal gespeichert', 'warning');
        }
        stopAutoSync();
        updateSyncStatus('offline', 'Keine Internetverbindung');
    });
}

// ========== OVERRIDE FUNCTIONS ==========
// Erweitere bestehende Funktionen um Auto-Sync
const originalCompleteOrder = window.completeOrder;
const originalUpdateOrderStatus = window.updateOrderStatus;
const originalHandleRegister = window.handleRegister;
const originalLogActivity = window.logActivity;

// Order-Funktionen erweitern
if (typeof window.completeOrder === 'function') {
    window.completeOrder = function(...args) {
        const result = originalCompleteOrder.apply(this, args);
        triggerAutoSyncOnChange('order');
        return result;
    };
}

if (typeof window.updateOrderStatus === 'function') {
    window.updateOrderStatus = function(...args) {
        const result = originalUpdateOrderStatus.apply(this, args);
        triggerAutoSyncOnChange('order');
        return result;
    };
}

if (typeof window.handleRegister === 'function') {
    window.handleRegister = function(...args) {
        const result = originalHandleRegister.apply(this, args);
        triggerAutoSyncOnChange('user');
        return result;
    };
}

if (typeof window.logActivity === 'function') {
    window.logActivity = function(...args) {
        const result = originalLogActivity.apply(this, args);
        triggerAutoSyncOnChange('activity');
        return result;
    };
}

// ========== INITIALIZATION ==========
async function initializeCloudSync() {
    debugLog('🚀 Initialisiere Cloud-Synchronisation...');
    
    // Netzwerk-Monitoring einrichten
    setupNetworkMonitoring();
    
    // Initiale Status-Anzeige
    updateSyncStatus('testing', 'Initialisierung...');
    
    // Warte auf Firebase
    let attempts = 0;
    const maxAttempts = 10;
    
    const waitForFirebase = () => {
        attempts++;
        debugLog(`⏳ Warte auf Firebase... (${attempts}/${maxAttempts})`);
        
        if (window.firebaseApp) {
            debugLog('✅ Firebase App gefunden - starte Initialisierung');
            setTimeout(() => {
                initializeFirebase();
            }, 1000);
        } else if (attempts < maxAttempts) {
            setTimeout(waitForFirebase, 1000);
        } else {
            debugLog('❌ Firebase nach 10 Versuchen nicht gefunden');
            updateSyncStatus('offline', 'Firebase nicht verfügbar');
        }
    };
    
    waitForFirebase();
}

// ========== GLOBAL EXPOSURE ==========
window.manualSync = manualSync;
window.checkCloudStatus = checkCloudStatus;
window.triggerAutoSyncOnChange = triggerAutoSyncOnChange;
window.isFirebaseAvailable = () => isFirebaseAvailable;
window.syncInProgress = () => syncInProgress;
window.updateSyncUI = updateSyncUI;

// Debug-Funktionen
window.firebaseDebug = {
    getStatus: () => ({
        isFirebaseAvailable,
        syncInProgress,
        lastSyncTime,
        initializationAttempts,
        firebaseApp,
        firestore
    }),
    logs: () => console.log('Siehe Debug-Logs oben ⬆️'),
    forceInit: () => initializeFirebase(),
    testConnection: () => testFirestoreConnection()
};

// ========== AUTO-START ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCloudSync);
} else {
    initializeCloudSync();
}

// Listen auf Firebase Ready Event
window.addEventListener('firebaseReady', () => {
    debugLog('🔥 Firebase Ready Event empfangen');
    setTimeout(() => {
        checkCloudStatus();
    }, 1000);
});

debugLog('🔧 Firebase Cloud-Synchronisation (Debug-Version) geladen');
