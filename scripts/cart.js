// scripts/cart.js
import { CONFIG } from './config.js';
import { CartStorage, OrderStorage, UserStorage, ActivityStorage, SettingsStorage } from './storage.js';
import { BusinessUtils, UIUtils, IDGenerator, ErrorHandler } from './utils.js';

/**
 * Warenkorb-Manager
 */
export class CartManager {
    constructor() {
        this.cart = [];
        this.selectedPaymentMethod = null;
        this.eventTarget = new EventTarget();
        
        this.init();
    }

    /**
     * Initialisierung
     */
    init() {
        this.loadCart();
        this.addEventListeners();
        this.updateCartCounter();
        
        console.log('🛒 CartManager initialisiert');
    }

    /**
     * Warenkorb aus Storage laden
     */
    loadCart() {
        try {
            this.cart = CartStorage.getCart();
            console.log(`📦 Warenkorb geladen: ${this.cart.length} Artikel`);
        } catch (error) {
            ErrorHandler.logError(error, 'CartManager.loadCart');
            this.cart = [];
        }
    }

    /**
     * Warenkorb in Storage speichern
     */
    saveCart() {
        try {
            CartStorage.setCart(this.cart);
            this.updateCartCounter();
            this.emitCartChange();
        } catch (error) {
            ErrorHandler.logError(error, 'CartManager.saveCart');
        }
    }

