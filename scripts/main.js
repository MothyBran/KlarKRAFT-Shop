// ========== KLARKRAFT SHOP - MAIN APPLICATION ==========
// Bereinigte Version ohne Firebase Konflikte

// ========== PRODUCT DATA ==========
const products = [
    {
        id: 1,
        name: "KlarKraft Brett BASIS - Universal",
        description: "Universelles KlarKraft Brett für alle Einkäufe mit neutraler Gravur. Ideal für den täglichen Gebrauch zur Harmonisierung aller Lebensmittel.",
        price: 189.99,
        image: "🪨",
        badge: "BASIS",
        details: "Unser BASIS KlarKraft Brett aus natürlichem Granit harmonisiert die Schwingungen aller Lebensmittel und Gegenstände. Die neutrale Gravur ermöglicht eine universelle Anwendung für sämtliche Produkte. Das Brett neutralisiert negative Energien von Strichcodes und elektromagnetischen Feldern. Einfach Produkte für 5-10 Minuten auf das Brett legen und die energetische Reinigung beginnt. Größe: 30x50cm, Gewicht: ca. 3kg. Hergestellt aus hochwertigem Granit mit spezieller Oberflächenbehandlung."
    },
    {
        id: 2,
        name: "KlarKraft Brett ANIMALIS - Tierprodukte",
        description: "Spezialcodierung für Fleisch, Milch und Lederprodukte. Optimiert für tierische Erzeugnisse mit gezielter Energieharmonisierung.",
        price: 209.99,
        image: "🐄",
        badge: "ANIMALIS",
        details: "Das ANIMALIS KlarKraft Brett ist speziell für tierische Produkte entwickelt worden. Die einzigartige Codierung neutralisiert negative Energien in Fleisch, Milch, Käse und Lederwaren besonders effektiv. Das Brett arbeitet mit speziellen Frequenzen, die auf die molekulare Struktur tierischer Proteine abgestimmt sind. Ideal für Fleischprodukte, Milcherzeugnisse, Leder und andere tierische Materialien. Die Behandlung erfolgt in 7-12 Minuten je nach Produktgröße. Größe: 30x50cm, mit spezieller ANIMALIS-Gravur."
    },
    {
        id: 3,
        name: "KlarKraft Brett HERBA - Pflanzen & Kräuter",
        description: "Ideal für Obst, Gemüse und Heilpflanzen. Verstärkt die natürliche Lebensenergie pflanzlicher Produkte und deren Nährstoffgehalt.",
        price: 199.99,
        image: "🌿",
        badge: "HERBA",
        details: "Das HERBA KlarKraft Brett ist perfekt auf die Bedürfnisse pflanzlicher Produkte abgestimmt. Es verstärkt die natürliche Lebensenergie von Obst, Gemüse, Kräutern und Heilpflanzen. Die spezielle HERBA-Frequenz harmonisiert die Chlorophyll-Strukturen und aktiviert die ursprüngliche Schwingung der Pflanzen. Besonders wirkungsvoll bei Bio-Produkten, frischen Kräutern und Heilpflanzen. Die Behandlungszeit beträgt 5-8 Minuten für optimale Ergebnisse. Größe: 30x50cm, mit kraftvoller Pflanzen-Symbolik graviert."
    },
    {
        id: 4,
        name: "KlarKraft Brett UMBRA - Schattengewächse",
        description: "Spezielles Energiefeld für Pilze und empfindliche Schattengewächse. Schonende Behandlung für besonders sensitive Produkte.",
        price: 219.99,
        image: "🍄",
        badge: "UMBRA",
        details: "UMBRA wurde speziell für Pilze, Wurzelgemüse und andere Schattengewächse entwickelt. Diese Produkte benötigen eine besonders sanfte energetische Behandlung, da sie von Natur aus empfindlicher sind. Das UMBRA-Feld arbeitet mit reduzierten Frequenzen, die speziell auf die feinen Strukturen von Pilzen und erdverbundenen Gewächsen abgestimmt sind. Ideal für alle Pilzarten, Kartoffeln, Rüben und andere Wurzelgemüse. Die schonende Behandlung dauert 10-15 Minuten. Größe: 30x50cm, mit mystischen UMBRA-Symbolen."
    },
    {
        id: 5,
        name: "KlarKraft Brett MOBILO - Reise-/Taschenmodell",
        description: "Kompakt und tragbar für unterwegs. Reduzierte Größe mit effizienter Energienutzung - weniger Ladezyklen erforderlich.",
        price: 149.99,
        image: "🎒",
        badge: "MOBILO",
        details: "Das kompakte MOBILO KlarKraft Brett ist der perfekte Begleiter für Reisen, Büro und unterwegs. Trotz der reduzierten Größe (20x30cm) bietet es die volle Reinigungsleistung unserer Technologie. Die optimierte Energieverteilung ermöglicht längere Nutzungszeiten mit weniger Aufladungen. Ideal für Snacks, Getränke und kleinere Lebensmittel. Passt in jede Tasche und ist diskret verwendbar. Behandlungszeit: 3-7 Minuten je nach Produktgröße. Gewicht: nur 1,2kg. Inklusive Transporttasche aus natürlichen Materialien."
    },
    {
        id: 6,
        name: "KlarKraft Brett CRYSTA - Schmuck & Steine",
        description: "Speziell für Energetisierung von Edelsteinen, Ketten und Amuletten. Komplettes Set mit Zubehör für Schmuckpflege.",
        price: 279.99,
        image: "💎",
        badge: "CRYSTA",
        details: "Das CRYSTA KlarKraft Brett ist ausschließlich für die Energetisierung von Edelsteinen, Schmuck und spirituellen Objekten konzipiert. Die spezielle Kristall-Matrix verstärkt die natürlichen Eigenschaften von Edelsteinen und lädt sie mit positiver Energie auf. Ideal für Ringe, Ketten, Armbänder, Heilsteine und Amulette. Das Komplettset enthält: CRYSTA KlarKraft Brett (25x35cm), hochwertigen Leinenbeutel zur Aufbewahrung, 50ml energetisiertes Reinigungswasser und ein spezielles Mikrofaser-Reinigungstuch. Behandlungszeit: 15-30 Minuten für optimale Aufladung."
    },
    {
        id: 7,
        name: "Universumswasser Elixier",
        description: "Kraftvolle Ampullen mit energetisiertem Wasser zur Reinigung und Harmonisierung von Objekten und Räumen.",
        price: 49.99,
        image: "💧",
        details: "5 Ampullen à 10ml mit hochfrequent energetisiertem Wasser aus natürlichen Quellen. Das Wasser wurde unter Vollmondlicht mit einer Auswahl kraftvoller Kristalle (Bergkristall, Amethyst, Rosenquarz) energetisiert. Wenige Tropfen genügen, um Gegenstände, Räume oder sogar Lebensmittel von negativer Energie zu befreien. Anwendung: 2-3 Tropfen auf den Gegenstand geben oder in den Raum sprühen. Das Elixier wirkt sofort und hält bis zu 48 Stunden an. Hergestellt in einem speziellen Mondlicht-Ritual mit jahrhundertealten Techniken."
    },
    {
        id: 8,
        name: "Reinigungstücher KlarKRAFT",
        description: "Spezielle Mikrofasertücher mit eingewobenen Kristallpartikeln für die tägliche energetische Reinigung.",
        price: 39.99,
        image: "🧽",
        details: "Set aus 3 hochwertigen Mikrofaser-Reinigungstüchern mit eingewobenen Bergkristall-Partikeln. Diese speziellen Tücher sind ideal für die tägliche energetische Reinigung von Gegenständen, Bildschirmen, Oberflächen und sogar Lebensmitteln. Die Kristallpartikel neutralisieren negative Energien beim Reinigungsvorgang. Größe: 30x30cm pro Tuch. Waschbar bis 40°C ohne Weichspüler. Die Tücher behalten ihre energetischen Eigenschaften auch nach häufigem Waschen. Perfekt für Smartphone-Displays, Computer, Spiegel und alle glatten Oberflächen."
    },
    {
        id: 9,
        name: "Kraftsteine Harmonisierung",
        description: "Ausgewählte Edelsteine zur Neutralisierung von Elektrosmog und negativen Schwingungen im Wohn- und Arbeitsbereich.",
        price: 79.99,
        image: "🔮",
        details: "Komplettset aus 7 handverlesenen Kraftsteinen, jeder mit spezifischen energetischen Eigenschaften: Amethyst (Schutz und Klarheit), Rosenquarz (Liebe und Harmonie), Citrin (Erfolg und Fülle), Bergkristall (Verstärkung und Reinigung), Aventurin (Glück und Gelassenheit), Hämatit (Erdung und Stabilität), schwarzer Turmalin (Schutz vor negativen Energien). Jeder Stein ist energetisch gereinigt und für seinen Zweck programmiert. Anwendung: Steine im Raum verteilen oder bei sich tragen. Größe: 2-4cm Durchmesser pro Stein. Inklusive Beschreibung und Anwendungshinweisen."
    },
    {
        id: 10,
        name: "Neutralisator Sticker",
        description: "Praktische selbstklebende Sticker gegen Strichcodestrahlung für direkte Anbringung auf allen Produkten.",
        price: 29.99,
        image: "🏷️",
        details: "20 selbstklebende Neutralisator-Sticker zur direkten Anbringung auf Produktverpackungen mit Strichcodes. Die Sticker enthalten eine spezielle Frequenz-Matrix, die die negativen Informationen von Strichcodes und QR-Codes sofort neutralisiert. Einfach über oder neben den Strichcode kleben - fertig! Die Sticker sind wasserfest, UV-beständig und halten auf allen Oberflächen. Größe: 15x10mm pro Sticker. Diskret und unauffällig. Ideal für Lebensmittel, Kosmetik, Elektronik und alle anderen Produkte mit Strichcodes. Wirkung hält dauerhaft an."
    }
];

// ========== APPLICATION STATE ==========
let currentUser = null;
let currentMaster = null;
let cart = [];
let orders = JSON.parse(localStorage.getItem('klarkraft_orders') || '[]');
let activityLogs = JSON.parse(localStorage.getItem('klarkraft_activity_logs') || '[]');
let selectedPaymentMethod = null;

// ========== MASTER EMPLOYEES DATA ==========
const masterEmployees = [
    {
        id: 'MASTER001',
        name: 'Marcus Energius',
        email: 'manager@klarkraft.de',
        password: 'manager123',
        role: 'Manager',
        permissions: ['all'],
        securityCode: 'KK-2025'
    },
    {
        id: 'MASTER002',
        name: 'Lisa Harmonika',
        email: 'support@klarkraft.de',
        password: 'support123',
        role: 'Support',
        permissions: ['view_customers', 'view_orders', 'edit_orders'],
        securityCode: 'KK-2025'
    },
    {
        id: 'MASTER003',
        name: 'Admin User',
        email: 'admin@klarkraft.de',
        password: 'admin123',
        role: 'Administrator',
        permissions: ['all'],
        securityCode: 'KK-2025'
    }
];

// ========== UTILITY FUNCTIONS ==========
function generateCustomerId() {
    return 'KK' + Date.now().toString().slice(-8);
}

function generateOrderId() {
    return 'ORD' + Date.now().toString().slice(-6);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4caf50, #66bb6a);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1001;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 4000);
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

function logActivity(action, details) {
    const log = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        user: currentMaster ? currentMaster.name : (currentUser ? currentUser.name : 'System'),
        role: currentMaster ? currentMaster.role : 'Customer',
        action: action,
        details: details
    };
    
    activityLogs.unshift(log);
    
    if (activityLogs.length > 100) {
        activityLogs = activityLogs.slice(0, 100);
    }
    
    localStorage.setItem('klarkraft_activity_logs', JSON.stringify(activityLogs));
}

// ========== AUTHENTICATION FUNCTIONS ==========
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    
    if (tab === 'login') {
        document.querySelector('.auth-tab:first-child').classList.add('active');
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.querySelector('.auth-tab:last-child').classList.add('active');
        document.getElementById('registerForm').classList.add('active');
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('⚠️ Bitte füllen Sie alle Felder aus!');
        return false;
    }
    
    const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('klarkraft_currentUser', JSON.stringify(user));
        updateUserInterface();
        showNotification(`✅ Willkommen zurück, ${user.name}!`);
        closeModal();
        
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    } else {
        showNotification('❌ Ungültige Anmeldedaten! Bitte überprüfen Sie E-Mail und Passwort.');
    }
    
    return false;
}

