// scripts/app.js - Haupteinstiegspunkt der KlarKRAFT Anwendung
import { CONFIG } from './config.js';
import { 
    UserStorage, 
    OrderStorage, 
    ActivityStorage, 
    SettingsStorage, 
    DataManager 
} from './storage.js';
import { 
    BusinessUtils, 
    UIUtils, 
    Formatter, 
    ArrayUtils, 
    ErrorHandler,
    IDGenerator
} from './utils.js';
import { authManager } from './auth.js';
import { cartManager } from './cart.js';
import { productManager } from './products.js';
import { masterManager } from './master.js';

/**
 * Main Application Class
 */
class KlarKraftApp {
    constructor() {
        this.isInitialized = false;
        this.modules = {};
        this.eventTarget = new EventTarget();
        
        // Bind methods
        this.init = this.init.bind(this);
        this.setupEventListeners = this.setupEventListeners.bind(this);
        this.setupGlobalMethods = this.setupGlobalMethods.bind(this);
    }

    /**
     * Anwendung initialisieren
     */
    async init() {
        try {
            console.log('🚀 KlarKRAFT Shop wird initialisiert...');
            
            // 1. Demo-Modus initialisieren
            this.initializeDemoMode();
            
            // 2. Module registrieren und verfügbar machen
            this.registerModules();
            
            // 3. WICHTIG: Globale Methoden für HTML SOFORT verfügbar machen
            this.setupGlobalMethods();
            
            // 4. Sessions wiederherstellen
            await this.restoreSessions();
            
            // 5. Event-Listener für Formulare
            this.setupEventListeners();
            
            // 6. Demo-Daten erstellen
            this.createDemoData();
            
            // 7. UI initialisieren
            this.initializeUI();
            
            // 8. Module-übergreifende Events verbinden
            this.connectModuleEvents();
            
            console.log('🎉 KlarKRAFT Shop erfolgreich initialisiert!');
            this.isInitialized = true;
            
            // Emit app ready event
            this.eventTarget.dispatchEvent(new CustomEvent('appReady'));
            
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'KlarKraftApp.init');
        }
    }

    /**
     * Demo-Modus initialisieren
     */
    initializeDemoMode() {
        if (SettingsStorage.getDemoMode() === null) {
            SettingsStorage.setDemoMode(false);
            console.log('🎮 Demo-Modus initialisiert: AUS');
        } else {
            console.log('🎮 Demo-Modus Status:', SettingsStorage.getDemoMode() ? 'AN' : 'AUS');
        }
    }

    /**
     * Module registrieren
     */
    registerModules() {
        this.modules = {
            auth: authManager,
            cart: cartManager,
            products: productManager,
            master: masterManager
        };

        // Module global verfügbar machen
        window.authManager = authManager;
        window.cartManager = cartManager;
        window.productManager = productManager;
        window.masterManager = masterManager;
        window.app = this;

        console.log('📦 Module registriert:', Object.keys(this.modules));
    }

    /**
     * KRITISCH: Globale Methoden für HTML onclick events sofort verfügbar machen
     */
    setupGlobalMethods() {
        console.log('🔧 Globale Methoden werden eingerichtet...');
        
        // === HAUPTNAVIGATION ===
        window.showProducts = () => {
            this.showProducts();
        };
        
        window.showAuth = () => {
            if (authManager && authManager.showAuth) {
                authManager.showAuth();
            } else {
                UIUtils.showModal('authModal');
            }
        };
        
        window.showCart = () => {
            if (cartManager && cartManager.showCart) {
                cartManager.showCart();
            } else {
                UIUtils.showModal('cartModal');
            }
        };
        
        window.showProfile = () => {
            if (authManager && authManager.showProfile) {
                authManager.showProfile();
            } else {
                this.showProfilePage();
            }
        };
        
        window.logout = () => {
            if (authManager && authManager.logout) {
                authManager.logout();
            }
        };
        
        // === MODAL MANAGEMENT ===
        window.closeModal = () => {
            UIUtils.hideModal();
        };
        
        window.showLegalModal = (type) => {
            this.showLegalModal(type);
        };
        
        // === PRODUKT-FUNKTIONEN ===
        window.showProductDetail = (productId) => {
            if (productManager && productManager.showProductDetail) {
                productManager.showProductDetail(productId);
            }
        };
        
        window.addToCart = (productId, quantity = 1) => {
            if (cartManager && cartManager.addProduct) {
                const product = productManager?.getProductById(productId);
                if (product) {
                    cartManager.addProduct(product, quantity);
                }
            }
        };
        
        // === AUTH FUNKTIONEN ===
        window.quickLogin = () => {
            if (authManager && authManager.quickLogin) {
                authManager.quickLogin();
            }
        };
        
        window.quickRegister = () => {
            if (authManager && authManager.quickRegister) {
                authManager.quickRegister();
            }
        };
        
        window.googleAuth = () => {
            if (authManager && authManager.googleAuth) {
                authManager.googleAuth();
            }
        };
        
        window.switchAuthTab = (tab) => {
            this.switchAuthTab(tab);
        };
        
        // === CART FUNKTIONEN ===
        window.togglePaymentOptions = () => {
            const selector = document.getElementById('paymentMethodSelector');
            if (selector) {
                const isHidden = selector.style.display === 'none';
                selector.style.display = isHidden ? 'block' : 'none';
                
                const btn = document.getElementById('togglePaymentBtn');
                if (btn) {
                    btn.textContent = isHidden ? 'Ausblenden' : 'Andere Zahlungsmethode wählen';
                }
            }
        };
        
        window.selectPaymentMethod = (method) => {
            // Remove active class from all buttons
            document.querySelectorAll('.payment-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to selected button
            const selectedBtn = document.getElementById(`${method}Btn`);
            if (selectedBtn) {
                selectedBtn.classList.add('active');
            }
            
            // Show payment form
            this.showPaymentForm(method);
        };
        
        window.completeOrder = () => {
            if (cartManager && cartManager.completeOrder) {
                cartManager.completeOrder();
            }
        };
        
        window.cancelOrder = () => {
            const confirmation = document.getElementById('orderConfirmation');
            if (confirmation) {
                confirmation.style.display = 'none';
            }
        };
        
        // === MASTER FUNKTIONEN ===
        window.showMasterLogin = () => {
            if (masterManager && masterManager.showMasterLogin) {
                masterManager.showMasterLogin();
            } else {
                UIUtils.showModal('masterLoginModal');
            }
        };
        
        window.handleMasterLogin = (event) => {
            if (masterManager && masterManager.handleMasterLogin) {
                masterManager.handleMasterLogin(event);
            }
        };
        
        window.quickMasterLogin = (type) => {
            if (masterManager && masterManager.quickMasterLogin) {
                masterManager.quickMasterLogin(type);
            }
        };
        
        window.masterLogout = () => {
            if (masterManager && masterManager.masterLogout) {
                masterManager.masterLogout();
            }
        };
        
        window.showMasterDashboard = () => {
            if (masterManager && masterManager.showMasterDashboard) {
                masterManager.showMasterDashboard();
            }
        };
        
        window.switchMasterTab = (tab) => {
            if (masterManager && masterManager.switchMasterTab) {
                masterManager.switchMasterTab(tab);
            }
        };
        
        window.showNewOrders = () => {
            if (masterManager && masterManager.showNewOrders) {
                masterManager.showNewOrders();
            }
        };
        
        // === FORMULAR HANDLER ===
        window.updatePersonalData = (event) => {
            if (authManager && authManager.updatePersonalData) {
                authManager.updatePersonalData(event);
            }
        };
        
        window.updateShippingAddress = (event) => {
            if (authManager && authManager.updateShippingAddress) {
                authManager.updateShippingAddress(event);
            }
        };
        
        window.changePassword = (event) => {
            if (authManager && authManager.changePassword) {
                authManager.changePassword(event);
            }
        };
        
        // === ZUSÄTZLICHE MASTER FUNKTIONEN ===
        window.processOrder = (orderId) => {
            if (masterManager && masterManager.processOrder) {
                masterManager.processOrder(orderId);
            }
        };
        
        window.quickUpdateOrderStatus = (orderId, status) => {
            if (masterManager && masterManager.quickUpdateOrderStatus) {
                masterManager.quickUpdateOrderStatus(orderId, status);
            }
        };
        
        window.viewOrderDetailsInModal = (orderId) => {
            if (masterManager && masterManager.viewOrderDetails) {
                masterManager.viewOrderDetails(orderId);
            }
        };
        
        window.toggleDemoMode = () => {
            if (masterManager && masterManager.toggleDemoMode) {
                masterManager.toggleDemoMode();
            }
        };
        
        window.clearTestData = () => {
            if (masterManager && masterManager.clearTestData) {
                masterManager.clearTestData();
            }
        };
        
        window.resetAllData = () => {
            if (masterManager && masterManager.resetAllData) {
                masterManager.resetAllData();
            }
        };
        
        window.exportAllData = () => {
            if (masterManager && masterManager.exportAllData) {
                masterManager.exportAllData();
            }
        };
        
        window.exportCustomersCSV = () => {
            if (masterManager && masterManager.exportCustomersCSV) {
                masterManager.exportCustomersCSV();
            }
        };
        
        window.exportOrdersCSV = () => {
            if (masterManager && masterManager.exportOrdersCSV) {
                masterManager.exportOrdersCSV();
            }
        };
        
        window.showAddPaymentMethod = () => {
            UIUtils.showModal('addPaymentModal');
        };
        
        window.selectNewPaymentMethod = (method) => {
            // Ähnlich wie selectPaymentMethod aber für das Add Modal
            document.querySelectorAll('#addPaymentModal .payment-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            const selectedBtn = document.getElementById(`new${method.charAt(0).toUpperCase() + method.slice(1)}Btn`);
            if (selectedBtn) {
                selectedBtn.classList.add('active');
            }
            
            this.showNewPaymentForm(method);
        };
        
        console.log('✅ Alle globalen Methoden erfolgreich eingerichtet');
    }

    /**
     * Sessions wiederherstellen
     */
    async restoreSessions() {
        try {
            // User-Session wiederherstellen
            const userRestored = authManager.restoreSession();
            if (userRestored) {
                console.log('✅ Benutzer-Session wiederhergestellt');
            }

            // Master-Session wiederherstellen
            const masterRestored = masterManager.restoreSession();
            if (masterRestored) {
                console.log('✅ Master-Session wiederhergestellt');
            }

            // Benutzer-Datenbank migrieren falls nötig
            this.migrateUserDatabase();
            
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'KlarKraftApp.restoreSessions');
        }
    }

    /**
     * Event-Listener für Formulare einrichten
     */
    setupEventListeners() {
        // Warten bis DOM vollständig geladen ist
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.addFormEventListeners());
        } else {
            this.addFormEventListeners();
        }

        // Global window click handler für Modals
        window.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal')) {
                UIUtils.hideModal();
            }
        });

        console.log('👂 Event-Listener eingerichtet');
    }

    /**
     * Formular Event-Listener hinzufügen
     */
    addFormEventListeners() {
        console.log('🔧 Formular Event-Listener werden hinzugefügt...');
        
        // Customer login form
        const loginForm = document.getElementById('customerLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (authManager && authManager.handleLogin) {
                    authManager.handleLogin(e);
                }
                return false;
            }, { passive: false });
            console.log('✅ Login-Formular Event-Listener hinzugefügt');
        }
        
        // Customer register form
        const registerForm = document.getElementById('customerRegisterForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (authManager && authManager.handleRegister) {
                    authManager.handleRegister(e);
                }
                return false;
            }, { passive: false });
            console.log('✅ Register-Formular Event-Listener hinzugefügt');
        }
        
        // Personal data form
        const personalForm = document.getElementById('personalDataForm');
        if (personalForm) {
            personalForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (authManager && authManager.updatePersonalData) {
                    authManager.updatePersonalData(e);
                }
                return false;
            });
            console.log('✅ Personal-Data-Formular Event-Listener hinzugefügt');
        }
        
        // Shipping address form
        const shippingForm = document.getElementById('shippingAddressForm');
        if (shippingForm) {
            shippingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (authManager && authManager.updateShippingAddress) {
                    authManager.updateShippingAddress(e);
                }
                return false;
            });
            console.log('✅ Shipping-Address-Formular Event-Listener hinzugefügt');
        }
        
        // Password change form
        const passwordForm = document.getElementById('passwordChangeForm');
        if (passwordForm) {
            passwordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (authManager && authManager.handlePasswordChange) {
                    authManager.handlePasswordChange(e);
                }
                return false;
            });
            console.log('✅ Password-Change-Formular Event-Listener hinzugefügt');
        }

        // Master login form
        const masterForm = document.getElementById('masterLoginForm');
        if (masterForm) {
            masterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (masterManager && masterManager.handleMasterLogin) {
                    masterManager.handleMasterLogin(e);
                }
                return false;
            });
            console.log('✅ Master-Login-Formular Event-Listener hinzugefügt');
        }

        // Try again after delay to ensure all forms are loaded
        setTimeout(() => this.addFormEventListenersRetry(), 100);
        setTimeout(() => this.addFormEventListenersRetry(), 500);
    }

    /**
     * Retry für Event-Listener (Fallback)
     */
    addFormEventListenersRetry() {
        const forms = [
            'customerLoginForm',
            'customerRegisterForm', 
            'personalDataForm',
            'shippingAddressForm',
            'passwordChangeForm',
            'masterLoginForm'
        ];

        forms.forEach(formId => {
            const form = document.getElementById(formId);
            if (form && !form.dataset.listenerAdded) {
                form.dataset.listenerAdded = 'true';
                console.log(`🔄 Retry: Event-Listener für ${formId} hinzugefügt`);
            }
        });
    }

    /**
     * Demo-Daten erstellen
     */
    createDemoData() {
        const users = UserStorage.getUsers();
        const demoUsers = [
            {
                customerId: 'DEMO001',
                name: 'Max Mustermann',
                email: 'max.mustermann@email.de',
                password: 'demo123',
                phone: '+49 123 456789',
                address: 'Musterstraße 123',
                city: 'Musterstadt',
                zip: '12345',
                country: 'Deutschland',
                registrationDate: new Date().toISOString(),
                totalOrders: 3,
                totalSpent: 459.97,
                paymentMethods: [
                    {
                        type: 'paypal',
                        email: 'max.mustermann@email.de'
                    },
                    {
                        type: 'sepa',
                        name: 'Max Mustermann',
                        iban: 'DE89370400440532013000',
                        bic: 'COBADEFFXXX',
                        mandate: true
                    }
                ]
            },
            {
                customerId: 'DEMO002',
                name: 'Anna Schmidt',
                email: 'anna.schmidt@gmail.com',
                password: 'demo123',
                phone: '+49 987 654321',
                address: 'Energieweg 45',
                city: 'Krefeld',
                zip: '47803',
                country: 'Deutschland',
                registrationDate: new Date().toISOString(),
                totalOrders: 1,
                totalSpent: 199.99,
                paymentMethods: [
                    {
                        type: 'card',
                        name: 'Anna Schmidt',
                        number: '4111111111111111',
                        expiry: '12/25',
                        cvv: '123'
                    }
                ]
            },
            {
                customerId: 'DEMO003',
                name: 'Thomas Weber',
                email: 'thomas.weber@web.de',
                password: 'demo123',
                phone: '+49 555 123456',
                address: 'Kraftstraße 789',
                city: 'München',
                zip: '80331',
                country: 'Deutschland',
                registrationDate: new Date().toISOString(),
                totalOrders: 0,
                totalSpent: 0,
                paymentMethods: []
            }
        ];
        
        let newUsersAdded = false;
        demoUsers.forEach(demoUser => {
            if (!users.find(u => u.email === demoUser.email)) {
                UserStorage.addUser(demoUser);
                newUsersAdded = true;
                console.log(`✅ Demo-Benutzer erstellt: ${demoUser.name} (${demoUser.email})`);
            }
        });
        
        if (newUsersAdded) {
            console.log('✅ Demo-Benutzer erstellt und gespeichert');
        }
        
        // Debug: Show all users
        const allUsers = UserStorage.getUsers();
        console.log('📋 Alle Benutzer im System:', allUsers.length);
        allUsers.forEach(user => {
            console.log(`- ${user.name} (${user.email})`);
        });
    }

    /**
     * UI initialisieren
     */
    initializeUI() {
        // Produkte rendern
        if (productManager && productManager.renderProducts) {
            productManager.renderProducts();
        }
        
        // UI-State aktualisieren
        if (authManager && authManager.updateUI) {
            authManager.updateUI();
        }
        if (masterManager && masterManager.updateUI) {
            masterManager.updateUI();
        }
        if (cartManager && cartManager.updateCartCounter) {
            cartManager.updateCartCounter();
        }
        
        console.log('🎨 UI initialisiert');
    }

    /**
     * Module-übergreifende Events verbinden
     */
    connectModuleEvents() {
        // Auth -> Master: User logout -> Master logout
        if (authManager && authManager.addEventListener) {
            authManager.addEventListener('userLoggedOut', () => {
                if (masterManager && masterManager.isMasterLoggedIn) {
                    masterManager.masterLogout();
                }
            });
        }

        // Master -> Auth: Master login -> User logout
        if (masterManager && masterManager.addEventListener) {
            masterManager.addEventListener('masterLoggedIn', () => {
                if (authManager && authManager.isLoggedIn) {
                    authManager.logout();
                }
            });
        }

        // Cart -> Master: New order -> Update orders counter
        if (cartManager && cartManager.addEventListener) {
            cartManager.addEventListener('newOrder', (event) => {
                if (masterManager && masterManager.isMasterLoggedIn) {
                    masterManager.handleNewOrder(event.detail.order);
                    
                    // Demo mode logic
                    const demoModeEnabled = SettingsStorage.getDemoMode();
                    const hasMasterSession = masterManager.isMasterLoggedIn;
                    
                    if (demoModeEnabled && !hasMasterSession) {
                        this.startDemoOrderProcessing(event.detail.order);
                    }
                }
            });
        }

        // Master -> UI: Status changes -> Update UI
        if (masterManager && masterManager.addEventListener) {
            masterManager.addEventListener('masterLoggedIn', () => {
                if (authManager && authManager.updateUI) {
                    authManager.updateUI();
                }
            });

            masterManager.addEventListener('masterLoggedOut', () => {
                if (authManager && authManager.updateUI) {
                    authManager.updateUI();
                }
            });
        }

        console.log('🔗 Module-Events verbunden');
    }

    /**
     * Demo-Bestellverarbeitung starten
     */
    startDemoOrderProcessing(order) {
        console.log('🤖 Demo-Modus: Automatische Bearbeitung gestartet für Bestellung', order.orderId);
        
        UIUtils.showNotification('🤖 Demo-Modus: Automatische Bearbeitung gestartet', 'info');
        
        // Nach 5 Sekunden: In Bearbeitung
        setTimeout(() => {
            const success = OrderStorage.updateOrder(order.orderId, {
                status: 'processing',
                autoProcessedBy: 'Demo-System',
                processedAt: new Date().toISOString()
            });
            
            if (success) {
                UIUtils.showNotification(`📦 Demo: Bestellung #${order.orderId} wird bearbeitet`, 'info');
            }
        }, 5000);
        
        // Nach 10 Sekunden: Versendet
        setTimeout(() => {
            const success = OrderStorage.updateOrder(order.orderId, {
                status: 'completed',
                autoCompletedBy: 'Demo-System',
                completedAt: new Date().toISOString()
            });
            
            if (success) {
                UIUtils.showNotification(`🚚 Demo: Bestellung #${order.orderId} wurde versendet!`, 'success');
            }
        }, 10000);
    }

    /**
     * Benutzer-Datenbank migrieren
     */
    migrateUserDatabase() {
        const users = UserStorage.getUsers();
        let needsUpdate = false;
        
        users.forEach(user => {
            if (!user.customerId) {
                user.customerId = IDGenerator.generateCustomerId();
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
            users.forEach(user => UserStorage.updateUser(user));
            console.log('✅ Benutzer-Datenbank migriert');
        }
    }

    /**
     * Hauptproduktseite anzeigen
     */
    showProducts() {
        // Main content zeigen, Profile verstecken
        const mainContent = document.getElementById('mainContent');
        const profilePage = document.getElementById('profilePage');
        
        if (mainContent) mainContent.classList.remove('hidden');
        if (profilePage) profilePage.classList.remove('active');
        
        UIUtils.hideModal();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    /**
     * Profil-Seite anzeigen
     */
    showProfilePage() {
        const mainContent = document.getElementById('mainContent');
        const profilePage = document.getElementById('profilePage');
        
        if (mainContent) mainContent.classList.add('hidden');
        if (profilePage) profilePage.classList.add('active');
        
        UIUtils.hideModal();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Auth Tab wechseln
     */
    switchAuthTab(tab) {
        // Remove active from all tabs and forms
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        
        // Add active to selected tab and form
        const selectedTab = document.querySelector(`.auth-tab:nth-child(${tab === 'login' ? '1' : '2'})`);
        const selectedForm = document.getElementById(`${tab}Form`);
        
        if (selectedTab) selectedTab.classList.add('active');
        if (selectedForm) selectedForm.classList.add('active');
    }

    /**
     * Payment Form anzeigen
     */
    showPaymentForm(method) {
        const formsContainer = document.getElementById('paymentForms');
        if (!formsContainer) return;
        
        const forms = {
            paypal: `
                <div class="payment-form">
                    <h4>💳 PayPal</h4>
                    <div class="form-group">
                        <label for="paypalEmail">PayPal E-Mail:</label>
                        <input type="email" id="paypalEmail" required>
                    </div>
                </div>
            `,
            sepa: `
                <div class="payment-form">
                    <h4>🏦 SEPA-Lastschrift</h4>
                    <div class="form-group">
                        <label for="sepaName">Name:</label>
                        <input type="text" id="sepaName" required>
                    </div>
                    <div class="form-group">
                        <label for="sepaIban">IBAN:</label>
                        <input type="text" id="sepaIban" required>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="sepaMandate" required>
                            Ich erteile das SEPA-Lastschriftmandat
                        </label>
                    </div>
                </div>
            `,
            card: `
                <div class="payment-form">
                    <h4>💳 Kreditkarte</h4>
                    <div class="form-group">
                        <label for="cardName">Name auf der Karte:</label>
                        <input type="text" id="cardName" required>
                    </div>
                    <div class="form-group">
                        <label for="cardNumber">Kartennummer:</label>
                        <input type="text" id="cardNumber" required>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label for="cardExpiry">Gültig bis (MM/JJ):</label>
                            <input type="text" id="cardExpiry" required>
                        </div>
                        <div class="form-group">
                            <label for="cardCvv">CVV:</label>
                            <input type="text" id="cardCvv" required>
                        </div>
                    </div>
                </div>
            `
        };
        
        formsContainer.innerHTML = forms[method] || '';
    }

    /**
     * Neue Payment Form anzeigen (für Add Modal)
     */
    showNewPaymentForm(method) {
        const formsContainer = document.getElementById('newPaymentForms');
        if (!formsContainer) return;
        
        // Gleiche Forms wie oben, aber mit anderen IDs
        const forms = {
            paypal: `
                <div class="payment-form">
                    <h4>💳 PayPal</h4>
                    <div class="form-group">
                        <label for="newPaypalEmail">PayPal E-Mail:</label>
                        <input type="email" id="newPaypalEmail" required>
                    </div>
                    <button class="btn" onclick="saveNewPaymentMethod('paypal')">Zahlungsmethode speichern</button>
                </div>
            `,
            sepa: `
                <div class="payment-form">
                    <h4>🏦 SEPA-Lastschrift</h4>
                    <div class="form-group">
                        <label for="newSepaName">Name:</label>
                        <input type="text" id="newSepaName" required>
                    </div>
                    <div class="form-group">
                        <label for="newSepaIban">IBAN:</label>
                        <input type="text" id="newSepaIban" required>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="newSepaMandate" required>
                            Ich erteile das SEPA-Lastschriftmandat
                        </label>
                    </div>
                    <button class="btn" onclick="saveNewPaymentMethod('sepa')">Zahlungsmethode speichern</button>
                </div>
            `,
            card: `
                <div class="payment-form">
                    <h4>💳 Kreditkarte</h4>
                    <div class="form-group">
                        <label for="newCardName">Name auf der Karte:</label>
                        <input type="text" id="newCardName" required>
                    </div>
                    <div class="form-group">
                        <label for="newCardNumber">Kartennummer:</label>
                        <input type="text" id="newCardNumber" required>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label for="newCardExpiry">Gültig bis (MM/JJ):</label>
                            <input type="text" id="newCardExpiry" required>
                        </div>
                        <div class="form-group">
                            <label for="newCardCvv">CVV:</label>
                            <input type="text" id="newCardCvv" required>
                        </div>
                    </div>
                    <button class="btn" onclick="saveNewPaymentMethod('card')">Zahlungsmethode speichern</button>
                </div>
            `
        };
        
        formsContainer.innerHTML = forms[method] || '';
        
        // Globale Funktion für das Speichern
        window.saveNewPaymentMethod = (method) => {
            UIUtils.showNotification('✅ Zahlungsmethode gespeichert!', 'success');
            UIUtils.hideModal('addPaymentModal');
        };
    }

    /**
     * Legal Modal anzeigen
     */
    showLegalModal(type) {
        const content = document.getElementById('legalContent');
        if (!content) return;

        const legalTexts = {
            impressum: `
                <h2>Impressum</h2>
                <h3>Angaben gemäß § 5 TMG</h3>
                <p><strong>KlarKRAFT GmbH</strong><br>
                Energiestraße 15<br>
                47803 Krefeld<br>
                Deutschland</p>
                
                <h3>Vertreten durch:</h3>
                <p>Geschäftsführer: Marcus Energius</p>
                
                <h3>Kontakt:</h3>
                <p>Telefon: +49 (0) 2151 - 892347<br>
                E-Mail: info@klarkraft.de</p>
                
                <h3>Registereintrag:</h3>
                <p>Eintragung im Handelsregister<br>
                Registergericht: Amtsgericht Krefeld<br>
                Registernummer: HRB 12345</p>
                
                <h3>Umsatzsteuer-ID:</h3>
                <p>Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: DE123456789</p>
            `,
            agb: `
                <h2>Allgemeine Geschäftsbedingungen (AGB)</h2>
                <h3>§ 1 Geltungsbereich</h3>
                <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Geschäfte zwischen der KlarKRAFT GmbH und ihren Kunden.</p>
                
                <h3>§ 2 Vertragsschluss</h3>
                <p>Mit der Bestellung bieten Sie uns den Abschluss eines Kaufvertrages verbindlich an. Wir nehmen Ihr Angebot durch Versendung einer Auftragsbestätigung oder durch Lieferung der Ware an.</p>
                
                <h3>§ 3 Preise und Zahlung</h3>
                <p>Alle Preise verstehen sich inklusive der gesetzlichen Mehrwertsteuer. Die Zahlung erfolgt wahlweise per PayPal, Lastschrift oder Kreditkarte.</p>
                
                <h3>§ 4 Lieferung und Versand</h3>
                <p>Die Lieferung erfolgt innerhalb von 3-5 Werktagen nach Zahlungseingang. Versandkostenfrei ab einem Bestellwert von 150€.</p>
                
                <h3>§ 5 Widerrufsrecht</h3>
                <p>Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
            `,
            datenschutz: `
                <h2>Datenschutzerklärung</h2>
                <h3>1. Datenschutz auf einen Blick</h3>
                <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen.</p>
                
                <h3>2. Allgemeine Hinweise und Pflichtinformationen</h3>
                <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
                
                <h3>3. Datenerfassung auf unserer Website</h3>
                <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
                
                <h3>4. Ihre Rechte</h3>
                <p>Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten.</p>
            `,
            widerruf: `
                <h2>Widerrufsrecht</h2>
                <h3>Widerrufsbelehrung</h3>
                <p><strong>Widerrufsrecht</strong></p>
                <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
                
                <p>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.</p>
                
                <p>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (KlarKRAFT GmbH, Energiestraße 15, 47803 Krefeld, Tel: +49 (0) 2151 - 892347, E-Mail: widerruf@klarkraft.de) mittels einer eindeutigen Erklärung über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
                
                <h3>Folgen des Widerrufs</h3>
                <p>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.</p>
            `,
            versand: `
                <h2>Versand & Zahlung</h2>
                <h3>Versandkosten</h3>
                <ul>
                    <li>Deutschland: 6,90€ (versandkostenfrei ab 150€)</li>
                    <li>EU-Länder: 12,90€ (versandkostenfrei ab 200€)</li>
                    <li>Schweiz: 16,90€</li>
                </ul>
                
                <h3>Lieferzeiten</h3>
                <ul>
                    <li>Deutschland: 3-5 Werktage</li>
                    <li>EU-Länder: 5-8 Werktage</li>
                    <li>Schweiz: 7-10 Werktage</li>
                </ul>
                
                <h3>Zahlungsmethoden</h3>
                <ul>
                    <li>PayPal</li>
                    <li>SEPA-Lastschrift</li>
                    <li>Kreditkarte (Visa, Mastercard)</li>
                    <li>Rechnung (für Bestandskunden)</li>
                </ul>
                
                <h3>Verpackung</h3>
                <p>Alle Produkte werden sorgfältig in nachhaltigen Materialien verpackt und mit energetischem Schutz versehen.</p>
            `,
            kontakt: `
                <h2>Kontakt</h2>
                <h3>KlarKRAFT GmbH</h3>
                <p><strong>Adresse:</strong><br>
                Energiestraße 15<br>
                47803 Krefeld<br>
                Deutschland</p>
                
                <p><strong>Telefon:</strong> +49 (0) 2151 - 892347<br>
                <strong>E-Mail:</strong> info@klarkraft.de</p>
                
                <h3>Öffnungszeiten Kundenservice:</h3>
                <p>Montag - Freitag: 9:00 - 18:00 Uhr<br>
                Samstag: 10:00 - 14:00 Uhr</p>
                
                <h3>Beratungshotline:</h3>
                <p>Für Fragen zu unseren Produkten und deren Anwendung erreichen Sie unser Expertenteam unter:<br>
                <strong>+49 (0) 2151 - 892348</strong></p>
                
                <h3>Reklamationen & Rücksendungen:</h3>
                <p><strong>E-Mail:</strong> service@klarkraft.de<br>
                <strong>Telefon:</strong> +49 (0) 2151 - 892349</p>
            `,
            faq: `
                <h2>Häufig gestellte Fragen (FAQ)</h2>
                <h3>Wie funktionieren die KlarKraft Bretter?</h3>
                <p>Unsere KlarKraft Bretter arbeiten mit speziellen Frequenzen, die negative Energien von Strichcodes und elektromagnetischen Feldern neutralisieren. Einfach die Produkte für 5-15 Minuten auf das Brett legen.</p>
                
                <h3>Welches Brett ist für mich das richtige?</h3>
                <p>Das BASIS Brett eignet sich für alle Produkte. Für spezielle Anwendungen empfehlen wir: ANIMALIS für Fleisch/Milch, HERBA für Obst/Gemüse, UMBRA für Pilze, MOBILO für unterwegs, CRYSTA für Schmuck.</p>
                
                <h3>Wie lange halten die Produkte?</h3>
                <p>Bei sachgemäßer Verwendung halten unsere Produkte mehrere Jahre. Die KlarKraft Bretter benötigen gelegentliches "Aufladen" durch Mondlicht.</p>
                
                <h3>Sind die Produkte wissenschaftlich getestet?</h3>
                <p>Unsere Produkte basieren auf jahrelanger Forschung in der Bioenergetik. Wir arbeiten kontinuierlich an weiteren Studien zur Wirksamkeit.</p>
                
                <h3>Kann ich die Produkte zurückgeben?</h3>
                <p>Ja, Sie haben 14 Tage Widerrufsrecht. Bei Nichtgefallen erstatten wir Ihnen den vollen Kaufpreis zurück.</p>
            `,
            anwendung: `
                <h2>Anwendungshinweise</h2>
                <h3>KlarKraft Bretter richtig verwenden:</h3>
                <ol>
                    <li>Brett auf eine stabile, ebene Fläche legen</li>
                    <li>Produkte gleichmäßig auf dem Brett verteilen</li>
                    <li>Je nach Brett-Typ 5-15 Minuten wirken lassen</li>
                    <li>Nach Gebrauch Brett trocken abwischen</li>
                </ol>
                
                <h3>Aufladung der Bretter:</h3>
                <p>Legen Sie das Brett einmal monatlich über Nacht in Mondlicht. Bei Vollmond ist die Wirkung am stärksten.</p>
                
                <h3>Universumswasser Elixier:</h3>
                <ul>
                    <li>2-3 Tropfen auf Gegenstände geben</li>
                    <li>In Räumen versprühen</li>
                    <li>Nicht unverdünnt einnehmen</li>
                </ul>
                
                <h3>Kraftsteine:</h3>
                <ul>
                    <li>Im Raum verteilen oder bei sich tragen</li>
                    <li>Regelmäßig unter fließendem Wasser reinigen</li>
                    <li>Bei Vollmond "aufladen"</li>
                </ul>
                
                <h3>Wichtige Hinweise:</h3>
                <p>Unsere Produkte ersetzen keine medizinische Behandlung. Bei gesundheitlichen Problemen konsultieren Sie einen Arzt.</p>
            `,
            garantie: `
                <h2>Garantie & Gewährleistung</h2>
                <h3>Gesetzliche Gewährleistung</h3>
                <p>Für alle unsere Produkte gewähren wir die gesetzliche Gewährleistung von 24 Monaten ab Kaufdatum.</p>
                
                <h3>Erweiterte KlarKRAFT Garantie</h3>
                <p>Zusätzlich zur gesetzlichen Gewährleistung bieten wir folgende Garantien:</p>
                <ul>
                    <li><strong>KlarKraft Bretter:</strong> 5 Jahre Funktionsgarantie</li>
                    <li><strong>Kraftsteine:</strong> 3 Jahre Energiegarantie</li>
                    <li><strong>Universumswasser:</strong> 2 Jahre Wirksamkeitsgarantie</li>
                </ul>
                
                <h3>Garantieabwicklung</h3>
                <p>Sollte ein Produkt nicht wie erwartet funktionieren, kontaktieren Sie uns unter service@klarkraft.de mit folgenden Angaben:</p>
                <ul>
                    <li>Bestellnummer</li>
                    <li>Produktbeschreibung</li>
                    <li>Fehlerbeschreibung</li>
                </ul>
                
                <h3>Zufriedenheitsgarantie</h3>
                <p>Sind Sie nicht vollständig zufrieden, können Sie das Produkt innerhalb von 30 Tagen zurückgeben und erhalten den vollen Kaufpreis erstattet.</p>
            `
        };
        
        content.innerHTML = legalTexts[type] || '<h2>Inhalt nicht verfügbar</h2>';
        UIUtils.showModal('legalModal');
    }

    /**
     * App Status abfragen
     */
    get isReady() {
        return this.isInitialized;
    }

    /**
     * Event-Listener für App
     */
    addEventListener(type, listener) {
        this.eventTarget.addEventListener(type, listener);
    }

    removeEventListener(type, listener) {
        this.eventTarget.removeEventListener(type, listener);
    }
}

// App-Instanz erstellen
const app = new KlarKraftApp();

// Start der Anwendung wenn DOM geladen ist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('📋 DOM Content Loaded - App wird gestartet');
        app.init();
    });
} else {
    console.log('✅ DOM bereits geladen - App wird direkt gestartet');
    app.init();
}

// Fallback für ältere Browser
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        if (!app.isReady) {
            console.log('🔄 Fallback-Initialisierung');
            app.init();
        }
    }, 100);
}

// App global verfügbar machen für Debugging
window.KlarKraftApp = app;

export default app;
