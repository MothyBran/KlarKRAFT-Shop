// scripts/master.js
import { CONFIG } from './config.js';
import { UserStorage, OrderStorage, ActivityStorage, SettingsStorage, DataManager } from './storage.js';
import { BusinessUtils, UIUtils, Formatter, ArrayUtils, ErrorHandler } from './utils.js';

/**
 * Master Dashboard Manager
 */
export class MasterManager {
    constructor() {
        this.currentMaster = null;
        this.currentTab = 'overview';
        this.eventTarget = new EventTarget();
        
        this.init();
    }

    /**
     * Initialisierung
     */
    init() {
        this.addEventListeners();
        this.setupGlobalMethods();
        console.log('👔 MasterManager initialisiert');
    }

    /**
     * Globale Methoden für HTML onclick events
     */
    setupGlobalMethods() {
        // Make methods available globally for HTML onclick handlers
        window.masterManager = this;
        
        // Global functions that HTML can call
        window.showMasterLogin = () => this.showMasterLogin();
        window.handleMasterLogin = (event) => this.handleMasterLogin(event);
        window.quickMasterLogin = (type) => this.quickMasterLogin(type);
        window.masterLogout = () => this.masterLogout();
        window.showMasterDashboard = () => this.showMasterDashboard();
        window.switchMasterTab = (tab) => this.switchMasterTab(tab);
        window.showNewOrders = () => this.showNewOrders();
        window.processOrder = (orderId) => this.processOrder(orderId);
        window.quickUpdateOrderStatus = (orderId, status) => this.quickUpdateOrderStatus(orderId, status);
        window.viewOrderDetailsInModal = (orderId) => this.viewOrderDetails(orderId);
        window.cancelOrderFromModal = (orderId) => this.cancelOrder(orderId);
        window.toggleDemoMode = () => this.toggleDemoMode();
        window.clearTestData = () => this.clearTestData();
        window.resetAllData = () => this.resetAllData();
        window.exportAllData = () => this.exportAllData();
        window.exportCustomersCSV = () => this.exportCustomersCSV();
        window.exportOrdersCSV = () => this.exportOrdersCSV();
    }

    /**
     * Event Listeners hinzufügen
     */
    addEventListeners() {
        // Listen for auth state changes
        if (window.authManager) {
            window.authManager.addEventListener('userStateChanged', (event) => {
                this.currentMaster = event.detail.master;
                this.updateUI();
            });
        }

        // Listen for new orders
        if (window.cartManager) {
            window.cartManager.addEventListener('newOrder', (event) => {
                this.handleNewOrder(event.detail.order);
            });
        }
    }

    /**
     * Master Login Modal anzeigen
     */
    showMasterLogin() {
        UIUtils.showModal('masterLoginModal');
    }

    /**
     * Master Login verarbeiten
     */
    handleMasterLogin(event) {
        event.preventDefault();
        
        try {
            const email = document.getElementById('masterLoginEmail').value.trim();
            const password = document.getElementById('masterLoginPassword').value;
            const securityCode = document.getElementById('masterLoginCode').value.trim();
            
            if (!email || !password || !securityCode) {
                UIUtils.showNotification('⚠️ Bitte füllen Sie alle Felder aus!', 'warning');
                return false;
            }
            
            const masterUser = CONFIG.MASTER_EMPLOYEES.find(emp => 
                emp.email === email && 
                emp.password === password && 
                emp.securityCode === securityCode
            );
            
            if (masterUser) {
                // Logout any existing user session
                if (window.authManager && window.authManager.currentUser) {
                    window.authManager.logout();
                }
                
                this.currentMaster = {
                    ...masterUser,
                    loginTime: new Date().toISOString(),
                    sessionId: 'SES' + Math.random().toString(36).substr(2, 8).toUpperCase()
                };
                
                localStorage.setItem('klarkraft_currentMaster', JSON.stringify(this.currentMaster));
                this.updateUI();
                
                ActivityStorage.addLog('Master Login', `${masterUser.name} (${masterUser.role}) logged in`);
                UIUtils.showNotification(`✅ Willkommen ${masterUser.name}! Master Dashboard wird geladen...`, 'success');
                
                // Clear form
                document.getElementById('masterLoginEmail').value = '';
                document.getElementById('masterLoginPassword').value = '';
                document.getElementById('masterLoginCode').value = '';
                
                UIUtils.closeModal();
                
                // Emit event
                this.eventTarget.dispatchEvent(new CustomEvent('masterLoggedIn', {
                    detail: { master: this.currentMaster }
                }));
                
                setTimeout(() => {
                    this.showMasterDashboard();
                }, 500);
            } else {
                UIUtils.showNotification('❌ Ungültige Anmeldedaten oder Sicherheitscode!', 'error');
                ActivityStorage.addLog('Failed Master Login', `Failed master login attempt for: ${email}`);
            }
            
            return false;

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.handleMasterLogin');
            return false;
        }
    }

    /**
     * Quick Master Login für Demo
     */
    quickMasterLogin(type) {
        try {
            let credentials = {};
            switch(type) {
                case 'manager':
                    credentials = { email: 'manager@klarkraft.de', password: 'manager123', code: 'KK-2025' };
                    break;
                case 'support':
                    credentials = { email: 'support@klarkraft.de', password: 'support123', code: 'KK-2025' };
                    break;
                case 'admin':
                    credentials = { email: 'admin@klarkraft.de', password: 'admin123', code: 'KK-2025' };
                    break;
            }
            
            document.getElementById('masterLoginEmail').value = credentials.email;
            document.getElementById('masterLoginPassword').value = credentials.password;
            document.getElementById('masterLoginCode').value = credentials.code;
            
            setTimeout(() => {
                const event = { preventDefault: () => {} };
                this.handleMasterLogin(event);
            }, 100);

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.quickMasterLogin');
        }
    }

