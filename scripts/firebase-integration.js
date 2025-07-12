// ========== KLARKRAFT FIREBASE CLOUD SYNCHRONISATION MIT TOGGLE ==========
// Vollständige Cloud-Synchronisation mit On/Off-Schalter

// ========== CONFIGURATION ==========
let firebaseApp = null;
let firestore = null;
let isFirebaseAvailable = false;
let isCloudSyncEnabled = true; // Neuer Toggle-State
let lastSyncTime = null;
let syncInProgress = false;
let autoSyncInterval = null;
let initializationAttempts = 0;
const MAX_INIT_ATTEMPTS = 3;

// Cloud-Sync-Einstellungen laden
function loadCloudSyncSettings() {
    const savedSetting = localStorage.getItem('klarkraft_cloud_sync_enabled');
    isCloudSyncEnabled = savedSetting !== 'false'; // Default: enabled
    console.log('📁 Cloud-Sync Einstellung geladen:', isCloudSyncEnabled ? 'EIN' : 'AUS');
}

// Cloud-Sync-Einstellungen speichern
function saveCloudSyncSettings() {
    localStorage.setItem('klarkraft_cloud_sync_enabled', isCloudSyncEnabled.toString());
    console.log('💾 Cloud-Sync Einstellung gespeichert:', isCloudSyncEnabled ? 'EIN' : 'AUS');
}

// ========== FIREBASE INITIALIZATION ==========
async function initializeFirebase() {
    initializationAttempts++;
    console.log(`🔥 Firebase Init Versuch ${initializationAttempts}/${MAX_INIT_ATTEMPTS}`);
    
    try {
        if (!window.firebaseApp) {
            throw new Error('Firebase App nicht verfügbar');
        }
        
        firebaseApp = window.firebaseApp;
        console.log('✅ Firebase App gefunden');
        
        // Firestore importieren
        const { getFirestore } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
        firestore = getFirestore(firebaseApp);
        
        // Verbindung testen
        await testFirestoreConnection();
        
        isFirebaseAvailable = true;
        console.log('🎉 Firebase Firestore erfolgreich initialisiert');
        
        // Status-Update mit korrekter Cloud-Sync-Berücksichtigung
        updateSyncStatus();
        
        // Auto-Sync nur starten wenn enabled
        if (isCloudSyncEnabled) {
            startAutoSync();
            
            // Initial-Sync nach kurzer Verzögerung
            setTimeout(() => {
                if (window.currentMaster) {
                    console.log('👔 Master erkannt - starte Initial-Sync');
                    manualSync();
                }
            }, 3000);
        }
        
        return true;
        
    } catch (error) {
        console.error('❌ Firebase Initialisierung fehlgeschlagen:', error);
        updateSyncStatus('error', `Init-Fehler: ${error.message}`);
        
        if (initializationAttempts < MAX_INIT_ATTEMPTS) {
            console.log(`🔄 Retry in 5 Sekunden...`);
            setTimeout(() => {
                initializeFirebase();
            }, 5000);
        } else {
            console.log('💀 Maximale Versuche erreicht');
            updateSyncStatus('offline', 'Cloud nicht verfügbar');
        }
        
        return false;
    }
}

async function testFirestoreConnection() {
    try {
        const { doc, getDoc, setDoc } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
        const testRef = doc(firestore, 'system', 'connection_test');
        
        await setDoc(testRef, {
            test: true,
            timestamp: new Date().toISOString(),
            testBy: window.currentMaster?.name || 'System'
        });
        
        const testDoc = await getDoc(testRef);
        const success = testDoc.exists();
        
        console.log('🔍 Verbindungstest:', success ? '✅ Erfolgreich' : '❌ Fehlgeschlagen');
        return success;
        
    } catch (error) {
        console.error('❌ Verbindungstest fehlgeschlagen:', error);
        throw error;
    }
}

