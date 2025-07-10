// scripts/auth.js
import { CONFIG, MASTER_EMPLOYEES, DEMO_USERS } from './config.js';
import { UserStorage, MasterStorage, ActivityStorage } from './storage.js';
import { Validator, IDGenerator, UIUtils, ErrorHandler } from './utils.js';

/**
 * Authentifizierungs-Manager
 */
export class AuthManager {
    constructor() {
        this.currentUser = null;
        this.currentMaster = null;
        this.eventTarget = new EventTarget();
        
        this.init();
    }

    /**
     * Initialisierung
     */
    init() {
        this.createDemoUsers();
        this.loadSavedSessions();
        this.addEventListeners();
        this.updateUI();
        
        console.log('🔐 AuthManager initialisiert');
    }

    /**
     * Demo-Benutzer erstellen falls nicht vorhanden
     */
    createDemoUsers() {
        const existingUsers = UserStorage.getUsers();
        
        DEMO_USERS.forEach(demoUser => {
            if (!existingUsers.find(u => u.email === demoUser.email)) {
                UserStorage.addUser(demoUser);
                console.log(`✅ Demo-Benutzer erstellt: ${demoUser.name}`);
            }
        });
    }

    /**
     * Gespeicherte Sessions laden
     */
    loadSavedSessions() {
        // User Session
        const savedUser = UserStorage.getCurrentUser();
        if (savedUser) {
            // Validate and update user data if needed
            const currentUserInDB = UserStorage.findUserById(savedUser.customerId);
            if (currentUserInDB) {
                this.currentUser = currentUserInDB;
                console.log('✅ Benutzer-Session wiederhergestellt:', this.currentUser.name);
            } else {
                UserStorage.removeCurrentUser();
            }
        }

        // Master Session
        const savedMaster = MasterStorage.getCurrentMaster();
        if (savedMaster) {
            // Validate master session
            const validMaster = MASTER_EMPLOYEES.find(emp => emp.id === savedMaster.id);
            if (validMaster) {
                this.currentMaster = savedMaster;
                console.log('✅ Master-Session wiederhergestellt:', this.currentMaster.name);
            } else {
                MasterStorage.removeCurrentMaster();
            }
        }
    }

    /**
     * Event Listeners hinzufügen
     */
    addEventListeners() {
        // Customer Login Form
        const loginForm = document.getElementById('customerLoginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Customer Register Form
        const registerForm = document.getElementById('customerRegisterForm');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        // Master Login Form
        const masterForm = document.getElementById('masterLoginForm');
        if (masterForm) {
            masterForm.addEventListener('submit', (e) => this.handleMasterLogin(e));
        }

        // Password Change Form
        const passwordForm = document.getElementById('passwordChangeForm');
        if (passwordForm) {
            passwordForm.addEventListener('submit', (e) => this.handlePasswordChange(e));
        }

        // Quick Actions
        const quickLoginBtn = document.querySelector('button[onclick="quickLogin()"]');
        if (quickLoginBtn) {
            quickLoginBtn.onclick = () => this.quickLogin();
        }

        const quickRegisterBtn = document.querySelector('button[onclick="quickRegister()"]');
        if (quickRegisterBtn) {
            quickRegisterBtn.onclick = () => this.quickRegister();
        }
    }

    /**
     * Benutzer-Login
     */
    async handleLogin(event) {
        event.preventDefault();
        
        try {
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            // Validation
            if (!email || !password) {
                UIUtils.showNotification('⚠️ Bitte füllen Sie alle Felder aus!', 'warning');
                return;
            }

            if (!Validator.isValidEmail(email)) {
                UIUtils.showNotification('⚠️ Bitte geben Sie eine gültige E-Mail-Adresse ein!', 'warning');
                return;
            }

            // Find user
            const user = UserStorage.findUserByEmail(email);
            
            if (!user || user.password !== password) {
                UIUtils.showNotification('❌ Ungültige Anmeldedaten!', 'error');
                ActivityStorage.addLog('Failed Login', `Failed login attempt for: ${email}`);
                return;
            }

            // Successful login
            this.currentUser = user;
            UserStorage.setCurrentUser(user);
            
            ActivityStorage.addLog('User Login', `${user.name} logged in`, user);
            UIUtils.showNotification(`✅ Willkommen zurück, ${user.name}!`, 'success');
            
            this.clearLoginForm();
            this.updateUI();
            this.emitUserStateChange();
            UIUtils.hideModal();
            
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'AuthManager.handleLogin');
        }
    }