function handleRegister(event) {
    event.preventDefault();
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const address = document.getElementById('registerAddress').value.trim();
    const city = document.getElementById('registerCity').value.trim();
    const zip = document.getElementById('registerZip').value.trim();
    
    if (!name || !email || !password || !address || !city || !zip) {
        showNotification('⚠️ Bitte füllen Sie alle Felder aus!');
        return false;
    }
    
    if (password.length < 6) {
        showNotification('⚠️ Passwort muss mindestens 6 Zeichen lang sein!');
        return false;
    }
    
    const userData = {
        customerId: generateCustomerId(),
        name: name,
        email: email,
        password: password,
        phone: '',
        address: address,
        city: city,
        zip: zip,
        country: 'Deutschland',
        registrationDate: new Date().toISOString(),
        totalOrders: 0,
        totalSpent: 0,
        paymentMethods: []
    };
    
    const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
    
    if (users.find(u => u.email === email)) {
        showNotification('❌ Diese E-Mail-Adresse ist bereits registriert!');
        return false;
    }
    
    users.push(userData);
    localStorage.setItem('klarkraft_users', JSON.stringify(users));
    
    currentUser = userData;
    localStorage.setItem('klarkraft_currentUser', JSON.stringify(userData));
    updateUserInterface();
    showNotification(`✅ Registrierung erfolgreich! Willkommen bei KlarKRAFT, ${userData.name}!`);
    closeModal();
    
    document.getElementById('customerRegisterForm').reset();
    return false;
}

function quickLogin() {
    document.getElementById('loginEmail').value = 'max.mustermann@email.de';
    document.getElementById('loginPassword').value = 'demo123';
    
    setTimeout(() => {
        const event = { preventDefault: () => {} };
        handleLogin(event);
    }, 100);
}

function quickRegister() {
    const timestamp = Date.now().toString().slice(-4);
    document.getElementById('registerName').value = `Test User ${timestamp}`;
    document.getElementById('registerEmail').value = `test${timestamp}@klarkraft.de`;
    document.getElementById('registerPassword').value = 'test123';
    document.getElementById('registerAddress').value = 'Teststraße 123';
    document.getElementById('registerCity').value = 'Teststadt';
    document.getElementById('registerZip').value = '12345';
    
    setTimeout(() => {
        const event = { preventDefault: () => {} };
        handleRegister(event);
    }, 100);
}

function googleAuth() {
    const email = 'benutzer@gmail.com';
    const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
    
    let existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
        currentUser = existingUser;
        localStorage.setItem('klarkraft_currentUser', JSON.stringify(existingUser));
        updateUserInterface();
        showNotification(`Willkommen zurück, ${existingUser.name}!`);
        closeModal();
    } else {
        const googleUser = {
            customerId: generateCustomerId(),
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
        
        users.push(googleUser);
        localStorage.setItem('klarkraft_users', JSON.stringify(users));
        
        currentUser = googleUser;
        localStorage.setItem('klarkraft_currentUser', JSON.stringify(googleUser));
        updateUserInterface();
        showNotification('Erfolgreich mit Google registriert und angemeldet!');
        closeModal();
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('klarkraft_currentUser');
    updateUserInterface();
    showNotification('✅ Erfolgreich abgemeldet!');
    showProducts();
}

function showAuth() {
    document.getElementById('authModal').style.display = 'block';
    
    setTimeout(() => {
        const loginSubmitBtn = document.querySelector('#customerLoginForm button[type="submit"]');
        if (loginSubmitBtn) {
            loginSubmitBtn.onclick = function(e) {
                e.preventDefault();
                const email = document.getElementById('loginEmail').value.trim();
                const password = document.getElementById('loginPassword').value;
                
                if (email && password) {
                    const fakeEvent = { 
                        preventDefault: () => {},
                        target: document.getElementById('customerLoginForm')
                    };
                    handleLogin(fakeEvent);
                } else {
                    showNotification('⚠️ Bitte füllen Sie alle Felder aus!');
                }
                return false;
            };
        }
        
        const registerSubmitBtn = document.querySelector('#customerRegisterForm button[type="submit"]');
        if (registerSubmitBtn) {
            registerSubmitBtn.onclick = function(e) {
                e.preventDefault();
                const name = document.getElementById('registerName').value.trim();
                const email = document.getElementById('registerEmail').value.trim();
                const password = document.getElementById('registerPassword').value;
                const address = document.getElementById('registerAddress').value.trim();
                const city = document.getElementById('registerCity').value.trim();
                const zip = document.getElementById('registerZip').value.trim();
                
                if (name && email && password && address && city && zip) {
                    const fakeEvent = { 
                        preventDefault: () => {},
                        target: document.getElementById('customerRegisterForm')
                    };
                    handleRegister(fakeEvent);
                } else {
                    showNotification('⚠️ Bitte füllen Sie alle Felder aus!');
                }
                return false;
            };
        }
    }, 100);
}

// ========== MASTER LOGIN FUNCTIONS ==========
function showMasterLogin() {
    document.getElementById('masterLoginModal').style.display = 'block';
}

function handleMasterLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('masterLoginEmail').value.trim();
    const password = document.getElementById('masterLoginPassword').value;
    const securityCode = document.getElementById('masterLoginCode').value.trim();
    
    if (!email || !password || !securityCode) {
        showNotification('⚠️ Bitte füllen Sie alle Felder aus!');
        return false;
    }
    
    const masterUser = masterEmployees.find(emp => 
        emp.email === email && 
        emp.password === password && 
        emp.securityCode === securityCode
    );
    
    if (masterUser) {
        if (currentUser) {
            currentUser = null;
            localStorage.removeItem('klarkraft_currentUser');
        }
        
        currentMaster = {
            ...masterUser,
            loginTime: new Date().toISOString(),
            sessionId: 'SES' + Math.random().toString(36).substr(2, 8).toUpperCase()
        };
        
        localStorage.setItem('klarkraft_currentMaster', JSON.stringify(currentMaster));
        updateUserInterface();
        logActivity('Master Login', `${masterUser.name} (${masterUser.role}) logged in`);
        showNotification(`✅ Willkommen ${masterUser.name}! Master Dashboard wird geladen...`);
        
        document.getElementById('masterLoginEmail').value = '';
        document.getElementById('masterLoginPassword').value = '';
        document.getElementById('masterLoginCode').value = '';
        
        closeModal();
        setTimeout(() => {
            showMasterDashboard();
        }, 500);
    } else {
        showNotification('❌ Ungültige Anmeldedaten oder Sicherheitscode!');
        logActivity('Failed Master Login', `Failed master login attempt for: ${email}`);
    }
    
    return false;
}

function quickMasterLogin(type) {
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
        handleMasterLogin(event);
    }, 100);
}

function masterLogout() {
    if (currentMaster) {
        logActivity('Master Logout', `${currentMaster.name} (${currentMaster.role}) logged out`);
    }
    
    currentMaster = null;
    localStorage.removeItem('klarkraft_currentMaster');
    updateUserInterface();
    closeModal();
    showNotification('Master Session beendet');
}

// ========== USER INTERFACE FUNCTIONS ==========
function updateUserInterface() {
    const authBtn = document.getElementById('authBtn');
    const userInfo = document.getElementById('userInfo');
    const masterInfo = document.getElementById('masterInfo');
    const userName = document.getElementById('userName');
    const masterName = document.getElementById('masterName');
    const cartBtn = document.getElementById('cartBtn');
    const ordersBtn = document.getElementById('ordersBtn');
    
    authBtn.style.display = 'block';
    userInfo.classList.remove('active');
    masterInfo.style.display = 'none';
    cartBtn.style.display = 'block';
    ordersBtn.style.display = 'none';
    
    if (currentMaster) {
        authBtn.style.display = 'none';
        userInfo.classList.remove('active');
        masterInfo.style.display = 'flex';
        masterName.textContent = currentMaster.name;
        masterName.style.color = '#ff6b35';
        masterName.style.fontWeight = 'bold';
        masterName.title = `${currentMaster.role} - Session: ${currentMaster.sessionId}`;
        
        cartBtn.style.display = 'none';
        ordersBtn.style.display = 'block';
        updateOrdersCounter();
    } else if (currentUser) {
        authBtn.style.display = 'none';
        userInfo.classList.add('active');
        masterInfo.style.display = 'none';
        userName.textContent = currentUser.name;
        
        cartBtn.style.display = 'block';
        ordersBtn.style.display = 'none';
        updateCartCounter();
    } else {
        authBtn.style.display = 'block';
        userInfo.classList.remove('active');
        masterInfo.style.display = 'none';
        
        cartBtn.style.display = 'block';
        ordersBtn.style.display = 'none';
        updateCartCounter();
    }
}