// ========== SYNC STATUS MANAGEMENT ==========
function updateSyncStatus(statusOverride = null, messageOverride = null, lastSync = null, syncStats = null) {
    let status, message;
    
    if (statusOverride && messageOverride) {
        status = statusOverride;
        message = messageOverride;
    } else {
        // Automatische Status-Bestimmung
        if (!isFirebaseAvailable) {
            status = 'offline';
            message = 'Firebase nicht verfügbar';
        } else if (!isCloudSyncEnabled) {
            status = 'disabled';
            message = 'Cloud-Sync deaktiviert';
        } else if (syncInProgress) {
            status = 'syncing';
            message = 'Synchronisation läuft...';
        } else {
            status = 'available';
            message = 'Cloud-Sync bereit';
        }
    }
    
    // Sync-Statistiken hinzufügen wenn vorhanden
    if (syncStats && (syncStats.uploaded > 0 || syncStats.downloaded > 0)) {
        message += ` (↑${syncStats.uploaded} ↓${syncStats.downloaded})`;
    }
    
    console.log(`📊 Sync Status: ${status} - ${message}`);
    
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
            case 'disabled':
                statusElement.textContent = '⏸️ Deaktiviert';
                statusElement.style.color = '#9e9e9e';
                break;
            case 'error':
                statusElement.textContent = '⚠️ Fehler';
                statusElement.style.color = '#f44336';
                break;
            case 'offline':
                statusElement.textContent = '📴 Offline';
                statusElement.style.color = '#9e9e9e';
                break;
            case 'testing':
                statusElement.textContent = '🔍 Wird geprüft...';
                statusElement.style.color = '#2196f3';
                break;
        }
        
        // Sync-Statistiken in separatem Element anzeigen
        if (syncStats && (syncStats.uploaded > 0 || syncStats.downloaded > 0)) {
            const statsText = ` ↑${syncStats.uploaded} ↓${syncStats.downloaded}`;
            statusElement.textContent += statsText;
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
    
    updateSyncUI();
}

// ========== CLOUD SYNC TOGGLE FUNCTIONS ==========
function toggleCloudSync() {
    isCloudSyncEnabled = !isCloudSyncEnabled;
    saveCloudSyncSettings();
    
    console.log('🔄 Cloud-Sync Toggle:', isCloudSyncEnabled ? 'AKTIVIERT' : 'DEAKTIVIERT');
    
    if (isCloudSyncEnabled) {
        // Cloud-Sync aktivieren
        if (isFirebaseAvailable) {
            startAutoSync();
            updateSyncStatus('available', 'Cloud-Sync aktiviert');
            
            // Sofortige Sync-Durchführung
            setTimeout(() => {
                manualSync();
            }, 1000);
        } else {
            updateSyncStatus('offline', 'Firebase nicht verfügbar');
        }
        
        if (window.showNotification) {
            window.showNotification('✅ Cloud-Synchronisation aktiviert!', 'success');
        }
    } else {
        // Cloud-Sync deaktivieren
        stopAutoSync();
        updateSyncStatus('disabled', 'Cloud-Sync deaktiviert');
        
        if (window.showNotification) {
            window.showNotification('⏸️ Cloud-Synchronisation deaktiviert - Daten bleiben lokal', 'info');
        }
    }
    
    updateCloudSyncToggleUI();
    
    // Log für Aktivitäten
    if (window.logActivity) {
        window.logActivity('Cloud Sync Toggle', `Cloud-Sync ${isCloudSyncEnabled ? 'aktiviert' : 'deaktiviert'}`);
    }
}

function updateCloudSyncToggleUI() {
    const toggle = document.getElementById('cloudSyncToggle');
    const status = document.getElementById('cloudSyncStatus');
    
    if (toggle) {
        toggle.checked = isCloudSyncEnabled;
    }
    
    if (status) {
        if (isCloudSyncEnabled) {
            status.textContent = '☁️ Cloud-Sync EIN - Automatische Synchronisation aktiv';
            status.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
            status.style.color = '#4caf50';
        } else {
            status.textContent = '⏸️ Cloud-Sync AUS - Nur lokale Datenspeicherung';
            status.style.backgroundColor = 'rgba(158, 158, 158, 0.2)';
            status.style.color = '#9e9e9e';
        }
    }
}