    /**
     * Master Logout
     */
    masterLogout() {
        try {
            if (this.currentMaster) {
                ActivityStorage.addLog('Master Logout', `${this.currentMaster.name} (${this.currentMaster.role}) logged out`);
                
                // Emit event
                this.eventTarget.dispatchEvent(new CustomEvent('masterLoggedOut', {
                    detail: { master: this.currentMaster }
                }));
            }
            
            this.currentMaster = null;
            localStorage.removeItem('klarkraft_currentMaster');
            this.updateUI();
            UIUtils.closeModal();
            UIUtils.showNotification('Master Session beendet', 'info');

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.masterLogout');
        }
    }

    /**
     * Master Dashboard anzeigen
     */
    showMasterDashboard() {
        try {
            if (!this.currentMaster) {
                this.showMasterLogin();
                return;
            }

            this.updateDashboardHeader();
            this.loadMasterOverview();
            
            UIUtils.showModal('masterDashboardModal');
            
            // Initialize demo mode UI
            setTimeout(() => {
                this.updateDemoModeUI();
            }, 100);
            
            ActivityStorage.addLog('Dashboard Access', 'Accessed master dashboard');

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.showMasterDashboard');
        }
    }

    /**
     * Dashboard Header aktualisieren
     */
    updateDashboardHeader() {
        const nameElement = document.getElementById('currentMasterName');
        const roleElement = document.getElementById('currentMasterRole');
        const loginTimeElement = document.getElementById('lastLoginTime');
        const sessionIdElement = document.getElementById('sessionId');
        const settingsTab = document.getElementById('settingsTab');

        if (nameElement) nameElement.textContent = this.currentMaster.name;
        if (roleElement) roleElement.textContent = this.currentMaster.role;
        if (loginTimeElement) loginTimeElement.textContent = Formatter.formatDateTime(this.currentMaster.loginTime);
        if (sessionIdElement) sessionIdElement.textContent = this.currentMaster.sessionId;

        // Show/hide settings tab based on permissions
        if (settingsTab) {
            settingsTab.style.display = this.hasPermission('all') ? 'block' : 'none';
        }
    }

    /**
     * Master Tab wechseln
     */
    switchMasterTab(tab) {
        try {
            // Update tab buttons
            document.querySelectorAll('#masterDashboardContent .auth-tab').forEach(t => 
                t.classList.remove('active')
            );
            document.querySelectorAll('#masterDashboardContent .auth-form').forEach(f => 
                f.classList.remove('active')
            );

            const tabs = document.querySelectorAll('#masterDashboardContent .auth-tab');
            const forms = document.querySelectorAll('#masterDashboardContent .auth-form');

            let tabIndex = 0;
            switch(tab) {
                case 'overview': 
                    tabIndex = 0; 
                    this.loadMasterOverview(); 
                    break;
                case 'customers': 
                    tabIndex = 1; 
                    this.loadMasterCustomers(); 
                    break;
                case 'orders': 
                    tabIndex = 2; 
                    this.loadMasterOrders(); 
                    break;
                case 'analytics': 
                    tabIndex = 3; 
                    this.loadMasterAnalytics(); 
                    break;
                case 'settings': 
                    tabIndex = 4; 
                    this.loadMasterSettings(); 
                    break;
            }

            if (tabs[tabIndex]) tabs[tabIndex].classList.add('active');
            if (forms[tabIndex]) forms[tabIndex].classList.add('active');

            this.currentTab = tab;
            ActivityStorage.addLog('Tab Switch', `Switched to ${tab} tab`);

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.switchMasterTab');
        }
    }

    /**
     * Master Übersicht laden
     */
    loadMasterOverview() {
        try {
            const users = UserStorage.getUsers();
            const orders = OrderStorage.getOrders();
            const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
            const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
            const todayOrders = this.getTodayOrders(orders);

            // Dashboard Statistics
            document.getElementById('dashboardStats').innerHTML = this.generateStatsHTML({
                users: users.length,
                orders: orders.length,
                revenue: totalRevenue,
                avgOrder: avgOrderValue,
                todayOrders: todayOrders.length
            });

            // Recent Orders
            const recentOrders = orders
                .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                .slice(0, 5);

            document.getElementById('recentOrders').innerHTML = 
                this.generateRecentOrdersHTML(recentOrders);

            // Recent Customers
            const recentCustomers = users
                .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
                .slice(0, 5);

            document.getElementById('recentCustomers').innerHTML = 
                this.generateRecentCustomersHTML(recentCustomers);

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.loadMasterOverview');
        }
    }

    /**
     * Statistiken HTML generieren
     */
    generateStatsHTML(stats) {
        return `
            <div class="master-stat-grid">
                <div class="master-stat-card">
                    <div class="master-stat-icon">👥</div>
                    <span class="master-stat-number">${stats.users}</span>
                    <span class="master-stat-label">Registrierte Kunden</span>
                </div>
                <div class="master-stat-card">
                    <div class="master-stat-icon">📦</div>
                    <span class="master-stat-number">${stats.orders}</span>
                    <span class="master-stat-label">Gesamtbestellungen</span>
                </div>
                <div class="master-stat-card">
                    <div class="master-stat-icon">💰</div>
                    <span class="master-stat-number">${Formatter.formatPrice(stats.revenue)}</span>
                    <span class="master-stat-label">Gesamtumsatz</span>
                </div>
                <div class="master-stat-card">
                    <div class="master-stat-icon">📈</div>
                    <span class="master-stat-number">${Formatter.formatPrice(stats.avgOrder)}</span>
                    <span class="master-stat-label">Ø Bestellwert</span>
                </div>
                <div class="master-stat-card">
                    <div class="master-stat-icon">🆕</div>
                    <span class="master-stat-number">${stats.todayOrders}</span>
                    <span class="master-stat-label">Heute bestellt</span>
                </div>
            </div>
        `;
    }