// ========== PRODUCT FUNCTIONS ==========
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.image}
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">€${product.price.toFixed(2)}</div>
                <button class="btn" onclick="showProductDetail(${product.id})">Details ansehen</button>
                <button class="btn" onclick="addToCart(${product.id})">In den Warenkorb</button>
            </div>
        </div>
    `).join('');
}

function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    document.getElementById('productDetails').innerHTML = `
        <h2>${product.name}</h2>
        <div class="product-detail-image">
            ${product.image}
            ${product.badge ? `<div class="product-detail-badge">${product.badge}</div>` : ''}
        </div>
        <div class="product-detail-price">€${product.price.toFixed(2)}</div>
        <div class="product-detail-description">${product.details}</div>
        <button class="btn" onclick="addToCart(${product.id}); closeModal();">In den Warenkorb</button>
    `;
    document.getElementById('productModal').style.display = 'block';
}

function showProducts() {
    document.getElementById('mainContent').classList.remove('hidden');
    document.getElementById('profilePage').classList.remove('active');
    closeModal();
    window.scrollTo({top: 0, behavior: 'smooth'});
}

// ========== CART FUNCTIONS ==========
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    updateCartCounter();
    showNotification('✅ Produkt zum Warenkorb hinzugefügt!');
}

function updateCartCounter() {
    const counter = document.getElementById('cartCounter');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    counter.textContent = totalItems;
}

function updateOrdersCounter() {
    const counter = document.getElementById('ordersCounter');
    const newOrders = orders.filter(order => order.status === 'pending').length;
    counter.textContent = newOrders;
}

function showCart() {
    if (cart.length === 0) {
        showEmptyCart();
    } else {
        showCartWithItems();
    }
    
    document.getElementById('cartModal').style.display = 'block';
}

function showEmptyCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '<div class="empty-cart"><p>Ihr Warenkorb ist leer.</p><p>Entdecken Sie unsere energetischen Produkte!</p></div>';
    cartTotal.innerHTML = 'Gesamt: €0,00';
    
    document.getElementById('paymentSection').style.display = 'none';
}

function showCartWithItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = calculateShippingCost(subtotal);
    const total = subtotal + shippingCost;
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <strong>${item.name}</strong><br>
                <small>€${item.price.toFixed(2)} pro Stück</small>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                <span style="margin: 0 10px; font-weight: bold;">${item.quantity}</span>
                <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="background: #f44336; margin-left: 10px;">×</button>
            </div>
        </div>
    `).join('');
    
    cartTotal.innerHTML = `
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
                📦 Versandkostenfrei ab €150,00
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
    
    document.getElementById('paymentSection').style.display = 'block';
    loadSavedPaymentMethods();
}

function calculateShippingCost(subtotal) {
    const freeShippingThreshold = 150.00;
    const shippingCost = 6.90;
    
    return subtotal >= freeShippingThreshold ? 0 : shippingCost;
}

function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartCounter();
            showCart();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartCounter();
    showCart();
}

// ========== ORDER FUNCTIONS ==========
function completeOrder() {
    if (!currentUser || cart.length === 0) {
        showNotification('⚠️ Sie müssen angemeldet sein und Produkte im Warenkorb haben.');
        return;
    }
    
    const activePaymentMethod = document.querySelector('.payment-btn.active');
    const hasSelectedPaymentMethod = selectedPaymentMethod !== null;
    const hasPaymentForm = document.getElementById('paymentForms').innerHTML.trim() !== '';
    
    if (!hasSelectedPaymentMethod && !activePaymentMethod) {
        showNotification('⚠️ Bitte wählen Sie eine Zahlungsmethode aus!');
        return;
    }
    
    if (activePaymentMethod && hasPaymentForm) {
        const activeMethodType = activePaymentMethod.id.replace('Btn', '');
        
        if (activeMethodType === 'paypal') {
            const email = document.getElementById('paypalEmail');
            if (!email || !email.value.trim() || !email.value.includes('@')) {
                showNotification('⚠️ Bitte geben Sie eine gültige PayPal-E-Mail-Adresse ein!');
                return;
            }
        } else if (activeMethodType === 'sepa') {
            const name = document.getElementById('sepaName');
            const iban = document.getElementById('sepaIban');
            const mandate = document.getElementById('sepaMandate');
            
            if (!name || !name.value.trim() || !iban || !iban.value.trim() || !mandate || !mandate.checked) {
                showNotification('⚠️ Bitte füllen Sie alle SEPA-Daten aus und bestätigen Sie das Mandat!');
                return;
            }
        } else if (activeMethodType === 'card') {
            const name = document.getElementById('cardName');
            const number = document.getElementById('cardNumber');
            const expiry = document.getElementById('cardExpiry');
            const cvv = document.getElementById('cardCvv');
            
            if (!name || !name.value.trim() || !number || number.value.replace(/\s/g, '').length < 16 || 
                !expiry || !expiry.value.match(/^\d{2}\/\d{2}$/) || !cvv || cvv.value.length < 3) {
                showNotification('⚠️ Bitte überprüfen Sie Ihre Kreditkartendaten!');
                return;
            }
        }
    }
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = calculateShippingCost(subtotal);
    const total = subtotal + shippingCost;
    
    const order = {
        orderId: generateOrderId(),
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
        items: cart.map(item => ({
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity
        })),
        subtotal: subtotal,
        shippingCost: shippingCost,
        total: total,
        paymentMethod: selectedPaymentMethod !== null ? 
            getPaymentMethodName(currentUser.paymentMethods[selectedPaymentMethod].type) : 
            'Neue Zahlungsmethode',
        status: 'pending',
        orderDate: new Date().toISOString(),
        trackingNumber: 'KK' + Math.random().toString(36).substr(2, 8).toUpperCase(),
        timeline: [
            {
                timestamp: new Date().toISOString(),
                status: 'pending',
                event: 'order_placed',
                description: 'Bestellung eingegangen',
                icon: '📦',
                actor: currentUser.name,
                actorType: 'customer'
            }
        ]
    };
    
    orders.push(order);
    localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
    
    currentUser.totalOrders = (currentUser.totalOrders || 0) + 1;
    currentUser.totalSpent = (currentUser.totalSpent || 0) + total;
    updateUserData();
    
    showNotification(`✅ Bestellung #${order.orderId} erfolgreich aufgegeben! Gesamtsumme: €${total.toFixed(2)}`);
    
    cart = [];
    selectedPaymentMethod = null;
    updateCartCounter();
    closeModal();
    
    const demoModeEnabled = getDemoModeState();
    const currentMasterSession = localStorage.getItem('klarkraft_currentMaster');
    
    if (!demoModeEnabled) {
        showNotification(`📦 Bestellung eingegangen! Manuelle Bearbeitung erforderlich.`);
        
        if (currentMaster) {
            updateOrdersCounter();
            showNotification(`📦 Neue Bestellung eingegangen! (#${order.orderId})`);
        }
    } else if (demoModeEnabled && currentMasterSession) {
        showNotification(`📦 Bestellung eingegangen! Mitarbeiter wird sie bearbeiten.`);
        
        if (currentMaster) {
            updateOrdersCounter();
            showNotification(`📦 Neue Bestellung eingegangen! (#${order.orderId})`);
        }
    } else if (demoModeEnabled && !currentMasterSession) {
        showNotification(`🤖 Demo-Modus: Automatische Bearbeitung gestartet`);
        
        setTimeout(() => {
            const orderIndex = orders.findIndex(o => o.orderId === order.orderId);
            if (orderIndex !== -1) {
                orders[orderIndex].status = 'processing1';
                orders[orderIndex].autoProcessedBy = 'Demo-System';
                addTimelineEvent(orders[orderIndex], 'processing1', 'processing_started', 'Bearbeitung gestartet', '⚙️', 'Demo-System', 'system');
                localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
                showNotification(`📦 Demo: Bestellung #${order.orderId} wird bearbeitet`);
            }
        }, 5000);
        
        setTimeout(() => {
            const orderIndex = orders.findIndex(o => o.orderId === order.orderId);
            if (orderIndex !== -1) {
                orders[orderIndex].status = 'processing2';
                orders[orderIndex].autoProcessedBy = 'Demo-System';
                addTimelineEvent(orders[orderIndex], 'processing2', 'shipping_prepared', 'Versandvorbereitung', '📦', 'Demo-System', 'system');
                localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
                showNotification(`📦 Demo: Bestellung #${order.orderId} wird versendet`);
            }
        }, 8000);
        
        setTimeout(() => {
            const orderIndex = orders.findIndex(o => o.orderId === order.orderId);
            if (orderIndex !== -1) {
                orders[orderIndex].status = 'completed';
                orders[orderIndex].autoCompletedBy = 'Demo-System';
                addTimelineEvent(orders[orderIndex], 'completed', 'order_shipped', 'Bestellung versendet', '🚚', 'Demo-System', 'system');
                localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
                showNotification(`🚚 Demo: Bestellung #${order.orderId} wurde versendet!`);
            }
        }, 10000);
    }
}

// ========== TIMELINE FUNCTIONS ==========
function addTimelineEvent(order, status, event, description, icon, actor, actorType, extraData = {}) {
    if (!order.timeline) {
        order.timeline = [];
    }
    
    const timelineEvent = {
        timestamp: new Date().toISOString(),
        status: status,
        event: event,
        description: description,
        icon: icon,
        actor: actor,
        actorType: actorType,
        ...extraData
    };
    
    order.timeline.push(timelineEvent);
}