// ========== COLLECTION HELPERS ==========
class FirebaseCollection {
    constructor(collectionName, localStorageKey) {
        this.collectionName = collectionName;
        this.localStorageKey = localStorageKey;
    }
    
    getLocalData() {
        try {
            return JSON.parse(localStorage.getItem(this.localStorageKey) || '[]');
        } catch (error) {
            console.error(`Fehler beim Laden lokaler Daten für ${this.localStorageKey}:`, error);
            return [];
        }
    }
    
    setLocalData(data) {
        try {
            localStorage.setItem(this.localStorageKey, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error(`Fehler beim Speichern lokaler Daten für ${this.localStorageKey}:`, error);
            return false;
        }
    }
    
    async getCloudData() {
        if (!isFirebaseAvailable || !isCloudSyncEnabled) return [];
        
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
            
            console.log(`☁️ ${this.collectionName}: ${cloudData.length} Items aus Cloud geladen`);
            return cloudData;
            
        } catch (error) {
            console.error(`❌ Cloud-Daten laden fehlgeschlagen für ${this.collectionName}:`, error);
            throw error;
        }
    }
    
    async saveToCloud(docId, data) {
        if (!isFirebaseAvailable || !isCloudSyncEnabled) return false;
        
        try {
            const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
            const docRef = doc(firestore, this.collectionName, docId);
            
            const dataWithTimestamp = {
                ...data,
                lastModified: new Date().toISOString(),
                syncedAt: new Date().toISOString(),
                syncedBy: window.currentMaster?.name || 'System'
            };
            
            await setDoc(docRef, dataWithTimestamp, { merge: true });
            console.log(`☁️ ${this.collectionName}/${docId} in Cloud gespeichert`);
            return true;
            
        } catch (error) {
            console.error(`❌ Cloud-Speicherung fehlgeschlagen für ${this.collectionName}/${docId}:`, error);
            throw error;
        }
    }
    