    /**
     * Kunden-Management laden
     */
    loadMasterCustomers() {
        try {
            const users = UserStorage.getUsers();
            const searchInput = document.getElementById('customerSearch');

            const renderCustomers = (customerList = users) => {
                document.getElementById('masterCustomersList').innerHTML = `
                    <table class="master-table">
                        <thead>
                            <tr>
                                <th>Kunde</th>
                                <th>Kontakt</th>
                                <th>Adresse</th>
                                <th>Bestellungen</th>
                                <th>Umsatz</th>
                                <th>Registriert</th>
                                <th>Aktionen</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${customerList.map(user => this.generateCustomerRowHTML(user)).join('')}
                        </tbody>
                    </table>
                `;
            };

            renderCustomers();

            // Search functionality
            if (searchInput) {
                searchInput.removeEventListener('input', this.customerSearchHandler);
                this.customerSearchHandler = (e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    const filteredUsers = users.filter(user => 
                        user.name.toLowerCase().includes(searchTerm) ||
                        user.email.toLowerCase().includes(searchTerm) ||
                        (user.customerId && user.customerId.toLowerCase().includes(searchTerm))
                    );
                    renderCustomers(filteredUsers);
                };
                searchInput.addEventListener('input', this.customerSearchHandler);
            }

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.loadMasterCustomers');
        }
    }

    /**
     * Kunden-Zeile HTML generieren
     */
    generateCustomerRowHTML(user) {
        return `
            <tr>
                <td>
                    <strong>${user.name}</strong><br>
                    <small>ID: ${user.customerId}</small>
                </td>
                <td>
                    ${user.email}<br>
                    <small>${user.phone || 'Kein Telefon'}</small>
                </td>
                <td>
                    ${user.address || 'Keine Adresse'}<br>
                    <small>${user.city || ''} ${user.zip || ''}</small>
                </td>
                <td><strong>${user.totalOrders || 0}</strong></td>
                <td><strong>${Formatter.formatPrice(user.totalSpent || 0)}</strong></td>
                <td>${Formatter.formatDate(user.registrationDate || Date.now())}</td>
                <td>
                    <button class="action-btn view" onclick="window.masterManager.sendEmailToCustomer('${user.customerId}')" title="E-Mail senden">
                        📧 E-Mail
                    </button>
                    <button class="action-btn delete" onclick="window.masterManager.deleteCustomerAccount('${user.customerId}')" title="Konto löschen">
                        🗑️ Löschen
                    </button>
                </td>
            </tr>
        `;
    }

