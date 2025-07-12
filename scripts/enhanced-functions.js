// ========== ENHANCED FUNCTIONS FOR FIREBASE INTEGRATION ==========
// Erweiterte Funktionen die in main.js integriert werden können

// ========== OVERRIDE EXISTING FUNCTIONS WITH SYNC TRIGGERS ==========

// Original-Funktionen erweitern um Auto-Sync
function enhanceExistingFunctions() {
    // Erweitere completeOrder
    const originalCompleteOrder = window.completeOrder;
    if (originalCompleteOrder) {
        window.completeOrder = function(...args) {
            const result = originalCompleteOrder.apply(this, args);
            
            // Trigger auto sync after order completion
            if (window.triggerAutoSyncOnChange) {
                window.triggerAutoSyncOnChange('order');
            }
            
            return result;
        };
    }

    // Erweitere handleRegister
    const originalHandleRegister = window.handleRegister;
    if (originalHandleRegister) {
        window.handleRegister = function(...args) {
            const result = originalHandleRegister.apply(this, args);
            
            // Trigger auto sync after user registration
            if (window.triggerAutoSyncOnChange) {
                window.triggerAutoSyncOnChange('user');
            }
            
            return result;
        };
    }

    // Erweitere logActivity
    const originalLogActivity = window.logActivity;
    if (originalLogActivity) {
        window.logActivity = function(...args) {
            const result = originalLogActivity.apply(this, args);
            
            // Trigger auto sync after activity logging
            if (window.triggerAutoSyncOnChange) {
                window.triggerAutoSyncOnChange('activity');
            }
            
            return result;
        };
    }

    // Erweitere updateOrderStatus
    const originalUpdateOrderStatus = window.updateOrderStatus;
    if (originalUpdateOrderStatus) {
        window.updateOrderStatus = function(...args) {
            const result = originalUpdateOrderStatus.apply(this, args);
            
            // Trigger auto sync after order status update
            if (window.triggerAutoSyncOnChange) {
                window.triggerAutoSyncOnChange('order');
            }
            
            return result;
        };
    }

    console.log('✅ Bestehende Funktionen erfolgreich erweitert für Auto-Sync');
}

// ========== EMAIL PREVIEW SYSTEM ==========

let currentEmailData = null;

function showEmailPreview(recipient, subject, content, mailtoLink) {
    currentEmailData = { recipient, subject, content, mailtoLink };
    
    // Prüfe ob Modal bereits existiert, falls nicht erstelle es
    let modal = document.getElementById('emailPreviewModal');
    if (!modal) {
        createEmailPreviewModal();
        modal = document.getElementById('emailPreviewModal');
    }
    
    document.getElementById('emailRecipient').textContent = recipient;
    document.getElementById('emailSubject').textContent = subject;
    document.getElementById('emailContent').textContent = content;
    
    modal.style.display = 'block';
    
    // Log für Aktivitäten
    if (window.logActivity) {
        window.logActivity('Email Preview', `Showed email preview for ${recipient}`);
    }
}