    async batchSaveToCloud(dataArray) {
        if (!isFirebaseAvailable || !isCloudSyncEnabled || dataArray.length === 0) return false;
        
        try {
            const { writeBatch, doc } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
            const batch = writeBatch(firestore);
            
            const batchSize = 50;
            const items = dataArray.slice(0, batchSize);
            
            for (const item of items) {
                const docId = this.getDocumentId(item);
                const docRef = doc(firestore, this.collectionName, docId);
                
                const dataWithTimestamp = {
                    ...item,
                    lastModified: new Date().toISOString(),
                    syncedAt: new Date().toISOString(),
                    syncedBy: window.currentMaster?.name || 'System'
                };
                
                batch.set(docRef, dataWithTimestamp, { merge: true });
            }
            
            await batch.commit();
            console.log(`📦 Batch-Upload: ${items.length} Items für ${this.collectionName}`);
            return true;
            
        } catch (error) {
            console.error(`❌ Batch-Upload fehlgeschlagen für ${this.collectionName}:`, error);
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
        console.log('🎯 SyncManager initialisiert');
    }
    
    async fullSync() {
        if (syncInProgress) {
            console.log('⏳ Synchronisation bereits aktiv');
            return false;
        }
        
        if (!isFirebaseAvailable || !isCloudSyncEnabled) {
            console.log('⚠️ Cloud-Sync nicht verfügbar oder deaktiviert');
            return false;
        }
        
        syncInProgress = true;
        updateSyncStatus('syncing', 'Cloud-Synchronisation läuft...');
        console.log('🚀 Starte vollständige Cloud-Synchronisation');
        
        try {
            let syncResults = {
                users: { uploaded: 0, downloaded: 0, errors: 0 },
                orders: { uploaded: 0, downloaded: 0, errors: 0 },
                activityLogs: { uploaded: 0, downloaded: 0, errors: 0 }
            };
            
            // Upload-Phase
            console.log('📤 Upload-Phase gestartet...');
            for (const [key, collection] of Object.entries(this.collections)) {
                try {
                    const uploadResult = await this.uploadLocalChanges(collection);
                    syncResults[key].uploaded = uploadResult;
                    console.log(`📤 ${key}: ${uploadResult} Items hochgeladen`);
                } catch (error) {
                    console.error(`❌ Upload-Fehler für ${key}:`, error);
                    syncResults[key].errors++;
                }
            }
            
            // Download-Phase
            console.log('📥 Download-Phase gestartet...');
            for (const [key, collection] of Object.entries(this.collections)) {
                try {
                    const downloadResult = await this.downloadCloudChanges(collection);
                    syncResults[key].downloaded = downloadResult;
                    console.log(`📥 ${key}: ${downloadResult} Items heruntergeladen`);
                } catch (error) {
                    console.error(`❌ Download-Fehler für ${key}:`, error);
                    syncResults[key].errors++;
                }
            }
            
            // System-Einstellungen
            await this.syncSystemSettings();
            
            const now = new Date().toISOString();
            lastSyncTime = now;
            localStorage.setItem('klarkraft_last_sync', now);
            
            const totalUploaded = Object.values(syncResults).reduce((sum, result) => sum + result.uploaded, 0);
            const totalDownloaded = Object.values(syncResults).reduce((sum, result) => sum + result.downloaded, 0);
            const totalErrors = Object.values(syncResults).reduce((sum, result) => sum + result.errors, 0);
            
            // Status mit Sync-Statistiken aktualisieren
            const syncStats = { uploaded: totalUploaded, downloaded: totalDownloaded, errors: totalErrors };
            updateSyncStatus('available', 'Cloud-Sync erfolgreich', now, syncStats);
            
            console.log(`✅ Cloud-Sync abgeschlossen: ${totalUploaded}↑ ${totalDownloaded}↓ ${totalErrors}❌`);
            
            // UI aktualisieren
            if (window.currentMaster && document.getElementById('masterDashboardModal')?.style.display === 'block') {
                setTimeout(() => {
                    if (typeof window.loadMasterOverview === 'function') {
                        window.loadMasterOverview();
                    }
                }, 1000);
            }
            
            return true;
            
        } catch (error) {
            console.error('❌ Cloud-Synchronisation fehlgeschlagen:', error);
            updateSyncStatus('error', `Cloud-Sync-Fehler: ${error.message}`);
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
        
        console.log(`📤 Upload ${unsyncedData.length} unsynced Items für ${collection.collectionName}`);
        
        let uploadedCount = 0;
        const batchSize = 50;
        
        for (let i = 0; i < unsyncedData.length; i += batchSize) {
            const batch = unsyncedData.slice(i, i + batchSize);
            try {
                await collection.batchSaveToCloud(batch);
                uploadedCount += batch.length;
                
                batch.forEach(item => {
                    const localIndex = localData.findIndex(localItem => 
                        collection.getDocumentId(localItem) === collection.getDocumentId(item)
                    );
                    if (localIndex !== -1) {
                        localData[localIndex].syncedAt = new Date().toISOString();
                    }
                });
            } catch (error) {
                console.error(`❌ Batch-Upload-Fehler für ${collection.collectionName}:`, error);
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
            console.error(`❌ Download-Fehler für ${collection.collectionName}:`, error);
            throw error;
        }
    }
    
    async syncSystemSettings() {
        try {
            const settings = {
                demoMode: localStorage.getItem('klarkraft_demo_mode') === 'true',
                cloudSyncEnabled: isCloudSyncEnabled,
                lastSync: lastSyncTime,
                version: '1.0.0',
                syncedBy: window.currentMaster?.name || 'System',
                lastModified: new Date().toISOString(),
                totalUsers: JSON.parse(localStorage.getItem('klarkraft_users') || '[]').length,
                totalOrders: JSON.parse(localStorage.getItem('klarkraft_orders') || '[]').length,
                appVersion: 'KlarKRAFT 1.0.0'
            };
            
            const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js');
            const settingsRef = doc(firestore, 'klarkraft_settings', 'system');
            await setDoc(settingsRef, settings, { merge: true });
            
            console.log('⚙️ System-Einstellungen in Cloud synchronisiert');
            return true;
        } catch (error) {
            console.error('❌ System-Settings-Sync fehlgeschlagen:', error);
            return false;
        }
    }
}

// ========== GLOBAL SYNC MANAGER ==========
const syncManager = new SyncManager();

// ========== AUTO SYNC ==========
function startAutoSync() {
    if (autoSyncInterval) {
        clearInterval(autoSyncInterval);
    }
    
    if (!isFirebaseAvailable || !isCloudSyncEnabled) {
        console.log('⚠️ Auto-Sync nicht gestartet - Firebase nicht verfügbar oder deaktiviert');
        return;
    }
    
    autoSyncInterval = setInterval(async () => {
        if (isFirebaseAvailable && isCloudSyncEnabled && !syncInProgress) {
            console.log('🔄 Automatische Cloud-Synchronisation...');
            await syncManager.fullSync();
        }
    }, 30000); // 30 Sekunden
    
    console.log('✅ Automatische Cloud-Synchronisation gestartet (alle 30s)');
}

function stopAutoSync() {
    if (autoSyncInterval) {
        clearInterval(autoSyncInterval);
        autoSyncInterval = null;
        console.log('⏹️ Auto-Sync gestoppt');
    }
}

// ========== PUBLIC API ==========
async function manualSync() {
    console.log('🔄 Manuelle Cloud-Synchronisation gestartet');
    
    if (!isCloudSyncEnabled) {
        const message = 'Cloud-Sync ist deaktiviert. Bitte aktivieren Sie es in den Einstellungen.';
        if (window.showNotification) {
            window.showNotification(message, 'warning');
        }
        return false;
    }
    
    if (!isFirebaseAvailable) {
        const message = 'Cloud nicht verfügbar. Internetverbindung prüfen!';
        if (window.showNotification) {
            window.showNotification(message, 'error');
        }
        updateSyncStatus('offline', 'Cloud nicht verfügbar');
        return false;
    }
    
    if (syncInProgress) {
        if (window.showNotification) {
            window.showNotification('⏳ Cloud-Synchronisation läuft bereits...', 'info');
        }
        return false;
    }
    
    try {
        if (window.showNotification) {
            window.showNotification('🔄 Cloud-Synchronisation gestartet...', 'sync');
        }
        
        const success = await syncManager.fullSync();
        
        if (success) {
            if (window.showNotification) {
                window.showNotification('✅ Cloud-Synchronisation erfolgreich!', 'success');
            }
        } else {
            if (window.showNotification) {
                window.showNotification('⚠️ Cloud-Synchronisation mit Fehlern.', 'warning');
            }
        }
        
        return success;
    } catch (error) {
        console.error('❌ Manuelle Cloud-Sync-Fehler:', error);
        if (window.showNotification) {
            window.showNotification('❌ Cloud-Sync fehlgeschlagen: ' + error.message, 'error');
        }
        return false;
    }
}

function triggerAutoSyncOnChange(dataType) {
    if (!isFirebaseAvailable || !isCloudSyncEnabled || syncInProgress) return;
    
    console.log(`🔄 Auto-Cloud-Sync getriggert durch ${dataType}-Änderung`);
    
    clearTimeout(window.autoSyncTimeout);
    window.autoSyncTimeout = setTimeout(async () => {
        console.log(`🔄 Auto-Cloud-Sync ausgeführt für ${dataType}`);
        await syncManager.fullSync();
    }, 5000);
}

async function checkCloudStatus() {
    console.log('🔍 Prüfe Cloud-Status...');
    updateSyncStatus('testing', 'Cloud-Verbindung wird geprüft...');
    
    try {
        if (!window.firebaseApp) {
            updateSyncStatus('offline', 'Firebase App nicht gefunden');
            return false;
        }
        
        initializationAttempts = 0;
        const available = await initializeFirebase();
        
        if (available) {
            const lastSync = localStorage.getItem('klarkraft_last_sync');
            if (lastSync) {
                lastSyncTime = lastSync;
            }
            updateSyncStatus(); // Automatische Status-Bestimmung
            return true;
        } else {
            updateSyncStatus('offline', 'Cloud-Verbindung fehlgeschlagen');
            return false;
        }
    } catch (error) {
        console.error('❌ Cloud-Status-Prüfung fehlgeschlagen:', error);
        updateSyncStatus('error', 'Cloud-Statusprüfung fehlgeschlagen');
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
            const btnText = isCloudSyncEnabled ? '🔄 Cloud synchronisieren' : '⏸️ Cloud-Sync deaktiviert';
            syncBtn.textContent = btnText;
            syncBtn.style.opacity = isCloudSyncEnabled ? '1' : '0.5';
            syncBtn.disabled = !isCloudSyncEnabled;
        }
        
        if (syncProgress) {
            syncProgress.style.display = 'none';
        }
    }
    
    // Toggle UI aktualisieren
    updateCloudSyncToggleUI();
}

// ========== NETWORK MONITORING ==========
function setupNetworkMonitoring() {
    window.addEventListener('online', async () => {
        console.log('🌐 Internetverbindung wiederhergestellt');
        if (window.showNotification) {
            window.showNotification('🌐 Online - Cloud-Sync verfügbar', 'info');
        }
        
        setTimeout(async () => {
            const available = await checkCloudStatus();
            if (available && isCloudSyncEnabled) {
                await manualSync();
            }
        }, 2000);
    });
    
    window.addEventListener('offline', () => {
        console.log('📴 Internetverbindung verloren');
        if (window.showNotification) {
            window.showNotification('📴 Offline - Daten werden lokal gespeichert', 'warning');
        }
        stopAutoSync();
        updateSyncStatus('offline', 'Keine Internetverbindung');
    });
}

// ========== FUNCTION OVERRIDES ==========
const originalCompleteOrder = window.completeOrder;
const originalUpdateOrderStatus = window.updateOrderStatus;
const originalHandleRegister = window.handleRegister;
const originalLogActivity = window.logActivity;

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
    console.log('🚀 Initialisiere Cloud-Synchronisation...');
    
    // Einstellungen laden
    loadCloudSyncSettings();
    
    setupNetworkMonitoring();
    updateSyncStatus();
    
    // Warte auf Firebase
    let attempts = 0;
    const maxAttempts = 10;
    
    const waitForFirebase = () => {
        attempts++;
        console.log(`⏳ Warte auf Firebase... (${attempts}/${maxAttempts})`);
        
        if (window.firebaseApp) {
            console.log('✅ Firebase App gefunden - starte Cloud-Initialisierung');
            setTimeout(() => {
                initializeFirebase();
            }, 1000);
        } else if (attempts < maxAttempts) {
            setTimeout(waitForFirebase, 1000);
        } else {
            console.log('❌ Firebase nach 10 Versuchen nicht gefunden');
            updateSyncStatus('offline', 'Firebase nicht verfügbar');
        }
    };
    
    waitForFirebase();
}

// ========== GLOBAL FUNCTIONS ==========
window.manualSync = manualSync;
window.checkCloudStatus = checkCloudStatus;
window.triggerAutoSyncOnChange = triggerAutoSyncOnChange;
window.toggleCloudSync = toggleCloudSync;
window.isFirebaseAvailable = () => isFirebaseAvailable;
window.syncInProgress = () => syncInProgress;
window.updateSyncUI = updateSyncUI;

// ========== AUTO-START ==========
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCloudSync);
} else {
    initializeCloudSync();
}

window.addEventListener('firebaseReady', () => {
    console.log('🔥 Firebase Ready Event empfangen');
    setTimeout(() => {
        checkCloudStatus();
    }, 1000);
});

console.log('🔥 Firebase Cloud-Synchronisation mit Toggle geladen');
