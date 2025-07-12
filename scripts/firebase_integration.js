// ========== OPTIONAL FIREBASE INTEGRATION FÜR KLARKRAFT ==========
// Diese Datei separat als firebase-integration.js speichern und optional einbinden

// Firebase Configuration (bereits in index.html vorhanden)
// Stelle sicher, dass Firebase bereits initialisiert ist

// ========== FIREBASE HELPER FUNCTIONS ==========
let firebaseReady = false;

// Prüfe ob Firebase verfügbar ist
function checkFirebaseAvailability() {
    try {
        return typeof window.firebase !== 'undefined' && window.firebase.apps.length > 0;
    } catch (error) {
        console.warn('Firebase nicht verfügbar:', error);
        return false;
    }
}

// Initialisiere Firestore wenn verfügbar
function initializeFirestore() {
    if (!checkFirebaseAvailability()) {
        console.log('Firebase nicht verfügbar - verwende nur localStorage');
        return null;
    }
    
    try {
        const db = window.firebase.firestore();
        firebaseReady = true;
        console.log('✅ Firebase Firestore erfolgreich initialisiert');
        return db;
    } catch (error) {
        console.error('Firestore Initialisierung fehlgeschlagen:', error);
        return null;
    }
}

// ========== BENUTZER-SYNCHRONISATION ==========
async function syncUserToFirebase(userData) {
    if (!firebaseReady) return false;
    
    try {
        const db = window.firebase.firestore();
        await db.collection('users').doc(userData.customerId).set({
            ...userData,
            lastSync: new Date().toISOString(),
            syncVersion: 1
        });
        
        console.log(`✅ Benutzer ${userData.name} zu Firebase synchronisiert`);
        return true;
    } catch (error) {
        console.error('Benutzer-Sync fehlgeschlagen:', error);
        return false;
    }
}

async function syncOrderToFirebase(orderData) {
    if (!firebaseReady) return false;
    
    try {
        const db = window.firebase.firestore();
        await db.collection('orders').doc(orderData.orderId).set({
            ...orderData,
            lastSync: new Date().toISOString(),
            syncVersion: 1
        });
        
        console.log(`✅ Bestellung ${orderData.orderId} zu Firebase synchronisiert`);
        return true;
    } catch (error) {
        console.error('Bestellungs-Sync fehlgeschlagen:', error);
        return false;
    }
}

// ========== ERWEITERTE FUNKTIONEN MIT FIREBASE SUPPORT ==========

// Erweiterte updateUserData Funktion
function updateUserDataWithFirebase() {
    // Zuerst lokal speichern
    const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
    const userIndex = users.findIndex(u => u.customerId === currentUser.customerId);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('klarkraft_users', JSON.stringify(users));
    }
    localStorage.setItem('klarkraft_currentUser', JSON.stringify(currentUser));
    
    // Dann zu Firebase synchronisieren (falls verfügbar)
    if (firebaseReady) {
        syncUserToFirebase(currentUser).catch(error => {
            console.warn('Firebase Sync fehlgeschlagen, Daten nur lokal gespeichert:', error);
        });
    }
    
    updateUserInterface();
}

// Erweiterte completeOrder Funktion
function completeOrderWithFirebase(orderData) {
    // Zuerst lokal speichern
    orders.push(orderData);
    localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
    
    // Dann zu Firebase synchronisieren (falls verfügbar)
    if (firebaseReady) {
        syncOrderToFirebase(orderData).catch(error => {
            console.warn('Firebase Sync fehlgeschlagen, Bestellung nur lokal gespeichert:', error);
        });
    }
}

// ========== DATEN AUS FIREBASE LADEN ==========
async function loadUsersFromFirebase() {
    if (!firebaseReady) {
        return JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
    }
    
    try {
        const db = window.firebase.firestore();
        const snapshot = await db.collection('users').get();
        const firebaseUsers = [];
        
        snapshot.forEach(doc => {
            firebaseUsers.push({ id: doc.id, ...doc.data() });
        });
        
        console.log(`📥 ${firebaseUsers.length} Benutzer aus Firebase geladen`);
        return firebaseUsers;
    } catch (error) {
        console.error('Laden aus Firebase fehlgeschlagen:', error);
        return JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
    }
}

async function loadOrdersFromFirebase() {
    if (!firebaseReady) {
        return JSON.parse(localStorage.getItem('klarkraft_orders') || '[]');
    }
    
    try {
        const db = window.firebase.firestore();
        const snapshot = await db.collection('orders').orderBy('orderDate', 'desc').get();
        const firebaseOrders = [];
        
        snapshot.forEach(doc => {
            firebaseOrders.push({ id: doc.id, ...doc.data() });
        });
        
        console.log(`📥 ${firebaseOrders.length} Bestellungen aus Firebase geladen`);
        return firebaseOrders;
    } catch (error) {
        console.error('Laden aus Firebase fehlgeschlagen:', error);
        return JSON.parse(localStorage.getItem('klarkraft_orders') || '[]');
    }
}

