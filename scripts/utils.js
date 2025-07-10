// scripts/utils.js
import { CONFIG } from './config.js';

    /**
     * ID Generatoren
     */
    export const IDGenerator = {
        generateCustomerId() {
            return 'KK' + Date.now().toString().slice(-8);
        },
        
        generateOrderId() {
            return 'ORD' + Date.now().toString().slice(-6);
        },
        
        generateSessionId() {
            return 'SES' + Math.random().toString(36).substr(2, 8).toUpperCase();
        },
        
        generateTrackingNumber() {
            return 'KK' + Math.random().toString(36).substr(2, 8).toUpperCase();
        }
    };
    
    /**
     * Validierungs-Utilities
     */
    export const Validator = {
        isValidEmail(email) {
            return CONFIG.VALIDATION.EMAIL_PATTERN.test(email);
        },
        
        isValidPassword(password) {
            return password && password.length >= CONFIG.VALIDATION.PASSWORD_MIN_LENGTH;
        },
        
        isValidPhone(phone) {
            return CONFIG.VALIDATION.PHONE_PATTERN.test(phone);
        },
        
        isValidIBAN(iban) {
            return CONFIG.VALIDATION.IBAN_PATTERN.test(iban.replace(/\s/g, ''));
        },
        
        isValidCreditCard(number) {
            const cleanNumber = number.replace(/\s/g, '');
            return cleanNumber.length >= 16 && /^\d+$/.test(cleanNumber);
        },
        
        isValidExpiryDate(expiry) {
            return /^\d{2}\/\d{2}$/.test(expiry);
        },
        
        isValidCVV(cvv) {
            return /^\d{3,4}$/.test(cvv);
        }
    };
    
    /**
     * Formatierungs-Utilities
     */
    export const Formatter = {
        formatPrice(price) {
            return `€${price.toFixed(2)}`;
        },
        
        formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('de-DE');
        },
        
        formatDateTime(dateString) {
            return new Date(dateString).toLocaleString('de-DE');
        },
        
        formatPhoneNumber(phone) {
            // Einfache deutsche Telefonnummer-Formatierung
            const cleaned = phone.replace(/\D/g, '');
            if (cleaned.startsWith('49')) {
                return `+49 ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
            }
            return phone;
        },
        
        formatIBAN(iban) {
            return iban.replace(/(.{4})/g, '$1 ').trim();
        },
        
        maskCreditCard(number) {
            const cleaned = number.replace(/\s/g, '');
            return `****${cleaned.slice(-4)}`;
        },
        
        truncateText(text, maxLength = 100) {
            if (text.length <= maxLength) return text;
            return text.substring(0, maxLength) + '...';
        }
    };
    
    /**
     * DOM Utilities
     */
    export const DOMUtils = {
        createElement(tag, className = '', innerHTML = '') {
            const element = document.createElement(tag);
            if (className) element.className = className;
            if (innerHTML) element.innerHTML = innerHTML;
            return element;
        },
        
        getElement(selector) {
            return document.querySelector(selector);
        },
        
        getAllElements(selector) {
            return document.querySelectorAll(selector);
        },
        
        show(element) {
            if (typeof element === 'string') {
                element = this.getElement(element);
            }
            if (element) element.style.display = 'block';
        },
        
        hide(element) {
            if (typeof element === 'string') {
                element = this.getElement(element);
            }
            if (element) element.style.display = 'none';
        },
        
        toggle(element) {
            if (typeof element === 'string') {
                element = this.getElement(element);
            }
            if (element) {
                element.style.display = element.style.display === 'none' ? 'block' : 'none';
            }
        },
        
        addClass(element, className) {
            if (typeof element === 'string') {
                element = this.getElement(element);
            }
            if (element) element.classList.add(className);
        },
        
        removeClass(element, className) {
            if (typeof element === 'string') {
                element = this.getElement(element);
            }
            if (element) element.classList.remove(className);
        },
        
        toggleClass(element, className) {
            if (typeof element === 'string') {
                element = this.getElement(element);
            }
            if (element) element.classList.toggle(className);
        }
    };
    
    /**
     * Array Utilities
     */
    export const ArrayUtils = {
        groupBy(array, key) {
            return array.reduce((groups, item) => {
                const group = item[key];
                groups[group] = groups[group] || [];
                groups[group].push(item);
                return groups;
            }, {});
        },
        
        sortBy(array, key, ascending = true) {
            return [...array].sort((a, b) => {
                const valueA = a[key];
                const valueB = b[key];
                
                if (valueA < valueB) return ascending ? -1 : 1;
                if (valueA > valueB) return ascending ? 1 : -1;
                return 0;
            });
        },
        
        filterUnique(array, key) {
            const seen = new Set();
            return array.filter(item => {
                const value = key ? item[key] : item;
                if (seen.has(value)) return false;
                seen.add(value);
                return true;
            });
        },
        
        chunk(array, size) {
            const chunks = [];
            for (let i = 0; i < array.length; i += size) {
                chunks.push(array.slice(i, i + size));
            }
            return chunks;
        }
    };
    
    /**
     * Event Utilities
     */
    export const EventUtils = {
        debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },
        
        throttle(func, limit) {
            let lastFunc;
            let lastRan;
            return function(...args) {
                if (!lastRan) {
                    func.apply(this, args);
                    lastRan = Date.now();
                } else {
                    clearTimeout(lastFunc);
                    lastFunc = setTimeout(() => {
                        if ((Date.now() - lastRan) >= limit) {
                            func.apply(this, args);
                            lastRan = Date.now();
                        }
                    }, limit - (Date.now() - lastRan));
                }
            }
        },
        
        once(func) {
            let called = false;
            return function(...args) {
                if (!called) {
                    called = true;
                    return func.apply(this, args);
                }
            };
        }
    };
    
    /**
     * Business Logic Utilities
     */
    export const BusinessUtils = {
        calculateShippingCost(subtotal, country = 'Deutschland') {
            const countryConfig = CONFIG.SHIPPING.COUNTRIES[country];
            if (!countryConfig) return CONFIG.SHIPPING.COST;
            
            return subtotal >= countryConfig.freeThreshold ? 0 : countryConfig.cost;
        },
        
        calculateOrderTotal(items, country = 'Deutschland') {
            const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const shippingCost = this.calculateShippingCost(subtotal, country);
            return {
                subtotal,
                shippingCost,
                total: subtotal + shippingCost
            };
        },
        
        getStatusText(status) {
            const statusTexts = {
                'pending': 'In Bearbeitung',
                'processing': 'Wird versendet',
                'completed': 'Geliefert',
                'cancelled': 'Storniert'
            };
            return statusTexts[status] || status;
        },
        
        getPaymentMethodIcon(type) {
            const icons = {
                'paypal': '💳',
                'sepa': '🏦',
                'card': '💳'
            };
            return icons[type] || '💳';
        },
        
        getPaymentMethodName(type) {
            const names = {
                'paypal': 'PayPal',
                'sepa': 'SEPA-Lastschrift',
                'card': 'Kreditkarte'
            };
            return names[type] || 'Unbekannt';
        },
        
        getPaymentMethodDetails(method) {
            switch(method.type) {
                case 'paypal':
                    return method.email;
                case 'sepa':
                    return `${method.name} - ${method.iban.substring(0, 8)}...`;
                case 'card':
                    return `${method.name} - ****${method.number.slice(-4)}`;
                default:
                    return '';
            }
        }
    };
    
    /**
     * UI Utilities
     */
    export const UIUtils = {
        showNotification(message, type = 'success', duration = CONFIG.UI.NOTIFICATION_DURATION) {
            const notification = document.createElement('div');
            
            const colors = {
                success: 'linear-gradient(135deg, #4caf50, #66bb6a)',
                error: 'linear-gradient(135deg, #f44336, #ef5350)',
                warning: 'linear-gradient(135deg, #ff9800, #ffb74d)',
                info: 'linear-gradient(135deg, #2196f3, #42a5f5)'
            };
            
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${colors[type] || colors.success};
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                z-index: 1001;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                animation: slideInRight 0.3s ease;
                max-width: 300px;
                word-wrap: break-word;
                font-family: var(--font-family-main, Georgia, serif);
            `;
            
            notification.textContent = message;
            document.body.appendChild(notification);
            
            // Auto-remove after duration
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.style.animation = 'slideOutRight 0.3s ease';
                    setTimeout(() => notification.remove(), 300);
                }
            }, duration);
            
            return notification;
        },
        
        showLoading(message = 'Lädt...') {
            const existing = document.getElementById('globalLoading');
            if (existing) return;
            
            const loading = document.createElement('div');
            loading.id = 'globalLoading';
            loading.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                backdrop-filter: blur(5px);
            `;
            
            loading.innerHTML = `
                <div style="background: white; padding: 2rem; border-radius: 10px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                    <div style="border: 4px solid #f3f3f3; border-top: 4px solid #ff6b35; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
                    <div style="color: #5d4037; font-weight: bold;">${message}</div>
                </div>
            `;
            
            document.body.appendChild(loading);
        },
        
        hideLoading() {
            const loading = document.getElementById('globalLoading');
            if (loading) loading.remove();
        },
        
        showModal(modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                // Add animation class if needed
                setTimeout(() => modal.classList.add('modal-open'), 10);
            }
        },
        
        hideModal(modalId) {
            const modal = modalId ? document.getElementById(modalId) : null;
            if (modal) {
                modal.style.display = 'none';
                modal.classList.remove('modal-open');
            } else {
                // Hide all modals
                document.querySelectorAll('.modal').forEach(m => {
                    m.style.display = 'none';
                    m.classList.remove('modal-open');
                });
            }
        },
        
        updateElementText(selector, text) {
            const element = document.querySelector(selector);
            if (element) element.textContent = text;
        },
        
        updateElementHTML(selector, html) {
            const element = document.querySelector(selector);
            if (element) element.innerHTML = html;
        }
    };
    
    /**
     * Error Handling Utilities
     */
    export const ErrorHandler = {
        logError(error, context = 'Unknown') {
            console.error(`[${context}] Error:`, error);
            
            // In production könnte hier ein Error-Tracking Service aufgerufen werden
            if (typeof window.gtag === 'function') {
                window.gtag('event', 'exception', {
                    description: `${context}: ${error.message}`,
                    fatal: false
                });
            }
        },
        
        handleAsyncError(error, context, showNotification = true) {
            this.logError(error, context);
            
            if (showNotification) {
                UIUtils.showNotification(
                    `Ein Fehler ist aufgetreten: ${error.message}`,
                    'error'
                );
            }
        },
        
        wrapAsync(asyncFn, context) {
            return async (...args) => {
                try {
                    return await asyncFn(...args);
                } catch (error) {
                    this.handleAsyncError(error, context);
                    throw error;
                }
            };
        }
    };
    
    /**
     * Performance Utilities
     */
    export const PerformanceUtils = {
        measureTime(label, fn) {
            const start = performance.now();
            const result = fn();
            const end = performance.now();
            console.log(`${label} took ${end - start} milliseconds`);
            return result;
        },
        
        async measureTimeAsync(label, asyncFn) {
            const start = performance.now();
            const result = await asyncFn();
            const end = performance.now();
            console.log(`${label} took ${end - start} milliseconds`);
            return result;
        },
        
        lazy(fn) {
            let result;
            let computed = false;
            return () => {
                if (!computed) {
                    result = fn();
                    computed = true;
                }
                return result;
            };
        }
    };
    
    // Ergänzungen für scripts/utils.js - Diese Methoden zum Validator-Objekt hinzufügen:
    
    /**
     * Erweiterte Validierungs-Utilities
     */
    export const Validator = {
        isValidEmail(email) {
            if (!email) return false;
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email.trim());
        },
        
        isValidPassword(password) {
            return password && password.length >= 6; // CONFIG.VALIDATION.PASSWORD_MIN_LENGTH
        },
        
        isValidPhone(phone) {
            if (!phone) return true; // Phone is optional
            const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
            return phonePattern.test(phone.replace(/\s/g, ''));
        },
        
        isValidIBAN(iban) {
            if (!iban) return false;
            const cleanIban = iban.replace(/\s/g, '').toUpperCase();
            const ibanPattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/;
            
            if (!ibanPattern.test(cleanIban)) return false;
            
            // IBAN mod-97 validation
            try {
                const rearranged = cleanIban.slice(4) + cleanIban.slice(0, 4);
                const numericString = rearranged.replace(/[A-Z]/g, (char) => 
                    (char.charCodeAt(0) - 55).toString()
                );
                
                // BigInt für große Zahlen verwenden
                const remainder = BigInt(numericString) % BigInt(97);
                return remainder === BigInt(1);
            } catch (error) {
                return false;
            }
        },
        
        isValidCreditCard(number) {
            if (!number) return false;
            const cleanNumber = number.replace(/\s/g, '');
            
            // Check length and digits only
            if (!/^\d{13,19}$/.test(cleanNumber)) return false;
            
            // Luhn algorithm
            let sum = 0;
            let shouldDouble = false;
            
            for (let i = cleanNumber.length - 1; i >= 0; i--) {
                let digit = parseInt(cleanNumber.charAt(i));
                
                if (shouldDouble) {
                    digit *= 2;
                    if (digit > 9) digit -= 9;
                }
                
                sum += digit;
                shouldDouble = !shouldDouble;
            }
            
            return sum % 10 === 0;
        },
        
        isValidExpiryDate(expiry) {
            if (!expiry) return false;
            const expiryPattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
            
            if (!expiryPattern.test(expiry)) return false;
            
            const [month, year] = expiry.split('/');
            const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
            const today = new Date();
            
            return expiryDate > today;
        },
        
        isValidCVV(cvv) {
            if (!cvv) return false;
            return /^\d{3,4}$/.test(cvv.trim());
        },
        
        isValidZip(zip, country = 'Deutschland') {
            if (!zip) return false;
            
            const patterns = {
                'Deutschland': /^\d{5}$/,
                'Österreich': /^\d{4}$/,
                'Schweiz': /^\d{4}$/
            };
            
            const pattern = patterns[country] || patterns['Deutschland'];
            return pattern.test(zip.trim());
        },
        
        isValidName(name) {
            if (!name) return false;
            const cleanName = name.trim();
            return cleanName.length >= 2 && cleanName.length <= 50;
        },
        
        isValidAddress(address) {
            if (!address) return false;
            const cleanAddress = address.trim();
            return cleanAddress.length >= 5 && cleanAddress.length <= 100;
        },
        
        isValidCity(city) {
            if (!city) return false;
            const cleanCity = city.trim();
            return cleanCity.length >= 2 && cleanCity.length <= 50;
        }
    };
    
    /**
     * Erweiterte Formatierungs-Utilities
     */
    export const Formatter = {
        formatPrice(price) {
            if (typeof price !== 'number') price = parseFloat(price) || 0;
            return `€${price.toFixed(2).replace('.', ',')}`;
        },
        
        formatDate(dateString) {
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            } catch (error) {
                return 'Ungültiges Datum';
            }
        },
        
        formatDateTime(dateString) {
            try {
                const date = new Date(dateString);
                return date.toLocaleString('de-DE', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } catch (error) {
                return 'Ungültiges Datum';
            }
        },
        
        formatPhoneNumber(phone) {
            if (!phone) return '';
            
            // Einfache deutsche Telefonnummer-Formatierung
            const cleaned = phone.replace(/\D/g, '');
            
            if (cleaned.startsWith('49')) {
                // International format
                const withoutCountry = cleaned.slice(2);
                if (withoutCountry.length >= 10) {
                    return `+49 ${withoutCountry.slice(0, 3)} ${withoutCountry.slice(3, 6)} ${withoutCountry.slice(6)}`;
                }
            } else if (cleaned.startsWith('0')) {
                // National format
                if (cleaned.length >= 10) {
                    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
                }
            }
            
            return phone; // Return original if no pattern matches
        },
        
        formatIBAN(iban) {
            if (!iban) return '';
            const cleaned = iban.replace(/\s/g, '');
            return cleaned.replace(/(.{4})/g, '$1 ').trim();
        },
        
        maskCreditCard(number) {
            if (!number) return '';
            const cleaned = number.replace(/\s/g, '');
            if (cleaned.length < 4) return '****';
            return `**** **** **** ${cleaned.slice(-4)}`;
        },
        
        truncateText(text, maxLength = 100) {
            if (!text) return '';
            if (text.length <= maxLength) return text;
            return text.substring(0, maxLength - 3) + '...';
        },
        
        formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        },
        
        formatPercentage(value, decimals = 1) {
            if (typeof value !== 'number') value = parseFloat(value) || 0;
            return `${(value * 100).toFixed(decimals)}%`;
        }
    };
    
    /**
     * Erweiterte Business Logic Utilities
     */
    export const BusinessUtils = {
        calculateShippingCost(subtotal, country = 'Deutschland') {
            const shippingConfig = {
                'Deutschland': { cost: 6.90, freeThreshold: 150 },
                'Österreich': { cost: 12.90, freeThreshold: 200 },
                'Schweiz': { cost: 16.90, freeThreshold: 999999 } // Keine kostenlose Lieferung
            };
            
            const config = shippingConfig[country] || shippingConfig['Deutschland'];
            return subtotal >= config.freeThreshold ? 0 : config.cost;
        },
        
        calculateOrderTotal(items, country = 'Deutschland') {
            if (!Array.isArray(items) || items.length === 0) {
                return { subtotal: 0, shippingCost: 0, total: 0 };
            }
            
            const subtotal = items.reduce((sum, item) => {
                const price = parseFloat(item.price) || 0;
                const quantity = parseInt(item.quantity) || 0;
                return sum + (price * quantity);
            }, 0);
            
            const shippingCost = this.calculateShippingCost(subtotal, country);
            
            return {
                subtotal: Math.round(subtotal * 100) / 100,
                shippingCost: Math.round(shippingCost * 100) / 100,
                total: Math.round((subtotal + shippingCost) * 100) / 100
            };
        },
        
        getStatusText(status) {
            const statusTexts = {
                'pending': 'In Bearbeitung',
                'processing': 'Wird versendet',
                'completed': 'Geliefert',
                'cancelled': 'Storniert'
            };
            return statusTexts[status] || status;
        },
        
        getPaymentMethodIcon(type) {
            const icons = {
                'paypal': '💳',
                'sepa': '🏦',
                'card': '💳',
                'klarna': '🛍️',
                'sofort': '⚡'
            };
            return icons[type] || '💳';
        },
        
        getPaymentMethodName(type) {
            const names = {
                'paypal': 'PayPal',
                'sepa': 'SEPA-Lastschrift',
                'card': 'Kreditkarte',
                'klarna': 'Klarna',
                'sofort': 'Sofortüberweisung'
            };
            return names[type] || 'Unbekannt';
        },
        
        getPaymentMethodDetails(method) {
            if (!method) return '';
            
            switch(method.type) {
                case 'paypal':
                    return method.email || '';
                case 'sepa':
                    const iban = method.iban || '';
                    return `${method.name || ''} - ${iban.substring(0, 8)}...`;
                case 'card':
                    const number = method.number || '';
                    return `${method.name || ''} - ****${number.slice(-4)}`;
                default:
                    return method.details || '';
            }
        },
        
        calculateTax(amount, taxRate = 0.19) {
            return Math.round(amount * taxRate * 100) / 100;
        },
        
        calculateDiscount(amount, discountPercent) {
            if (!discountPercent || discountPercent <= 0) return 0;
            return Math.round(amount * (discountPercent / 100) * 100) / 100;
        }
    };
    
    /**
     * Storage Helper für bessere Fehlerbehandlung
     */
    export const StorageHelper = {
        get(key, defaultValue = null) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : defaultValue;
            } catch (error) {
                console.error(`Storage get error for key ${key}:`, error);
                return defaultValue;
            }
        },
        
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error(`Storage set error for key ${key}:`, error);
                return false;
            }
        },
        
        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.error(`Storage remove error for key ${key}:`, error);
                return false;
            }
        },
        
        clear() {
            try {
                localStorage.clear();
                return true;
            } catch (error) {
                console.error('Storage clear error:', error);
                return false;
            }
        }
    };

// UIUtils Objekt erweitern:

export const UIUtils = {
    showNotification(message, type = 'success', duration = 4000) {
        // Existing notification code...
        const notification = document.createElement('div');
        
        const colors = {
            success: 'linear-gradient(135deg, #4caf50, #66bb6a)',
            error: 'linear-gradient(135deg, #f44336, #ef5350)',
            warning: 'linear-gradient(135deg, #ff9800, #ffb74d)',
            info: 'linear-gradient(135deg, #2196f3, #42a5f5)'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.success};
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 1001;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
            font-family: Georgia, serif;
            font-size: 14px;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Auto-remove after duration
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, duration);
        
        return notification;
    },
    
    showLoading(message = 'Lädt...') {
        const existing = document.getElementById('globalLoading');
        if (existing) return;
        
        const loading = document.createElement('div');
        loading.id = 'globalLoading';
        loading.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            backdrop-filter: blur(5px);
        `;
        
        loading.innerHTML = `
            <div style="background: white; padding: 2rem; border-radius: 10px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                <div style="border: 4px solid #f3f3f3; border-top: 4px solid #ff6b35; border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 0 auto 1rem;"></div>
                <div style="color: #5d4037; font-weight: bold;">${message}</div>
            </div>
        `;
        
        document.body.appendChild(loading);
    },
    
    hideLoading() {
        const loading = document.getElementById('globalLoading');
        if (loading) loading.remove();
    },
    
    showModal(modalId) {
        // Hide all modals first
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        
        // Show specific modal
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'block';
            // Add animation class if needed
            setTimeout(() => modal.classList.add('modal-open'), 10);
            
            // Focus management for accessibility
            const firstInput = modal.querySelector('input, button, select, textarea');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    },
    
    hideModal(modalId) {
        if (modalId) {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'none';
                modal.classList.remove('modal-open');
            }
        } else {
            // Hide all modals
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
                modal.classList.remove('modal-open');
            });
        }
    },
    
    // NEUE METHODE: Modal Status prüfen
    isModalOpen(modalId) {
        const modal = document.getElementById(modalId);
        return modal ? modal.style.display === 'block' : false;
    },
    
    // NEUE METHODE: Aktuelle Modal ermitteln
    getCurrentModal() {
        const openModal = document.querySelector('.modal[style*="block"]');
        return openModal ? openModal.id : null;
    },
    
    updateElementText(selector, text) {
        const element = document.querySelector(selector);
        if (element) element.textContent = text;
    },
    
    updateElementHTML(selector, html) {
        const element = document.querySelector(selector);
        if (element) element.innerHTML = html;
    }
};

// CSS Animations hinzufügen
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);