function createEmailPreviewModal() {
    const modalHtml = `
        <div id="emailPreviewModal" class="modal">
            <div class="modal-content" style="max-width: 900px;">
                <span class="close" onclick="closeEmailPreview()">&times;</span>
                <h2 style="color: #ff6b35; margin-bottom: 1rem;">📧 E-Mail Vorschau</h2>
                
                <div class="email-preview-header">
                    <div><strong>An:</strong> <span id="emailRecipient"></span></div>
                    <div><strong>Betreff:</strong> <span id="emailSubject"></span></div>
                </div>
                
                <div class="email-preview-content" id="emailContent"></div>
                
                <div class="email-preview-actions">
                    <button class="btn" onclick="openEmailClient()" style="background: #4caf50;">📧 E-Mail-Programm öffnen</button>
                    <button class="btn" onclick="copyEmailToClipboard()" style="background: #2196f3;">📋 Text kopieren</button>
                    <button class="btn" onclick="closeEmailPreview()" style="background: #9e9e9e;">Schließen</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeEmailPreview() {
    const modal = document.getElementById('emailPreviewModal');
    if (modal) {
        modal.style.display = 'none';
    }
    currentEmailData = null;
}

function openEmailClient() {
    if (currentEmailData && currentEmailData.mailtoLink) {
        window.open(currentEmailData.mailtoLink);
        closeEmailPreview();
        
        if (window.showNotification) {
            window.showNotification('📧 E-Mail-Programm geöffnet!');
        }
    }
}

function copyEmailToClipboard() {
    if (!currentEmailData) return;
    
    const emailText = `An: ${currentEmailData.recipient}\nBetreff: ${currentEmailData.subject}\n\n${currentEmailData.content}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(emailText).then(() => {
            if (window.showNotification) {
                window.showNotification('📋 E-Mail-Text in Zwischenablage kopiert!');
            }
        }).catch(() => {
            fallbackCopyToClipboard(emailText);
        });
    } else {
        fallbackCopyToClipboard(emailText);
    }
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        if (window.showNotification) {
            window.showNotification('📋 E-Mail-Text in Zwischenablage kopiert!');
        }
    } catch (err) {
        console.error('Fehler beim Kopieren:', err);
        if (window.showNotification) {
            window.showNotification('❌ Kopieren fehlgeschlagen');
        }
    }
    
    document.body.removeChild(textArea);
}

// ========== ENHANCED ORDER MANAGEMENT ==========

function enhancedCompleteOrder() {
    const originalFunction = window.completeOrder;
    
    return function(...args) {
        const result = originalFunction.apply(this, args);
        
        // Firebase Sync auslösen
        if (window.triggerAutoSyncOnChange) {
            setTimeout(() => {
                window.triggerAutoSyncOnChange('order');
            }, 1000);
        }
        
        return result;
    };
}

// ========== CLOUD STATUS MONITORING ==========

function initializeCloudStatusMonitoring() {
    // Prüfe alle 60 Sekunden den Cloud-Status
    setInterval(async () => {
        if (window.checkCloudStatus && !window.syncInProgress()) {
            await window.checkCloudStatus();
        }
    }, 60000);
    
    // Überwache Netzwerkstatus
    window.addEventListener('online', () => {
        setTimeout(async () => {
            if (window.checkCloudStatus) {
                await window.checkCloudStatus();
            }
            if (window.showNotification) {
                window.showNotification('🌐 Internetverbindung wiederhergestellt');
            }
        }, 2000);
    });
    
    window.addEventListener('offline', () => {
        if (window.showNotification) {
            window.showNotification('📴 Offline-Modus aktiviert');
        }
    });
}

// ========== ENHANCED NOTIFICATION SYSTEM ==========

function enhancedShowNotification(message, type = 'success', duration = 4000) {
    const notification = document.createElement('div');
    
    const typeStyles = {
        success: { bg: 'linear-gradient(135deg, #4caf50, #66bb6a)', icon: '✅' },
        error: { bg: 'linear-gradient(135deg, #f44336, #ef5350)', icon: '❌' },
        warning: { bg: 'linear-gradient(135deg, #ff9800, #ffb74d)', icon: '⚠️' },
        info: { bg: 'linear-gradient(135deg, #2196f3, #42a5f5)', icon: 'ℹ️' },
        sync: { bg: 'linear-gradient(135deg, #9c27b0, #ba68c8)', icon: '🔄' }
    };
    
    const style = typeStyles[type] || typeStyles.success;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${style.bg};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1001;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: slideInNotification 0.3s ease;
        max-width: 350px;
        word-wrap: break-word;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        line-height: 1.4;
    `;
    
    notification.innerHTML = `
        <span style="font-size: 16px;">${style.icon}</span>
        <span>${message}</span>
    `;
    
    // CSS für Animation hinzufügen falls nicht vorhanden
    if (!document.getElementById('notificationStyles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notificationStyles';
        styleSheet.textContent = `
            @keyframes slideInNotification {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove nach Duration
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideInNotification 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, duration);
    
    // Click zum Schließen
    notification.addEventListener('click', () => {
        if (notification.parentNode) {
            notification.remove();
        }
    });
}

// ========== ENHANCED SYNC UI MANAGEMENT ==========