// ========== AUTOMATISCHE SYNCHRONISATION ==========
async function syncAllDataToFirebase() {
    if (!firebaseReady) {
        console.log('Firebase nicht verfügbar - überspringe Synchronisation');
        return;
    }
    
    try {
        // Lade lokale Daten
        const localUsers = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
        const localOrders = JSON.parse(localStorage.getItem('klarkraft_orders') || '[]');
        
        // Synchronisiere Benutzer
        for (const user of localUsers) {
            await syncUserToFirebase(user);
            await new Promise(resolve => setTimeout(resolve, 100)); // Kleine Pause zwischen Anfragen
        }
        
        // Synchronisiere Bestellungen
        for (const order of localOrders) {
            await syncOrderToFirebase(order);
            await new Promise(resolve => setTimeout(resolve, 100)); // Kleine Pause zwischen Anfragen
        }
        
        console.log('✅ Vollständige Firebase-Synchronisation abgeschlossen');
        
        if (typeof showNotification === 'function') {
            showNotification('☁️ Daten erfolgreich in die Cloud synchronisiert!');
        }
        
    } catch (error) {
        console.error('Vollständige Synchronisation fehlgeschlagen:', error);
        
        if (typeof showNotification === 'function') {
            showNotification('⚠️ Cloud-Synchronisation teilweise fehlgeschlagen');
        }
    }
}

// ========== OFFLINE/ONLINE SYNCHRONISATION ==========
function setupOfflineSync() {
    if (!firebaseReady) return;
    
    // Versuche zu synchronisieren wenn online
    window.addEventListener('online', () => {
        console.log('📶 Internetverbindung wiederhergestellt - starte Synchronisation');
        setTimeout(() => {
            syncAllDataToFirebase();
        }, 1000);
    });
    
    // Warnung wenn offline
    window.addEventListener('offline', () => {
        console.log('📴 Internetverbindung verloren - Daten werden nur lokal gespeichert');
        
        if (typeof showNotification === 'function') {
            showNotification('📴 Offline-Modus: Daten werden lokal gespeichert');
        }
    });
}

// ========== FIREBASE ADMIN FUNKTIONEN ==========
async function exportFirebaseData() {
    if (!firebaseReady) {
        console.log('Firebase nicht verfügbar für Export');
        return null;
    }
    
    try {
        const [users, orders] = await Promise.all([
            loadUsersFromFirebase(),
            loadOrdersFromFirebase()
        ]);
        
        const exportData = {
            exportDate: new Date().toISOString(),
            source: 'Firebase',
            users: users,
            orders: orders,
            summary: {
                totalUsers: users.length,
                totalOrders: orders.length,
                totalRevenue: orders.reduce((sum, order) => sum + (order.total || 0), 0)
            }
        };
        
        return exportData;
    } catch (error) {
        console.error('Firebase Export fehlgeschlagen:', error);
        return null;
    }
}

async function clearFirebaseData() {
    if (!firebaseReady) {
        console.log('Firebase nicht verfügbar zum Löschen');
        return false;
    }
    
    try {
        const db = window.firebase.firestore();
        const batch = db.batch();
        
        // Lösche alle Benutzer
        const usersSnapshot = await db.collection('users').get();
        usersSnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
        
        // Lösche alle Bestellungen
        const ordersSnapshot = await db.collection('orders').get();
        ordersSnapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
        
        await batch.commit();
        console.log('🗑️ Firebase Daten erfolgreich gelöscht');
        
        return true;
    } catch (error) {
        console.error('Firebase Löschen fehlgeschlagen:', error);
        return false;
    }
}

// ========== INITIALIZATION ==========
function initializeFirebaseIntegration() {
    console.log('🔥 Initialisiere Firebase Integration...');
    
    // Prüfe Firebase Verfügbarkeit
    if (checkFirebaseAvailability()) {
        const db = initializeFirestore();
        
        if (db) {
            console.log('✅ Firebase Integration bereit');
            
            // Setup offline sync
            setupOfflineSync();
            
            // Initiale Synchronisation (nach 5 Sekunden)
            setTimeout(() => {
                console.log('🔄 Starte initiale Firebase-Synchronisation...');
                syncAllDataToFirebase();
            }, 5000);
            
            return true;
        }
    }
    
    console.log('ℹ️ Firebase Integration übersprungen - läuft im localStorage-Modus');
    return false;
}

// ========== ERSETZE ORIGINALE FUNKTIONEN (OPTIONAL) ==========
function enableFirebaseEnhancements() {
    if (!firebaseReady) return;
    
    // Ersetze updateUserData nur wenn Firebase verfügbar ist
    if (typeof window.updateUserData === 'function') {
        window.originalUpdateUserData = window.updateUserData;
        window.updateUserData = updateUserDataWithFirebase;
        console.log('🔄 updateUserData Funktion mit Firebase erweitert');
    }
    
    // Weitere Funktionen können hier erweitert werden...
}

// ========== AUTO-INITIALIZATION ==========
// Warte auf DOM-Bereitschaft und Firebase
document.addEventListener('DOMContentLoaded', function() {
    // Warte kurz bis Firebase geladen ist
    setTimeout(() => {
        const firebaseInitialized = initializeFirebaseIntegration();
        
        if (firebaseInitialized) {
            // Aktiviere Firebase-Erweiterungen nach weiteren 2 Sekunden
            setTimeout(() => {
                enableFirebaseEnhancements();
            }, 2000);
        }
    }, 1000);
});

// ========== UTILITY FUNCTIONS ==========
function getFirebaseStatus() {
    return {
        available: checkFirebaseAvailability(),
        ready: firebaseReady,
        online: navigator.onLine
    };
}

function manualFirebaseSync() {
    if (firebaseReady) {
        syncAllDataToFirebase();
    } else {
        console.log('Firebase nicht bereit für manuelle Synchronisation');
        if (typeof showNotification === 'function') {
            showNotification('⚠️ Firebase nicht verfügbar');
        }
    }
}

// Exportiere Funktionen für globale Nutzung
window.FirebaseIntegration = {
    sync: manualFirebaseSync,
    status: getFirebaseStatus,
    export: exportFirebaseData,
    clear: clearFirebaseData
};

console.log('🔥 Firebase Integration Modul geladen (bereit für Aktivierung)');