    /**
     * E-Mail an Kunden senden
     */
    sendEmailToCustomer(customerId) {
        try {
            const user = UserStorage.findUserById(customerId);
            
            if (!user || !user.email) {
                UIUtils.showNotification('❌ E-Mail-Adresse nicht gefunden.', 'error');
                return;
            }

            const subject = prompt('📧 E-Mail Betreff:', 'Nachricht von KlarKRAFT');
            if (!subject) return;

            const message = prompt('📝 Nachricht an ' + user.name + ':', 
                `Hallo ${user.name},\n\n[Ihre Nachricht hier]\n\nMit freundlichen Grüßen\nIhr KlarKRAFT Team`);
            
            if (!message) return;

            // Create mailto link
            const mailtoLink = `mailto:${user.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
            
            // Open email client
            window.open(mailtoLink);
            
            ActivityStorage.addLog('Email Sent', `Email sent to customer ${user.name} (${user.email})`);
            UIUtils.showNotification(`📧 E-Mail-Client geöffnet für ${user.name}`, 'success');

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.sendEmailToCustomer');
        }
    }

    /**
     * Kunden-Account löschen
     */
    deleteCustomerAccount(customerId) {
        try {
            const user = UserStorage.findUserById(customerId);
            
            if (!user) {
                UIUtils.showNotification('❌ Kunde nicht gefunden.', 'error');
                return;
            }

            // Check if user has active orders
            const userOrders = OrderStorage.getOrdersByCustomer(customerId);
            const activeOrders = userOrders.filter(o => o.status === 'pending' || o.status === 'processing');
            
            if (activeOrders.length > 0) {
                if (!confirm(`⚠️ ACHTUNG: Der Kunde ${user.name} hat ${activeOrders.length} aktive Bestellung(en).\n\nSollen diese automatisch storniert werden?`)) {
                    return;
                }
                
                // Cancel active orders
                activeOrders.forEach(order => {
                    OrderStorage.updateOrder(order.orderId, {
                        status: 'cancelled',
                        cancelledBy: this.currentMaster.name,
                        cancelledAt: new Date().toISOString(),
                        cancelReason: 'Kundenkonto gelöscht'
                    });
                });
            }

            // Final confirmation
            if (!confirm(`🗑️ Möchten Sie das Kundenkonto von "${user.name}" (${user.email}) wirklich unwiderruflich löschen?\n\nDiese Aktion kann nicht rückgängig gemacht werden!`)) {
                return;
            }

            // Remove user
            const success = UserStorage.deleteUser(customerId);
            
            if (success) {
                ActivityStorage.addLog('Customer Deleted', `Customer account deleted: ${user.name} (${user.email}) by ${this.currentMaster.name}`);
                UIUtils.showNotification(`✅ Kundenkonto von ${user.name} wurde gelöscht.`, 'success');
                
                // Reload customer list
                this.loadMasterCustomers();
            }

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.deleteCustomerAccount');
        }
    }

    /**
     * Bestellungs-Management laden
     */
    loadMasterOrders() {
        try {
            const orders = OrderStorage.getOrders();
            const statusFilter = document.getElementById('orderStatusFilter');

            const renderOrders = (orderList = orders) => {
                document.getElementById('masterOrdersList').innerHTML = `
                    <table class="master-table">
                        <thead>
                            <tr>
                                <th>Bestellung</th>
                                <th>Kunde</th>
                                <th>Artikel</th>
                                <th>Gesamt</th>
                                <th>Zahlung</th>
                                <th>Status</th>
                                <th>Datum</th>
                                <th>Aktionen</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${orderList
                                .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                                .map(order => this.generateOrderRowHTML(order)).join('')}
                        </tbody>
                    </table>
                `;
            };

            renderOrders();

            // Status filter
            if (statusFilter) {
                statusFilter.removeEventListener('change', this.orderFilterHandler);
                this.orderFilterHandler = (e) => {
                    const selectedStatus = e.target.value;
                    const filteredOrders = selectedStatus ? 
                        orders.filter(order => order.status === selectedStatus) : 
                        orders;
                    renderOrders(filteredOrders);
                };
                statusFilter.addEventListener('change', this.orderFilterHandler);
            }

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.loadMasterOrders');
        }
    }

    /**
     * Bestellungs-Zeile HTML generieren
     */
    generateOrderRowHTML(order) {
        return `
            <tr>
                <td>
                    <strong>#${order.orderId}</strong><br>
                    <small>📦 ${order.trackingNumber}</small>
                </td>
                <td>
                    <strong>${order.customerName}</strong><br>
                    <small>${order.customerEmail}</small>
                </td>
                <td>${order.items.length} Artikel</td>
                <td>
                    <div><strong>${Formatter.formatPrice(order.total)}</strong></div>
                    ${order.shippingCost ? 
                        `<small style="color: #8d6e63;">inkl. ${Formatter.formatPrice(order.shippingCost)} Versand</small>` : 
                        `<small style="color: #4caf50;">versandkostenfrei</small>`
                    }
                </td>
                <td>${order.paymentMethod}</td>
                <td>
                    <select class="status-select" onchange="window.masterManager.updateOrderStatus('${order.orderId}', this.value)" value="${order.status}">
                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>In Bearbeitung</option>
                        <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Wird versendet</option>
                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Geliefert</option>
                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Storniert</option>
                    </select>
                </td>
                <td>${Formatter.formatDate(order.orderDate)}</td>
                <td>
                    <button class="action-btn view" onclick="window.masterManager.viewOrderDetails('${order.orderId}')" title="Details anzeigen">
                        👁️ Details
                    </button>
                    ${order.status !== 'cancelled' && order.status !== 'completed' ? 
                        `<button class="action-btn delete" onclick="window.masterManager.cancelOrder('${order.orderId}')" title="Bestellung stornieren">❌ Stornieren</button>` : 
                        ''
                    }
                </td>
            </tr>
        `;
    }

    /**
     * Analytics laden
     */
    loadMasterAnalytics() {
        try {
            const users = UserStorage.getUsers();
            const orders = OrderStorage.getOrders();
            const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

            // Product sales analysis
            const productSales = this.analyzeProductSales(orders);
            const monthlyRevenue = this.analyzeMonthlyRevenue(orders);

            document.getElementById('analyticsContent').innerHTML = 
                this.generateAnalyticsHTML(productSales, monthlyRevenue, totalRevenue, users.length, orders.length);

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.loadMasterAnalytics');
        }
    }

    /**
     * Einstellungen laden
     */
    loadMasterSettings() {
        try {
            this.updateDemoModeUI();
            this.loadActivityLogs();

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.loadMasterSettings');
        }
    }

    /**
     * Demo-Modus UI aktualisieren
     */
    updateDemoModeUI() {
        const toggle = document.getElementById('demoModeToggle');
        const status = document.getElementById('demoModeStatus');
        const isEnabled = SettingsStorage.getDemoMode();

        if (toggle) {
            toggle.checked = isEnabled;
        }

        if (status) {
            if (isEnabled) {
                status.textContent = '🤖 Demo-Modus AN - Automatik nur ohne Mitarbeiter';
                status.style.backgroundColor = 'rgba(76, 175, 80, 0.2)';
                status.style.color = '#4caf50';
            } else {
                status.textContent = '🔐 Demo-Modus AUS - Nie automatische Updates';
                status.style.backgroundColor = 'rgba(255, 107, 53, 0.2)';
                status.style.color = '#ff6b35';
            }
        }
    }

    /**
     * Demo-Modus umschalten
     */
    toggleDemoMode() {
        try {
            const toggle = document.getElementById('demoModeToggle');
            const newState = toggle.checked;

            SettingsStorage.setDemoMode(newState);
            this.updateDemoModeUI();

            const action = newState ? 'aktiviert' : 'deaktiviert';
            ActivityStorage.addLog('Demo Mode Toggle', `Demo-Modus ${action} von ${this.currentMaster.name}`);
            UIUtils.showNotification(`🎮 Demo-Modus ${action}!`, 'info');

            console.log(`🎮 Demo-Modus ${action}:`, newState);

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.toggleDemoMode');
        }
    }

    /**
     * Aktivitäts-Logs laden
     */
    loadActivityLogs() {
        const logs = ActivityStorage.getLogs();
        
        document.getElementById('activityLogs').innerHTML = `
            <div style="max-height: 300px; overflow-y: auto; border: 1px solid #e0e0e0; border-radius: 8px;">
                ${logs.slice(0, 20).map(log => `
                    <div style="padding: 0.5rem; border-bottom: 1px solid #f0f0f0; font-size: 0.9rem;">
                        <div style="display: flex; justify-content: space-between;">
                            <strong>${log.action}</strong>
                            <small>${Formatter.formatDateTime(log.timestamp)}</small>
                        </div>
                        <div style="color: #666;">${log.user} (${log.role}): ${log.details}</div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    /**
     * Bestellstatus aktualisieren
     */
    updateOrderStatus(orderId, newStatus) {
        try {
            const oldOrder = OrderStorage.findOrderById(orderId);
            if (!oldOrder) {
                UIUtils.showNotification('❌ Bestellung nicht gefunden.', 'error');
                return;
            }

            const oldStatus = oldOrder.status;
            
            const success = OrderStorage.updateOrder(orderId, { 
                status: newStatus,
                statusUpdatedBy: this.currentMaster.name,
                statusUpdatedAt: new Date().toISOString()
            });

            if (success) {
                ActivityStorage.addLog('Order Status Update', `Order ${orderId} status changed from ${oldStatus} to ${newStatus}`);
                UIUtils.showNotification(`✅ Bestellung #${orderId} Status aktualisiert: ${BusinessUtils.getStatusText(newStatus)}`, 'success');
                this.loadMasterOrders();
            }

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.updateOrderStatus');
        }
    }

    /**
     * Quick Status Update für neue Bestellungen
     */
    quickUpdateOrderStatus(orderId, newStatus) {
        try {
            const order = OrderStorage.findOrderById(orderId);
            if (!order) {
                UIUtils.showNotification('❌ Bestellung nicht gefunden.', 'error');
                return;
            }

            const statusNames = {
                'processing': 'Wird versendet',
                'completed': 'Geliefert'
            };

            if (confirm(`📦 Bestellung #${orderId} auf "${statusNames[newStatus]}" setzen?`)) {
                const oldStatus = order.status;
                
                OrderStorage.updateOrder(orderId, {
                    status: newStatus,
                    statusUpdatedBy: this.currentMaster.name,
                    statusUpdatedAt: new Date().toISOString()
                });
                
                ActivityStorage.addLog('Quick Status Update', `Order ${orderId} status changed from ${oldStatus} to ${newStatus} by ${this.currentMaster.name}`);
                UIUtils.showNotification(`✅ Bestellung #${orderId} Status: ${statusNames[newStatus]}`, 'success');
                
                this.updateOrdersCounter();
                this.showNewOrders(); // Refresh the view
            }

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.quickUpdateOrderStatus');
        }
    }

    /**
     * Bestelldetails anzeigen
     */
    viewOrderDetails(orderId) {
        try {
            const order = OrderStorage.findOrderById(orderId);
            if (!order) {
                UIUtils.showNotification('❌ Bestellung nicht gefunden.', 'error');
                return;
            }

            const details = this.formatOrderDetails(order);
            alert(details);
            ActivityStorage.addLog('View Order', `Viewed details for order ${order.orderId}`);

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.viewOrderDetails');
        }
    }

    /**
     * Bestellung stornieren
     */
    cancelOrder(orderId) {
        try {
            const order = OrderStorage.findOrderById(orderId);
            if (!order) {
                UIUtils.showNotification('❌ Bestellung nicht gefunden.', 'error');
                return;
            }

            if (order.status === 'cancelled') {
                UIUtils.showNotification('⚠️ Diese Bestellung ist bereits storniert.', 'warning');
                return;
            }

            if (order.status === 'completed') {
                UIUtils.showNotification('⚠️ Bereits gelieferte Bestellungen können nicht storniert werden.', 'warning');
                return;
            }

            const reason = prompt('📝 Grund für die Stornierung:', 'Storniert durch Mitarbeiter');
            if (!reason) return;

            const customerMessage = prompt('📧 Nachricht an den Kunden (optional):', 
                `Sehr geehrte/r ${order.customerName},\n\nIhre Bestellung #${orderId} wurde storniert.\n\nGrund: ${reason}\n\nBei Fragen stehen wir Ihnen gerne zur Verfügung.\n\nMit freundlichen Grüßen\nIhr KlarKRAFT Team`);

            if (!confirm(`❌ Möchten Sie Bestellung #${orderId} wirklich stornieren?\n\nKunde: ${order.customerName}\nBetrag: ${Formatter.formatPrice(order.total)}\nGrund: ${reason}`)) {
                return;
            }

            // Update order
            OrderStorage.updateOrder(orderId, {
                status: 'cancelled',
                cancelledBy: this.currentMaster.name,
                cancelledAt: new Date().toISOString(),
                cancelReason: reason,
                customerNotified: !!customerMessage
            });

            // Update customer stats
            const customer = UserStorage.findUserById(order.customerId);
            if (customer) {
                customer.totalOrders = Math.max(0, (customer.totalOrders || 1) - 1);
                customer.totalSpent = Math.max(0, (customer.totalSpent || order.total) - order.total);
                UserStorage.updateUser(customer);
            }

            // Send customer notification if message provided
            if (customerMessage) {
                const subject = `Ihre Bestellung #${orderId} wurde storniert`;
                const mailtoLink = `mailto:${order.customerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(customerMessage)}`;
                window.open(mailtoLink);
                ActivityStorage.addLog('Customer Notified', `Cancellation notification sent to ${order.customerEmail} for order ${orderId}`);
            }

            ActivityStorage.addLog('Order Cancelled', `Order ${orderId} cancelled by ${this.currentMaster.name}. Reason: ${reason}`);
            UIUtils.showNotification(`✅ Bestellung #${orderId} wurde storniert. ${customerMessage ? 'Kunde wurde benachrichtigt.' : ''}`, 'success');
            
            // Reload views
            if (this.currentTab === 'orders') {
                this.loadMasterOrders();
            }
            this.updateOrdersCounter();

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.cancelOrder');
        }
    }

    /**
     * Export-Funktionen
     */
    exportCustomersCSV() {
        try {
            const users = UserStorage.getUsers();
            const csvHeader = 'Kunden-ID,Name,E-Mail,Telefon,Adresse,Stadt,PLZ,Land,Registrierung,Bestellungen,Umsatz\n';
            const csvData = users.map(user => 
                `${user.customerId || ''},"${user.name || ''}","${user.email || ''}","${user.phone || ''}","${user.address || ''}","${user.city || ''}","${user.zip || ''}","${user.country || ''}","${user.registrationDate || ''}",${user.totalOrders || 0},${(user.totalSpent || 0).toFixed(2)}`
            ).join('\n');

            this.downloadCSV(csvHeader + csvData, 'klarkraft_kunden');
            ActivityStorage.addLog('Export Data', 'Exported customer data to CSV');

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.exportCustomersCSV');
        }
    }

    exportOrdersCSV() {
        try {
            const orders = OrderStorage.getOrders();
            const csvHeader = 'Bestell-ID,Kunden-ID,Kundenname,E-Mail,Artikel,Zwischensumme,Versandkosten,Gesamt,Zahlungsmethode,Status,Bestelldatum,Tracking\n';
            const csvData = orders.map(order => 
                `${order.orderId},"${order.customerId}","${order.customerName}","${order.customerEmail}","${order.items.map(item => `${item.name} (${item.quantity}x)`).join('; ')}",${(order.subtotal || (order.total - (order.shippingCost || 0))).toFixed(2)},${(order.shippingCost || 0).toFixed(2)},${order.total.toFixed(2)},"${order.paymentMethod}","${order.status}","${order.orderDate}","${order.trackingNumber}"`
            ).join('\n');

            this.downloadCSV(csvHeader + csvData, 'klarkraft_bestellungen');
            ActivityStorage.addLog('Export Data', 'Exported orders data to CSV');

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.exportOrdersCSV');
        }
    }

    /**
     * Daten-Management
     */
    clearTestData() {
        if (confirm('Möchten Sie wirklich alle Test-Daten löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
            DataManager.clearTestData();
            UIUtils.showNotification('✅ Test-Daten wurden gelöscht.', 'success');
            ActivityStorage.addLog('Clear Data', 'Cleared test data');
            this.loadMasterOverview();
        }
    }

    resetAllData() {
        if (confirm('ACHTUNG: Möchten Sie wirklich ALLE Daten zurücksetzen? Dies löscht alle Kunden, Bestellungen und Logs unwiderruflich!')) {
            if (confirm('Sind Sie sich wirklich sicher? Diese Aktion kann NICHT rückgängig gemacht werden!')) {
                ActivityStorage.addLog('Reset Data', 'All data has been reset');
                DataManager.clearAllData();
                UIUtils.showNotification('🔄 Alle Daten wurden zurückgesetzt. Seite wird neu geladen...', 'info');
                setTimeout(() => location.reload(), 2000);
            }
        }
    }

    exportAllData() {
        try {
            DataManager.downloadExport();
            ActivityStorage.addLog('Export Data', 'Exported complete database');

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.exportAllData');
        }
    }

    /**
     * Neue Bestellungen anzeigen
     */
    showNewOrders() {
        try {
            if (!this.currentMaster) {
                UIUtils.showNotification('⚠️ Nur Mitarbeiter können neue Bestellungen einsehen.', 'warning');
                return;
            }

            const newOrders = OrderStorage.getOrdersByStatus('pending')
                .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

            const ordersList = document.getElementById('newOrdersList');
            
            if (newOrders.length === 0) {
                ordersList.innerHTML = `
                    <div class="empty-cart">
                        <p>🎉 Keine neuen Bestellungen!</p>
                        <p>Alle Bestellungen sind bearbeitet.</p>
                    </div>
                `;
            } else {
                ordersList.innerHTML = this.generateNewOrdersHTML(newOrders);
            }

            UIUtils.showModal('newOrdersModal');
            ActivityStorage.addLog('View New Orders', `Viewed ${newOrders.length} new orders`);

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.showNewOrders');
        }
    }

    /**
     * Neue Bestellungen verarbeiten
     */
    processOrder(orderId) {
        try {
            if (confirm(`✅ Bestellung #${orderId} als "in Bearbeitung" markieren und dem aktuellen Mitarbeiter zuweisen?`)) {
                OrderStorage.updateOrder(orderId, {
                    processedBy: this.currentMaster.name,
                    processedAt: new Date().toISOString(),
                    status: 'pending'
                });

                ActivityStorage.addLog('Process Order', `Order ${orderId} assigned to ${this.currentMaster.name}`);
                UIUtils.showNotification(`✅ Bestellung #${orderId} wurde Ihnen zugewiesen.`, 'success');
                
                this.updateOrdersCounter();
                this.showNewOrders();
            }

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'MasterManager.processOrder');
        }
    }

    /**
     * Hilfsmethoden
     */
    hasPermission(permission) {
        return this.currentMaster?.permissions?.includes('all') || 
               this.currentMaster?.permissions?.includes(permission) ||
               this.currentMaster?.role === 'Administrator';
    }

    getTodayOrders(orders) {
        const today = new Date().toDateString();
        return orders.filter(order => 
            new Date(order.orderDate).toDateString() === today
        );
    }

    updateOrdersCounter() {
        const counter = document.getElementById('ordersCounter');
        if (counter) {
            const newOrders = OrderStorage.getOrdersByStatus('pending').length;
            counter.textContent = newOrders;
        }
    }

    updateUI() {
        if (this.currentMaster) {
            this.updateOrdersCounter();
            
            // Update UI elements
            const authBtn = document.getElementById('authBtn');
            const userInfo = document.getElementById('userInfo');
            const masterInfo = document.getElementById('masterInfo');
            const masterName = document.getElementById('masterName');
            const cartBtn = document.getElementById('cartBtn');
            const ordersBtn = document.getElementById('ordersBtn');
            
            if (authBtn) authBtn.style.display = 'none';
            if (userInfo) userInfo.classList.remove('active');
            if (masterInfo) masterInfo.style.display = 'flex';
            if (masterName) {
                masterName.textContent = this.currentMaster.name;
                masterName.style.color = '#ff6b35';
                masterName.style.fontWeight = 'bold';
                masterName.title = `${this.currentMaster.role} - Session: ${this.currentMaster.sessionId}`;
            }
            
            if (cartBtn) cartBtn.style.display = 'none';
            if (ordersBtn) ordersBtn.style.display = 'block';
        } else {
            // Reset UI when no master is logged in
            const authBtn = document.getElementById('authBtn');
            const userInfo = document.getElementById('userInfo');
            const masterInfo = document.getElementById('masterInfo');
            const cartBtn = document.getElementById('cartBtn');
            const ordersBtn = document.getElementById('ordersBtn');
            
            if (masterInfo) masterInfo.style.display = 'none';
            if (ordersBtn) ordersBtn.style.display = 'none';
            if (cartBtn) cartBtn.style.display = 'block';
            
            // Show auth button if no regular user is logged in
            if (window.authManager && !window.authManager.currentUser) {
                if (authBtn) authBtn.style.display = 'block';
                if (userInfo) userInfo.classList.remove('active');
            }
        }
    }

    // Event handlers for new orders
    handleNewOrder(order) {
        if (this.currentMaster) {
            this.updateOrdersCounter();
            UIUtils.showNotification(`📦 Neue Bestellung eingegangen! (#${order.orderId})`, 'info');
        }
    }

    // Utility methods
    downloadCSV(csvContent, filename) {
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${filename}_${new Date().toISOString().slice(0,10)}.csv`;
        link.click();
    }

    formatOrderDetails(order) {
        const subtotal = order.subtotal || (order.total - (order.shippingCost || 0));
        const shippingInfo = order.shippingCost > 0 ? 
            `\nVersandkosten: ${Formatter.formatPrice(order.shippingCost)}` : 
            '\nVersandkosten: KOSTENLOS (ab €150)';
        
        let statusInfo = `Status: ${BusinessUtils.getStatusText(order.status)}`;
        if (order.status === 'cancelled') {
            statusInfo += `\nStorniert von: ${order.cancelledBy || 'Unbekannt'}`;
            statusInfo += `\nStorniert am: ${order.cancelledAt ? Formatter.formatDateTime(order.cancelledAt) : 'Unbekannt'}`;
            statusInfo += `\nGrund: ${order.cancelReason || 'Kein Grund angegeben'}`;
        }
        
        return `Bestellung: #${order.orderId}
Kunde: ${order.customerName} (${order.customerEmail})
Artikel: ${order.items.map(i => `${i.name} (${i.quantity}x ${Formatter.formatPrice(i.price)})`).join(', ')}

Zwischensumme: ${Formatter.formatPrice(subtotal)}${shippingInfo}
Gesamtsumme: ${Formatter.formatPrice(order.total)}

Zahlungsmethode: ${order.paymentMethod}
${statusInfo}
Tracking: ${order.trackingNumber}
Bestellt am: ${Formatter.formatDateTime(order.orderDate)}

Lieferadresse:
${order.shippingAddress.address}
${order.shippingAddress.zip} ${order.shippingAddress.city}
${order.shippingAddress.country}`;
    }

    // Analytics helper methods
    analyzeProductSales(orders) {
        const productSales = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                if (!productSales[item.name]) {
                    productSales[item.name] = { quantity: 0, revenue: 0 };
                }
                productSales[item.name].quantity += item.quantity;
                productSales[item.name].revenue += item.total;
            });
        });
        
        return Object.entries(productSales)
            .sort(([,a], [,b]) => b.revenue - a.revenue)
            .slice(0, 10);
    }

    analyzeMonthlyRevenue(orders) {
        const monthlyRevenue = {};
        orders.forEach(order => {
            const month = new Date(order.orderDate).toISOString().slice(0, 7);
            monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.total;
        });
        return monthlyRevenue;
    }

    // HTML generators
    generateRecentOrdersHTML(orders) {
        return orders.length > 0 ? orders.map(order => `
            <div class="order-item">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>#${order.orderId}</strong><br>
                        <small>${order.customerName}</small>
                    </div>
                    <div style="text-align: right;">
                        <span class="order-status status-${order.status}">${BusinessUtils.getStatusText(order.status)}</span><br>
                        <strong>${Formatter.formatPrice(order.total)}</strong>
                    </div>
                </div>
            </div>
        `).join('') : '<p>Keine Bestellungen vorhanden.</p>';
    }

    generateRecentCustomersHTML(customers) {
        return customers.length > 0 ? customers.map(user => `
            <div class="customer-item">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>${user.name}</strong><br>
                        <small>${user.email}</small>
                    </div>
                    <div style="text-align: right;">
                        <div>${user.totalOrders || 0} Bestellungen</div>
                        <small>${Formatter.formatPrice(user.totalSpent || 0)}</small>
                    </div>
                </div>
            </div>
        `).join('') : '<p>Keine Kunden registriert.</p>';
    }

    generateAnalyticsHTML(productSales, monthlyRevenue, totalRevenue, userCount, orderCount) {
        return `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                <div class="chart-container">
                    <h4>🏆 Top-Verkäufe (nach Umsatz)</h4>
                    ${productSales.map(([name, data]) => `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #e0e0e0;">
                            <span>${name}</span>
                            <div style="text-align: right;">
                                <strong>${Formatter.formatPrice(data.revenue)}</strong><br>
                                <small>${data.quantity}x verkauft</small>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="chart-container">
                    <h4>📅 Monatlicher Umsatz</h4>
                    ${Object.entries(monthlyRevenue)
                        .sort(([a], [b]) => b.localeCompare(a))
                        .slice(0, 6)
                        .map(([month, revenue]) => `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #e0e0e0;">
                            <span>${new Date(month).toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })}</span>
                            <strong>${Formatter.formatPrice(revenue)}</strong>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="chart-container" style="margin-top: 2rem;">
                <h4>📊 Verkaufsstatistiken</h4>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div style="text-align: center; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: #ff6b35;">${Formatter.formatPrice(totalRevenue / orderCount || 0)}</div>
                        <div>Durchschnittlicher Bestellwert</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: #ff6b35;">${(orderCount / userCount || 0).toFixed(1)}</div>
                        <div>Bestellungen pro Kunde</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: #ff6b35;">${OrderStorage.getOrdersByStatus('completed').length}</div>
                        <div>Abgeschlossene Bestellungen</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: #ff6b35;">${((OrderStorage.getOrdersByStatus('completed').length / orderCount) * 100 || 0).toFixed(1)}%</div>
                        <div>Erfolgsrate</div>
                    </div>
                </div>
            </div>
        `;
    }

    generateNewOrdersHTML(newOrders) {
        return `
            <div style="margin-bottom: 1rem; padding: 1rem; background: rgba(255,107,53,0.1); border-radius: 10px;">
                <h3 style="color: #ff6b35; margin-bottom: 0.5rem;">📊 Übersicht</h3>
                <p><strong>${newOrders.length}</strong> neue Bestellung(en) warten auf Bearbeitung</p>
                <p>Gesamtwert: <strong>${Formatter.formatPrice(newOrders.reduce((sum, order) => sum + order.total, 0))}</strong></p>
            </div>
            
            ${newOrders.map(order => `
                <div class="cart-item" style="border-left: 4px solid #ff6b35; margin-bottom: 1rem;">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <strong>Bestellung #${order.orderId}</strong>
                            <span style="background: #ff6b35; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.8rem;">NEU</span>
                        </div>
                        <div style="margin-bottom: 0.5rem;">
                            <strong>Kunde:</strong> ${order.customerName} (${order.customerEmail})<br>
                            <strong>Bestellt am:</strong> ${Formatter.formatDateTime(order.orderDate)}<br>
                            <strong>Artikel:</strong> ${order.items.length} Produkt(e)
                        </div>
                        <div style="font-size: 0.9rem; color: #8d6e63; margin-bottom: 0.5rem;">
                            ${order.items.map(item => `${item.name} (${item.quantity}x ${Formatter.formatPrice(item.price)})`).join(', ')}
                        </div>
                        <div style="margin-bottom: 0.5rem;">
                            <strong>Lieferadresse:</strong><br>
                            ${order.shippingAddress.address}<br>
                            ${order.shippingAddress.zip} ${order.shippingAddress.city}, ${order.shippingAddress.country}
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong>Zahlungsmethode:</strong> ${order.paymentMethod}<br>
                                <strong>Tracking:</strong> ${order.trackingNumber}
                            </div>
                            <div style="text-align: right;">
                                <div style="font-size: 1.2rem; font-weight: bold; color: #ff6b35;">${Formatter.formatPrice(order.total)}</div>
                                ${order.shippingCost ? 
                                    `<small style="color: #8d6e63;">inkl. ${Formatter.formatPrice(order.shippingCost)} Versand</small>` : 
                                    `<small style="color: #4caf50;">versandkostenfrei</small>`
                                }
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <button class="btn" onclick="window.masterManager.processOrder('${order.orderId}')" style="background: #4caf50; width: auto; padding: 0.5rem 1rem;">
                            ✅ Bearbeiten
                        </button>
                        <button class="btn" onclick="window.masterManager.viewOrderDetails('${order.orderId}')" style="background: #2196f3; width: auto; padding: 0.5rem 1rem;">
                            👁️ Details
                        </button>
                        <button class="btn" onclick="window.masterManager.quickUpdateOrderStatus('${order.orderId}', 'processing')" style="background: #ff9800; width: auto; padding: 0.5rem 1rem;">
                            📦 Versenden
                        </button>
                        <button class="btn" onclick="window.masterManager.cancelOrder('${order.orderId}')" style="background: #f44336; width: auto; padding: 0.5rem 1rem;">
                            ❌ Stornieren
                        </button>
                    </div>
                </div>
            `).join('')}
        `;
    }

    /**
     * Session wiederherstellen
     */
    restoreSession() {
        try {
            const savedMaster = localStorage.getItem('klarkraft_currentMaster');
            if (savedMaster) {
                this.currentMaster = JSON.parse(savedMaster);
                this.updateUI();
                console.log('✅ Master-Session wiederhergestellt:', this.currentMaster.name);
                return true;
            }
            return false;

        } catch (error) {
            console.error('❌ Fehler beim Wiederherstellen der Master-Session:', error);
            localStorage.removeItem('klarkraft_currentMaster');
            return false;
        }
    }

    // Event listener methods
    addEventListener(type, listener) {
        this.eventTarget.addEventListener(type, listener);
    }

    removeEventListener(type, listener) {
        this.eventTarget.removeEventListener(type, listener);
    }

    // Public getters
    get isMasterLoggedIn() {
        return !!this.currentMaster;
    }

    get masterRole() {
        return this.currentMaster?.role || null;
    }

    get masterName() {
        return this.currentMaster?.name || null;
    }
}

// Export singleton instance
export const masterManager = new MasterManager();