// scripts/products.js
import { PRODUCTS } from './config.js';
import { UIUtils, ErrorHandler, ArrayUtils, Formatter } from './utils.js';

/**
 * Produkt-Manager
 */
export class ProductManager {
    constructor() {
        this.products = [...PRODUCTS];
        this.filteredProducts = [...PRODUCTS];
        this.currentCategory = 'all';
        this.currentSearchTerm = '';
        this.currentSortBy = 'name';
        this.currentSortOrder = 'asc';
        this.eventTarget = new EventTarget();
        
        this.init();
    }

    /**
     * Initialisierung
     */
    init() {
        this.addEventListeners();
        this.renderProducts();
        this.setupSearch();
        this.setupFilters();
        
        console.log('📦 ProductManager initialisiert');
    }

    /**
     * Event Listeners hinzufügen
     */
    addEventListeners() {
        // Search input
        const searchInput = document.getElementById('productSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Category filters
        const categoryButtons = document.querySelectorAll('[data-category]');
        categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleCategoryFilter(e.target.dataset.category);
            });
        });

        // Sort controls
        const sortSelect = document.getElementById('productSort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.handleSort(e.target.value);
            });
        }
    }

    /**
     * Produkte rendern
     */
    renderProducts() {
        try {
            const grid = document.getElementById('productsGrid');
            if (!grid) {
                console.warn('Products grid container not found');
                return;
            }

            if (this.filteredProducts.length === 0) {
                this.renderEmptyState(grid);
                return;
            }

            grid.innerHTML = this.filteredProducts.map(product => 
                this.generateProductCardHTML(product)
            ).join('');

            // Add animation classes
            this.addProductAnimations();

            console.log(`📦 ${this.filteredProducts.length} Produkte gerendert`);

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'ProductManager.renderProducts');
        }
    }

    /**
     * Produkt-Karte HTML generieren
     */
    generateProductCardHTML(product) {
        return `
            <div class="product-card" data-product-id="${product.id}" data-category="${product.category}">
                <div class="product-image">
                    ${product.image}
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-description">${Formatter.truncateText(product.description, 120)}</p>
                    <div class="product-price">${Formatter.formatPrice(product.price)}</div>
                    <div class="product-actions">
                        <button class="btn btn-secondary" onclick="window.productManager.showProductDetail(${product.id})">
                            Details ansehen
                        </button>
                        <button class="btn btn-primary" onclick="window.productManager.addToCart(${product.id})">
                            In den Warenkorb
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Leere Zustandsanzeige
     */
    renderEmptyState(container) {
        container.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
                <h3 style="color: #8d6e63; margin-bottom: 1rem;">Keine Produkte gefunden</h3>
                <p style="color: #8d6e63; margin-bottom: 2rem;">
                    ${this.currentSearchTerm ? 
                        `Ihre Suche nach "${this.currentSearchTerm}" ergab keine Treffer.` :
                        'In dieser Kategorie sind momentan keine Produkte verfügbar.'
                    }
                </p>
                <button class="btn" onclick="window.productManager.clearFilters()">
                    Alle Produkte anzeigen
                </button>
            </div>
        `;
    }

    /**
     * Produktdetails anzeigen
     */
    showProductDetail(productId) {
        try {
            const product = this.getProductById(productId);
            if (!product) {
                UIUtils.showNotification('Produkt nicht gefunden', 'error');
                return;
            }

            const detailsContainer = document.getElementById('productDetails');
            if (!detailsContainer) {
                console.warn('Product details container not found');
                return;
            }

            detailsContainer.innerHTML = this.generateProductDetailHTML(product);
            UIUtils.showModal('productModal');

            // Log analytics
            this.trackProductView(product);

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'ProductManager.showProductDetail');
        }
    }

    /**
     * Produktdetail HTML generieren
     */
    generateProductDetailHTML(product) {
        const relatedProducts = this.getRelatedProducts(product);
        
        return `
            <div class="product-detail">
                <div class="product-detail-header">
                    <h2>${product.name}</h2>
                    ${product.badge ? `<span class="product-detail-badge">${product.badge}</span>` : ''}
                </div>
                
                <div class="product-detail-image">
                    ${product.image}
                </div>
                
                <div class="product-detail-price">${Formatter.formatPrice(product.price)}</div>
                
                <div class="product-detail-description">
                    ${product.details}
                </div>

                ${product.tags && product.tags.length > 0 ? `
                    <div class="product-tags" style="margin: 1rem 0;">
                        <strong>Eigenschaften:</strong>
                        ${product.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}

                <div class="product-detail-actions">
                    <div class="quantity-selector" style="margin-bottom: 1rem;">
                        <label for="detailQuantity">Menge:</label>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="this.changeDetailQuantity(-1)">-</button>
                            <input type="number" id="detailQuantity" value="1" min="1" max="10" style="width: 60px; text-align: center;">
                            <button class="quantity-btn" onclick="this.changeDetailQuantity(1)">+</button>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" onclick="window.productManager.addToCartWithQuantity(${product.id})" style="width: 100%; margin-bottom: 1rem;">
                        In den Warenkorb
                    </button>
                    
                    <div class="product-actions-secondary">
                        <button class="btn btn-outline" onclick="window.productManager.shareProduct(${product.id})">
                            📤 Teilen
                        </button>
                        <button class="btn btn-outline" onclick="window.productManager.addToWishlist(${product.id})">
                            ❤️ Merken
                        </button>
                    </div>
                </div>

                ${relatedProducts.length > 0 ? `
                    <div class="related-products" style="margin-top: 2rem; border-top: 2px solid #d7ccc8; padding-top: 2rem;">
                        <h3 style="color: #ff6b35; margin-bottom: 1rem;">Ähnliche Produkte</h3>
                        <div class="related-products-grid">
                            ${relatedProducts.map(rp => `
                                <div class="related-product-card" onclick="window.productManager.showProductDetail(${rp.id})">
                                    <div class="related-product-image">${rp.image}</div>
                                    <div class="related-product-name">${rp.name}</div>
                                    <div class="related-product-price">${Formatter.formatPrice(rp.price)}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>

            <style>
                .product-tags .tag {
                    display: inline-block;
                    background: #ff6b35;
                    color: white;
                    padding: 2px 8px;
                    margin: 2px;
                    border-radius: 12px;
                    font-size: 0.8rem;
                }
                
                .related-products-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 1rem;
                }
                
                .related-product-card {
                    text-align: center;
                    padding: 1rem;
                    border: 1px solid #d7ccc8;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .related-product-card:hover {
                    border-color: #ff6b35;
                    transform: translateY(-2px);
                }
                
                .related-product-image {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }
                
                .related-product-name {
                    font-size: 0.9rem;
                    font-weight: bold;
                    color: #5d4037;
                    margin-bottom: 0.25rem;
                }
                
                .related-product-price {
                    color: #ff6b35;
                    font-weight: bold;
                }
                
                .btn-outline {
                    background: transparent;
                    border: 2px solid #ff6b35;
                    color: #ff6b35;
                }
                
                .btn-outline:hover {
                    background: #ff6b35;
                    color: white;
                }
            </style>
        `;
    }

    /**
     * Produkt zum Warenkorb hinzufügen
     */
    addToCart(productId, quantity = 1) {
        try {
            const product = this.getProductById(productId);
            if (!product) {
                UIUtils.showNotification('Produkt nicht gefunden', 'error');
                return;
            }

            // Use cart manager if available
            if (window.cartManager) {
                window.cartManager.addProduct(product, quantity);
            } else {
                console.warn('CartManager not available');
            }

            // Track analytics
            this.trackAddToCart(product, quantity);

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'ProductManager.addToCart');
        }
    }

    /**
     * Produkt mit gewählter Menge zum Warenkorb hinzufügen
     */
    addToCartWithQuantity(productId) {
        const quantityInput = document.getElementById('detailQuantity');
        const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
        
        this.addToCart(productId, quantity);
        UIUtils.hideModal('productModal');
    }

    /**
     * Suche behandeln
     */
    handleSearch(searchTerm) {
        try {
            this.currentSearchTerm = searchTerm.toLowerCase().trim();
            this.applyFilters();
            
            // Track search analytics
            if (this.currentSearchTerm) {
                this.trackSearch(this.currentSearchTerm);
            }

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'ProductManager.handleSearch');
        }
    }

    /**
     * Kategorie-Filter behandeln
     */
    handleCategoryFilter(category) {
        try {
            this.currentCategory = category;
            this.applyFilters();
            
            // Update active filter button
            this.updateFilterButtons();

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'ProductManager.handleCategoryFilter');
        }
    }

    /**
     * Sortierung behandeln
     */
    handleSort(sortValue) {
        try {
            const [sortBy, sortOrder] = sortValue.split('-');
            this.currentSortBy = sortBy;
            this.currentSortOrder = sortOrder || 'asc';
            
            this.applySorting();
            this.renderProducts();

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'ProductManager.handleSort');
        }
    }

    /**
     * Filter anwenden
     */
    applyFilters() {
        try {
            let filtered = [...this.products];

            // Category filter
            if (this.currentCategory !== 'all') {
                filtered = filtered.filter(product => 
                    product.category === this.currentCategory
                );
            }

            // Search filter
            if (this.currentSearchTerm) {
                filtered = filtered.filter(product => 
                    product.name.toLowerCase().includes(this.currentSearchTerm) ||
                    product.description.toLowerCase().includes(this.currentSearchTerm) ||
                    (product.tags && product.tags.some(tag => 
                        tag.toLowerCase().includes(this.currentSearchTerm)
                    ))
                );
            }

            this.filteredProducts = filtered;
            this.applySorting();
            this.renderProducts();

            // Update results count
            this.updateResultsCount();

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'ProductManager.applyFilters');
        }
    }

    /**
     * Sortierung anwenden
     */
    applySorting() {
        try {
            this.filteredProducts = ArrayUtils.sortBy(
                this.filteredProducts, 
                this.currentSortBy, 
                this.currentSortOrder === 'asc'
            );

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'ProductManager.applySorting');
        }
    }

    /**
     * Filter zurücksetzen
     */
    clearFilters() {
        try {
            this.currentCategory = 'all';
            this.currentSearchTerm = '';
            this.currentSortBy = 'name';
            this.currentSortOrder = 'asc';

            // Clear search input
            const searchInput = document.getElementById('productSearch');
            if (searchInput) searchInput.value = '';

            // Reset sort select
            const sortSelect = document.getElementById('productSort');
            if (sortSelect) sortSelect.value = 'name-asc';

            this.applyFilters();
            this.updateFilterButtons();

        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'ProductManager.clearFilters');
        }
    }

    /**
     * Filter-Buttons aktualisieren
     */
    updateFilterButtons() {
        const buttons = document.querySelectorAll('[data-category]');
        buttons.forEach(button => {
            if (button.dataset.category === this.currentCategory) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    /**
     * Ergebnisanzahl aktualisieren
     */
    updateResultsCount() {
        const countElement = document.getElementById('resultsCount');
        if (countElement) {
            countElement.textContent = `${this.filteredProducts.length} von ${this.products.length} Produkten`;
        }
    }

    /**
     * Suche Setup
     */
    setupSearch() {
        // Create search UI if not exists
        if (!document.getElementById('productSearch')) {
            this.createSearchUI();
        }
    }

    /**
     * Filter Setup
     */
    setupFilters() {
        // Create filter UI if not exists
        if (!document.querySelector('[data-category]')) {
            this.createFilterUI();
        }
    }

    /**
     * Such-UI erstellen
     */
    createSearchUI() {
        const container = document.querySelector('.hero') || document.querySelector('.container');
        if (!container) return;

        const searchHTML = `
            <div class="product-search-container" style="margin: 2rem 0;">
                <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
                    <input type="text" id="productSearch" placeholder="Produkte durchsuchen..." 
                           style="flex: 1; min-width: 200px; padding: 0.8rem; border: 2px solid #d7ccc8; border-radius: 25px; font-size: 16px;">
                    <select id="productSort" style="padding: 0.8rem; border: 2px solid #d7ccc8; border-radius: 8px;">
                        <option value="name-asc">Name A-Z</option>
                        <option value="name-desc">Name Z-A</option>
                        <option value="price-asc">Preis aufsteigend</option>
                        <option value="price-desc">Preis absteigend</option>
                    </select>
                    <div id="resultsCount" style="color: #8d6e63; font-size: 0.9rem;"></div>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('afterend', searchHTML);
        this.addEventListeners();
    }

    /**
     * Filter-UI erstellen
     */
    createFilterUI() {
        const categories = [...new Set(this.products.map(p => p.category))];
        
        const filterHTML = `
            <div class="product-filters" style="margin: 1rem 0;">
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center;">
                    <button class="filter-btn active" data-category="all">Alle</button>
                    ${categories.map(cat => 
                        `<button class="filter-btn" data-category="${cat}">${this.getCategoryDisplayName(cat)}</button>`
                    ).join('')}
                </div>
            </div>
            
            <style>
                .filter-btn {
                    padding: 0.5rem 1rem;
                    border: 2px solid #d7ccc8;
                    background: white;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    color: #8d6e63;
                }
                
                .filter-btn:hover, .filter-btn.active {
                    border-color: #ff6b35;
                    background: #ff6b35;
                    color: white;
                }
            </style>
        `;

        const container = document.querySelector('.product-search-container') || document.querySelector('.hero');
        if (container) {
            container.insertAdjacentHTML('afterend', filterHTML);
            this.addEventListeners();
        }
    }

    /**
     * Kategorienname für Anzeige
     */
    getCategoryDisplayName(category) {
        const names = {
            'boards': 'Bretter',
            'elixiers': 'Elixiere',
            'accessories': 'Zubehör',
            'stones': 'Steine'
        };
        return names[category] || category;
    }

    /**
     * Ähnliche Produkte finden
     */
    getRelatedProducts(product, count = 3) {
        return this.products
            .filter(p => p.id !== product.id && p.category === product.category)
            .slice(0, count);
    }

    /**
     * Produkt-Animationen hinzufügen
     */
    addProductAnimations() {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }

    /**
     * Produkt teilen
     */
    shareProduct(productId) {
        const product = this.getProductById(productId);
        if (!product) return;

        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: product.description,
                url: window.location.href
            });
        } else {
            // Fallback: Copy to clipboard
            const url = `${window.location.origin}?product=${productId}`;
            navigator.clipboard.writeText(url).then(() => {
                UIUtils.showNotification('🔗 Link kopiert!', 'success');
            });
        }

        this.trackShare(product);
    }

    /**
     * Zur Wunschliste hinzufügen
     */
    addToWishlist(productId) {
        // TODO: Implement wishlist functionality
        UIUtils.showNotification('❤️ Zur Wunschliste hinzugefügt!', 'success');
        this.trackWishlist(productId);
    }

    /**
     * Analytics tracking methods
     */
    trackProductView(product) {
        this.eventTarget.dispatchEvent(new CustomEvent('productViewed', {
            detail: { product }
        }));
    }

    trackAddToCart(product, quantity) {
        this.eventTarget.dispatchEvent(new CustomEvent('addToCart', {
            detail: { product, quantity }
        }));
    }

    trackSearch(searchTerm) {
        this.eventTarget.dispatchEvent(new CustomEvent('productSearch', {
            detail: { searchTerm, resultsCount: this.filteredProducts.length }
        }));
    }

    trackShare(product) {
        this.eventTarget.dispatchEvent(new CustomEvent('productShared', {
            detail: { product }
        }));
    }

    trackWishlist(productId) {
        this.eventTarget.dispatchEvent(new CustomEvent('wishlistAdded', {
            detail: { productId }
        }));
    }

    // Utility methods
    getProductById(id) {
        return this.products.find(p => p.id === parseInt(id));
    }

    getProductsByCategory(category) {
        return this.products.filter(p => p.category === category);
    }

    getProductsByPriceRange(min, max) {
        return this.products.filter(p => p.price >= min && p.price <= max);
    }

    // Event listener methods
    addEventListener(type, listener) {
        this.eventTarget.addEventListener(type, listener);
    }

    removeEventListener(type, listener) {
        this.eventTarget.removeEventListener(type, listener);
    }

    // Getter methods
    getAllProducts() { return [...this.products]; }
    getFilteredProducts() { return [...this.filteredProducts]; }
    getCurrentFilters() {
        return {
            category: this.currentCategory,
            searchTerm: this.currentSearchTerm,
            sortBy: this.currentSortBy,
            sortOrder: this.currentSortOrder
        };
    }
}

    // Ergänzungen für scripts/products.js - Diese Methoden zur ProductManager Klasse hinzufügen:
    
    /**
     * Session wiederherstellen (für Konsistenz)
     */
    restoreSession() {
        try {
            // Products sind statisch, aber wir können Filter/Suchzustände wiederherstellen
            this.renderProducts();
            console.log('✅ Products-Manager Session wiederhergestellt');
            return true;
        } catch (error) {
            console.error('❌ Fehler beim Wiederherstellen der Products-Session:', error);
            return false;
        }
    }
    
    /**
     * Produkt hinzufügen - sicherere Implementierung
     */
    addToCart(productId, quantity = 1) {
        try {
            const product = this.getProductById(productId);
            if (!product) {
                UIUtils.showNotification('❌ Produkt nicht gefunden', 'error');
                return;
            }
    
            // Use cart manager if available
            if (window.cartManager && window.cartManager.addProduct) {
                window.cartManager.addProduct(product, quantity);
            } else {
                // Fallback: Show notification that cart is not ready
                UIUtils.showNotification('⚠️ Warenkorb wird geladen...', 'warning');
                
                // Retry after short delay
                setTimeout(() => {
                    if (window.cartManager && window.cartManager.addProduct) {
                        window.cartManager.addProduct(product, quantity);
                    } else {
                        UIUtils.showNotification('❌ Warenkorb nicht verfügbar', 'error');
                    }
                }, 1000);
            }
    
            // Track analytics
            this.trackAddToCart(product, quantity);
    
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'ProductManager.addToCart');
        }
    }
    
    /**
     * Produkt mit gewählter Menge zum Warenkorb hinzufügen - korrigierte Version
     */
    addToCartWithQuantity(productId) {
        const quantityInput = document.getElementById('detailQuantity');
        const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
        
        this.addToCart(productId, quantity);
        UIUtils.hideModal('productModal');
    }
    
    /**
     * Globale Methoden für HTML onclick Handler einrichten
     */
    setupProductGlobalMethods() {
        // Quantity change function für Detail Modal
        window.changeDetailQuantity = (change) => {
            const input = document.getElementById('detailQuantity');
            if (input) {
                const currentValue = parseInt(input.value) || 1;
                const newValue = Math.max(1, Math.min(10, currentValue + change));
                input.value = newValue;
            }
        };
        
        // Product detail with quantity
        window.addToCartWithQuantity = (productId) => {
            this.addToCartWithQuantity(productId);
        };
    }
    
    /**
     * Initialisierung erweitern
     */
    init() {
        this.addEventListeners();
        this.renderProducts();
        this.setupSearch();
        this.setupFilters();
        this.setupProductGlobalMethods(); // Neue Methode
        
        console.log('📦 ProductManager initialisiert');
    }
    
    /**
     * Produktdetails anzeigen - verbesserte Version
     */
    showProductDetail(productId) {
        try {
            const product = this.getProductById(productId);
            if (!product) {
                UIUtils.showNotification('❌ Produkt nicht gefunden', 'error');
                return;
            }
    
            const detailsContainer = document.getElementById('productDetails');
            if (!detailsContainer) {
                console.warn('Product details container not found');
                return;
            }
    
            detailsContainer.innerHTML = this.generateProductDetailHTML(product);
            UIUtils.showModal('productModal');
    
            // Track analytics
            this.trackProductView(product);
    
            // Setup quantity controls after modal is shown
            setTimeout(() => {
                this.setupQuantityControls();
            }, 100);
    
        } catch (error) {
            ErrorHandler.handleAsyncError(error, 'ProductManager.showProductDetail');
        }
    }
    
    /**
     * Quantity Controls nach Modal-Anzeige einrichten
     */
    setupQuantityControls() {
        const quantityInput = document.getElementById('detailQuantity');
        if (quantityInput) {
            // Ensure value is valid
            if (!quantityInput.value || isNaN(quantityInput.value)) {
                quantityInput.value = 1;
            }
            
            // Add input validation
            quantityInput.addEventListener('input', (e) => {
                let value = parseInt(e.target.value);
                if (isNaN(value) || value < 1) value = 1;
                if (value > 10) value = 10;
                e.target.value = value;
            });
            
            quantityInput.addEventListener('blur', (e) => {
                if (!e.target.value) e.target.value = 1;
            });
        }
    }
    
    /**
     * Produktdetail HTML generieren - korrigierte Version
     */
    generateProductDetailHTML(product) {
        const relatedProducts = this.getRelatedProducts(product);
        
        return `
            <div class="product-detail">
                <div class="product-detail-header">
                    <h2>${product.name}</h2>
                    ${product.badge ? `<span class="product-detail-badge">${product.badge}</span>` : ''}
                </div>
                
                <div class="product-detail-image">
                    ${product.image}
                </div>
                
                <div class="product-detail-price">${Formatter.formatPrice(product.price)}</div>
                
                <div class="product-detail-description">
                    ${product.details || product.description}
                </div>
    
                ${product.tags && product.tags.length > 0 ? `
                    <div class="product-tags" style="margin: 1rem 0;">
                        <strong>Eigenschaften:</strong>
                        ${product.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
    
                <div class="product-detail-actions">
                    <div class="quantity-selector" style="margin-bottom: 1rem;">
                        <label for="detailQuantity">Menge:</label>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="changeDetailQuantity(-1)" type="button">-</button>
                            <input type="number" id="detailQuantity" value="1" min="1" max="10" style="width: 60px; text-align: center;">
                            <button class="quantity-btn" onclick="changeDetailQuantity(1)" type="button">+</button>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" onclick="addToCartWithQuantity(${product.id})" style="width: 100%; margin-bottom: 1rem;" type="button">
                        In den Warenkorb
                    </button>
                    
                    <div class="product-actions-secondary">
                        <button class="btn btn-outline" onclick="window.productManager.shareProduct(${product.id})" type="button">
                            📤 Teilen
                        </button>
                        <button class="btn btn-outline" onclick="window.productManager.addToWishlist(${product.id})" type="button">
                            ❤️ Merken
                        </button>
                    </div>
                </div>
    
                ${relatedProducts.length > 0 ? `
                    <div class="related-products" style="margin-top: 2rem; border-top: 2px solid #d7ccc8; padding-top: 2rem;">
                        <h3 style="color: #ff6b35; margin-bottom: 1rem;">Ähnliche Produkte</h3>
                        <div class="related-products-grid">
                            ${relatedProducts.map(rp => `
                                <div class="related-product-card" onclick="window.productManager.showProductDetail(${rp.id})">
                                    <div class="related-product-image">${rp.image}</div>
                                    <div class="related-product-name">${rp.name}</div>
                                    <div class="related-product-price">${Formatter.formatPrice(rp.price)}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
    
            <style>
                .product-tags .tag {
                    display: inline-block;
                    background: #ff6b35;
                    color: white;
                    padding: 2px 8px;
                    margin: 2px;
                    border-radius: 12px;
                    font-size: 0.8rem;
                }
                
                .related-products-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                    gap: 1rem;
                }
                
                .related-product-card {
                    text-align: center;
                    padding: 1rem;
                    border: 1px solid #d7ccc8;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                
                .related-product-card:hover {
                    border-color: #ff6b35;
                    transform: translateY(-2px);
                }
                
                .related-product-image {
                    font-size: 2rem;
                    margin-bottom: 0.5rem;
                }
                
                .related-product-name {
                    font-size: 0.9rem;
                    font-weight: bold;
                    color: #5d4037;
                    margin-bottom: 0.25rem;
                }
                
                .related-product-price {
                    color: #ff6b35;
                    font-weight: bold;
                }
                
                .btn-outline {
                    background: transparent;
                    border: 2px solid #ff6b35;
                    color: #ff6b35;
                }
                
                .btn-outline:hover {
                    background: #ff6b35;
                    color: white;
                }
                
                .quantity-controls {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                }
                
                .quantity-btn {
                    background: #8d6e63;
                    color: white;
                    border: none;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    cursor: pointer;
                    font-size: 18px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                
                .quantity-btn:hover {
                    background: #5d4037;
                }
            </style>
        `;
    }
    
    /**
     * Ähnliche Produkte finden - verbesserte Version
     */
    getRelatedProducts(product, count = 3) {
        return this.products
            .filter(p => p.id !== product.id && p.category === product.category)
            .sort(() => Math.random() - 0.5) // Zufällige Reihenfolge
            .slice(0, count);
    }
    
    /**
     * Produkt teilen - verbesserte Version
     */
    shareProduct(productId) {
        const product = this.getProductById(productId);
        if (!product) return;
    
        const shareData = {
            title: `${product.name} - KlarKRAFT`,
            text: product.description,
            url: `${window.location.origin}${window.location.pathname}?product=${productId}`
        };
    
        if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
            navigator.share(shareData).catch(error => {
                console.log('Share failed:', error);
                this.fallbackShare(product, shareData.url);
            });
        } else {
            this.fallbackShare(product, shareData.url);
        }
    
        this.trackShare(product);
    }
    
    /**
     * Fallback für Teilen-Funktionalität
     */
    fallbackShare(product, url) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(() => {
                UIUtils.showNotification('🔗 Link kopiert!', 'success');
            }).catch(() => {
                this.showShareDialog(product, url);
            });
        } else {
            this.showShareDialog(product, url);
        }
    }
    
    /**
     * Share Dialog anzeigen
     */
    showShareDialog(product, url) {
        const shareText = `Schau dir das an: ${product.name} bei KlarKRAFT\n${url}`;
        
        if (prompt('Teilen Sie diesen Link:', shareText)) {
            UIUtils.showNotification('📤 Link bereit zum Teilen!', 'info');
        }
    }
    
    /**
     * Zur Wunschliste hinzufügen - erweiterte Version
     */
    addToWishlist(productId) {
        const product = this.getProductById(productId);
        if (!product) return;
        
        // TODO: Implement proper wishlist functionality
        // For now, just show notification
        UIUtils.showNotification(`❤️ ${product.name} zur Wunschliste hinzugefügt!`, 'success');
        this.trackWishlist(productId);
        
        // Could store in localStorage for simple implementation
        try {
            const wishlist = JSON.parse(localStorage.getItem('klarkraft_wishlist') || '[]');
            if (!wishlist.includes(productId)) {
                wishlist.push(productId);
                localStorage.setItem('klarkraft_wishlist', JSON.stringify(wishlist));
            }
        } catch (error) {
            console.warn('Could not save to wishlist:', error);
        }
    }

// Global functions for HTML onclick handlers
window.changeDetailQuantity = function(change) {
    const input = document.getElementById('detailQuantity');
    if (input) {
        const newValue = Math.max(1, Math.min(10, parseInt(input.value) + change));
        input.value = newValue;
    }
};

// Export singleton instance
export const productManager = new ProductManager();