    /**
     * Benutzer-Registrierung
     */
    async handleRegister(event) {
        event.preventDefault();
        
        try {
            const formData = this.getRegisterFormData();
            
            // Validation
            const validation = this.validateRegisterData(formData);
            if (!validation.isValid) {
                UIUtils.showNotification(validation.message, 'warning');
                return;
            }

            // Check if email already exists
            if (UserStorage.findUserByEmail(formData.email)) {
                UIUtils.showNotification('❌ Diese E-Mail-Adresse ist bereits registriert!', 'error');
                return;
            }

            // Create new user
            const userData = {
                customerId: IDGenerator.generateCustomerId(),
                ...formData,
                phone: '',
                country: 'Deutschland',
                registrationDate: new Date().toISOString(),
                totalOrders: 0,
                totalSpent: 0,
                paymentMethods: []
            };

            // Save user
            UserStorage.addUser(userData);
            this.currentUser = userData;
            UserStorage.setCurrentUser(userData);

            ActivityStorage.addLog('User Registration', `${userData.name} registered`, userData);
            UIUtils.showNotification(`✅ Registrierung erfolgreich! Willkommen bei KlarKRAFT, ${userData.name}!`, 'success');
            
            this.clearRegisterForm();
            this.updateUI();
            this.emitUserStateChange();
            UIUtils.hideModal();
            
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'AuthManager.handleRegister');
        }
    }

    /**
     * Master-Login
     */
    async handleMasterLogin(event) {
        event.preventDefault();
        
        try {
            const email = document.getElementById('masterLoginEmail').value.trim();
            const password = document.getElementById('masterLoginPassword').value;
            const securityCode = document.getElementById('masterLoginCode').value.trim();
            
            // Validation
            if (!email || !password || !securityCode) {
                UIUtils.showNotification('⚠️ Bitte füllen Sie alle Felder aus!', 'warning');
                return;
            }

            // Find master
            const masterUser = MASTER_EMPLOYEES.find(emp => 
                emp.email === email && 
                emp.password === password && 
                emp.securityCode === securityCode
            );

            if (!masterUser) {
                UIUtils.showNotification('❌ Ungültige Anmeldedaten oder Sicherheitscode!', 'error');
                ActivityStorage.addLog('Failed Master Login', `Failed master login attempt for: ${email}`);
                return;
            }

            // Logout any existing user session
            if (this.currentUser) {
                this.currentUser = null;
                UserStorage.removeCurrentUser();
            }

            // Create master session
            this.currentMaster = {
                ...masterUser,
                loginTime: new Date().toISOString(),
                sessionId: IDGenerator.generateSessionId()
            };

            MasterStorage.setCurrentMaster(this.currentMaster);
            ActivityStorage.addLog('Master Login', `${masterUser.name} (${masterUser.role}) logged in`);
            UIUtils.showNotification(`✅ Willkommen ${masterUser.name}! Master Dashboard wird geladen...`, 'success');
            
            this.clearMasterLoginForm();
            this.updateUI();
            this.emitUserStateChange();
            UIUtils.hideModal();
            
            // Show master dashboard after short delay
            setTimeout(() => {
                this.eventTarget.dispatchEvent(new CustomEvent('showMasterDashboard'));
            }, 500);
            
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'AuthManager.handleMasterLogin');
        }
    }

    /**
     * Passwort ändern
     */
    async handlePasswordChange(event) {
        event.preventDefault();
        
        try {
            if (!this.currentUser) {
                UIUtils.showNotification('⚠️ Sie müssen angemeldet sein!', 'warning');
                return;
            }

            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validation
            if (this.currentUser.password && currentPassword !== this.currentUser.password) {
                UIUtils.showNotification('❌ Aktuelles Passwort ist falsch!', 'error');
                return;
            }

            if (!Validator.isValidPassword(newPassword)) {
                UIUtils.showNotification(`⚠️ Das neue Passwort muss mindestens ${CONFIG.VALIDATION.PASSWORD_MIN_LENGTH} Zeichen lang sein!`, 'warning');
                return;
            }

            if (newPassword !== confirmPassword) {
                UIUtils.showNotification('❌ Die Passwörter stimmen nicht überein!', 'error');
                return;
            }

            // Update password
            this.currentUser.password = newPassword;
            UserStorage.updateUser(this.currentUser);
            UserStorage.setCurrentUser(this.currentUser);

            ActivityStorage.addLog('Password Change', 'Password changed successfully', this.currentUser);
            UIUtils.showNotification('✅ Passwort erfolgreich geändert!', 'success');
            
            // Clear form
            document.getElementById('passwordChangeForm').reset();
            
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'AuthManager.handlePasswordChange');
        }
    }

    /**
     * Benutzer abmelden
     */
    logout() {
        try {
            if (this.currentUser) {
                ActivityStorage.addLog('User Logout', `${this.currentUser.name} logged out`, this.currentUser);
            }
            
            this.currentUser = null;
            UserStorage.removeCurrentUser();
            
            UIUtils.showNotification('✅ Erfolgreich abgemeldet!', 'success');
            this.updateUI();
            this.emitUserStateChange();
            
            // Navigate to main page
            this.eventTarget.dispatchEvent(new CustomEvent('showProducts'));
            
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'AuthManager.logout');
        }
    }

    /**
     * Master abmelden
     */
    masterLogout() {
        try {
            if (this.currentMaster) {
                ActivityStorage.addLog('Master Logout', `${this.currentMaster.name} (${this.currentMaster.role}) logged out`);
            }
            
            this.currentMaster = null;
            MasterStorage.removeCurrentMaster();
            
            UIUtils.showNotification('Master Session beendet', 'info');
            this.updateUI();
            this.emitUserStateChange();
            UIUtils.hideModal();
            
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'AuthManager.masterLogout');
        }
    }

    /**
     * Google Auth (Demo)
     */
    async googleAuth() {
        try {
            const email = 'benutzer@gmail.com';
            let existingUser = UserStorage.findUserByEmail(email);
            
            if (existingUser) {
                this.currentUser = existingUser;
                UserStorage.setCurrentUser(existingUser);
                UIUtils.showNotification(`Willkommen zurück, ${existingUser.name}!`, 'success');
            } else {
                const googleUser = {
                    customerId: IDGenerator.generateCustomerId(),
                    name: 'Google Benutzer',
                    email: email,
                    provider: 'google',
                    phone: '',
                    address: '',
                    city: '',
                    zip: '',
                    country: 'Deutschland',
                    registrationDate: new Date().toISOString(),
                    totalOrders: 0,
                    totalSpent: 0,
                    paymentMethods: []
                };
                
                UserStorage.addUser(googleUser);
                this.currentUser = googleUser;
                UserStorage.setCurrentUser(googleUser);
                
                ActivityStorage.addLog('Google Registration', 'User registered via Google', googleUser);
                UIUtils.showNotification('Erfolgreich mit Google registriert und angemeldet!', 'success');
            }
            
            this.updateUI();
            this.emitUserStateChange();
            UIUtils.hideModal();
            
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'AuthManager.googleAuth');
        }
    }

    /**
     * Quick Login für Demo
     */
    quickLogin() {
        document.getElementById('loginEmail').value = 'max.mustermann@email.de';
        document.getElementById('loginPassword').value = 'demo123';
        
        setTimeout(() => {
            this.handleLogin({ preventDefault: () => {} });
        }, 100);
    }

    /**
     * Quick Register für Demo
     */
    quickRegister() {
        const timestamp = Date.now().toString().slice(-4);
        document.getElementById('registerName').value = `Test User ${timestamp}`;
        document.getElementById('registerEmail').value = `test${timestamp}@klarkraft.de`;
        document.getElementById('registerPassword').value = 'test123';
        document.getElementById('registerAddress').value = 'Teststraße 123';
        document.getElementById('registerCity').value = 'Teststadt';
        document.getElementById('registerZip').value = '12345';
        
        setTimeout(() => {
            this.handleRegister({ preventDefault: () => {} });
        }, 100);
    }

    /**
     * Quick Master Login für Demo
     */
    quickMasterLogin(type) {
        const credentials = {
            manager: { email: 'manager@klarkraft.de', password: 'manager123', code: 'KK-2025' },
            support: { email: 'support@klarkraft.de', password: 'support123', code: 'KK-2025' },
            admin: { email: 'admin@klarkraft.de', password: 'admin123', code: 'KK-2025' }
        };
        
        const cred = credentials[type];
        if (cred) {
            document.getElementById('masterLoginEmail').value = cred.email;
            document.getElementById('masterLoginPassword').value = cred.password;
            document.getElementById('masterLoginCode').value = cred.code;
            
            setTimeout(() => {
                this.handleMasterLogin({ preventDefault: () => {} });
            }, 100);
        }
    }

    /**
     * UI aktualisieren
     */
    updateUI() {
        const authBtn = document.getElementById('authBtn');
        const userInfo = document.getElementById('userInfo');
        const masterInfo = document.getElementById('masterInfo');
        const userName = document.getElementById('userName');
        const masterName = document.getElementById('masterName');
        const cartBtn = document.getElementById('cartBtn');
        const ordersBtn = document.getElementById('ordersBtn');
        
        // Reset all UI elements
        if (authBtn) authBtn.style.display = 'block';
        if (userInfo) userInfo.classList.remove('active');
        if (masterInfo) masterInfo.style.display = 'none';
        if (cartBtn) cartBtn.style.display = 'block';
        if (ordersBtn) ordersBtn.style.display = 'none';
        
        if (this.currentMaster) {
            // Master is logged in
            if (authBtn) authBtn.style.display = 'none';
            if (userInfo) userInfo.classList.remove('active');
            if (masterInfo) {
                masterInfo.style.display = 'flex';
                if (masterName) {
                    masterName.textContent = this.currentMaster.name;
                    masterName.style.color = '#ff6b35';
                    masterName.style.fontWeight = 'bold';
                    masterName.title = `${this.currentMaster.role} - Session: ${this.currentMaster.sessionId}`;
                }
            }
            
            // Show orders button instead of cart
            if (cartBtn) cartBtn.style.display = 'none';
            if (ordersBtn) ordersBtn.style.display = 'block';
            
        } else if (this.currentUser) {
            // Regular user is logged in
            if (authBtn) authBtn.style.display = 'none';
            if (userInfo) {
                userInfo.classList.add('active');
                if (userName) userName.textContent = this.currentUser.name;
            }
            if (masterInfo) masterInfo.style.display = 'none';
            
            // Show cart button
            if (cartBtn) cartBtn.style.display = 'block';
            if (ordersBtn) ordersBtn.style.display = 'none';
        }
        
        console.log('🔄 AuthManager UI aktualisiert');
    }

    /**
     * Event für Zustandsänderung emittieren
     */
    emitUserStateChange() {
        this.eventTarget.dispatchEvent(new CustomEvent('userStateChanged', {
            detail: { 
                user: this.currentUser, 
                master: this.currentMaster 
            }
        }));
    }

    // Getter methods
    getCurrentUser() { return this.currentUser; }
    getCurrentMaster() { return this.currentMaster; }
    isLoggedIn() { return !!this.currentUser; }
    isMasterLoggedIn() { return !!this.currentMaster; }

    // Event listener methods
    addEventListener(type, listener) {
        this.eventTarget.addEventListener(type, listener);
    }

    removeEventListener(type, listener) {
        this.eventTarget.removeEventListener(type, listener);
    }

    // Helper methods
    getRegisterFormData() {
        return {
            name: document.getElementById('registerName').value.trim(),
            email: document.getElementById('registerEmail').value.trim(),
            password: document.getElementById('registerPassword').value,
            address: document.getElementById('registerAddress').value.trim(),
            city: document.getElementById('registerCity').value.trim(),
            zip: document.getElementById('registerZip').value.trim()
        };
    }

    validateRegisterData(data) {
        if (Object.values(data).some(value => !value)) {
            return { isValid: false, message: '⚠️ Bitte füllen Sie alle Felder aus!' };
        }

        if (!Validator.isValidEmail(data.email)) {
            return { isValid: false, message: '⚠️ Bitte geben Sie eine gültige E-Mail-Adresse ein!' };
        }

        if (!Validator.isValidPassword(data.password)) {
            return { isValid: false, message: `⚠️ Passwort muss mindestens ${CONFIG.VALIDATION.PASSWORD_MIN_LENGTH} Zeichen lang sein!` };
        }

        return { isValid: true };
    }

    clearLoginForm() {
        const form = document.getElementById('customerLoginForm');
        if (form) form.reset();
    }

    clearRegisterForm() {
        const form = document.getElementById('customerRegisterForm');
        if (form) form.reset();
    }

    clearMasterLoginForm() {
        const form = document.getElementById('masterLoginForm');
        if (form) form.reset();
    }
}

// Singleton Export
export const authManager = new AuthManager();