function updateSyncUI() {
    // Erweiterte UI-Updates für besseres Sync-Feedback
    const syncBtn = document.getElementById('manualSyncBtn');
    const syncProgress = document.getElementById('syncProgress');
    
    if (window.syncInProgress && window.syncInProgress()) {
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

// ========== ENHANCED DATA EXPORT FUNCTIONS ==========

function enhancedExportAllData() {
    try {
        const allData = {
            users: JSON.parse(localStorage.getItem('klarkraft_users') || '[]'),
            orders: JSON.parse(localStorage.getItem('klarkraft_orders') || '[]'),
            activityLogs: JSON.parse(localStorage.getItem('klarkraft_activity_logs') || '[]'),
            settings: {
                demoMode: localStorage.getItem('klarkraft_demo_mode'),
                lastSync: localStorage.getItem('klarkraft_last_sync'),
                currentUser: localStorage.getItem('klarkraft_currentUser'),
                currentMaster: localStorage.getItem('klarkraft_currentMaster')
            },
            exportDate: new Date().toISOString(),
            version: '1.0.0'
        };
        
        const dataStr = JSON.stringify(allData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `klarkraft-export-${new Date().toISOString().split('T')[0]}.json`;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        if (window.showNotification) {
            window.showNotification('📥 Datenexport erfolgreich heruntergeladen!');
        }
        
        if (window.logActivity) {
            window.logActivity('Data Export', `Full data export completed`);
        }
        
    } catch (error) {
        console.error('Export-Fehler:', error);
        if (window.showNotification) {
            window.showNotification('❌ Export fehlgeschlagen: ' + error.message, 'error');
        }
    }
}

function enhancedClearTestData() {
    if (!confirm('🗑️ Wirklich alle Test-Daten löschen?\n\nDies entfernt:\n- Alle Bestellungen\n- Alle Aktivitätslogs\n- Demo-Benutzer\n\nEchte Kundendaten bleiben erhalten.')) {
        return;
    }
    
    try {
        // Test-Bestellungen löschen (Bestellungen der letzten 24h oder mit Test-Kennungen)
        const orders = JSON.parse(localStorage.getItem('klarkraft_orders') || '[]');
        const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const filteredOrders = orders.filter(order => {
            const orderDate = new Date(order.orderDate);
            const isTestOrder = order.customerEmail && (
                order.customerEmail.includes('test') || 
                order.customerEmail.includes('demo') ||
                order.customerEmail === 'max.mustermann@email.de'
            );
            return orderDate < yesterday && !isTestOrder;
        });
        
        // Test-Benutzer löschen
        const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
        const filteredUsers = users.filter(user => {
            return !user.email || (
                !user.email.includes('test') && 
                !user.email.includes('demo') &&
                user.email !== 'max.mustermann@email.de' &&
                user.email !== 'benutzer@gmail.com'
            );
        });
        
        // Aktivitätslogs der letzten 24h löschen
        const activityLogs = JSON.parse(localStorage.getItem('klarkraft_activity_logs') || '[]');
        const filteredLogs = activityLogs.filter(log => {
            const logDate = new Date(log.timestamp);
            return logDate < yesterday;
        });
        
        // Daten speichern
        localStorage.setItem('klarkraft_orders', JSON.stringify(filteredOrders));
        localStorage.setItem('klarkraft_users', JSON.stringify(filteredUsers));
        localStorage.setItem('klarkraft_activity_logs', JSON.stringify(filteredLogs));
        
        // UI aktualisieren
        if (window.currentMaster && document.getElementById('masterDashboardModal')?.style.display === 'block') {
            setTimeout(() => {
                if (window.loadMasterOverview) window.loadMasterOverview();
                if (window.loadMasterCustomers) window.loadMasterCustomers();
                if (window.loadMasterOrders) window.loadMasterOrders();
            }, 500);
        }
        
        // Sync auslösen
        if (window.triggerAutoSyncOnChange) {
            window.triggerAutoSyncOnChange('cleanup');
        }
        
        if (window.showNotification) {
            window.showNotification('🧹 Test-Daten erfolgreich bereinigt!');
        }
        
        if (window.logActivity) {
            window.logActivity('Data Cleanup', 'Test data cleared successfully');
        }
        
    } catch (error) {
        console.error('Fehler beim Bereinigen der Test-Daten:', error);
        if (window.showNotification) {
            window.showNotification('❌ Fehler beim Bereinigen: ' + error.message, 'error');
        }
    }
}

function enhancedResetAllData() {
    if (!confirm('⚠️ ACHTUNG: Wirklich ALLE Daten zurücksetzen?\n\nDies löscht unwiderruflich:\n- Alle Benutzer\n- Alle Bestellungen\n- Alle Aktivitätslogs\n- Alle Einstellungen\n\nDieser Vorgang kann NICHT rückgängig gemacht werden!')) {
        return;
    }
    
    const finalConfirm = prompt('Geben Sie "RESET" ein, um den vollständigen Reset zu bestätigen:', '');
    if (finalConfirm !== 'RESET') {
        if (window.showNotification) {
            window.showNotification('🔄 Reset abgebrochen', 'info');
        }
        return;
    }
    
    try {
        // Alle LocalStorage-Daten löschen
        const keysToRemove = [
            'klarkraft_users',
            'klarkraft_orders',
            'klarkraft_activity_logs',
            'klarkraft_currentUser',
            'klarkraft_currentMaster',
            'klarkraft_last_sync',
            'klarkraft_demo_mode'
        ];
        
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
        // Aktuellen User und Master abmelden
        window.currentUser = null;
        window.currentMaster = null;
        
        // UI zurücksetzen
        if (window.updateUserInterface) {
            window.updateUserInterface();
        }
        
        // Modals schließen
        if (window.closeModal) {
            window.closeModal();
        }
        
        // Zur Startseite
        if (window.showProducts) {
            window.showProducts();
        }
        
        if (window.showNotification) {
            window.showNotification('🔄 Alle Daten wurden erfolgreich zurückgesetzt!', 'info');
        }
        
        // Seite nach kurzer Verzögerung neu laden
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        
    } catch (error) {
        console.error('Fehler beim Reset:', error);
        if (window.showNotification) {
            window.showNotification('❌ Reset fehlgeschlagen: ' + error.message, 'error');
        }
    }
}

// ========== INTEGRATION FUNCTIONS ==========

function integrateEnhancedFunctions() {
    // Erweitere bestehende Funktionen
    enhanceExistingFunctions();
    
    // Überschreibe globale Funktionen mit erweiterten Versionen
    if (typeof window.showNotification === 'function') {
        window.originalShowNotification = window.showNotification;
        window.showNotification = enhancedShowNotification;
    }
    
    // Email-Funktionen global verfügbar machen
    window.showEmailPreview = showEmailPreview;
    window.closeEmailPreview = closeEmailPreview;
    window.openEmailClient = openEmailClient;
    window.copyEmailToClipboard = copyEmailToClipboard;
    
    // Erweiterte Export-Funktionen
    window.exportAllData = enhancedExportAllData;
    window.clearTestData = enhancedClearTestData;
    window.resetAllData = enhancedResetAllData;
    
    // UI-Management
    window.updateSyncUI = updateSyncUI;
    
    // Cloud Status Monitoring starten
    initializeCloudStatusMonitoring();
    
    console.log('✅ Erweiterte Funktionen erfolgreich integriert');
}

// ========== AUTO-INITIALIZATION ==========

// Automatische Integration wenn Firebase bereit ist
window.addEventListener('firebaseReady', () => {
    setTimeout(integrateEnhancedFunctions, 1000);
});

// Fallback für den Fall, dass Firebase bereits geladen ist
if (window.firebaseApp) {
    setTimeout(integrateEnhancedFunctions, 1000);
}

// Fallback für den Fall, dass Firebase nicht verfügbar ist
setTimeout(() => {
    if (!window.firebaseApp) {
        console.log('⚠️ Firebase nicht verfügbar - integriere erweiterte Funktionen ohne Cloud-Features');
        integrateEnhancedFunctions();
    }
}, 5000);

console.log('🔧 Enhanced Functions Modul geladen');