    /**
     * Event Listeners hinzufügen
     */
    addEventListeners() {
        // Modal close events
        window.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal')) {
                UIUtils.hideModal();
            }
        });
    }

    /**
     * Produkt zum Warenkorb hinzufügen
     */
    addProduct(product, quantity = 1) {
        try {
            if (!product || !product.id) {
                throw new Error('Ungültiges Produkt');
            }

            const existingItem = this.cart.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                this.cart.push({ ...product, quantity });
            }
            
            this.saveCart();
            UIUtils.showNotification('✅ Produkt zum Warenkorb hinzugefügt!', 'success');
            
            console.log(`➕ Produkt hinzugefügt: ${product.name} (${quantity}x)`);
            
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'CartManager.addProduct');
        }
    }

    /**
     * Produktmenge ändern
     */
    changeQuantity(productId, change) {
        try {
            const item = this.cart.find(item => item.id === productId);
            if (!item) return;

            item.quantity += change;
            
            if (item.quantity <= 0) {
                this.removeProduct(productId);
            } else {
                this.saveCart();
                this.refreshCartDisplay();
            }
            
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'CartManager.changeQuantity');
        }
    }

    /**
     * Produkt aus Warenkorb entfernen
     */
    removeProduct(productId) {
        try {
            const initialLength = this.cart.length;
            this.cart = this.cart.filter(item => item.id !== productId);
            
            if (this.cart.length < initialLength) {
                this.saveCart();
                this.refreshCartDisplay();
                UIUtils.showNotification('🗑️ Produkt entfernt', 'info');
            }
            
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'CartManager.removeProduct');
        }
    }

    /**
     * Warenkorb leeren
     */
    clearCart() {
        try {
            this.cart = [];
            this.selectedPaymentMethod = null;
            CartStorage.clearCart();
            this.updateCartCounter();
            this.emitCartChange();
            
            console.log('🧹 Warenkorb geleert');
            
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'CartManager.clearCart');
        }
    }

    /**
     * Warenkorb-Zähler aktualisieren
     */
    updateCartCounter() {
        try {
            const counter = document.getElementById('cartCounter');
            if (counter) {
                const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
                counter.textContent = totalItems;
            }
        } catch (error) {
            ErrorHandler.logError(error, 'CartManager.updateCartCounter');
        }
    }

    /**
     * Warenkorb-Modal anzeigen
     */
    showCart() {
        try {
            if (this.cart.length === 0) {
                this.showEmptyCart();
            } else {
                this.showCartWithItems();
            }
            
            UIUtils.showModal('cartModal');
            
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'CartManager.showCart');
        }
    }

    /**
     * Leeren Warenkorb anzeigen
     */
    showEmptyCart() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        if (cartItems) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <p>Ihr Warenkorb ist leer.</p>
                    <p>Entdecken Sie unsere energetischen Produkte!</p>
                </div>
            `;
        }
        
        if (cartTotal) {
            cartTotal.innerHTML = 'Gesamt: €0,00';
        }
        
        // Hide payment section
        const paymentSection = document.getElementById('paymentSection');
        if (paymentSection) {
            paymentSection.style.display = 'none';
        }
    }

    /**
     * Warenkorb mit Produkten anzeigen
     */
    showCartWithItems() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');
        
        const calculations = BusinessUtils.calculateOrderTotal(this.cart);
        
        if (cartItems) {
            cartItems.innerHTML = this.cart.map(item => `
                <div class="cart-item" data-product-id="${item.id}">
                    <div>
                        <strong>${item.name}</strong><br>
                        <small>€${item.price.toFixed(2)} pro Stück</small>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="window.cartManager.changeQuantity(${item.id}, -1)">-</button>
                        <span style="margin: 0 10px; font-weight: bold;">${item.quantity}</span>
                        <button class="quantity-btn" onclick="window.cartManager.changeQuantity(${item.id}, 1)">+</button>
                        <button class="quantity-btn" onclick="window.cartManager.removeProduct(${item.id})" style="background: #f44336; margin-left: 10px;">×</button>
                    </div>
                </div>
            `).join('');
        }
        
        if (cartTotal) {
            cartTotal.innerHTML = this.generateCartTotalHTML(calculations);
        }
        
        // Show payment section
        const paymentSection = document.getElementById('paymentSection');
        if (paymentSection) {
            paymentSection.style.display = 'block';
            this.loadSavedPaymentMethods();
        }
    }

    /**
     * Warenkorb-Summe HTML generieren
     */
    generateCartTotalHTML(calculations) {
        const { subtotal, shippingCost, total } = calculations;
        
        return `
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Zwischensumme:</span>
                <span>€${subtotal.toFixed(2)}</span>
            </div>
            ${shippingCost > 0 ? `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; color: #8d6e63;">
                    <span>Versandkosten:</span>
                    <span>€${shippingCost.toFixed(2)}</span>
                </div>
                <div style="font-size: 0.9rem; color: #8d6e63; margin-bottom: 1rem; text-align: center;">
                    📦 Versandkostenfrei ab €${CONFIG.SHIPPING.FREE_THRESHOLD.toFixed(2)}
                </div>
            ` : `
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; color: #4caf50;">
                    <span>Versandkosten:</span>
                    <span>🚚 KOSTENLOS</span>
                </div>
            `}
            <div style="border-top: 2px solid #d7ccc8; padding-top: 1rem; display: flex; justify-content: space-between; font-size: 1.5rem; font-weight: bold; color: #ff6b35;">
                <span>Gesamt:</span>
                <span>€${total.toFixed(2)}</span>
            </div>
        `;
    }

    /**
     * Gespeicherte Zahlungsmethoden laden
     */
    loadSavedPaymentMethods() {
        const container = document.getElementById('savedPaymentMethods');
        if (!container) return;
        
        // Get current user from auth manager
        const currentUser = window.authManager?.getCurrentUser();
        
        if (!currentUser) {
            container.innerHTML = '<p style="color: #8d6e63;">Bitte melden Sie sich an, um Ihre Zahlungsmethoden zu verwenden.</p>';
            return;
        }
        
        if (!currentUser.paymentMethods || currentUser.paymentMethods.length === 0) {
            container.innerHTML = '<p style="color: #8d6e63;">Keine gespeicherten Zahlungsmethoden verfügbar.</p>';
            return;
        }
        
        container.innerHTML = `
            <h4 style="margin-bottom: 1rem;">Gespeicherte Zahlungsmethoden:</h4>
            ${currentUser.paymentMethods.map((method, index) => `
                <div class="payment-method-card ${this.selectedPaymentMethod === index ? 'selected' : ''}" onclick="window.cartManager.selectSavedPaymentMethod(${index})">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>${BusinessUtils.getPaymentMethodIcon(method.type)} ${BusinessUtils.getPaymentMethodName(method.type)}</strong><br>
                            <small>${BusinessUtils.getPaymentMethodDetails(method)}</small>
                        </div>
                        <input type="radio" name="selectedPayment" ${this.selectedPaymentMethod === index ? 'checked' : ''}>
                    </div>
                </div>
            `).join('')}
        `;
    }

    /**
     * Gespeicherte Zahlungsmethode auswählen
     */
    selectSavedPaymentMethod(index) {
        try {
            this.selectedPaymentMethod = index;
            this.loadSavedPaymentMethods();
            
            // Hide other payment options
            const selector = document.getElementById('paymentMethodSelector');
            if (selector) {
                selector.style.display = 'none';
            }
            
            const toggleBtn = document.getElementById('togglePaymentBtn');
            if (toggleBtn) {
                toggleBtn.textContent = 'Andere Zahlungsmethode wählen';
            }
            
            // Show order confirmation
            this.showOrderConfirmation();
            
            // Scroll to confirmation
            setTimeout(() => {
                const confirmation = document.getElementById('orderConfirmation');
                if (confirmation) {
                    confirmation.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }, 100);
            
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'CartManager.selectSavedPaymentMethod');
        }
    }

    /**
     * Bestellbestätigung anzeigen
     */
    showOrderConfirmation() {
        const calculations = BusinessUtils.calculateOrderTotal(this.cart);
        const summary = document.getElementById('orderSummary');
        
        if (summary) {
            summary.innerHTML = this.generateOrderSummaryHTML(calculations);
        }
        
        const confirmation = document.getElementById('orderConfirmation');
        if (confirmation) {
            confirmation.style.display = 'block';
        }
    }

    /**
     * Bestellzusammenfassung HTML generieren
     */
    generateOrderSummaryHTML(calculations) {
        const { subtotal, shippingCost, total } = calculations;
        
        return `
            ${this.cart.map(item => 
                `<div style="display: flex; justify-content: space-between;">
                    <span>${item.name} x${item.quantity}</span>
                    <span>€${(item.price * item.quantity).toFixed(2)}</span>
                </div>`
            ).join('')}
            <hr style="margin: 1rem 0;">
            <div style="display: flex; justify-content: space-between;">
                <span>Zwischensumme:</span>
                <span>€${subtotal.toFixed(2)}</span>
            </div>
            ${shippingCost > 0 ? `
                <div style="display: flex; justify-content: space-between; color: #8d6e63;">
                    <span>Versandkosten:</span>
                    <span>€${shippingCost.toFixed(2)}</span>
                </div>
            ` : `
                <div style="display: flex; justify-content: space-between; color: #4caf50;">
                    <span>Versandkosten:</span>
                    <span>KOSTENLOS</span>
                </div>
            `}
            <hr style="margin: 1rem 0;">
            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2rem; color: #ff6b35;">
                <span>Gesamtsumme:</span>
                <span>€${total.toFixed(2)}</span>
            </div>
        `;
    }

    /**
     * Bestellung abschließen
     */
    async completeOrder() {
        try {
            const currentUser = window.authManager?.getCurrentUser();
            
            if (!currentUser || this.cart.length === 0) {
                UIUtils.showNotification('⚠️ Sie müssen angemeldet sein und Produkte im Warenkorb haben.', 'warning');
                return;
            }

            // Validate payment method
            if (!this.validatePaymentMethod()) {
                return;
            }

            UIUtils.showLoading('Bestellung wird verarbeitet...');

            const calculations = BusinessUtils.calculateOrderTotal(this.cart, currentUser.country);
            const order = this.createOrder(currentUser, calculations);

            // Save order
            OrderStorage.addOrder(order);

            // Update customer stats
            currentUser.totalOrders = (currentUser.totalOrders || 0) + 1;
            currentUser.totalSpent = (currentUser.totalSpent || 0) + calculations.total;
            UserStorage.updateUser(currentUser);
            UserStorage.setCurrentUser(currentUser);

            // Log activity
            ActivityStorage.addLog('Order Placed', `Order ${order.orderId} placed - Total: €${calculations.total.toFixed(2)}`, currentUser);

            UIUtils.showNotification(`✅ Bestellung #${order.orderId} erfolgreich aufgegeben! Gesamtsumme: €${calculations.total.toFixed(2)}`, 'success');

            // Clear cart and close modal
            this.clearCart();
            UIUtils.hideModal();
            UIUtils.hideLoading();

            // Handle demo mode
            this.handleDemoMode(order);

            console.log(`📦 Bestellung abgeschlossen: #${order.orderId}`);

        } catch (error) {
            UIUtils.hideLoading();
            ErrorHandler.handleAsyncError(error, 'CartManager.completeOrder');
        }
    }

    /**
     * Zahlungsmethode validieren
     */
    validatePaymentMethod() {
        const activePaymentMethod = document.querySelector('.payment-btn.active');
        const hasSelectedPaymentMethod = this.selectedPaymentMethod !== null;
        
        if (!hasSelectedPaymentMethod && !activePaymentMethod) {
            UIUtils.showNotification('⚠️ Bitte wählen Sie eine Zahlungsmethode aus!', 'warning');
            return false;
        }

        // Validate new payment method form if needed
        if (activePaymentMethod) {
            return this.validateNewPaymentMethodForm(activePaymentMethod);
        }

        return true;
    }

    /**
     * Neue Zahlungsmethode validieren
     */
    validateNewPaymentMethodForm(activeButton) {
        const methodType = activeButton.id.replace('Btn', '');
        
        switch (methodType) {
            case 'paypal':
                const email = document.getElementById('paypalEmail');
                if (!email?.value.trim() || !email.value.includes('@')) {
                    UIUtils.showNotification('⚠️ Bitte geben Sie eine gültige PayPal-E-Mail-Adresse ein!', 'warning');
                    return false;
                }
                break;
                
            case 'sepa':
                const sepaName = document.getElementById('sepaName');
                const sepaIban = document.getElementById('sepaIban');
                const sepaMandate = document.getElementById('sepaMandate');
                
                if (!sepaName?.value.trim() || !sepaIban?.value.trim() || !sepaMandate?.checked) {
                    UIUtils.showNotification('⚠️ Bitte füllen Sie alle SEPA-Daten aus und bestätigen Sie das Mandat!', 'warning');
                    return false;
                }
                break;
                
            case 'card':
                const cardName = document.getElementById('cardName');
                const cardNumber = document.getElementById('cardNumber');
                const cardExpiry = document.getElementById('cardExpiry');
                const cardCvv = document.getElementById('cardCvv');
                
                if (!cardName?.value.trim() || 
                    !cardNumber?.value.replace(/\s/g, '') || 
                    cardNumber.value.replace(/\s/g, '').length < 16 ||
                    !cardExpiry?.value.match(/^\d{2}\/\d{2}$/) || 
                    !cardCvv?.value || cardCvv.value.length < 3) {
                    UIUtils.showNotification('⚠️ Bitte überprüfen Sie Ihre Kreditkartendaten!', 'warning');
                    return false;
                }
                break;
        }
        
        return true;
    }

    /**
     * Bestellung erstellen
     */
    createOrder(currentUser, calculations) {
        return {
            orderId: IDGenerator.generateOrderId(),
            customerId: currentUser.customerId,
            customerName: currentUser.name,
            customerEmail: currentUser.email,
            customerPhone: currentUser.phone || '',
            shippingAddress: {
                address: currentUser.address,
                city: currentUser.city,
                zip: currentUser.zip,
                country: currentUser.country
            },
            items: this.cart.map(item => ({
                productId: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                total: item.price * item.quantity
            })),
            subtotal: calculations.subtotal,
            shippingCost: calculations.shippingCost,
            total: calculations.total,
            paymentMethod: this.getPaymentMethodName(),
            status: 'pending',
            orderDate: new Date().toISOString(),
            trackingNumber: IDGenerator.generateTrackingNumber()
        };
    }

    /**
     * Name der gewählten Zahlungsmethode ermitteln
     */
    getPaymentMethodName() {
        if (this.selectedPaymentMethod !== null) {
            const currentUser = window.authManager?.getCurrentUser();
            if (currentUser?.paymentMethods?.[this.selectedPaymentMethod]) {
                return BusinessUtils.getPaymentMethodName(currentUser.paymentMethods[this.selectedPaymentMethod].type);
            }
        }
        return 'Neue Zahlungsmethode';
    }

    /**
     * Demo-Modus behandeln
     */
    handleDemoMode(order) {
        const demoModeEnabled = SettingsStorage.getDemoMode();
        const currentMasterSession = window.authManager?.getCurrentMaster();
        
        if (!demoModeEnabled) {
            // Demo mode OFF = NEVER automatic updates
            console.log('🔐 Demo-Modus AUS - keine automatischen Updates');
            UIUtils.showNotification('📦 Bestellung eingegangen! Manuelle Bearbeitung erforderlich.', 'info');
            
            if (currentMasterSession) {
                this.emitNewOrder(order);
            }
        } else if (demoModeEnabled && currentMasterSession) {
            // Demo mode ON + Master logged in = NO automatic updates
            console.log('🤖 Demo-Modus AN + Mitarbeiter angemeldet - keine automatischen Updates');
            UIUtils.showNotification('📦 Bestellung eingegangen! Mitarbeiter wird sie bearbeiten.', 'info');
            this.emitNewOrder(order);
        } else if (demoModeEnabled && !currentMasterSession) {
            // Demo mode ON + NO Master = automatic updates
            console.log('🤖 Demo-Modus AN + kein Mitarbeiter - automatische Updates aktiv');
            UIUtils.showNotification('🤖 Demo-Modus: Automatische Bearbeitung gestartet', 'info');
            this.scheduleAutomaticOrderUpdates(order);
        }
    }

    /**
     * Automatische Bestellupdates planen
     */
    scheduleAutomaticOrderUpdates(order) {
        // Processing after 5 seconds
        setTimeout(() => {
            OrderStorage.updateOrder(order.orderId, {
                status: 'processing',
                autoProcessedBy: 'Demo-System'
            });
            UIUtils.showNotification(`📦 Demo: Bestellung #${order.orderId} wird bearbeitet`, 'info');
        }, 5000);
        
        // Completed after 10 seconds
        setTimeout(() => {
            OrderStorage.updateOrder(order.orderId, {
                status: 'completed',
                autoCompletedBy: 'Demo-System'
            });
            UIUtils.showNotification(`🚚 Demo: Bestellung #${order.orderId} wurde versendet!`, 'success');
        }, 10000);
    }

    /**
     * Neue Bestellung Event emittieren
     */
    emitNewOrder(order) {
        this.eventTarget.dispatchEvent(new CustomEvent('newOrder', {
            detail: { order }
        }));
    }

    /**
     * Warenkorb-Änderung Event emittieren
     */
    emitCartChange() {
        this.eventTarget.dispatchEvent(new CustomEvent('cartChanged', {
            detail: { 
                cart: this.cart,
                itemCount: this.cart.reduce((sum, item) => sum + item.quantity, 0)
            }
        }));
    }

    /**
     * Warenkorb-Anzeige aktualisieren
     */
    refreshCartDisplay() {
        if (document.getElementById('cartModal').style.display === 'block') {
            this.showCart();
        }
    }

    // Ergänzungen für scripts/cart.js - Diese Methoden zur CartManager Klasse hinzufügen:

    /**
     * Produktmenge im Detail-Modal ändern
     */
    changeDetailQuantity(change) {
        const input = document.getElementById('detailQuantity');
        if (input) {
            const currentValue = parseInt(input.value) || 1;
            const newValue = Math.max(1, Math.min(10, currentValue + change));
            input.value = newValue;
        }
    }
    
    /**
     * Zusätzliche globale Funktionen für HTML onclick Handler
     */
    setupCartGlobalMethods() {
        // Quantity change function für Product Detail Modal
        window.changeDetailQuantity = (change) => {
            this.changeDetailQuantity(change);
        };
        
        // Add to cart with quantity from detail modal
        window.addToCartFromDetail = (productId) => {
            this.addToCartWithQuantity(productId);
        };
    }
    
    /**
     * Cart initialization erweitern
     */
    init() {
        this.loadCart();
        this.addEventListeners();
        this.updateCartCounter();
        this.setupCartGlobalMethods(); // Neue Methode hinzufügen
        
        console.log('🛒 CartManager initialisiert');
    }
    
    /**
     * Bestellung stornieren (aus Order Confirmation)
     */
    cancelOrderFromConfirmation() {
        try {
            // Hide order confirmation
            const confirmation = document.getElementById('orderConfirmation');
            if (confirmation) {
                confirmation.style.display = 'none';
            }
            
            // Reset payment method selection
            this.selectedPaymentMethod = null;
            
            // Clear active payment buttons
            document.querySelectorAll('.payment-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Hide payment forms
            const forms = document.getElementById('paymentForms');
            if (forms) {
                forms.innerHTML = '';
            }
            
            UIUtils.showNotification('Bestellung abgebrochen', 'info');
            
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'CartManager.cancelOrderFromConfirmation');
        }
    }
    
    /**
     * Session wiederherstellen
     */
    restoreSession() {
        try {
            this.loadCart();
            console.log('✅ Cart-Session wiederhergestellt');
            return true;
        } catch (error) {
            console.error('❌ Fehler beim Wiederherstellen der Cart-Session:', error);
            this.cart = [];
            return false;
        }
    }
    
    /**
     * Zahlung validieren - erweiterte Version
     */
    validatePaymentMethod() {
        const activePaymentMethod = document.querySelector('.payment-btn.active');
        const hasSelectedPaymentMethod = this.selectedPaymentMethod !== null;
        
        if (!hasSelectedPaymentMethod && !activePaymentMethod) {
            UIUtils.showNotification('⚠️ Bitte wählen Sie eine Zahlungsmethode aus!', 'warning');
            return false;
        }
    
        // Validate new payment method form if needed
        if (activePaymentMethod) {
            return this.validateNewPaymentMethodForm(activePaymentMethod);
        }
    
        return true;
    }
    
    /**
     * Neue Zahlungsmethode validieren - erweiterte Version
     */
    validateNewPaymentMethodForm(activeButton) {
        const methodType = activeButton.id.replace('Btn', '');
        
        switch (methodType) {
            case 'paypal':
                const email = document.getElementById('paypalEmail');
                if (!email?.value.trim()) {
                    UIUtils.showNotification('⚠️ Bitte geben Sie Ihre PayPal-E-Mail-Adresse ein!', 'warning');
                    return false;
                }
                if (!Validator.isValidEmail(email.value.trim())) {
                    UIUtils.showNotification('⚠️ Bitte geben Sie eine gültige PayPal-E-Mail-Adresse ein!', 'warning');
                    return false;
                }
                break;
                
            case 'sepa':
                const sepaName = document.getElementById('sepaName');
                const sepaIban = document.getElementById('sepaIban');
                const sepaMandate = document.getElementById('sepaMandate');
                
                if (!sepaName?.value.trim()) {
                    UIUtils.showNotification('⚠️ Bitte geben Sie den Namen für die Lastschrift ein!', 'warning');
                    return false;
                }
                
                if (!sepaIban?.value.trim()) {
                    UIUtils.showNotification('⚠️ Bitte geben Sie Ihre IBAN ein!', 'warning');
                    return false;
                }
                
                if (!Validator.isValidIBAN(sepaIban.value.trim())) {
                    UIUtils.showNotification('⚠️ Bitte geben Sie eine gültige IBAN ein!', 'warning');
                    return false;
                }
                
                if (!sepaMandate?.checked) {
                    UIUtils.showNotification('⚠️ Bitte bestätigen Sie das SEPA-Lastschriftmandat!', 'warning');
                    return false;
                }
                break;
                
            case 'card':
                const cardName = document.getElementById('cardName');
                const cardNumber = document.getElementById('cardNumber');
                const cardExpiry = document.getElementById('cardExpiry');
                const cardCvv = document.getElementById('cardCvv');
                
                if (!cardName?.value.trim()) {
                    UIUtils.showNotification('⚠️ Bitte geben Sie den Namen auf der Karte ein!', 'warning');
                    return false;
                }
                
                if (!cardNumber?.value.trim()) {
                    UIUtils.showNotification('⚠️ Bitte geben Sie die Kartennummer ein!', 'warning');
                    return false;
                }
                
                if (!Validator.isValidCreditCard(cardNumber.value.trim())) {
                    UIUtils.showNotification('⚠️ Bitte geben Sie eine gültige Kartennummer ein!', 'warning');
                    return false;
                }
                
                if (!cardExpiry?.value.trim()) {
                    UIUtils.showNotification('⚠️ Bitte geben Sie das Ablaufdatum ein!', 'warning');
                    return false;
                }
                
                if (!Validator.isValidExpiryDate(cardExpiry.value.trim())) {
                    UIUtils.showNotification('⚠️ Bitte geben Sie ein gültiges Ablaufdatum ein (MM/JJ)!', 'warning');
                    return false;
                }
                
                if (!cardCvv?.value.trim()) {
                    UIUtils.showNotification('⚠️ Bitte geben Sie den CVV-Code ein!', 'warning');
                    return false;
                }
                
                if (!Validator.isValidCVV(cardCvv.value.trim())) {
                    UIUtils.showNotification('⚠️ Bitte geben Sie einen gültigen CVV-Code ein!', 'warning');
                    return false;
                }
                break;
                
            default:
                UIUtils.showNotification('⚠️ Unbekannte Zahlungsmethode!', 'error');
                return false;
        }
        
        return true;
    }
    
    // Event listener methods
    addEventListener(type, listener) {
        this.eventTarget.addEventListener(type, listener);
    }

    removeEventListener(type, listener) {
        this.eventTarget.removeEventListener(type, listener);
    }

    // Getter methods
    getCart() { return [...this.cart]; }
    getItemCount() { return this.cart.reduce((sum, item) => sum + item.quantity, 0); }
    getTotal() { return BusinessUtils.calculateOrderTotal(this.cart).total; }
}

// Export singleton instance
export const cartManager = new CartManager();
