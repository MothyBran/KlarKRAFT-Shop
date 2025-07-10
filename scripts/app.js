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
            
            // 3. Globale Methoden für HTML setup
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
     * Globale Methoden für HTML onclick events
     */
    setupGlobalMethods() {
        // Hauptnavigation
        window.showProducts = () => this.showProducts();
        window.showAuth = () => authManager.showAuth();
        window.showCart = () => cartManager.showCart();
        window.showProfile = () => authManager.showProfile();
        
        // Modal Management
        window.closeModal = () => UIUtils.closeModal();
        window.showLegalModal = (type) => this.showLegalModal(type);
        
        // Produkt-Funktionen (delegiert an productManager)
        window.showProductDetail = (productId) => productManager.showProductDetail(productId);
        window.addToCart = (productId) => cartManager.addToCart(productId);
        
        // Demo-Funktionen
        window.quickLogin = () => authManager.quickLogin();
        window.quickRegister = () => authManager.quickRegister();
        window.googleAuth = () => authManager.googleAuth();
        
        // Master-Funktionen sind bereits in masterManager.setupGlobalMethods() definiert
        
        console.log('🔧 Globale Methoden eingerichtet');
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
                UIUtils.closeModal();
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
                authManager.handleLogin(e);
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
                authManager.handleRegister(e);
                return false;
            }, { passive: false });
            console.log('✅ Register-Formular Event-Listener hinzugefügt');
        }
        
        // Personal data form
        const personalForm = document.getElementById('personalDataForm');
        if (personalForm) {
            personalForm.addEventListener('submit', (e) => {
                e.preventDefault();
                authManager.updatePersonalData(e);
                return false;
            });
            console.log('✅ Personal-Data-Formular Event-Listener hinzugefügt');
        }
        
        // Shipping address form
        const shippingForm = document.getElementById('shippingAddressForm');
        if (shippingForm) {
            shippingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                authManager.updateShippingAddress(e);
                return false;
            });
            console.log('✅ Shipping-Address-Formular Event-Listener hinzugefügt');
        }
        
        // Password change form
        const passwordForm = document.getElementById('passwordChangeForm');
        if (passwordForm) {
            passwordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                authManager.changePassword(e);
                return false;
            });
            console.log('✅ Password-Change-Formular Event-Listener hinzugefügt');
        }

        // Master login form
        const masterForm = document.getElementById('masterLoginForm');
        if (masterForm) {
            masterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                masterManager.handleMasterLogin(e);
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
        productManager.renderProducts();
        
        // UI-State aktualisieren
        authManager.updateUI();
        masterManager.updateUI();
        cartManager.updateCartCounter();
        
        console.log('🎨 UI initialisiert');
    }

    /**
     * Module-übergreifende Events verbinden
     */
    connectModuleEvents() {
        // Auth -> Master: User logout -> Master logout
        authManager.addEventListener('userLoggedOut', () => {
            if (masterManager.isMasterLoggedIn) {
                masterManager.masterLogout();
            }
        });

        // Master -> Auth: Master login -> User logout
        masterManager.addEventListener('masterLoggedIn', () => {
            if (authManager.isUserLoggedIn) {
                authManager.logout();
            }
        });

        // Cart -> Master: New order -> Update orders counter
        cartManager.addEventListener('newOrder', (event) => {
            if (masterManager.isMasterLoggedIn) {
                masterManager.handleNewOrder(event.detail.order);
                
                // Demo mode logic
                const demoModeEnabled = SettingsStorage.getDemoMode();
                const hasMasterSession = masterManager.isMasterLoggedIn;
                
                if (demoModeEnabled && !hasMasterSession) {
                    this.startDemoOrderProcessing(event.detail.order);
                }
            }
        });

        // Master -> UI: Status changes -> Update UI
        masterManager.addEventListener('masterLoggedIn', () => {
            authManager.updateUI();
        });

        masterManager.addEventListener('masterLoggedOut', () => {
            authManager.updateUI();
        });

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
        
        UIUtils.closeModal();
        window.scrollTo({ top: 0, behavior: 'smooth' });
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