function generateOrderTimeline(order) {
    if (!order.timeline || order.timeline.length === 0) {
        return `
            <div class="customer-timeline">
                <div class="customer-timeline-item pending">
                    <div class="timeline-icon">📦</div>
                    <div class="timeline-content">
                        <strong>Bestellung eingegangen</strong>
                        <div class="timeline-date">${new Date(order.orderDate).toLocaleString('de-DE')}</div>
                        <div class="timeline-detail">Bestellung wurde erfolgreich aufgegeben</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="customer-timeline">
            ${order.timeline.map((event, index) => {
                const statusClass = getTimelineStatusClass(event.status, order.status, index === order.timeline.length - 1);
                return `
                    <div class="customer-timeline-item ${statusClass}">
                        <div class="timeline-icon">${event.icon}</div>
                        <div class="timeline-content">
                            <strong>${event.description}</strong>
                            <div class="timeline-date">${new Date(event.timestamp).toLocaleString('de-DE')}</div>
                            <div class="timeline-detail">
                                ${event.actorType === 'system' ? 'Automatisch' : 
                                  event.actorType === 'master' ? `Bearbeitet von: ${event.actor}` : 
                                  `von ${event.actor}`}
                            </div>
                            ${event.cancellationReason ? `
                                <div class="timeline-detail" style="color: #f44336; font-weight: bold;">
                                    Grund: ${getReasonText(event.cancellationReason)}
                                </div>
                            ` : ''}
                            ${event.note ? `
                                <div class="timeline-detail" style="font-style: italic;">
                                    Notiz: ${event.note}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function getTimelineStatusClass(eventStatus, orderStatus, isLast) {
    if (eventStatus === 'cancelled') return 'cancelled';
    if (eventStatus === 'completed') return 'completed';
    if (isLast && (orderStatus === 'pending' || orderStatus === 'processing1' || orderStatus === 'processing2')) {
        return 'pending';
    }
    return 'completed';
}

// Hilfs-Funktionen die für viewOrderDetailsInModal benötigt werden:

function hasActiveCancellationRequest(order) {
    return order.customerCancellationRequest && 
           !order.customerCancellationApproved && 
           !order.customerCancellationDenied &&
           order.status !== 'cancelled';
}

function canPerformOrderActions(order) {
    // Wenn es eine aktive Stornierungsanfrage gibt, können keine weiteren Aktionen durchgeführt werden
    // außer der Genehmigung/Ablehnung der Stornierung
    return !hasActiveCancellationRequest(order);
}

function closeOrderDetails() {
    const modal = document.getElementById('orderDetailsModal');
    if (modal) {
        modal.remove();
    }
}

function getStatusText(status) {
    const statusTexts = {
        'pending': 'Ausstehend',
        'processing1': 'In Bearbeitung...',
        'processing2': 'Wird versendet...',
        'completed': 'Abgeschlossen',
        'cancelled': 'Storniert!'
    };
    return statusTexts[status] || status;
}

function generateOrderTimeline(order) {
    if (!order.timeline || order.timeline.length === 0) {
        return `
            <div class="customer-timeline">
                <div class="customer-timeline-item pending">
                    <div class="timeline-icon">📦</div>
                    <div class="timeline-content">
                        <strong>Bestellung eingegangen</strong>
                        <div class="timeline-date">${new Date(order.orderDate).toLocaleString('de-DE')}</div>
                        <div class="timeline-detail">Bestellung wurde erfolgreich aufgegeben</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    return `
        <div class="customer-timeline">
            ${order.timeline.map((event, index) => {
                const statusClass = getTimelineStatusClass(event.status, order.status, index === order.timeline.length - 1);
                return `
                    <div class="customer-timeline-item ${statusClass}">
                        <div class="timeline-icon">${event.icon}</div>
                        <div class="timeline-content">
                            <strong>${event.description}</strong>
                            <div class="timeline-date">${new Date(event.timestamp).toLocaleString('de-DE')}</div>
                            <div class="timeline-detail">
                                ${event.actorType === 'system' ? 'Automatisch' : 
                                  event.actorType === 'master' ? `Bearbeitet von: ${event.actor}` : 
                                  `von ${event.actor}`}
                            </div>
                            ${event.cancellationReason ? `
                                <div class="timeline-detail" style="color: #f44336; font-weight: bold;">
                                    Grund: ${getReasonText(event.cancellationReason)}
                                </div>
                            ` : ''}
                            ${event.note ? `
                                <div class="timeline-detail" style="font-style: italic;">
                                    Notiz: ${event.note}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

function getTimelineStatusClass(eventStatus, orderStatus, isLast) {
    if (eventStatus === 'cancelled') return 'cancelled';
    if (eventStatus === 'completed') return 'completed';
    if (isLast && (orderStatus === 'pending' || orderStatus === 'processing1' || orderStatus === 'processing2')) {
        return 'pending';
    }
    return 'completed';
}

function getReasonText(reason) {
    const reasonMap = {
        'customer_request': 'Kundenwunsch',
        'payment_failed': 'Zahlungsprobleme',
        'out_of_stock': 'Artikel nicht verfügbar',
        'quality_issues': 'Qualitätsprobleme',
        'shipping_issues': 'Versandprobleme',
        'system_error': 'Systemfehler',
        'other': 'Sonstige Gründe'
    };
    return reasonMap[reason] || reason;
}

function showCancellationRequestError() {
    showNotification('⚠️ Diese Bestellung hat eine aktive Stornierungsanfrage vom Kunden. Bitte genehmigen oder lehnen Sie diese zuerst in der Detail-Ansicht ab, bevor Sie andere Aktionen durchführen können.');
}

// ========== STORNIERUNGSFUNKTIONEN ==========
function hasActiveCancellationRequest(order) {
    return order.customerCancellationRequest && 
           !order.customerCancellationApproved && 
           !order.customerCancellationDenied &&
           order.status !== 'cancelled';
}

function canPerformOrderActions(order) {
    return !hasActiveCancellationRequest(order);
}

function requestOrderCancellation(orderId) {
    const order = orders.find(o => o.orderId === orderId);
    if (!order) {
        showNotification('❌ Bestellung nicht gefunden.');
        return;
    }

    if (order.status === 'cancelled') {
        showNotification('⚠️ Diese Bestellung ist bereits storniert.');
        return;
    }

    if (order.status === 'completed') {
        showNotification('⚠️ Bereits gelieferte Bestellungen können nicht storniert werden.');
        return;
    }

    const reason = prompt(`🤔 Warum möchten Sie Bestellung #${order.orderId} stornieren?\n\nBitte geben Sie einen kurzen Grund an:`, '');
    
    if (!reason) return;

    if (confirm(`❌ Möchten Sie Bestellung #${order.orderId} wirklich stornieren?\n\nGrund: ${reason}\n\nDie Stornierung wird an unser Team weitergeleitet.`)) {
        const orderIndex = orders.findIndex(o => o.orderId === orderId);
        orders[orderIndex].customerCancellationRequest = {
            reason: reason,
            requestedAt: new Date().toISOString(),
            requestedBy: currentUser.name
        };
        
        addTimelineEvent(orders[orderIndex], orders[orderIndex].status, 'cancellation_requested', 'Stornierung angefragt', '⚠️', currentUser.name, 'customer', {
            note: reason
        });
        
        localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
        
        logActivity('Customer Cancellation Request', `Customer ${currentUser.name} requested cancellation for order ${orderId}. Reason: ${reason}`);
        showNotification(`📨 Stornierungsanfrage gesendet! Wir bearbeiten Ihre Anfrage schnellstmöglich.\n\nBestellung: #${orderId}\nGrund: ${reason}`);
        
        const mailtoLink = `mailto:service@klarkraft.de?subject=Stornierungsanfrage - Bestellung ${orderId}&body=Sehr geehrtes KlarKRAFT Team,%0A%0AHiermit beantrage ich die Stornierung meiner Bestellung:%0A%0ABestellnummer: ${orderId}%0AKunde: ${currentUser.name} (${currentUser.email})%0AGrund: ${reason}%0A%0ABitte bestätigen Sie die Stornierung.%0A%0AMit freundlichen Grüßen%0A${currentUser.name}`;
        
        setTimeout(() => {
            if (confirm('📧 Möchten Sie eine E-Mail an unseren Support senden?')) {
                window.open(mailtoLink);
            }
        }, 1000);
        
        loadOrderHistory();
    }
}

// ========== DEMO MODE FUNCTIONS ==========
function getDemoModeState() {
    return localStorage.getItem('klarkraft_demo_mode') === 'true';
}

function setDemoModeState(enabled) {
    localStorage.setItem('klarkraft_demo_mode', enabled.toString());
}

function updateDemoModeUI() {
    const toggle = document.getElementById('demoModeToggle');
    const status = document.getElementById('demoModeStatus');
    const isEnabled = getDemoModeState();
    
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

function toggleDemoMode() {
    const toggle = document.getElementById('demoModeToggle');
    const newState = toggle.checked;
    
    setDemoModeState(newState);
    updateDemoModeUI();
    
    const action = newState ? 'aktiviert' : 'deaktiviert';
    logActivity('Demo Mode Toggle', `Demo-Modus ${action} von ${currentMaster.name}`);
    showNotification(`🎮 Demo-Modus ${action}!`);
}

// ========== WEITERE WICHTIGE FUNKTIONEN ==========
function updateUserData() {
    const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
    const userIndex = users.findIndex(u => u.customerId === currentUser.customerId);
    if (userIndex !== -1) {
        users[userIndex] = currentUser;
        localStorage.setItem('klarkraft_users', JSON.stringify(users));
    }
    localStorage.setItem('klarkraft_currentUser', JSON.stringify(currentUser));
    updateUserInterface();
}

function getStatusText(status) {
    const statusTexts = {
        'pending': 'Ausstehend',
        'processing1': 'In Bearbeitung...',
        'processing2': 'Wird versendet...',
        'completed': 'Abgeschlossen',
        'cancelled': 'Storniert!'
    };
    return statusTexts[status] || status;
}

function getStatusInfo(status) {
    const statusMap = {
        'pending': {
            text: 'Ausstehend',
            icon: '⏳',
            description: 'Ihre Bestellung ist eingegangen und wird umgehend bearbeitet.'
        },
        'processing1': {
            text: 'In Bearbeitung',
            icon: '⚙️',
            description: 'Ihre Bestellung wird derzeit bearbeitet.'
        },
        'processing2': {
            text: 'Versand wird vorbereitet',
            icon: '📦',
            description: 'Ihre Bestellung wurde in den Versand übergeben.'
        },
        'completed': {
            text: 'Versendet',
            icon: '🚚',
            description: 'Ihre Bestellung wurde erfolgreich versendet und trifft bald bei Ihnen ein.'
        },
        'cancelled': {
            text: 'Storniert',
            icon: '❌',
            description: 'Diese Bestellung wurde storniert.'
        }
    };
    return statusMap[status] || statusMap['pending'];
}

function getReasonText(reason) {
    const reasonMap = {
        'customer_request': 'Kundenwunsch',
        'payment_failed': 'Zahlungsprobleme',
        'out_of_stock': 'Artikel nicht verfügbar',
        'quality_issues': 'Qualitätsprobleme',
        'shipping_issues': 'Versandprobleme',
        'system_error': 'Systemfehler',
        'other': 'Sonstige Gründe'
    };
    return reasonMap[reason] || reason;
}

function showProfile() {
    if (!currentUser) {
        showAuth();
        return;
    }
    
    document.getElementById('mainContent').classList.add('hidden');
    document.getElementById('profilePage').classList.add('active');
    
    loadProfileData();
}

function loadProfileData() {
    if (!currentUser) return;
    
    document.getElementById('profileName').value = currentUser.name || '';
    document.getElementById('profileEmail').value = currentUser.email || '';
    document.getElementById('profilePhone').value = currentUser.phone || '';
    
    document.getElementById('shippingAddress').value = currentUser.address || '';
    document.getElementById('shippingCity').value = currentUser.city || '';
    document.getElementById('shippingZip').value = currentUser.zip || '';
    document.getElementById('shippingCountry').value = currentUser.country || 'Deutschland';
    
    loadPaymentMethods();
    loadOrderHistory();
}

function loadOrderHistory() {
    if (!currentUser) return;
    
    const userOrders = orders.filter(order => order.customerId === currentUser.customerId);
    const ordersList = document.getElementById('orderHistoryList');
    
    if (userOrders.length === 0) {
        ordersList.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #8d6e63;">
                <h4>📦 Noch keine Bestellungen</h4>
                <p>Sie haben noch keine Bestellungen aufgegeben.</p>
                <button class="btn" onclick="showProducts()" style="width: auto; margin-top: 1rem;">
                    🛍️ Jetzt einkaufen
                </button>
            </div>
        `;
        return;
    }
    
    ordersList.innerHTML = `
        <div style="margin-bottom: 1rem; padding: 1rem; background: rgba(255,107,53,0.1); border-radius: 10px;">
            <h4 style="color: #ff6b35; margin-bottom: 0.5rem;">📊 Ihre Bestellübersicht</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; text-align: center;">
                <div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: #ff6b35;">${userOrders.length}</div>
                    <div style="font-size: 0.9rem; color: #8d6e63;">Gesamtbestellungen</div>
                </div>
                <div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: #4caf50;">${userOrders.filter(o => o.status === 'completed').length}</div>
                    <div style="font-size: 0.9rem; color: #8d6e63;">Abgeschlossen</div>
                </div>
                <div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: #ff9800;">${userOrders.filter(o => o.status === 'pending' || o.status === 'processing1' || o.status === 'processing2').length}</div>
                    <div style="font-size: 0.9rem; color: #8d6e63;">In Bearbeitung</div>
                </div>
                <div>
                    <div style="font-size: 1.5rem; font-weight: bold; color: #ff6b35;">€${userOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</div>
                    <div style="font-size: 0.9rem; color: #8d6e63;">Gesamtumsatz</div>
                </div>
            </div>
        </div>
        
        <div style="margin-bottom: 1rem;">
            <h4 style="color: #8d6e63;">📋 Ihre Bestellungen (klicken für Details)</h4>
        </div>
        
        ${userOrders
            .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
            .map(order => createCustomerOrderCard(order))
            .join('')}
    `;
}

function createCustomerOrderCard(order) {
    const statusInfo = getStatusInfo(order.status);
    const canCancel = (order.status === 'pending' || order.status === 'processing1' || order.status === 'processing2') && !hasActiveCancellationRequest(order);
    const hasCancellationRequest = hasActiveCancellationRequest(order);
    
    return `
        <div class="customer-order-card" onclick="showCustomerOrderDetails('${order.orderId}')" style="cursor: pointer;" data-status="${order.status}">
            <div class="order-card-header">
                <div>
                    <h4 style="margin: 0; color: #5d4037;">Bestellung #${order.orderId}</h4>
                    <p style="margin: 0.25rem 0; color: #8d6e63; font-size: 0.9rem;">
                        📅 ${new Date(order.orderDate).toLocaleDateString('de-DE', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 1.3rem; font-weight: bold; color: #ff6b35;">€${order.total.toFixed(2)}</div>
                    <span class="order-status status-${order.status}">${statusInfo.text}</span>
                </div>
            </div>
            
            <div class="order-card-content">
                <div style="margin: 1rem 0;">
                    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                        <span style="font-weight: bold;">📦 Artikel:</span>
                        <span>${order.items.length} Produkt${order.items.length !== 1 ? 'e' : ''}</span>
                    </div>
                    <div style="font-size: 0.9rem; color: #8d6e63;">
                        ${order.items.slice(0, 2).map(item => `${item.name} (${item.quantity}x)`).join(', ')}
                        ${order.items.length > 2 ? ` und ${order.items.length - 2} weitere...` : ''}
                    </div>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.9rem; color: #8d6e63;">
                    <div>
                        <strong>💳 Bezahlung:</strong><br>
                        ${order.paymentMethod}
                    </div>
                    <div>
                        <strong>📋 Tracking:</strong><br>
                        ${order.trackingNumber}
                    </div>
                </div>
                
                ${hasCancellationRequest ? `
                    <div style="margin-top: 1rem; padding: 0.8rem; background: rgba(255,152,0,0.1); border-radius: 8px; border-left: 4px solid #ff9800;">
                        <div style="font-size: 0.9rem; color: #ff9800; font-weight: bold;">
                            ⏳ Stornierungsanfrage eingereicht
                        </div>
                        <div style="font-size: 0.8rem; color: #8d6e63; margin-top: 0.25rem;">
                            Eingereicht am: ${new Date(order.customerCancellationRequest.requestedAt).toLocaleString('de-DE')}<br>
                            Grund: ${order.customerCancellationRequest.reason}<br>
                            Status: Wird bearbeitet...
                        </div>
                    </div>
                ` : ''}
            </div>
            
            <div class="order-card-actions" onclick="event.stopPropagation();">
                <button class="action-btn view" onclick="showCustomerOrderDetails('${order.orderId}')" style="background: #2196f3;">
                    👁️ Details ansehen
                </button>
                ${canCancel ? `
                    <button class="action-btn delete" onclick="requestOrderCancellation('${order.orderId}')" style="background: #f44336;">
                        ❌ Stornieren
                    </button>
                ` : ''}
                ${order.status === 'completed' ? `
                    <button class="action-btn" onclick="reorderItems('${order.orderId}')" style="background: #4caf50;">
                        🔄 Erneut bestellen
                    </button>
                ` : ''}
            </div>
        </div>
    `;
}

function showCustomerOrderDetails(orderId) {
    const order = orders.find(o => o.orderId === orderId);
    if (!order) {
        showNotification('❌ Bestellung nicht gefunden.');
        return;
    }

    const subtotal = order.subtotal || (order.total - (order.shippingCost || 0));
    const statusInfo = getStatusInfo(order.status);
    
    const modalHtml = `
        <div id="customerOrderDetailsModal" class="modal" style="display: block;">
            <div class="modal-content" style="max-width: 900px; max-height: 90vh;">
                <span class="close" onclick="closeCustomerOrderDetails()">&times;</span>
                
                <div style="text-align: center; margin-bottom: 2rem; padding: 1.5rem; background: linear-gradient(135deg, #8d6e63, #a1887f); color: white; border-radius: 15px; margin: -2rem -2rem 2rem -2rem;">
                    <h2 style="margin: 0; color: white;">📦 Bestellung #${order.orderId}</h2>
                    <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">
                        Bestellt am ${new Date(order.orderDate).toLocaleDateString('de-DE', { 
                            day: '2-digit', 
                            month: '2-digit', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                    <div style="margin-top: 1rem;">
                        <span class="order-status status-${order.status}" style="font-size: 1rem; padding: 0.5rem 1rem;">
                            ${statusInfo.icon} ${statusInfo.text}
                        </span>
                    </div>
                </div>

                <div style="margin-bottom: 2rem;">
                    <h3 style="color: #8d6e63; margin-bottom: 1rem;">📋 Bestellstatus & Verlauf</h3>
                    ${generateOrderTimeline(order)}
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap; justify-content: center;">
                    <button class="btn" onclick="closeCustomerOrderDetails()" style="background: #9e9e9e; width: auto; padding: 0.8rem 1.5rem;">
                        Schließen
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function closeCustomerOrderDetails() {
    const modal = document.getElementById('customerOrderDetailsModal');
    if (modal) {
        modal.remove();
    }
}

function reorderItems(orderId) {
    const order = orders.find(o => o.orderId === orderId);
    if (!order) {
        showNotification('❌ Bestellung nicht gefunden.');
        return;
    }

    order.items.forEach(item => {
        const existingCartItem = cart.find(cartItem => cartItem.id === item.productId);
        if (existingCartItem) {
            existingCartItem.quantity += item.quantity;
        } else {
            const product = products.find(p => p.id === item.productId);
            if (product) {
                cart.push({...product, quantity: item.quantity});
            }
        }
    });
    
    updateCartCounter();
    showNotification(`🛍️ ${order.items.length} Artikel aus Bestellung #${orderId} wurden zum Warenkorb hinzugefügt!`);
    
    setTimeout(() => {
        if (confirm('🛒 Möchten Sie den Warenkorb jetzt anzeigen?')) {
            closeCustomerOrderDetails();
            showCart();
        }
    }, 1000);
}

function loadSavedPaymentMethods() {
    const container = document.getElementById('savedPaymentMethods');
    
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
            <div class="payment-method-card ${selectedPaymentMethod === index ? 'selected' : ''}" onclick="selectSavedPaymentMethod(${index})">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong>${getPaymentMethodIcon(method.type)} ${getPaymentMethodName(method.type)}</strong><br>
                        <small>${getPaymentMethodDetails(method)}</small>
                    </div>
                    <input type="radio" name="selectedPayment" ${selectedPaymentMethod === index ? 'checked' : ''} onchange="selectSavedPaymentMethod(${index})">
                </div>
            </div>
        `).join('')}
    `;
}

function getPaymentMethodIcon(type) {
    const icons = {
        'paypal': '💳',
        'sepa': '🏦',
        'card': '💳'
    };
    return icons[type] || '💳';
}

function getPaymentMethodName(type) {
    const names = {
        'paypal': 'PayPal',
        'sepa': 'SEPA-Lastschrift',
        'card': 'Kreditkarte'
    };
    return names[type] || 'Unbekannt';
}

function getPaymentMethodDetails(method) {
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

function selectSavedPaymentMethod(index) {
    selectedPaymentMethod = index;
    loadSavedPaymentMethods();
    
    document.getElementById('paymentMethodSelector').style.display = 'none';
    document.getElementById('togglePaymentBtn').textContent = 'Andere Zahlungsmethode wählen';
    
    showOrderConfirmation();
    
    setTimeout(() => {
        document.getElementById('orderConfirmation').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }, 100);
}

function togglePaymentOptions() {
    const selector = document.getElementById('paymentMethodSelector');
    const toggleBtn = document.getElementById('togglePaymentBtn');
    
    if (selector.style.display === 'none') {
        selector.style.display = 'block';
        toggleBtn.textContent = 'Gespeicherte Zahlungsmethode verwenden';
        
        selectedPaymentMethod = null;
        loadSavedPaymentMethods();
        
        document.getElementById('orderConfirmation').style.display = 'none';
    } else {
        selector.style.display = 'none';
        toggleBtn.textContent = 'Andere Zahlungsmethode wählen';
        
        document.querySelectorAll('.payment-btn').forEach(btn => btn.classList.remove('active'));
        document.getElementById('paymentForms').innerHTML = '';
        
        loadSavedPaymentMethods();
        
        document.getElementById('orderConfirmation').style.display = 'none';
    }
}

function selectPaymentMethod(method) {
    document.querySelectorAll('.payment-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`${method}Btn`).classList.add('active');
    
    const forms = document.getElementById('paymentForms');
    forms.innerHTML = generatePaymentForm(method);
    
    selectedPaymentMethod = null;
    showOrderConfirmation();
}

function generatePaymentForm(type, prefix = '') {
    const formId = prefix ? `${prefix}PaymentForm` : 'paymentForm';
    
    switch(type) {
        case 'paypal':
            return `
                <div class="payment-form" id="${formId}">
                    <h4 style="color: #ff6b35; margin: 1rem 0;">PayPal Zahlung</h4>
                    <div class="form-group">
                        <label for="${prefix}paypalEmail">PayPal E-Mail:</label>
                        <input type="email" id="${prefix}paypalEmail" required placeholder="ihre@paypal-email.de">
                    </div>
                </div>
            `;
        case 'sepa':
            return `
                <div class="payment-form" id="${formId}">
                    <h4 style="color: #ff6b35; margin: 1rem 0;">SEPA Lastschrift</h4>
                    <div class="form-group">
                        <label for="${prefix}sepaName">Kontoinhaber:</label>
                        <input type="text" id="${prefix}sepaName" required placeholder="Max Mustermann">
                    </div>
                    <div class="form-group">
                        <label for="${prefix}sepaIban">IBAN:</label>
                        <input type="text" id="${prefix}sepaIban" required placeholder="DE89 3704 0044 0532 0130 00" maxlength="34">
                    </div>
                    <div style="padding: 1rem; background: rgba(139,195,74,0.1); border-radius: 8px; margin: 1rem 0;">
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input type="checkbox" id="${prefix}sepaMandate" required style="margin-right: 0.5rem;">
                            <span style="font-size: 0.9rem; color: #689f38;">
                                Ich ermächtige die KlarKRAFT GmbH, Zahlungen von meinem Konto mittels Lastschrift einzuziehen.
                            </span>
                        </label>
                    </div>
                </div>
            `;
        case 'card':
            return `
                <div class="payment-form" id="${formId}">
                    <h4 style="color: #ff6b35; margin: 1rem 0;">Kreditkarte</h4>
                    <div class="form-group">
                        <label for="${prefix}cardName">Karteninhaber:</label>
                        <input type="text" id="${prefix}cardName" required placeholder="Max Mustermann">
                    </div>
                    <div class="form-group">
                        <label for="${prefix}cardNumber">Kartennummer:</label>
                        <input type="text" id="${prefix}cardNumber" required placeholder="1234 5678 9012 3456" maxlength="19">
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label for="${prefix}cardExpiry">Ablaufdatum:</label>
                            <input type="text" id="${prefix}cardExpiry" required placeholder="MM/JJ" maxlength="5">
                        </div>
                        <div class="form-group">
                            <label for="${prefix}cardCvv">CVV:</label>
                            <input type="text" id="${prefix}cardCvv" required placeholder="123" maxlength="4">
                        </div>
                    </div>
                </div>
            `;
    }
}

function showOrderConfirmation() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shippingCost = calculateShippingCost(subtotal);
    const total = subtotal + shippingCost;
    
    const summary = document.getElementById('orderSummary');
    summary.innerHTML = `
        ${cart.map(item => 
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
    
    document.getElementById('orderConfirmation').style.display = 'block';
}

function cancelOrder() {
    closeModal();
}

function loadPaymentMethods() {
    const list = document.getElementById('paymentMethodsList');
    
    if (!currentUser.paymentMethods || currentUser.paymentMethods.length === 0) {
        list.innerHTML = '<p style="color: #8d6e63;">Noch keine Zahlungsmethoden hinterlegt.</p>';
        return;
    }
    
    list.innerHTML = currentUser.paymentMethods.map((method, index) => `
        <div class="payment-method-card">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${getPaymentMethodIcon(method.type)} ${getPaymentMethodName(method.type)}</strong><br>
                    <small>${getPaymentMethodDetails(method)}</small>
                </div>
                <button class="btn" onclick="removePaymentMethod(${index})" style="background: #f44336; width: auto; padding: 0.5rem 1rem; margin: 0;">Löschen</button>
            </div>
        </div>
    `).join('');
}

function removePaymentMethod(index) {
    if (confirm('Möchten Sie diese Zahlungsmethode wirklich löschen?')) {
        currentUser.paymentMethods.splice(index, 1);
        updateUserData();
        loadPaymentMethods();
        showNotification('✅ Zahlungsmethode entfernt!');
    }
}

function showAddPaymentMethod() {
    document.getElementById('addPaymentModal').style.display = 'block';
}

function updatePersonalData(event) {
    event.preventDefault();
    
    currentUser.name = document.getElementById('profileName').value;
    currentUser.email = document.getElementById('profileEmail').value;
    currentUser.phone = document.getElementById('profilePhone').value;
    
    updateUserData();
    showNotification('✅ Persönliche Daten aktualisiert!');
}

function updateShippingAddress(event) {
    event.preventDefault();
    
    currentUser.address = document.getElementById('shippingAddress').value;
    currentUser.city = document.getElementById('shippingCity').value;
    currentUser.zip = document.getElementById('shippingZip').value;
    currentUser.country = document.getElementById('shippingCountry').value;
    
    updateUserData();
    showNotification('✅ Lieferadresse aktualisiert!');
}

function changePassword(event) {
    event.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (currentPassword !== currentUser.password) {
        showNotification('❌ Aktuelles Passwort ist falsch!');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        showNotification('❌ Passwörter stimmen nicht überein!');
        return;
    }
    
    if (newPassword.length < 6) {
        showNotification('❌ Neues Passwort muss mindestens 6 Zeichen lang sein!');
        return;
    }
    
    currentUser.password = newPassword;
    updateUserData();
    
    document.getElementById('passwordChangeForm').reset();
    showNotification('✅ Passwort erfolgreich geändert!');
}

// ========== MASTER DASHBOARD FUNKTIONEN ==========

// Master Dashboard Funktion
function showMasterDashboard() {
    if (!currentMaster) {
        showMasterLogin();
        return;
    }
    
    document.getElementById('currentMasterName').textContent = currentMaster.name;
    document.getElementById('currentMasterRole').textContent = currentMaster.role;
    document.getElementById('lastLoginTime').textContent = new Date(currentMaster.loginTime).toLocaleString('de-DE');
    document.getElementById('sessionId').textContent = currentMaster.sessionId;
    
    const settingsTab = document.getElementById('settingsTab');
    if (currentMaster.permissions.includes('all') || currentMaster.role === 'Administrator') {
        settingsTab.style.display = 'block';
    } else {
        settingsTab.style.display = 'none';
    }
    
    loadMasterOverview();
    document.getElementById('masterDashboardModal').style.display = 'block';
    
    setTimeout(() => {
        updateDemoModeUI();
    }, 100);
    
    logActivity('Dashboard Access', `Accessed master dashboard`);
}

// Master Tab Switching
function switchMasterTab(tab) {
    document.querySelectorAll('#masterDashboardContent .auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('#masterDashboardContent .auth-form').forEach(f => f.classList.remove('active'));
    
    const tabs = document.querySelectorAll('#masterDashboardContent .auth-tab');
    const forms = document.querySelectorAll('#masterDashboardContent .auth-form');
    
    let tabIndex = 0;
    switch(tab) {
        case 'overview': tabIndex = 0; loadMasterOverview(); break;
        case 'customers': tabIndex = 1; loadMasterCustomers(); break;
        case 'orders': tabIndex = 2; loadMasterOrders(); break;
        case 'analytics': tabIndex = 3; loadMasterAnalytics(); break;
        case 'settings': tabIndex = 4; loadMasterSettings(); break;
    }
    
    if (tabs[tabIndex]) tabs[tabIndex].classList.add('active');
    if (forms[tabIndex]) forms[tabIndex].classList.add('active');
    
    logActivity('Tab Switch', `Switched to ${tab} tab`);
}

// Load Master Overview
function loadMasterOverview() {
    const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
    const todayOrders = orders.filter(order => {
        const orderDate = new Date(order.orderDate);
        const today = new Date();
        return orderDate.toDateString() === today.toDateString();
    }).length;
    
    document.getElementById('dashboardStats').innerHTML = `
        <div class="master-stat-grid">
            <div class="master-stat-card">
                <div class="master-stat-icon">👥</div>
                <span class="master-stat-number">${users.length}</span>
                <span class="master-stat-label">Registrierte Kunden</span>
            </div>
            <div class="master-stat-card">
                <div class="master-stat-icon">📦</div>
                <span class="master-stat-number">${orders.length}</span>
                <span class="master-stat-label">Gesamtbestellungen</span>
            </div>
            <div class="master-stat-card">
                <div class="master-stat-icon">💰</div>
                <span class="master-stat-number">€${totalRevenue.toFixed(0)}</span>
                <span class="master-stat-label">Gesamtumsatz</span>
            </div>
            <div class="master-stat-card">
                <div class="master-stat-icon">📈</div>
                <span class="master-stat-number">€${avgOrderValue.toFixed(0)}</span>
                <span class="master-stat-label">Ø Bestellwert</span>
            </div>
            <div class="master-stat-card">
                <div class="master-stat-icon">🆕</div>
                <span class="master-stat-number">${todayOrders}</span>
                <span class="master-stat-label">Heute bestellt</span>
            </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">
            <div>
                <h3 style="color: #ff6b35; margin-bottom: 1rem;">📈 Neueste Bestellungen</h3>
                <div id="recentOrders"></div>
            </div>
            <div>
                <h3 style="color: #ff6b35; margin-bottom: 1rem;">👤 Neue Kunden</h3>
                <div id="recentCustomers"></div>
            </div>
        </div>
    `;
    
    const recentOrders = orders
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
        .slice(0, 5);
        
    document.getElementById('recentOrders').innerHTML = recentOrders.length > 0 ? recentOrders.map(order => `
        <div class="order-item" style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>#${order.orderId}</strong><br>
                    <small>${order.customerName}</small>
                </div>
                <div style="text-align: right;">
                    <span class="order-status status-${order.status}">${getStatusText(order.status)}</span><br>
                    <strong>€${order.total.toFixed(2)}</strong>
                </div>
            </div>
        </div>
    `).join('') : '<p>Keine Bestellungen vorhanden.</p>';
    
    const recentCustomers = users
        .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
        .slice(0, 5);
        
    document.getElementById('recentCustomers').innerHTML = recentCustomers.length > 0 ? recentCustomers.map(user => `
        <div class="customer-item" style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>${user.name}</strong><br>
                    <small>${user.email}</small>
                </div>
                <div style="text-align: right;">
                    <div>${user.totalOrders || 0} Bestellungen</div>
                    <small>€${(user.totalSpent || 0).toFixed(2)}</small>
                </div>
            </div>
        </div>
    `).join('') : '<p>Keine Kunden registriert.</p>';
}

// Load Master Customers
function loadMasterCustomers() {
    const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
    const searchInput = document.getElementById('customerSearch');
    
    function renderCustomers(customerList = users) {
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
                    ${customerList.map(user => `
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
                            <td><strong>€${(user.totalSpent || 0).toFixed(2)}</strong></td>
                            <td>${new Date(user.registrationDate || Date.now()).toLocaleDateString('de-DE')}</td>
                            <td>
                                <button class="action-btn view" onclick="sendEmailToCustomer('${user.customerId}')" title="E-Mail senden">📧</button>
                                <button class="action-btn delete" onclick="deleteCustomerAccount('${user.customerId}')" title="Konto löschen">🗑️</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }
    
    renderCustomers();
    
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredUsers = users.filter(user => 
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm) ||
                (user.customerId && user.customerId.toLowerCase().includes(searchTerm))
            );
            renderCustomers(filteredUsers);
        });
    }
}

// Load Master Orders
function loadMasterOrders() {
    const statusFilter = document.getElementById('orderStatusFilter');
    
    function renderOrders(orderList = orders) {
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
                        .map(order => {
                            const hasCancellationRequest = hasActiveCancellationRequest(order);
                            const canPerformActions = canPerformOrderActions(order);
                            
                            return `
                            <tr>
                                <td>
                                    <strong>#${order.orderId}</strong><br>
                                    <small>📦 ${order.trackingNumber}</small>
                                    ${hasCancellationRequest ? `
                                        <br><span class="cancellation-indicator">⚠️ STORNIERUNG ANGEFRAGT</span>
                                    ` : ''}
                                </td>
                                <td>
                                    <strong>${order.customerName}</strong><br>
                                    <small>${order.customerEmail}</small>
                                </td>
                                <td>${order.items.length} Artikel</td>
                                <td>
                                    <div><strong>€${order.total.toFixed(2)}</strong></div>
                                    ${order.shippingCost ? `<small style="color: #8d6e63;">inkl. €${order.shippingCost.toFixed(2)} Versand</small>` : `<small style="color: #4caf50;">versandkostenfrei</small>`}
                                </td>
                                <td>${order.paymentMethod}</td>
                                <td>
                                    <select class="status-select ${!canPerformActions ? 'select-disabled' : ''}" 
                                            onchange="${!canPerformActions ? 'showCancellationRequestError(); this.value=this.defaultValue' : `updateOrderStatus('${order.orderId}', this.value)`}" 
                                            value="${order.status}" 
                                            ${!canPerformActions ? 'style="background: #f0f0f0; cursor: not-allowed;" disabled' : ''}>
                                        <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Ausstehend</option>
                                        <option value="processing1" ${order.status === 'processing1' ? 'selected' : ''}>In Bearbeitung</option>
                                        <option value="processing2" ${order.status === 'processing2' ? 'selected' : ''}>Wird versendet</option>
                                        <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Abgeschlossen</option>
                                        <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Storniert</option>
                                    </select>
                                    ${hasCancellationRequest ? `
                                        <br><small style="color: #ff9800; font-weight: bold;">Stornierung angefragt!</small>
                                    ` : ''}
                                </td>
                                <td>${new Date(order.orderDate).toLocaleDateString('de-DE')}</td>
                                <td>
                                    <button class="action-btn view" onclick="viewOrderDetailsInModal('${order.orderId}')" title="Details anzeigen">👁️</button>
                                    ${order.status !== 'cancelled' && order.status !== 'completed' ? 
                                        `<button class="action-btn delete ${!canPerformActions ? 'btn-disabled' : ''}" 
                                                onclick="${!canPerformActions ? 'showCancellationRequestError()' : `cancelOrderFromModal('${order.orderId}')`}" 
                                                title="${!canPerformActions ? 'Stornierungsanfrage aktiv' : 'Bestellung stornieren'}" 
                                                style="cursor: ${!canPerformActions ? 'not-allowed' : 'pointer'}; opacity: ${!canPerformActions ? '0.5' : '1'};">❌</button>` : 
                                        ''}
                                </td>
                            </tr>
                        `;
                        }).join('')}
                </tbody>
            </table>
        `;
    }
    
    renderOrders();
    
    if (statusFilter) {
        statusFilter.addEventListener('change', (e) => {
            const selectedStatus = e.target.value;
            const filteredOrders = selectedStatus ? 
                orders.filter(order => order.status === selectedStatus) : 
                orders;
            renderOrders(filteredOrders);
        });
    }
}

// Load Master Analytics
function loadMasterAnalytics() {
    document.getElementById('analyticsContent').innerHTML = `
        <div class="chart-container">
            <h4>📊 Verkaufsübersicht</h4>
            <p>Analytik-Dashboard in Entwicklung...</p>
            <p>Hier werden später detaillierte Verkaufszahlen und Trends angezeigt.</p>
        </div>
    `;
}

// Load Master Settings
function loadMasterSettings() {
    document.getElementById('settingsContent').innerHTML = `
        <div style="margin-bottom: 2rem;">
            <h4 style="color: #8d6e63; margin-bottom: 1rem;">🎮 Demo-Modus</h4>
            <div class="setting-item">
                <div class="setting-description">
                    <div class="setting-title">Automatische Bestellabwicklung</div>
                    <div class="setting-subtitle">
                        Wenn aktiviert, werden Bestellungen automatisch bearbeitet, aber NUR wenn kein Mitarbeiter angemeldet ist. Bei "Aus" werden niemals automatische Updates durchgeführt.
                    </div>
                </div>
                <label class="toggle-switch">
                    <input type="checkbox" id="demoModeToggle" onchange="toggleDemoMode()">
                    <span class="toggle-slider"></span>
                </label>
            </div>
            <div id="demoModeStatus" style="margin-top: 0.5rem; padding: 0.5rem; border-radius: 5px; text-align: center; font-weight: bold;"></div>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h4 style="color: #8d6e63; margin-bottom: 1rem;">☁️ Cloud-Synchronisation</h4>
            <div id="firebaseStatus" style="padding: 1rem; background: rgba(255,255,255,0.7); border-radius: 8px; margin-bottom: 1rem;">
                <div style="font-weight: bold; margin-bottom: 0.5rem;">Status: <span id="cloudStatusText">❌ Nicht verfügbar</span></div>
                <div style="font-size: 0.9rem; color: #666;">
                    <div>Firebase: <span id="firebaseAvailable">❌</span></div>
                    <div>Letzte Sync: <span id="lastSyncTime">Nie</span></div>
                </div>
                <button class="btn" onclick="manualSync()" style="width: auto; padding: 0.5rem 1rem; margin-top: 0.5rem;">🔄 Manuell synchronisieren</button>
            </div>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h4 style="color: #8d6e63; margin-bottom: 1rem;">🧹 Datenbereinigung</h4>
            <button class="btn" onclick="clearTestData()" style="background: #f44336; width: auto; padding: 0.5rem 1rem; margin-right: 1rem;">Test-Daten löschen</button>
            <button class="btn" onclick="resetAllData()" style="background: #ff5722; width: auto; padding: 0.5rem 1rem;">Alle Daten zurücksetzen</button>
        </div>
        <div style="margin-bottom: 2rem;">
            <h4 style="color: #8d6e63; margin-bottom: 1rem;">📊 Datenexport</h4>
            <button class="btn" onclick="exportAllData()" style="width: auto; padding: 0.5rem 1rem;">Vollständiger Export</button>
        </div>
        <div>
            <h4 style="color: #8d6e63; margin-bottom: 1rem;">👥 Mitarbeiter-Logs</h4>
            <div id="activityLogs">${generateActivityLogs()}</div>
        </div>
    `;
    updateDemoModeUI();
}

// Generate Activity Logs
function generateActivityLogs() {
    const recentLogs = activityLogs.slice(0, 10);
    return recentLogs.length > 0 ? recentLogs.map(log => `
        <div style="padding: 0.5rem; margin-bottom: 0.5rem; background: rgba(255,255,255,0.7); border-radius: 5px; border-left: 3px solid #ff6b35;">
            <div style="font-size: 0.9rem;"><strong>${log.user}</strong> (${log.role}) - ${log.action}</div>
            <div style="font-size: 0.8rem; color: #8d6e63;">${new Date(log.timestamp).toLocaleString('de-DE')}</div>
            <div style="font-size: 0.8rem; color: #8d6e63;">${log.details}</div>
        </div>
    `).join('') : '<p>Keine Aktivitäten gefunden.</p>';
}

// Ersetze die showNewOrders Funktion
function showNewOrders() {
    if (!currentMaster) {
        showNotification('⚠️ Nur Mitarbeiter können neue Bestellungen einsehen.');
        return;
    }

    const pendingOrders = orders.filter(order => order.status === 'pending')
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    const processing1Orders = orders.filter(order => order.status === 'processing1')
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
    const processing2Orders = orders.filter(order => order.status === 'processing2')
        .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

    const ordersList = document.getElementById('newOrdersList');
    
    if (pendingOrders.length === 0 && processing1Orders.length === 0 && processing2Orders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-cart">
                <p>🎉 Keine offenen Bestellungen!</p>
                <p>Alle Bestellungen sind bearbeitet oder abgeschlossen.</p>
            </div>
        `;
    } else {
        let contentHtml = `
            <div style="margin-bottom: 1rem; padding: 1rem; background: rgba(255,107,53,0.1); border-radius: 10px;">
                <h3 style="color: #ff6b35; margin-bottom: 0.5rem;">📊 Übersicht</h3>
                <p><strong>${pendingOrders.length}</strong> neue Bestellung(en) warten auf Bearbeitung</p>
                <p><strong>${processing1Orders.length}</strong> Bestellung(en) sind in Bearbeitung</p>
                <p><strong>${processing2Orders.length}</strong> Bestellung(en) werden versendet</p>
                <p>Gesamtwert offener Bestellungen: <strong>€${[...pendingOrders, ...processing1Orders, ...processing2Orders].reduce((sum, order) => sum + order.total, 0).toFixed(2)}</strong></p>
            </div>
        `;

        if (pendingOrders.length > 0) {
            contentHtml += `<h3 style="color: #f44336; margin: 2rem 0 1rem 0;">🆕 Neue Bestellungen (${pendingOrders.length})</h3>`;
            contentHtml += pendingOrders.map(order => createOrderCard(order, 'new')).join('');
        }

        if (processing1Orders.length > 0) {
            contentHtml += `<h3 style="color: #ff9800; margin: 2rem 0 1rem 0;">⚙️ In Bearbeitung (${processing1Orders.length})</h3>`;
            contentHtml += processing1Orders.map(order => createOrderCard(order, 'processing1')).join('');
        }

        if (processing2Orders.length > 0) {
            contentHtml += `<h3 style="color: #2196f3; margin: 2rem 0 1rem 0;">📦 Wird versendet (${processing2Orders.length})</h3>`;
            contentHtml += processing2Orders.map(order => createOrderCard(order, 'processing2')).join('');
        }

        ordersList.innerHTML = contentHtml;
    }
    
    document.getElementById('newOrdersModal').style.display = 'block';
    logActivity('View Orders', `Viewed ${pendingOrders.length} pending, ${processing1Orders.length} processing1 and ${processing2Orders.length} processing2 orders`);
}

// Create Order Card
function createOrderCard(order, type) {
    const borderColor = type === 'new' ? '#f44336' : (type === 'processing1' ? '#ff9800' : '#2196f3');
    const statusLabel = type === 'new' ? 'NEU' : (type === 'processing1' ? 'IN ARBEIT' : 'VERSAND');
    const statusBg = type === 'new' ? '#f44336' : (type === 'processing1' ? '#ff9800' : '#2196f3');
    const hasCancellationRequest = hasActiveCancellationRequest(order);
    const canPerformActions = canPerformOrderActions(order);

    return `
        <div class="cart-item" style="border-left: 4px solid ${borderColor};">
            <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <strong>Bestellung #${order.orderId}</strong>
                    <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                        <span style="background: ${statusBg}; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.8rem;">${statusLabel}</span>
                        ${hasCancellationRequest ? `
                            <span style="background: #ff9800; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.8rem; animation: pulse 2s infinite;">
                                ⚠️ STORNIERUNG ANGEFRAGT!
                            </span>
                        ` : ''}
                    </div>
                </div>
                
                ${hasCancellationRequest ? `
                    <div style="margin-bottom: 0.5rem; padding: 0.8rem; background: rgba(255,152,0,0.1); border-radius: 8px; border-left: 3px solid #ff9800;">
                        <strong style="color: #ff9800;">📨 Kunden-Stornierungsanfrage:</strong><br>
                        <small style="color: #8d6e63;">
                            Angefragt am: ${new Date(order.customerCancellationRequest.requestedAt).toLocaleString('de-DE')}<br>
                            Grund: ${order.customerCancellationRequest.reason}
                        </small>
                    </div>
                ` : ''}
                
                <div style="margin-bottom: 0.5rem;">
                    <strong>Kunde:</strong> ${order.customerName} (${order.customerEmail})<br>
                    <strong>Bestellt am:</strong> ${new Date(order.orderDate).toLocaleString('de-DE')}<br>
                    <strong>Artikel:</strong> ${order.items.length} Produkt(e)
                    ${order.processedBy ? `<br><strong>Bearbeiter:</strong> ${order.processedBy}` : ''}
                </div>
                
                <div style="font-size: 0.9rem; color: #8d6e63; margin-bottom: 0.5rem;">
                    ${order.items.map(item => `${item.name} (${item.quantity}x €${item.price.toFixed(2)})`).join(', ')}
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
                        <div style="font-size: 1.2rem; font-weight: bold; color: #ff6b35;">€${order.total.toFixed(2)}</div>
                        ${order.shippingCost ? `<small style="color: #8d6e63;">inkl. €${order.shippingCost.toFixed(2)} Versand</small>` : `<small style="color: #4caf50;">versandkostenfrei</small>`}
                    </div>
                </div>
            </div>
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
                ${type === 'new' ? `
                    <button class="btn" onclick="processOrder('${order.orderId}')" style="background: #4caf50; width: auto; padding: 0.5rem 1rem;">
                        ✅ Übernehmen
                    </button>
                ` : type === 'processing1' ? `
                    <button class="btn ${!canPerformActions ? 'btn-disabled' : ''}" 
                            onclick="${!canPerformActions ? 'showCancellationRequestError()' : `advanceToShipping('${order.orderId}')`}" 
                            style="background: ${!canPerformActions ? '#ccc' : '#2196f3'}; width: auto; padding: 0.5rem 1rem; cursor: ${!canPerformActions ? 'not-allowed' : 'pointer'};">
                        📦 Zum Versand
                    </button>
                ` : `
                    <button class="btn ${!canPerformActions ? 'btn-disabled' : ''}" 
                            onclick="${!canPerformActions ? 'showCancellationRequestError()' : `markAsCompleted('${order.orderId}')`}" 
                            style="background: ${!canPerformActions ? '#ccc' : '#4caf50'}; width: auto; padding: 0.5rem 1rem; cursor: ${!canPerformActions ? 'not-allowed' : 'pointer'};">
                        🚚 Versandbereit
                    </button>
                `}
                <button class="btn" onclick="viewOrderDetailsInModal('${order.orderId}')" style="background: #2196f3; width: auto; padding: 0.5rem 1rem;">
                    👁️ Details
                </button>
                <button class="btn ${!canPerformActions ? 'btn-disabled' : ''}" 
                        onclick="${!canPerformActions ? 'showCancellationRequestError()' : `cancelOrderFromModal('${order.orderId}')`}" 
                        style="background: ${!canPerformActions ? '#ccc' : '#f44336'}; width: auto; padding: 0.5rem 1rem; cursor: ${!canPerformActions ? 'not-allowed' : 'pointer'};">
                    ❌ Stornieren
                </button>
            </div>
        </div>
    `;
}

// Helper Functions für Order Actions
function showCancellationRequestError() {
    showNotification('⚠️ Diese Bestellung hat eine aktive Stornierungsanfrage vom Kunden. Bitte genehmigen oder lehnen Sie diese zuerst in der Detail-Ansicht ab, bevor Sie andere Aktionen durchführen können.');
}

function processOrder(orderId) {
    const orderIndex = orders.findIndex(o => o.orderId === orderId);
    if (orderIndex === -1) {
        showNotification('❌ Bestellung nicht gefunden.');
        return;
    }

    const order = orders[orderIndex];

    if (order.status === 'cancelled') {
        showNotification('⚠️ Stornierte Bestellungen können nicht bearbeitet werden.');
        return;
    }

    if (order.status === 'completed') {
        showNotification('⚠️ Diese Bestellung ist bereits abgeschlossen.');
        return;
    }

    orders[orderIndex].processedBy = currentMaster.name;
    orders[orderIndex].processedAt = new Date().toISOString();
    orders[orderIndex].status = 'processing1';
    orders[orderIndex].assignedTo = currentMaster.name;
    orders[orderIndex].assignedRole = currentMaster.role;
    
    addTimelineEvent(orders[orderIndex], 'processing1', 'processing_started', 'Bearbeitung übernommen', '⚙️', currentMaster.name, 'master');
    
    localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
    
    logActivity('Process Order', `Order ${orderId} assigned to and processed by ${currentMaster.name}`);
    showNotification(`✅ Bestellung #${orderId} wurde Ihnen zugewiesen und ist jetzt in Bearbeitung.`);
    
    updateOrdersCounter();
    showNewOrders();
}

function advanceToShipping(orderId) {
    const orderIndex = orders.findIndex(o => o.orderId === orderId);
    if (orderIndex === -1) {
        showNotification('❌ Bestellung nicht gefunden.');
        return;
    }

    const order = orders[orderIndex];
    
    if (!canPerformOrderActions(order)) {
        showCancellationRequestError();
        return;
    }

    if (confirm(`📦 Bestellung #${orderId} zum Versand weiterleiten?`)) {
        orders[orderIndex].status = 'processing2';
        orders[orderIndex].statusUpdatedBy = currentMaster.name;
        orders[orderIndex].statusUpdatedAt = new Date().toISOString();
        orders[orderIndex].shippingStartedAt = new Date().toISOString();
        
        addTimelineEvent(orders[orderIndex], 'processing2', 'shipping_prepared', 'Versandvorbereitung gestartet', '📦', currentMaster.name, 'master');
        
        localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
        
        logActivity('Advance to Shipping', `Order ${orderId} advanced to shipping by ${currentMaster.name}`);
        showNotification(`📦 Bestellung #${orderId} wurde zum Versand weitergeleitet!`);
        
        updateOrdersCounter();
        if (document.getElementById('newOrdersModal').style.display === 'block') {
            showNewOrders();
        }
    }
}

function markAsCompleted(orderId) {
    const orderIndex = orders.findIndex(o => o.orderId === orderId);
    if (orderIndex === -1) {
        showNotification('❌ Bestellung nicht gefunden.');
        return;
    }

    const order = orders[orderIndex];
    
    if (!canPerformOrderActions(order)) {
        showCancellationRequestError();
        return;
    }

    if (confirm(`📦 Bestellung #${orderId} als "versendet/abgeschlossen" markieren?`)) {
        orders[orderIndex].status = 'completed';
        orders[orderIndex].statusUpdatedBy = currentMaster.name;
        orders[orderIndex].statusUpdatedAt = new Date().toISOString();
        orders[orderIndex].completedAt = new Date().toISOString();
        
        addTimelineEvent(orders[orderIndex], 'completed', 'order_shipped', 'Bestellung versendet', '🚚', currentMaster.name, 'master');
        
        localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
        
        logActivity('Order Completed', `Order ${orderId} marked as completed by ${currentMaster.name}`);
        showNotification(`✅ Bestellung #${orderId} als abgeschlossen markiert!`);
        
        updateOrdersCounter();
        if (document.getElementById('newOrdersModal').style.display === 'block') {
            showNewOrders();
        }
    }
}

// Update Order Status
function updateOrderStatus(orderId, newStatus) {
    const orderIndex = orders.findIndex(o => o.orderId === orderId);
    if (orderIndex !== -1) {
        const order = orders[orderIndex];
        
        // Prüfen ob Aktionen erlaubt sind
        if (!canPerformOrderActions(order)) {
            showCancellationRequestError();
            return;
        }
        
        const oldStatus = order.status;
        order.status = newStatus;
        order.statusUpdatedBy = currentMaster.name;
        order.statusUpdatedAt = new Date().toISOString();
        
        // Timeline Event hinzufügen
        const statusDescriptions = {
            'pending': 'Auf Bearbeitung wartend',
            'processing1': 'In Bearbeitung',
            'processing2': 'Versandvorbereitung',
            'completed': 'Versand abgeschlossen',
            'cancelled': 'Storniert'
        };
        
        const statusIcons = {
            'pending': '⏳',
            'processing1': '⚙️',
            'processing2': '📦',
            'completed': '🚚',
            'cancelled': '❌'
        };
        
        addTimelineEvent(order, newStatus, 'status_updated', statusDescriptions[newStatus], statusIcons[newStatus], currentMaster.name, 'master');
        
        localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
        
        logActivity('Order Status Update', `Order ${orderId} status changed from ${oldStatus} to ${newStatus}`);
        showNotification(`✅ Bestellung #${orderId} Status aktualisiert: ${getStatusText(newStatus)}`);
        
        loadMasterOrders();
    }
}

// Bestellung Detailansicht Funktion 

function viewOrderDetailsInModal(orderId) {
    const order = orders.find(o => o.orderId === orderId);
    if (!order) {
        showNotification('❌ Bestellung nicht gefunden.');
        return;
    }

    const subtotal = order.subtotal || (order.total - (order.shippingCost || 0));
    const hasCancellationRequest = hasActiveCancellationRequest(order);
    const canPerformActions = canPerformOrderActions(order);
    
    const detailsHtml = `
        <div id="orderDetailsModal" class="modal" style="display: block;">
            <div class="modal-content" style="max-width: 800px; max-height: 90vh;">
                <span class="close" onclick="closeOrderDetails()">&times;</span>
                <h2 style="color: #ff6b35; margin-bottom: 2rem;">📦 Bestelldetails #${order.orderId}</h2>
                
                ${hasCancellationRequest ? `
                    <div style="margin-bottom: 2rem; padding: 1rem; background: rgba(255,152,0,0.1); border-radius: 10px; border-left: 5px solid #ff9800;">
                        <h3 style="color: #ff9800; margin-bottom: 0.5rem;">⚠️ AKTIVE STORNIERUNGSANFRAGE</h3>
                        <p style="color: #8d6e63; margin-bottom: 0.5rem;">
                            Diese Bestellung hat eine aktive Stornierungsanfrage vom Kunden. 
                            Bitte bearbeiten Sie diese zuerst, bevor Sie andere Aktionen durchführen.
                        </p>
                        <p style="color: #8d6e63; font-size: 0.9rem;">
                            <strong>Angefragt von:</strong> ${order.customerCancellationRequest.requestedBy}<br>
                            <strong>Grund:</strong> ${order.customerCancellationRequest.reason}<br>
                            <strong>Datum:</strong> ${new Date(order.customerCancellationRequest.requestedAt).toLocaleString('de-DE')}
                        </p>
                        <div style="margin-top: 1rem;">
                            <button class="btn" onclick="approveCancellation('${order.orderId}')" style="background: #f44336; width: auto; padding: 0.5rem 1rem; margin-right: 0.5rem;">
                                ✅ Stornierung genehmigen
                            </button>
                            <button class="btn" onclick="denyCancellation('${order.orderId}')" style="background: #4caf50; width: auto; padding: 0.5rem 1rem;">
                                ❌ Ablehnen
                            </button>
                        </div>
                    </div>
                ` : ''}
                
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: #8d6e63; margin-bottom: 1rem;">📋 Bestellverlauf</h3>
                    ${generateOrderTimeline(order)}
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                    <div class="detail-section">
                        <h3 style="color: #8d6e63; margin-bottom: 1rem;">👤 Kunde</h3>
                        <div style="background: rgba(255,255,255,0.7); padding: 1rem; border-radius: 8px;">
                            <p><strong>Name:</strong> ${order.customerName}</p>
                            <p><strong>E-Mail:</strong> ${order.customerEmail}</p>
                            <p><strong>Telefon:</strong> ${order.customerPhone || 'Nicht angegeben'}</p>
                            <p><strong>Kunden-ID:</strong> ${order.customerId}</p>
                        </div>
                    </div>

                    <div class="detail-section">
                        <h3 style="color: #8d6e63; margin-bottom: 1rem;">📋 Bestellung</h3>
                        <div style="background: rgba(255,255,255,0.7); padding: 1rem; border-radius: 8px;">
                            <p><strong>Bestell-ID:</strong> ${order.orderId}</p>
                            <p><strong>Datum:</strong> ${new Date(order.orderDate).toLocaleString('de-DE')}</p>
                            <p><strong>Status:</strong> <span class="order-status status-${order.status}">${getStatusText(order.status)}</span></p>
                            <p><strong>Tracking:</strong> ${order.trackingNumber}</p>
                        </div>
                    </div>
                </div>

                <div class="detail-section" style="margin-bottom: 2rem;">
                    <h3 style="color: #8d6e63; margin-bottom: 1rem;">🛍️ Bestellte Artikel</h3>
                    <div style="background: rgba(255,255,255,0.7); border-radius: 8px; overflow: hidden;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <thead style="background: #8d6e63; color: white;">
                                <tr>
                                    <th style="padding: 0.8rem; text-align: left;">Artikel</th>
                                    <th style="padding: 0.8rem; text-align: center;">Menge</th>
                                    <th style="padding: 0.8rem; text-align: right;">Einzelpreis</th>
                                    <th style="padding: 0.8rem; text-align: right;">Gesamt</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${order.items.map(item => `
                                    <tr style="border-bottom: 1px solid #e0e0e0;">
                                        <td style="padding: 0.8rem;">${item.name}</td>
                                        <td style="padding: 0.8rem; text-align: center;">${item.quantity}x</td>
                                        <td style="padding: 0.8rem; text-align: right;">€${item.price.toFixed(2)}</td>
                                        <td style="padding: 0.8rem; text-align: right; font-weight: bold;">€${item.total.toFixed(2)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                    <div class="detail-section">
                        <h3 style="color: #8d6e63; margin-bottom: 1rem;">🏠 Lieferadresse</h3>
                        <div style="background: rgba(255,255,255,0.7); padding: 1rem; border-radius: 8px;">
                            <p>${order.customerName}</p>
                            <p>${order.shippingAddress.address}</p>
                            <p>${order.shippingAddress.zip} ${order.shippingAddress.city}</p>
                            <p>${order.shippingAddress.country}</p>
                        </div>
                    </div>

                    <div class="detail-section">
                        <h3 style="color: #8d6e63; margin-bottom: 1rem;">💰 Kosten</h3>
                        <div style="background: rgba(255,255,255,0.7); padding: 1rem; border-radius: 8px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Zwischensumme:</span>
                                <span>€${subtotal.toFixed(2)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Versandkosten:</span>
                                <span>${order.shippingCost > 0 ? '€' + order.shippingCost.toFixed(2) : 'KOSTENLOS'}</span>
                            </div>
                            <hr style="margin: 0.5rem 0;">
                            <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.2rem; color: #ff6b35;">
                                <span>Gesamtsumme:</span>
                                <span>€${order.total.toFixed(2)}</span>
                            </div>
                            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e0e0e0; font-size: 0.9rem; color: #8d6e63;">
                                <strong>Zahlungsmethode:</strong> ${order.paymentMethod}
                            </div>
                        </div>
                    </div>
                </div>

                <div style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
                    ${order.status === 'pending' ? `
                        <button class="btn" onclick="processOrder('${order.orderId}'); closeOrderDetails();" style="background: #4caf50;">
                            ✅ Bearbeitung übernehmen
                        </button>
                    ` : ''}
                    
                    ${order.status !== 'cancelled' && order.status !== 'completed' ? `
                        <button class="btn ${!canPerformActions ? 'btn-disabled' : ''}" 
                                onclick="${!canPerformActions ? 'showCancellationRequestError()' : `closeOrderDetails(); cancelOrderFromModal('${order.orderId}');`}" 
                                style="background: ${!canPerformActions ? '#ccc' : '#f44336'}; cursor: ${!canPerformActions ? 'not-allowed' : 'pointer'};"
                                ${!canPerformActions ? 'title="Stornierungsanfrage muss zuerst bearbeitet werden"' : ''}>
                            ❌ Stornieren
                        </button>
                    ` : ''}
                    
                    ${order.status === 'processing1' ? `
                        <button class="btn ${!canPerformActions ? 'btn-disabled' : ''}" 
                                onclick="${!canPerformActions ? 'showCancellationRequestError()' : `advanceToShipping('${order.orderId}'); closeOrderDetails();`}" 
                                style="background: ${!canPerformActions ? '#ccc' : '#2196f3'}; cursor: ${!canPerformActions ? 'not-allowed' : 'pointer'};"
                                ${!canPerformActions ? 'title="Stornierungsanfrage muss zuerst bearbeitet werden"' : ''}>
                            📦 Zum Versand
                        </button>
                    ` : ''}
                    
                    ${order.status === 'processing2' ? `
                        <button class="btn ${!canPerformActions ? 'btn-disabled' : ''}" 
                                onclick="${!canPerformActions ? 'showCancellationRequestError()' : `markAsCompleted('${order.orderId}'); closeOrderDetails();`}" 
                                style="background: ${!canPerformActions ? '#ccc' : '#4caf50'}; cursor: ${!canPerformActions ? 'not-allowed' : 'pointer'};"
                                ${!canPerformActions ? 'title="Stornierungsanfrage muss zuerst bearbeitet werden"' : ''}>
                            🚚 Als versendet markieren
                        </button>
                    ` : ''}
                    
                    <button class="btn" onclick="closeOrderDetails()" style="background: #9e9e9e;">
                        Schließen
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', detailsHtml);
    logActivity('View Order Details', `Viewed details for order ${order.orderId}`);
}

// Placeholder functions for missing actions
function sendEmailToCustomer(customerId) {
    showNotification('📧 E-Mail-Funktion wird in Kürze verfügbar sein.');
}

function deleteCustomerAccount(customerId) {
    if (confirm('⚠️ Kundenkonto wirklich löschen?')) {
        showNotification('🗑️ Konto-Löschung wird in Kürze verfügbar sein.');
    }
}

function exportCustomersCSV() {
    showNotification('📥 CSV-Export wird in Kürze verfügbar sein.');
}

function exportOrdersCSV() {
    showNotification('📥 CSV-Export wird in Kürze verfügbar sein.');
}

// Stornierungsfunktion
function cancelOrderFromModal(orderId) {
    const order = orders.find(o => o.orderId === orderId);
    
    if (!order) {
        showNotification('❌ Bestellung nicht gefunden.');
        return;
    }
    
    // Prüfe ob die Bestellung bereits storniert oder abgeschlossen ist
    if (order.status === 'cancelled') {
        showNotification('⚠️ Diese Bestellung ist bereits storniert.');
        return;
    }
    
    if (order.status === 'completed') {
        showNotification('⚠️ Bereits abgeschlossene Bestellungen können nicht storniert werden.');
        return;
    }
    
    // Prüfe ob Aktionen erlaubt sind (keine aktive Stornierungsanfrage)
    if (!canPerformOrderActions(order)) {
        showCancellationRequestError();
        return;
    }
    
    // Zeige das Stornierungsmodal
    showCancellationModal(order);
}

function exportAllData() {
    showNotification('📊 Datenexport wird in Kürze verfügbar sein.');
}

function clearTestData() {
    if (confirm('🗑️ Wirklich alle Test-Daten löschen?')) {
        showNotification('🗑️ Test-Daten löschen wird in Kürze verfügbar sein.');
    }
}

function resetAllData() {
    if (confirm('⚠️ ACHTUNG: Wirklich ALLE Daten zurücksetzen?')) {
        showNotification('🔄 Daten-Reset wird in Kürze verfügbar sein.');
    }
}

function manualSync() {
    showNotification('🔄 Manuelle Synchronisation derzeit nicht verfügbar.');
}

console.log('✅ Master Dashboard Funktionen geladen!');

// ========== LEGAL FUNCTIONS ==========
function showLegalModal(type) {
    const content = document.getElementById('legalContent');
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
        `
    };
    
    content.innerHTML = legalTexts[type] || '<h2>Inhalt nicht verfügbar</h2>';
    document.getElementById('legalModal').style.display = 'block';
}

// ========== DEMO USER CREATION ==========
function createDemoUsers(users) {
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
            totalOrders: 0,
            totalSpent: 0,
            paymentMethods: []
        }
    ];
    
    let newUsersAdded = false;
    demoUsers.forEach(demoUser => {
        if (!users.find(u => u.email === demoUser.email)) {
            users.push(demoUser);
            newUsersAdded = true;
        }
    });
    
    if (newUsersAdded) {
        localStorage.setItem('klarkraft_users', JSON.stringify(users));
    }
}

// ========== INITIALIZATION ==========
function init() {
    if (localStorage.getItem('klarkraft_demo_mode') === null) {
        setDemoModeState(false);
    }
    
    const savedUser = localStorage.getItem('klarkraft_currentUser');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
            
            if (!currentUser.customerId) {
                currentUser.customerId = generateCustomerId();
                currentUser.phone = currentUser.phone || '';
                currentUser.country = currentUser.country || 'Deutschland';
                currentUser.registrationDate = currentUser.registrationDate || new Date().toISOString();
                currentUser.totalOrders = currentUser.totalOrders || 0;
                currentUser.totalSpent = currentUser.totalSpent || 0;
                currentUser.paymentMethods = currentUser.paymentMethods || [];
                
                localStorage.setItem('klarkraft_currentUser', JSON.stringify(currentUser));
            }
        } catch(e) {
            localStorage.removeItem('klarkraft_currentUser');
        }
    }

    const savedMaster = localStorage.getItem('klarkraft_currentMaster');
    if (savedMaster) {
        try {
            currentMaster = JSON.parse(savedMaster);
        } catch(e) {
            localStorage.removeItem('klarkraft_currentMaster');
        }
    }
    
    updateUserInterface();
    
    const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
    createDemoUsers(users);
    renderProducts();
    
    if (currentMaster) {
        updateOrdersCounter();
    } else {
        updateCartCounter();
    }
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', function() {
    init();
    
    function addEventListeners() {
        const loginForm = document.getElementById('customerLoginForm');
        if (loginForm) {
            loginForm.onsubmit = null;
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();
                handleLogin(e);
                return false;
            }, { passive: false });
        }
        
        const registerForm = document.getElementById('customerRegisterForm');
        if (registerForm) {
            registerForm.onsubmit = null;
            registerForm.addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();
                handleRegister(e);
                return false;
            }, { passive: false });
        }
        
        const personalForm = document.getElementById('personalDataForm');
        if (personalForm) {
            personalForm.addEventListener('submit', function(e) {
                e.preventDefault();
                updatePersonalData(e);
                return false;
            });
        }
        
        const shippingForm = document.getElementById('shippingAddressForm');
        if (shippingForm) {
            shippingForm.addEventListener('submit', function(e) {
                e.preventDefault();
                updateShippingAddress(e);
                return false;
            });
        }
        
        const passwordForm = document.getElementById('passwordChangeForm');
        if (passwordForm) {
            passwordForm.addEventListener('submit', function(e) {
                e.preventDefault();
                changePassword(e);
                return false;
            });
        }

        const masterForm = document.getElementById('masterLoginForm');
        if (masterForm) {
            masterForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleMasterLogin(e);
                return false;
            });
        }
    }
    
    addEventListeners();
    setTimeout(addEventListeners, 100);
    setTimeout(addEventListeners, 500);
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal();
    }
}

console.log('🚀 KlarKRAFT Shop loaded successfully (clean version)!');
