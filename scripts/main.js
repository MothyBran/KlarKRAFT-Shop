// Product Data
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

        // Application State
        let currentUser = null;
        let currentMaster = null;
        let cart = [];
        let orders = JSON.parse(localStorage.getItem('klarkraft_orders') || '[]');
        let activityLogs = JSON.parse(localStorage.getItem('klarkraft_activity_logs') || '[]');
        let selectedPaymentMethod = null;

        // Master employees data
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

        // Generate unique customer ID
        function generateCustomerId() {
            return 'KK' + Date.now().toString().slice(-8);
        }

        // Generate unique order ID
        function generateOrderId() {
            return 'ORD' + Date.now().toString().slice(-6);
        }

        // Authentication Functions
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
            console.log('🔑 handleLogin aufgerufen');
            
            const email = document.getElementById('loginEmail').value.trim();
            const password = document.getElementById('loginPassword').value;
            
            console.log('📧 Login-Versuch:', email);
            
            if (!email || !password) {
                console.log('⚠️ Fehlende Eingaben');
                showNotification('⚠️ Bitte füllen Sie alle Felder aus!');
                return false;
            }
            
            const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
            console.log('👥 Anzahl Benutzer im System:', users.length);
            console.log('🔍 Suche Benutzer mit E-Mail:', email);
            
            const user = users.find(u => u.email === email && u.password === password);
            console.log('🎯 Benutzer gefunden:', user ? 'Ja' : 'Nein');
            
            if (user) {
                console.log('✅ Login erfolgreich für:', user.name);
                currentUser = user;
                localStorage.setItem('klarkraft_currentUser', JSON.stringify(user));
                updateUserInterface();
                showNotification(`✅ Willkommen zurück, ${user.name}!`);
                closeModal();
                
                // Clear form
                document.getElementById('loginEmail').value = '';
                document.getElementById('loginPassword').value = '';
                
                console.log('🎉 Login-Prozess abgeschlossen');
            } else {
                console.log('❌ Login fehlgeschlagen - Ungültige Anmeldedaten');
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
            console.log('⚡ Quick Login gestartet');
            
            // Fill form with test data
            document.getElementById('loginEmail').value = 'max.mustermann@email.de';
            document.getElementById('loginPassword').value = 'demo123';
            
            console.log('📝 Formular mit Demo-Daten gefüllt');
            
            // Auto-submit
            setTimeout(() => {
                console.log('🚀 Auto-Submit wird ausgeführt');
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
            showProducts(); // Return to main page
        }

        function updateUserInterface() {
            console.log('🔄 updateUserInterface aufgerufen');
            console.log('👤 currentUser:', currentUser ? currentUser.name : 'null');
            console.log('👔 currentMaster:', currentMaster ? currentMaster.name : 'null');
            
            const authBtn = document.getElementById('authBtn');
            const userInfo = document.getElementById('userInfo');
            const masterInfo = document.getElementById('masterInfo');
            const userName = document.getElementById('userName');
            const masterName = document.getElementById('masterName');
            const cartBtn = document.getElementById('cartBtn');
            const ordersBtn = document.getElementById('ordersBtn');
            
            // Reset all UI elements
            authBtn.style.display = 'block';
            userInfo.classList.remove('active');
            masterInfo.style.display = 'none';
            cartBtn.style.display = 'block';
            ordersBtn.style.display = 'none';
            
            if (currentMaster) {
                console.log('🔐 Master UI wird angezeigt');
                // Master is logged in - show orders instead of cart
                authBtn.style.display = 'none';
                userInfo.classList.remove('active');
                masterInfo.style.display = 'flex';
                masterName.textContent = currentMaster.name;
                masterName.style.color = '#ff6b35';
                masterName.style.fontWeight = 'bold';
                masterName.title = `${currentMaster.role} - Session: ${currentMaster.sessionId}`;
                
                // Show orders button instead of cart
                cartBtn.style.display = 'none';
                ordersBtn.style.display = 'block';
                updateOrdersCounter();
            } else if (currentUser) {
                console.log('👤 User UI wird angezeigt');
                // Regular user is logged in
                authBtn.style.display = 'none';
                userInfo.classList.add('active');
                masterInfo.style.display = 'none';
                userName.textContent = currentUser.name;
                
                // Show cart button
                cartBtn.style.display = 'block';
                ordersBtn.style.display = 'none';
                updateCartCounter();
            } else {
                console.log('🚪 Login-Button wird angezeigt (niemand angemeldet)');
                // Nobody is logged in
                authBtn.style.display = 'block';
                userInfo.classList.remove('active');
                masterInfo.style.display = 'none';
                
                // Show cart button
                cartBtn.style.display = 'block';
                ordersBtn.style.display = 'none';
                updateCartCounter();
            }
            
            console.log('✅ UI-Update abgeschlossen');
        }

        // Log activity
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
            
            // Keep only last 100 logs
            if (activityLogs.length > 100) {
                activityLogs = activityLogs.slice(0, 100);
            }
            
            localStorage.setItem('klarkraft_activity_logs', JSON.stringify(activityLogs));
        }

        // Master Login Functions
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
                // Logout any existing user session
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
                
                // Clear form
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

        function showMasterDashboard() {
            if (!currentMaster) {
                showMasterLogin();
                return;
            }
            
            // Update dashboard header
            document.getElementById('currentMasterName').textContent = currentMaster.name;
            document.getElementById('currentMasterRole').textContent = currentMaster.role;
            document.getElementById('lastLoginTime').textContent = new Date(currentMaster.loginTime).toLocaleString('de-DE');
            document.getElementById('sessionId').textContent = currentMaster.sessionId;
            
            // Show/hide settings tab based on permissions
            const settingsTab = document.getElementById('settingsTab');
            if (currentMaster.permissions.includes('all') || currentMaster.role === 'Administrator') {
                settingsTab.style.display = 'block';
            } else {
                settingsTab.style.display = 'none';
            }
            
            loadMasterOverview();
            document.getElementById('masterDashboardModal').style.display = 'block';
            
            // Initialize demo mode UI when dashboard is opened
            setTimeout(() => {
                updateDemoModeUI();
            }, 100);
            
            logActivity('Dashboard Access', `Accessed master dashboard`);
        }

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

        function loadMasterOverview() {
            const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
            const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
            const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
            const todayOrders = orders.filter(order => {
                const orderDate = new Date(order.orderDate);
                const today = new Date();
                return orderDate.toDateString() === today.toDateString();
            }).length;
            
            // Dashboard Statistics
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
            `;
            
            // Recent Orders
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
            
            // Recent Customers
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
                                        <button class="action-btn view" onclick="sendEmailToCustomer('${user.customerId}')" title="E-Mail senden">📧 E-Mail</button>
                                        <button class="action-btn delete" onclick="deleteCustomerAccount('${user.customerId}')" title="Konto löschen">🗑️ Löschen</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            }
            
            renderCustomers();
            
            // Search functionality
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
                                .map(order => `
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
                                        <div><strong>€${order.total.toFixed(2)}</strong></div>
                                        ${order.shippingCost ? `<small style="color: #8d6e63;">inkl. €${order.shippingCost.toFixed(2)} Versand</small>` : `<small style="color: #4caf50;">versandkostenfrei</small>`}
                                    </td>
                                    <td>${order.paymentMethod}</td>
                                    <td>
                                        <select class="status-select" onchange="updateOrderStatus('${order.orderId}', this.value)" value="${order.status}">
                                            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>In Bearbeitung</option>
                                            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Wird versendet</option>
                                            <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Geliefert</option>
                                            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Storniert</option>
                                        </select>
                                    </td>
                                    <td>${new Date(order.orderDate).toLocaleDateString('de-DE')}</td>
                                    <td>
                                        <button class="action-btn view" onclick="viewOrderDetails('${order.orderId}')" title="Details anzeigen">👁️ Details</button>
                                        ${order.status !== 'cancelled' && order.status !== 'completed' ? 
                                            `<button class="action-btn delete" onclick="cancelOrder('${order.orderId}')" title="Bestellung stornieren">❌ Stornieren</button>` : 
                                            ''}
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                `;
            }
            
            renderOrders();
            
            // Status filter functionality
            statusFilter.addEventListener('change', (e) => {
                const selectedStatus = e.target.value;
                const filteredOrders = selectedStatus ? 
                    orders.filter(order => order.status === selectedStatus) : 
                    orders;
                renderOrders(filteredOrders);
            });
        }

        function updateOrderStatus(orderId, newStatus) {
            const orderIndex = orders.findIndex(o => o.orderId === orderId);
            if (orderIndex !== -1) {
                const oldStatus = orders[orderIndex].status;
                orders[orderIndex].status = newStatus;
                localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
                
                logActivity('Order Status Update', `Order ${orderId} status changed from ${oldStatus} to ${newStatus}`);
                showNotification(`✅ Bestellung #${orderId} Status aktualisiert: ${getStatusText(newStatus)}`);
                
                // Reload the orders view to reflect changes
                loadMasterOrders();
            }
        }

        function viewOrderDetails(orderId) {
            const order = orders.find(o => o.orderId === orderId);
            if (order) {
                const subtotal = order.subtotal || (order.total - (order.shippingCost || 0));
                const shippingInfo = order.shippingCost > 0 ? 
                    `\nVersandkosten: €${order.shippingCost.toFixed(2)}` : 
                    '\nVersandkosten: KOSTENLOS (ab €150)';
                
                let statusInfo = `Status: ${getStatusText(order.status)}`;
                if (order.status === 'cancelled') {
                    statusInfo += `\nStorniert von: ${order.cancelledBy || 'Unbekannt'}`;
                    statusInfo += `\nStorniert am: ${order.cancelledAt ? new Date(order.cancelledAt).toLocaleString('de-DE') : 'Unbekannt'}`;
                    statusInfo += `\nGrund: ${order.cancelReason || 'Kein Grund angegeben'}`;
                }
                
                const details = `Bestellung: #${order.orderId}
Kunde: ${order.customerName} (${order.customerEmail})
Artikel: ${order.items.map(i => `${i.name} (${i.quantity}x €${i.price.toFixed(2)})`).join(', ')}

Zwischensumme: €${subtotal.toFixed(2)}${shippingInfo}
Gesamtsumme: €${order.total.toFixed(2)}

Zahlungsmethode: ${order.paymentMethod}
${statusInfo}
Tracking: ${order.trackingNumber}
Bestellt am: ${new Date(order.orderDate).toLocaleString('de-DE')}

Lieferadresse:
${order.shippingAddress.address}
${order.shippingAddress.zip} ${order.shippingAddress.city}
${order.shippingAddress.country}`;
                
                alert(details);
                logActivity('View Order', `Viewed details for order ${order.orderId}`);
            }
        }

        function loadMasterAnalytics() {
            const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
            const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
            
            // Product sales analysis
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
            
            const sortedProducts = Object.entries(productSales)
                .sort(([,a], [,b]) => b.revenue - a.revenue)
                .slice(0, 10);
            
            // Monthly revenue
            const monthlyRevenue = {};
            orders.forEach(order => {
                const month = new Date(order.orderDate).toISOString().slice(0, 7);
                monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.total;
            });
            
            document.getElementById('analyticsContent').innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div class="chart-container">
                        <h4>🏆 Top-Verkäufe (nach Umsatz)</h4>
                        ${sortedProducts.map(([name, data]) => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid #e0e0e0;">
                                <span>${name}</span>
                                <div style="text-align: right;">
                                    <strong>€${data.revenue.toFixed(2)}</strong><br>
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
                                <strong>€${revenue.toFixed(2)}</strong>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="chart-container" style="margin-top: 2rem;">
                    <h4>📊 Verkaufsstatistiken</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                        <div style="text-align: center; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #ff6b35;">€${(totalRevenue / orders.length || 0).toFixed(2)}</div>
                            <div>Durchschnittlicher Bestellwert</div>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #ff6b35;">${(orders.length / users.length || 0).toFixed(1)}</div>
                            <div>Bestellungen pro Kunde</div>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #ff6b35;">${orders.filter(o => o.status === 'completed').length}</div>
                            <div>Abgeschlossene Bestellungen</div>
                        </div>
                        <div style="text-align: center; padding: 1rem; background: #f5f5f5; border-radius: 8px;">
                            <div style="font-size: 1.5rem; font-weight: bold; color: #ff6b35;">${((orders.filter(o => o.status === 'completed').length / orders.length) * 100 || 0).toFixed(1)}%</div>
                            <div>Erfolgsrate</div>
                        </div>
                    </div>
                </div>
            `;
        }

        function loadMasterSettings() {
            // Load demo mode state
            updateDemoModeUI();
            
            document.getElementById('activityLogs').innerHTML = `
                <div style="max-height: 300px; overflow-y: auto; border: 1px solid #e0e0e0; border-radius: 8px;">
                    ${activityLogs.slice(0, 20).map(log => `
                        <div style="padding: 0.5rem; border-bottom: 1px solid #f0f0f0; font-size: 0.9rem;">
                            <div style="display: flex; justify-content: space-between;">
                                <strong>${log.action}</strong>
                                <small>${new Date(log.timestamp).toLocaleString('de-DE')}</small>
                            </div>
                            <div style="color: #666;">${log.user} (${log.role}): ${log.details}</div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        // Demo Mode Functions
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
            
            console.log(`🎮 Demo-Modus ${action}:`, newState);
        }

        function exportCustomersCSV() {
            const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
            
            const csvHeader = 'Kunden-ID,Name,E-Mail,Telefon,Adresse,Stadt,PLZ,Land,Registrierung,Bestellungen,Umsatz\n';
            const csvData = users.map(user => 
                `${user.customerId || ''},"${user.name || ''}","${user.email || ''}","${user.phone || ''}","${user.address || ''}","${user.city || ''}","${user.zip || ''}","${user.country || ''}","${user.registrationDate || ''}",${user.totalOrders || 0},${(user.totalSpent || 0).toFixed(2)}`
            ).join('\n');
            
            const blob = new Blob([csvHeader + csvData], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `klarkraft_kunden_${new Date().toISOString().slice(0,10)}.csv`;
            link.click();
            
            logActivity('Export Data', 'Exported customer data to CSV');
        }

        function exportOrdersCSV() {
            const csvHeader = 'Bestell-ID,Kunden-ID,Kundenname,E-Mail,Artikel,Zwischensumme,Versandkosten,Gesamt,Zahlungsmethode,Status,Bestelldatum,Tracking\n';
            const csvData = orders.map(order => 
                `${order.orderId},"${order.customerId}","${order.customerName}","${order.customerEmail}","${order.items.map(item => `${item.name} (${item.quantity}x)`).join('; ')}",${(order.subtotal || (order.total - (order.shippingCost || 0))).toFixed(2)},${(order.shippingCost || 0).toFixed(2)},${order.total.toFixed(2)},"${order.paymentMethod}","${order.status}","${order.orderDate}","${order.trackingNumber}"`
            ).join('\n');
            
            const blob = new Blob([csvHeader + csvData], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `klarkraft_bestellungen_${new Date().toISOString().slice(0,10)}.csv`;
            link.click();
            
            logActivity('Export Data', 'Exported orders data to CSV');
        }

        function clearTestData() {
            if (confirm('Möchten Sie wirklich alle Test-Daten löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
                // Clear only test orders (keep real orders)
                const realOrders = orders.filter(order => !order.orderId.startsWith('TEST'));
                localStorage.setItem('klarkraft_orders', JSON.stringify(realOrders));
                orders = realOrders;
                showNotification('✅ Test-Daten wurden gelöscht.');
                logActivity('Clear Data', 'Cleared test data');
                loadMasterOverview();
            }
        }

        function resetAllData() {
            if (confirm('ACHTUNG: Möchten Sie wirklich ALLE Daten zurücksetzen? Dies löscht alle Kunden, Bestellungen und Logs unwiderruflich!')) {
                if (confirm('Sind Sie sich wirklich sicher? Diese Aktion kann NICHT rückgängig gemacht werden!')) {
                    localStorage.clear();
                    logActivity('Reset Data', 'All data has been reset');
                    showNotification('🔄 Alle Daten wurden zurückgesetzt. Seite wird neu geladen...');
                    setTimeout(() => {
                        location.reload();
                    }, 2000);
                }
            }
        }

        function exportAllData() {
            const allData = {
                customers: JSON.parse(localStorage.getItem('klarkraft_users') || '[]'),
                orders: orders,
                activityLogs: activityLogs,
                exportDate: new Date().toISOString(),
                exportedBy: currentMaster ? currentMaster.name : 'Unknown'
            };
            
            const dataStr = JSON.stringify(allData, null, 2);
            const dataBlob = new Blob([dataStr], {type: 'application/json'});
            const url = URL.createObjectURL(dataBlob);
            
            const link = document.createElement('a');
            link.href = url;
            link.download = `klarkraft_vollexport_${new Date().toISOString().slice(0,10)}.json`;
            link.click();
            
            logActivity('Export Data', 'Exported complete database');
        }

        // Profile Functions
        function showProfile() {
            if (!currentUser) {
                showAuth();
                return;
            }
            
            // Hide main content and show profile page
            document.getElementById('mainContent').classList.add('hidden');
            document.getElementById('profilePage').classList.add('active');
            
            loadProfileData();
        }

        function showProducts() {
            // Show main content and hide profile page
            document.getElementById('mainContent').classList.remove('hidden');
            document.getElementById('profilePage').classList.remove('active');
            closeModal();
            window.scrollTo({top: 0, behavior: 'smooth'});
        }

        function loadProfileData() {
            if (!currentUser) return;
            
            // Load personal data
            document.getElementById('profileName').value = currentUser.name || '';
            document.getElementById('profileEmail').value = currentUser.email || '';
            document.getElementById('profilePhone').value = currentUser.phone || '';
            
            // Load shipping address
            document.getElementById('shippingAddress').value = currentUser.address || '';
            document.getElementById('shippingCity').value = currentUser.city || '';
            document.getElementById('shippingZip').value = currentUser.zip || '';
            document.getElementById('shippingCountry').value = currentUser.country || 'Deutschland';
            
            // Load payment methods
            loadPaymentMethods();
            
            // Load order history
            loadOrderHistory();
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

        function loadPaymentMethods() {
            const list = document.getElementById('paymentMethodsList');
            
            if (!currentUser.paymentMethods || currentUser.paymentMethods.length === 0) {
                list.innerHTML = '<p style="color: #8d6e63;">Noch keine Zahlungsmethoden hinterlegt.</p>';
                return;
            }
            
            list.innerHTML = currentUser.paymentMethods.map((method, index) => `
                <div class="payment-method-card" onclick="selectSavedPaymentMethod(${index})">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <strong>${getPaymentMethodIcon(method.type)} ${getPaymentMethodName(method.type)}</strong><br>
                            <small>${getPaymentMethodDetails(method)}</small>
                        </div>
                        <button class="btn" onclick="removePaymentMethod(${index}); event.stopPropagation();" style="background: #f44336; width: auto; padding: 0.5rem 1rem; margin: 0;">Löschen</button>
                    </div>
                </div>
            `).join('');
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

        function showAddPaymentMethod() {
            document.getElementById('addPaymentModal').style.display = 'block';
        }

        function selectNewPaymentMethod(type) {
            document.querySelectorAll('#addPaymentModal .payment-btn').forEach(btn => btn.classList.remove('active'));
            document.getElementById(`new${type.charAt(0).toUpperCase() + type.slice(1)}Btn`).classList.add('active');
            
            const forms = document.getElementById('newPaymentForms');
            forms.innerHTML = generatePaymentForm(type, 'new');
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
                            <button type="button" class="btn" onclick="savePaymentMethod('paypal', '${prefix}')">Speichern</button>
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
                            <div class="form-group">
                                <label for="${prefix}sepaBic">BIC (optional):</label>
                                <input type="text" id="${prefix}sepaBic" placeholder="COBADEFFXXX" maxlength="11">
                            </div>
                            <div style="padding: 1rem; background: rgba(139,195,74,0.1); border-radius: 8px; margin: 1rem 0;">
                                <label style="display: flex; align-items: center; cursor: pointer;">
                                    <input type="checkbox" id="${prefix}sepaMandate" required style="margin-right: 0.5rem;">
                                    <span style="font-size: 0.9rem; color: #689f38;">
                                        Ich ermächtige die KlarKRAFT GmbH, Zahlungen von meinem Konto mittels Lastschrift einzuziehen.
                                    </span>
                                </label>
                            </div>
                            <button type="button" class="btn" onclick="savePaymentMethod('sepa', '${prefix}')">Speichern</button>
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
                            <button type="button" class="btn" onclick="savePaymentMethod('card', '${prefix}')">Speichern</button>
                        </div>
                    `;
            }
        }

        function savePaymentMethod(type, prefix = '') {
            if (!currentUser.paymentMethods) {
                currentUser.paymentMethods = [];
            }
            
            let paymentData = { type: type };
            
            switch(type) {
                case 'paypal':
                    const email = document.getElementById(`${prefix}paypalEmail`).value.trim();
                    if (!email || !email.includes('@')) {
                        showNotification('⚠️ Bitte geben Sie eine gültige E-Mail-Adresse ein.');
                        return;
                    }
                    paymentData.email = email;
                    break;
                    
                case 'sepa':
                    const name = document.getElementById(`${prefix}sepaName`).value.trim();
                    const iban = document.getElementById(`${prefix}sepaIban`).value.trim();
                    const bic = document.getElementById(`${prefix}sepaBic`).value.trim();
                    const mandate = document.getElementById(`${prefix}sepaMandate`).checked;
                    
                    if (!name || !iban || !mandate) {
                        showNotification('⚠️ Bitte füllen Sie alle Pflichtfelder aus und bestätigen Sie das Mandat.');
                        return;
                    }
                    
                    paymentData = { type, name, iban, bic, mandate };
                    break;
                    
                case 'card':
                    const cardName = document.getElementById(`${prefix}cardName`).value.trim();
                    const cardNumber = document.getElementById(`${prefix}cardNumber`).value.replace(/\s/g, '');
                    const cardExpiry = document.getElementById(`${prefix}cardExpiry`).value.trim();
                    const cardCvv = document.getElementById(`${prefix}cardCvv`).value.trim();
                    
                    if (!cardName || cardNumber.length < 16 || !cardExpiry.match(/^\d{2}\/\d{2}$/) || cardCvv.length < 3) {
                        showNotification('⚠️ Bitte überprüfen Sie Ihre Kreditkartendaten.');
                        return;
                    }
                    
                    paymentData = { type, name: cardName, number: cardNumber, expiry: cardExpiry, cvv: cardCvv };
                    break;
            }
            
            currentUser.paymentMethods.push(paymentData);
            updateUserData();
            loadPaymentMethods();
            closeModal();
            showNotification('✅ Zahlungsmethode erfolgreich hinzugefügt!');
        }

        function removePaymentMethod(index) {
            if (confirm('Möchten Sie diese Zahlungsmethode wirklich löschen?')) {
                currentUser.paymentMethods.splice(index, 1);
                updateUserData();
                loadPaymentMethods();
                showNotification('✅ Zahlungsmethode entfernt.');
            }
        }

        function loadOrderHistory() {
            if (!currentUser) return;
            
            const userOrders = orders.filter(order => order.customerId === currentUser.customerId);
            const ordersList = document.getElementById('orderHistoryList');
            
            if (userOrders.length === 0) {
                ordersList.innerHTML = '<p style="color: #8d6e63;">Sie haben noch keine Bestellungen aufgegeben.</p>';
                return;
            }
            
            ordersList.innerHTML = userOrders
                .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
                .map(order => `
                    <div class="cart-item">
                        <div>
                            <strong>Bestellung #${order.orderId}</strong><br>
                            <small>${new Date(order.orderDate).toLocaleDateString('de-DE')} • ${order.items.length} Artikel</small><br>
                            <small style="color: #8d6e63;">${order.items.map(item => `${item.name} (${item.quantity}x)`).join(', ')}</small>
                        </div>
                        <div style="text-align: right;">
                            <strong style="color: #ff6b35;">€${order.total.toFixed(2)}</strong><br>
                            <span class="order-status">${getStatusText(order.status)}</span>
                        </div>
                    </div>
                `).join('');
        }

        function getStatusText(status) {
            const statusTexts = {
                'pending': 'In Bearbeitung',
                'processing': 'Wird versendet',
                'completed': 'Geliefert',
                'cancelled': 'Storniert'
            };
            return statusTexts[status] || status;
        }

        // Customer Management Functions
        function sendEmailToCustomer(customerId) {
            const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
            const user = users.find(u => u.customerId === customerId);
            
            if (!user || !user.email) {
                showNotification('❌ E-Mail-Adresse nicht gefunden.');
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
            
            logActivity('Email Sent', `Email sent to customer ${user.name} (${user.email})`);
            showNotification(`📧 E-Mail-Client geöffnet für ${user.name}`);
        }

        function deleteCustomerAccount(customerId) {
            const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
            const user = users.find(u => u.customerId === customerId);
            
            if (!user) {
                showNotification('❌ Kunde nicht gefunden.');
                return;
            }

            // Check if user has active orders
            const userOrders = orders.filter(o => o.customerId === customerId);
            const activeOrders = userOrders.filter(o => o.status === 'pending' || o.status === 'processing');
            
            if (activeOrders.length > 0) {
                if (!confirm(`⚠️ ACHTUNG: Der Kunde ${user.name} hat ${activeOrders.length} aktive Bestellung(en).\n\nSollen diese automatisch storniert werden?`)) {
                    return;
                }
                
                // Cancel active orders
                activeOrders.forEach(order => {
                    const orderIndex = orders.findIndex(o => o.orderId === order.orderId);
                    if (orderIndex !== -1) {
                        orders[orderIndex].status = 'cancelled';
                        orders[orderIndex].cancelledBy = currentMaster.name;
                        orders[orderIndex].cancelledAt = new Date().toISOString();
                        orders[orderIndex].cancelReason = 'Kundenkonto gelöscht';
                    }
                });
                localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
            }

            // Final confirmation
            if (!confirm(`🗑️ Möchten Sie das Kundenkonto von "${user.name}" (${user.email}) wirklich unwiderruflich löschen?\n\nDiese Aktion kann nicht rückgängig gemacht werden!`)) {
                return;
            }

            // Remove user from users array
            const updatedUsers = users.filter(u => u.customerId !== customerId);
            localStorage.setItem('klarkraft_users', JSON.stringify(updatedUsers));
            
            // Log out user if currently logged in
            if (currentUser && currentUser.customerId === customerId) {
                currentUser = null;
                localStorage.removeItem('klarkraft_currentUser');
                updateUserInterface();
            }

            logActivity('Customer Deleted', `Customer account deleted: ${user.name} (${user.email}) by ${currentMaster.name}`);
            showNotification(`✅ Kundenkonto von ${user.name} wurde gelöscht.`);
            
            // Reload customer list
            loadMasterCustomers();
        }

        // Order Management Functions
        function cancelOrder(orderId) {
            const orderIndex = orders.findIndex(o => o.orderId === orderId);
            if (orderIndex === -1) {
                showNotification('❌ Bestellung nicht gefunden.');
                return;
            }

            const order = orders[orderIndex];
            
            if (order.status === 'cancelled') {
                showNotification('⚠️ Diese Bestellung ist bereits storniert.');
                return;
            }

            if (order.status === 'completed') {
                showNotification('⚠️ Bereits gelieferte Bestellungen können nicht storniert werden.');
                return;
            }

            const reason = prompt('📝 Grund für die Stornierung:', 'Storniert durch Mitarbeiter');
            if (!reason) return;

            if (!confirm(`❌ Möchten Sie Bestellung #${orderId} wirklich stornieren?\n\nKunde: ${order.customerName}\nBetrag: €${order.total.toFixed(2)}\nGrund: ${reason}`)) {
                return;
            }

            // Update order status
            orders[orderIndex].status = 'cancelled';
            orders[orderIndex].cancelledBy = currentMaster.name;
            orders[orderIndex].cancelledAt = new Date().toISOString();
            orders[orderIndex].cancelReason = reason;
            
            localStorage.setItem('klarkraft_orders', JSON.stringify(orders));

            // Update customer stats
            const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
            const userIndex = users.findIndex(u => u.customerId === order.customerId);
            if (userIndex !== -1) {
                users[userIndex].totalOrders = Math.max(0, (users[userIndex].totalOrders || 1) - 1);
                users[userIndex].totalSpent = Math.max(0, (users[userIndex].totalSpent || order.total) - order.total);
                localStorage.setItem('klarkraft_users', JSON.stringify(users));
            }

            logActivity('Order Cancelled', `Order ${orderId} cancelled by ${currentMaster.name}. Reason: ${reason}`);
            showNotification(`✅ Bestellung #${orderId} wurde storniert.`);
            
            // Reload orders list
            loadMasterOrders();
        }

        // Product Functions
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

        // Cart Functions
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

        function showNewOrders() {
            if (!currentMaster) {
                showNotification('⚠️ Nur Mitarbeiter können neue Bestellungen einsehen.');
                return;
            }

            const newOrders = orders.filter(order => order.status === 'pending')
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
                ordersList.innerHTML = `
                    <div style="margin-bottom: 1rem; padding: 1rem; background: rgba(255,107,53,0.1); border-radius: 10px;">
                        <h3 style="color: #ff6b35; margin-bottom: 0.5rem;">📊 Übersicht</h3>
                        <p><strong>${newOrders.length}</strong> neue Bestellung(en) warten auf Bearbeitung</p>
                        <p>Gesamtwert: <strong>€${newOrders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</strong></p>
                    </div>
                    
                    ${newOrders.map(order => `
                        <div class="cart-item" style="border-left: 4px solid #ff6b35;">
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                                    <strong>Bestellung #${order.orderId}</strong>
                                    <span style="background: #ff6b35; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.8rem;">NEU</span>
                                </div>
                                <div style="margin-bottom: 0.5rem;">
                                    <strong>Kunde:</strong> ${order.customerName} (${order.customerEmail})<br>
                                    <strong>Bestellt am:</strong> ${new Date(order.orderDate).toLocaleString('de-DE')}<br>
                                    <strong>Artikel:</strong> ${order.items.length} Produkt(e)
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
                                <button class="btn" onclick="processOrder('${order.orderId}')" style="background: #4caf50; width: auto; padding: 0.5rem 1rem;">
                                    ✅ Bearbeiten
                                </button>
                                <button class="btn" onclick="viewOrderDetailsInModal('${order.orderId}')" style="background: #2196f3; width: auto; padding: 0.5rem 1rem;">
                                    👁️ Details
                                </button>
                                <button class="btn" onclick="quickUpdateOrderStatus('${order.orderId}', 'processing')" style="background: #ff9800; width: auto; padding: 0.5rem 1rem;">
                                    📦 Versenden
                                </button>
                                <button class="btn" onclick="cancelOrderFromModal('${order.orderId}')" style="background: #f44336; width: auto; padding: 0.5rem 1rem;">
                                    ❌ Stornieren
                                </button>
                            </div>
                        </div>
                    `).join('')}
                `;
            }
            
            document.getElementById('newOrdersModal').style.display = 'block';
            logActivity('View New Orders', `Viewed ${newOrders.length} new orders`);
        }

        function processOrder(orderId) {
            const orderIndex = orders.findIndex(o => o.orderId === orderId);
            if (orderIndex === -1) {
                showNotification('❌ Bestellung nicht gefunden.');
                return;
            }

            if (confirm(`✅ Bestellung #${orderId} als "in Bearbeitung" markieren und dem aktuellen Mitarbeiter zuweisen?`)) {
                orders[orderIndex].processedBy = currentMaster.name;
                orders[orderIndex].processedAt = new Date().toISOString();
                orders[orderIndex].status = 'pending'; // Keep as pending but mark as processed
                
                localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
                
                logActivity('Process Order', `Order ${orderId} assigned to ${currentMaster.name}`);
                showNotification(`✅ Bestellung #${orderId} wurde Ihnen zugewiesen.`);
                
                updateOrdersCounter();
                showNewOrders(); // Refresh the view
            }
        }

        function quickUpdateOrderStatus(orderId, newStatus) {
            const orderIndex = orders.findIndex(o => o.orderId === orderId);
            if (orderIndex === -1) {
                showNotification('❌ Bestellung nicht gefunden.');
                return;
            }

            const statusNames = {
                'processing': 'Wird versendet',
                'completed': 'Geliefert'
            };

            if (confirm(`📦 Bestellung #${orderId} auf "${statusNames[newStatus]}" setzen?`)) {
                const oldStatus = orders[orderIndex].status;
                orders[orderIndex].status = newStatus;
                orders[orderIndex].statusUpdatedBy = currentMaster.name;
                orders[orderIndex].statusUpdatedAt = new Date().toISOString();
                
                localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
                
                logActivity('Quick Status Update', `Order ${orderId} status changed from ${oldStatus} to ${newStatus} by ${currentMaster.name}`);
                showNotification(`✅ Bestellung #${orderId} Status: ${statusNames[newStatus]}`);
                
                updateOrdersCounter();
                showNewOrders(); // Refresh the view
            }
        }

        function viewOrderDetailsInModal(orderId) {
            viewOrderDetails(orderId);
        }

        function cancelOrderFromModal(orderId) {
            cancelOrder(orderId);
            setTimeout(() => {
                updateOrdersCounter();
                showNewOrders(); // Refresh the view
            }, 500);
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
            
            // Hide payment section
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
            
            // Show payment section
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

        // Payment Functions
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

        function selectSavedPaymentMethod(index) {
            selectedPaymentMethod = index;
            loadSavedPaymentMethods();
            
            // Hide other payment options
            document.getElementById('paymentMethodSelector').style.display = 'none';
            document.getElementById('togglePaymentBtn').textContent = 'Andere Zahlungsmethode wählen';
            
            // Automatically show order confirmation
            showOrderConfirmation();
            
            // Scroll to order confirmation
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
                // Show other payment options
                selector.style.display = 'block';
                toggleBtn.textContent = 'Gespeicherte Zahlungsmethode verwenden';
                
                // Deselect saved payment method
                selectedPaymentMethod = null;
                loadSavedPaymentMethods();
                
                // Hide order confirmation
                document.getElementById('orderConfirmation').style.display = 'none';
            } else {
                // Hide other payment options
                selector.style.display = 'none';
                toggleBtn.textContent = 'Andere Zahlungsmethode wählen';
                
                // Reset payment forms
                document.querySelectorAll('.payment-btn').forEach(btn => btn.classList.remove('active'));
                document.getElementById('paymentForms').innerHTML = '';
                
                // Show saved payment methods again
                loadSavedPaymentMethods();
                
                // Hide order confirmation
                document.getElementById('orderConfirmation').style.display = 'none';
            }
        }

        function changePassword(event) {
            event.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validate current password (if user has password set)
            if (currentUser.password && currentPassword !== currentUser.password) {
                showNotification('❌ Aktuelles Passwort ist falsch!');
                return;
            }
            
            // Validate new password
            if (newPassword.length < 6) {
                showNotification('⚠️ Das neue Passwort muss mindestens 6 Zeichen lang sein!');
                return;
            }
            
            // Validate password confirmation
            if (newPassword !== confirmPassword) {
                showNotification('❌ Die Passwörter stimmen nicht überein!');
                return;
            }
            
            // Update password
            currentUser.password = newPassword;
            updateUserData();
            
            // Clear form
            document.getElementById('passwordChangeForm').reset();
            
            showNotification('✅ Passwort erfolgreich geändert!');
        }

        function selectPaymentMethod(method) {
            document.querySelectorAll('.payment-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.payment-form').forEach(form => form.style.display = 'none');

            document.getElementById(`${method}Btn`).classList.add('active');
            
            const forms = document.getElementById('paymentForms');
            forms.innerHTML = generatePaymentForm(method);
            
            // Clear selected saved payment method
            selectedPaymentMethod = null;
            
            showOrderConfirmation();
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

        function completeOrder() {
            if (!currentUser || cart.length === 0) {
                showNotification('⚠️ Sie müssen angemeldet sein und Produkte im Warenkorb haben.');
                return;
            }
            
            // Check if payment method is selected
            const activePaymentMethod = document.querySelector('.payment-btn.active');
            const hasSelectedPaymentMethod = selectedPaymentMethod !== null;
            const hasPaymentForm = document.getElementById('paymentForms').innerHTML.trim() !== '';
            
            if (!hasSelectedPaymentMethod && !activePaymentMethod) {
                showNotification('⚠️ Bitte wählen Sie eine Zahlungsmethode aus!');
                return;
            }
            
            // Validate payment form if a new payment method is being used
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
            
            // Create order
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
                trackingNumber: 'KK' + Math.random().toString(36).substr(2, 8).toUpperCase()
            };
            
            // Save order
            orders.push(order);
            localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
            
            // Update customer stats
            currentUser.totalOrders = (currentUser.totalOrders || 0) + 1;
            currentUser.totalSpent = (currentUser.totalSpent || 0) + total;
            updateUserData();
            
            showNotification(`✅ Bestellung #${order.orderId} erfolgreich aufgegeben! Gesamtsumme: €${total.toFixed(2)}`);
            
            // Clear cart and close modal
            cart = [];
            selectedPaymentMethod = null;
            updateCartCounter();
            closeModal();
            
            // NEW DEMO MODE LOGIC
            const demoModeEnabled = getDemoModeState();
            const currentMasterSession = localStorage.getItem('klarkraft_currentMaster');
            
            if (!demoModeEnabled) {
                // Demo mode OFF = NEVER automatic updates
                console.log('🔐 Demo-Modus AUS - keine automatischen Updates (egal ob Mitarbeiter angemeldet)');
                showNotification(`📦 Bestellung eingegangen! Manuelle Bearbeitung erforderlich.`);
                
                if (currentMaster) {
                    updateOrdersCounter();
                    showNotification(`📦 Neue Bestellung eingegangen! (#${order.orderId})`);
                }
            } else if (demoModeEnabled && currentMasterSession) {
                // Demo mode ON + Master logged in = NO automatic updates
                console.log('🤖 Demo-Modus AN + Mitarbeiter angemeldet - keine automatischen Updates');
                showNotification(`📦 Bestellung eingegangen! Mitarbeiter wird sie bearbeiten.`);
                
                if (currentMaster) {
                    updateOrdersCounter();
                    showNotification(`📦 Neue Bestellung eingegangen! (#${order.orderId})`);
                }
            } else if (demoModeEnabled && !currentMasterSession) {
                // Demo mode ON + NO Master = automatic updates
                console.log('🤖 Demo-Modus AN + kein Mitarbeiter - automatische Updates aktiv');
                showNotification(`🤖 Demo-Modus: Automatische Bearbeitung gestartet`);
                
                setTimeout(() => {
                    const orderIndex = orders.findIndex(o => o.orderId === order.orderId);
                    if (orderIndex !== -1) {
                        orders[orderIndex].status = 'processing';
                        orders[orderIndex].autoProcessedBy = 'Demo-System';
                        localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
                        showNotification(`📦 Demo: Bestellung #${order.orderId} wird bearbeitet`);
                    }
                }, 5000);
                
                setTimeout(() => {
                    const orderIndex = orders.findIndex(o => o.orderId === order.orderId);
                    if (orderIndex !== -1) {
                        orders[orderIndex].status = 'completed';
                        orders[orderIndex].autoCompletedBy = 'Demo-System';
                        localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
                        showNotification(`🚚 Demo: Bestellung #${order.orderId} wurde versendet!`);
                    }
                }, 10000);
            }
        }

        // Utility Functions
        function showAuth() {
            console.log('🚪 showAuth called - opening auth modal');
            document.getElementById('authModal').style.display = 'block';
            
            // Add backup click handlers as fallback
            setTimeout(() => {
                console.log('🔧 Adding backup click handlers...');
                
                // Backup for login button
                const loginSubmitBtn = document.querySelector('#customerLoginForm button[type="submit"]');
                if (loginSubmitBtn) {
                    loginSubmitBtn.onclick = function(e) {
                        e.preventDefault();
                        console.log('🔑 Login button clicked directly (backup handler)');
                        
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
                    console.log('✅ Login backup handler added');
                }
                
                // Backup for register button
                const registerSubmitBtn = document.querySelector('#customerRegisterForm button[type="submit"]');
                if (registerSubmitBtn) {
                    registerSubmitBtn.onclick = function(e) {
                        e.preventDefault();
                        console.log('📝 Register button clicked directly (backup handler)');
                        
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
                    console.log('✅ Register backup handler added');
                }
            }, 100);
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
            
            setTimeout(() => {
                notification.remove();
            }, 4000);
        }

        function closeModal() {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.style.display = 'none';
            });
        }

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
            document.getElementById('legalModal').style.display = 'block';
        }

        // Event Listeners
        window.onclick = function(event) {
            if (event.target.classList.contains('modal')) {
                closeModal();
            }
        }

        // Initialize Application
        function init() {
            console.log('🚀 KlarKRAFT Shop wird initialisiert...');
            
            // Initialize demo mode (default: false)
            if (localStorage.getItem('klarkraft_demo_mode') === null) {
                setDemoModeState(false);
                console.log('🎮 Demo-Modus initialisiert: AUS');
            }
            
            // Check for saved user session
            const savedUser = localStorage.getItem('klarkraft_currentUser');
            if (savedUser) {
                try {
                    currentUser = JSON.parse(savedUser);
                    
                    // Update old user format to new format if needed
                    if (!currentUser.customerId) {
                        currentUser.customerId = generateCustomerId();
                        currentUser.phone = currentUser.phone || '';
                        currentUser.country = currentUser.country || 'Deutschland';
                        currentUser.registrationDate = currentUser.registrationDate || new Date().toISOString();
                        currentUser.totalOrders = currentUser.totalOrders || 0;
                        currentUser.totalSpent = currentUser.totalSpent || 0;
                        currentUser.paymentMethods = currentUser.paymentMethods || [];
                        
                        localStorage.setItem('klarkraft_currentUser', JSON.stringify(currentUser));
                        
                        // Update in users list too
                        const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
                        const userIndex = users.findIndex(u => u.email === currentUser.email);
                        if (userIndex !== -1) {
                            users[userIndex] = currentUser;
                            localStorage.setItem('klarkraft_users', JSON.stringify(users));
                        }
                    }
                    
                    console.log('✅ Benutzer-Session wiederhergestellt:', currentUser.name);
                } catch(e) {
                    console.error('Fehler beim Laden der Benutzer-Session:', e);
                    localStorage.removeItem('klarkraft_currentUser');
                }
            }

            // Check for saved master session
            const savedMaster = localStorage.getItem('klarkraft_currentMaster');
            if (savedMaster) {
                try {
                    currentMaster = JSON.parse(savedMaster);
                    console.log('✅ Master-Session wiederhergestellt:', currentMaster.name);
                } catch(e) {
                    console.error('Fehler beim Laden der Master-Session:', e);
                    localStorage.removeItem('klarkraft_currentMaster');
                }
            }
            
            updateUserInterface();
            
            // Migrate existing users to new format
            const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
            let needsUpdate = false;
            
            users.forEach(user => {
                if (!user.customerId) {
                    user.customerId = generateCustomerId();
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
                localStorage.setItem('klarkraft_users', JSON.stringify(users));
                console.log('✅ Benutzer-Datenbank aktualisiert');
            }
            
            // Create demo users if they don't exist
            createDemoUsers(users);
            
            renderProducts();
            
            // Update appropriate counters based on who is logged in
            if (currentMaster) {
                updateOrdersCounter();
            } else {
                updateCartCounter();
            }
            
            console.log('🎉 KlarKRAFT Shop erfolgreich initialisiert!');
        }

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
                    users.push(demoUser);
                    newUsersAdded = true;
                    console.log(`✅ Demo-Benutzer erstellt: ${demoUser.name} (${demoUser.email})`);
                }
            });
            
            if (newUsersAdded) {
                localStorage.setItem('klarkraft_users', JSON.stringify(users));
                console.log('✅ Demo-Benutzer in localStorage gespeichert');
            }
            
            // Debug: Show all users
            console.log('📋 Alle Benutzer im System:', users.length);
            users.forEach(user => {
                console.log(`- ${user.name} (${user.email})`);
            });
        }

        // Start the application when page loads
        document.addEventListener('DOMContentLoaded', function() {
            console.log('📋 DOM Content Loaded');
            
            // Initialize the application first
            init();
            
            // Add form event listeners with multiple attempts to ensure they work
            function addEventListeners() {
                console.log('🔧 Adding event listeners...');
                
                // Customer login form
                const loginForm = document.getElementById('customerLoginForm');
                if (loginForm) {
                    // Remove any existing listeners first
                    loginForm.onsubmit = null;
                    
                    loginForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('🔑 Login form submitted via addEventListener');
                        handleLogin(e);
                        return false;
                    }, { passive: false });
                    
                    console.log('✅ Customer login form event listener added');
                } else {
                    console.error('❌ Customer login form not found!');
                }
                
                // Customer register form
                const registerForm = document.getElementById('customerRegisterForm');
                if (registerForm) {
                    // Remove any existing listeners first
                    registerForm.onsubmit = null;
                    
                    registerForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('📝 Register form submitted via addEventListener');
                        handleRegister(e);
                        return false;
                    }, { passive: false });
                    
                    console.log('✅ Customer register form event listener added');
                } else {
                    console.error('❌ Customer register form not found!');
                }
                
                // Personal data form
                const personalForm = document.getElementById('personalDataForm');
                if (personalForm) {
                    personalForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        updatePersonalData(e);
                        return false;
                    });
                    console.log('✅ Personal data form event listener added');
                }
                
                // Shipping address form
                const shippingForm = document.getElementById('shippingAddressForm');
                if (shippingForm) {
                    shippingForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        updateShippingAddress(e);
                        return false;
                    });
                    console.log('✅ Shipping address form event listener added');
                }
                
                // Password change form
                const passwordForm = document.getElementById('passwordChangeForm');
                if (passwordForm) {
                    passwordForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        changePassword(e);
                        return false;
                    });
                    console.log('✅ Password change form event listener added');
                }

                // Master login form
                const masterForm = document.getElementById('masterLoginForm');
                if (masterForm) {
                    masterForm.addEventListener('submit', function(e) {
                        e.preventDefault();
                        console.log('🔐 Master login form submitted');
                        handleMasterLogin(e);
                        return false;
                    });
                    console.log('✅ Master login form event listener added');
                }
            }
            
            // Try adding event listeners multiple times to ensure they stick
            addEventListeners();
            setTimeout(addEventListeners, 100);
            setTimeout(addEventListeners, 500);
        });

        // Fallback initialization for older browsers
        if (document.readyState === 'loading') {
            console.log('🔄 DOM lädt noch...');
        } else {
            console.log('✅ DOM bereits geladen, initialisiere...');
            init();
        }

        // Verbesserte Funktion: Bestellung stornieren mit E-Mail-Benachrichtigung
function cancelOrderFromModal(orderId) {
    const orderIndex = orders.findIndex(o => o.orderId === orderId);
    if (orderIndex === -1) {
        showNotification('❌ Bestellung nicht gefunden.');
        return;
    }

    const order = orders[orderIndex];
    
    if (order.status === 'cancelled') {
        showNotification('⚠️ Diese Bestellung ist bereits storniert.');
        return;
    }

    if (order.status === 'completed') {
        showNotification('⚠️ Bereits gelieferte Bestellungen können nicht storniert werden.');
        return;
    }

    // Erweiterte Stornierungsoptionen
    showCancellationModal(order);
}

function showCancellationModal(order) {
    const modalHtml = `
        <div id="cancellationModal" class="modal" style="display: block;">
            <div class="modal-content" style="max-width: 600px;">
                <span class="close" onclick="closeCancellationModal()">&times;</span>
                <h2 style="color: #f44336; margin-bottom: 2rem;">❌ Bestellung stornieren</h2>
                
                <div style="background: rgba(244,67,54,0.1); padding: 1rem; border-radius: 8px; margin-bottom: 2rem;">
                    <h3>Bestellung #${order.orderId}</h3>
                    <p><strong>Kunde:</strong> ${order.customerName} (${order.customerEmail})</p>
                    <p><strong>Betrag:</strong> €${order.total.toFixed(2)}</p>
                    <p><strong>Status:</strong> ${getStatusText(order.status)}</p>
                </div>

                <form id="cancellationForm" onsubmit="completeCancellation(event, '${order.orderId}')">
                    <div class="form-group">
                        <label for="cancellationReason">Grund für die Stornierung:</label>
                        <select id="cancellationReason" required>
                            <option value="">Bitte wählen...</option>
                            <option value="customer_request">Kundenwunsch</option>
                            <option value="payment_failed">Zahlungsausfall</option>
                            <option value="out_of_stock">Artikel nicht verfügbar</option>
                            <option value="quality_issues">Qualitätsprobleme</option>
                            <option value="shipping_issues">Versandprobleme</option>
                            <option value="system_error">Systemfehler</option>
                            <option value="other">Sonstiges</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="cancellationDetails">Zusätzliche Details:</label>
                        <textarea id="cancellationDetails" rows="4" placeholder="Weitere Informationen zur Stornierung..." style="width: 100%; padding: 0.8rem; border: 2px solid #d7ccc8; border-radius: 8px; resize: vertical;"></textarea>
                    </div>

                    <div class="form-group">
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input type="checkbox" id="sendEmailNotification" checked style="margin-right: 0.5rem;">
                            <span>📧 E-Mail-Benachrichtigung an Kunden senden</span>
                        </label>
                    </div>

                    <div class="form-group">
                        <label style="display: flex; align-items: center; cursor: pointer;">
                            <input type="checkbox" id="refundPayment" checked style="margin-right: 0.5rem;">
                            <span>💰 Automatische Rückerstattung veranlassen</span>
                        </label>
                    </div>

                    <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                        <button type="submit" class="btn" style="background: #f44336; flex: 1;">
                            ❌ Bestellung stornieren
                        </button>
                        <button type="button" class="btn" onclick="closeCancellationModal()" style="background: #9e9e9e; flex: 1;">
                            Abbrechen
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function completeCancellation(event, orderId) {
    event.preventDefault();
    
    const reason = document.getElementById('cancellationReason').value;
    const details = document.getElementById('cancellationDetails').value;
    const sendEmail = document.getElementById('sendEmailNotification').checked;
    const refund = document.getElementById('refundPayment').checked;

    if (!reason) {
        showNotification('⚠️ Bitte wählen Sie einen Grund für die Stornierung.');
        return;
    }

    const orderIndex = orders.findIndex(o => o.orderId === orderId);
    const order = orders[orderIndex];

    // Bestellung stornieren
    orders[orderIndex].status = 'cancelled';
    orders[orderIndex].cancelledBy = currentMaster.name;
    orders[orderIndex].cancelledAt = new Date().toISOString();
    orders[orderIndex].cancelReason = reason;
    orders[orderIndex].cancelDetails = details;
    orders[orderIndex].refundProcessed = refund;
    
    localStorage.setItem('klarkraft_orders', JSON.stringify(orders));

    // Kunden-Statistiken aktualisieren
    const users = JSON.parse(localStorage.getItem('klarkraft_users') || '[]');
    const userIndex = users.findIndex(u => u.customerId === order.customerId);
    if (userIndex !== -1) {
        users[userIndex].totalOrders = Math.max(0, (users[userIndex].totalOrders || 1) - 1);
        users[userIndex].totalSpent = Math.max(0, (users[userIndex].totalSpent || order.total) - order.total);
        localStorage.setItem('klarkraft_users', JSON.stringify(users));
    }

    // E-Mail-Benachrichtigung simulieren
    if (sendEmail) {
        sendCancellationEmail(order, reason, details, refund);
    }

    logActivity('Order Cancelled', `Order ${orderId} cancelled by ${currentMaster.name}. Reason: ${reason}`);
    showNotification(`✅ Bestellung #${orderId} wurde erfolgreich storniert.`);
    
    closeCancellationModal();
    updateOrdersCounter();
    showNewOrders(); // Refresh the view
}

function sendCancellationEmail(order, reason, details, refund) {
    const reasonTexts = {
        'customer_request': 'auf Ihren Wunsch',
        'payment_failed': 'aufgrund von Zahlungsproblemen',
        'out_of_stock': 'da der Artikel nicht verfügbar ist',
        'quality_issues': 'aufgrund von Qualitätsproblemen',
        'shipping_issues': 'aufgrund von Versandproblemen',
        'system_error': 'aufgrund eines Systemfehlers',
        'other': 'aus betrieblichen Gründen'
    };

    const emailSubject = `Stornierung Ihrer Bestellung #${order.orderId} - KlarKRAFT`;
    const emailBody = `Sehr geehrte/r ${order.customerName},

hiermit bestätigen wir die Stornierung Ihrer Bestellung #${order.orderId} ${reasonTexts[reason] || ''}.

Bestelldetails:
- Bestellnummer: #${order.orderId}
- Bestelldatum: ${new Date(order.orderDate).toLocaleDateString('de-DE')}
- Gesamtbetrag: €${order.total.toFixed(2)}
- Artikel: ${order.items.map(item => `${item.name} (${item.quantity}x)`).join(', ')}

${details ? `\nWeitere Informationen:\n${details}\n` : ''}

${refund ? `💰 RÜCKERSTATTUNG:
Der Betrag von €${order.total.toFixed(2)} wird innerhalb der nächsten 3-5 Werktage auf Ihr Zahlungsmittel zurückerstattet.` : ''}

Wir entschuldigen uns für die Unannehmlichkeiten und danken für Ihr Verständnis.

Bei Fragen stehen wir Ihnen gerne zur Verfügung:
📞 +49 (0) 2151 - 892347
📧 service@klarkraft.de

Mit freundlichen Grüßen
Ihr KlarKRAFT Team

---
Storniert von: ${currentMaster.name} (${currentMaster.role})
Stornierungsdatum: ${new Date().toLocaleString('de-DE')}`;

    // E-Mail-Client öffnen (GitHub Pages kann keine echten E-Mails senden)
    const mailtoLink = `mailto:${order.customerEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // E-Mail-Vorschau anzeigen
    showEmailPreview(order.customerEmail, emailSubject, emailBody, mailtoLink);
}

function showEmailPreview(email, subject, body, mailtoLink) {
    const previewHtml = `
        <div id="emailPreviewModal" class="modal" style="display: block;">
            <div class="modal-content" style="max-width: 700px;">
                <span class="close" onclick="closeEmailPreview()">&times;</span>
                <h2 style="color: #ff6b35; margin-bottom: 2rem;">📧 E-Mail-Vorschau</h2>
                
                <div style="background: rgba(255,255,255,0.9); padding: 1.5rem; border-radius: 8px; border: 2px solid #d7ccc8; margin-bottom: 2rem;">
                    <div style="margin-bottom: 1rem;">
                        <strong>An:</strong> ${email}
                    </div>
                    <div style="margin-bottom: 1rem;">
                        <strong>Betreff:</strong> ${subject}
                    </div>
                    <div style="border-top: 1px solid #e0e0e0; padding-top: 1rem;">
                        <pre style="white-space: pre-wrap; font-family: inherit; margin: 0;">${body}</pre>
                    </div>
                </div>

                <div style="display: flex; gap: 1rem;">
                    <button class="btn" onclick="window.open('${mailtoLink}'); closeEmailPreview();" style="background: #4caf50; flex: 1;">
                        📧 E-Mail-Client öffnen
                    </button>
                    <button class="btn" onclick="copyEmailToClipboard('${email}', '${encodeURIComponent(subject)}', '${encodeURIComponent(body)}')" style="background: #2196f3; flex: 1;">
                        📋 Text kopieren
                    </button>
                    <button class="btn" onclick="closeEmailPreview()" style="background: #9e9e9e; flex: 1;">
                        Schließen
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', previewHtml);
}

        // Verbesserte Funktion: Bestellung bearbeiten mit Status-Update
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
        
            // Bestellung zuweisen und Status aktualisieren
            orders[orderIndex].processedBy = currentMaster.name;
            orders[orderIndex].processedAt = new Date().toISOString();
            orders[orderIndex].status = 'processing'; // Status zu "wird versendet" ändern
            orders[orderIndex].assignedTo = currentMaster.name;
            orders[orderIndex].assignedRole = currentMaster.role;
            
            localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
            
            logActivity('Process Order', `Order ${orderId} assigned to and processed by ${currentMaster.name}`);
            showNotification(`✅ Bestellung #${orderId} wurde Ihnen zugewiesen und ist jetzt in Bearbeitung.`);
            
            updateOrdersCounter();
            showNewOrders(); // Refresh the view
        }
        
        // Verbesserte Details-Ansicht
        function viewOrderDetailsInModal(orderId) {
            const order = orders.find(o => o.orderId === orderId);
            if (!order) {
                showNotification('❌ Bestellung nicht gefunden.');
                return;
            }
        
            const subtotal = order.subtotal || (order.total - (order.shippingCost || 0));
            
            const detailsHtml = `
                <div id="orderDetailsModal" class="modal" style="display: block;">
                    <div class="modal-content" style="max-width: 800px; max-height: 90vh;">
                        <span class="close" onclick="closeOrderDetails()">&times;</span>
                        <h2 style="color: #ff6b35; margin-bottom: 2rem;">📦 Bestelldetails #${order.orderId}</h2>
                        
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                            <!-- Kunden-Informationen -->
                            <div class="detail-section">
                                <h3 style="color: #8d6e63; margin-bottom: 1rem;">👤 Kunde</h3>
                                <div style="background: rgba(255,255,255,0.7); padding: 1rem; border-radius: 8px;">
                                    <p><strong>Name:</strong> ${order.customerName}</p>
                                    <p><strong>E-Mail:</strong> ${order.customerEmail}</p>
                                    <p><strong>Telefon:</strong> ${order.customerPhone || 'Nicht angegeben'}</p>
                                    <p><strong>Kunden-ID:</strong> ${order.customerId}</p>
                                </div>
                            </div>
        
                            <!-- Bestell-Informationen -->
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
        
                        <!-- Artikel-Liste -->
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
                            <!-- Lieferadresse -->
                            <div class="detail-section">
                                <h3 style="color: #8d6e63; margin-bottom: 1rem;">🏠 Lieferadresse</h3>
                                <div style="background: rgba(255,255,255,0.7); padding: 1rem; border-radius: 8px;">
                                    <p>${order.customerName}</p>
                                    <p>${order.shippingAddress.address}</p>
                                    <p>${order.shippingAddress.zip} ${order.shippingAddress.city}</p>
                                    <p>${order.shippingAddress.country}</p>
                                </div>
                            </div>
        
                            <!-- Kosten-Aufschlüsselung -->
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
        
                        <!-- Bearbeitungs-Verlauf -->
                        ${getOrderProcessingHistory(order)}
        
                        <!-- Aktions-Buttons -->
                        <div style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap;">
                            ${order.status === 'pending' ? `
                                <button class="btn" onclick="processOrder('${order.orderId}'); closeOrderDetails();" style="background: #4caf50;">
                                    ✅ Bearbeitung übernehmen
                                </button>
                            ` : ''}
                            
                            ${order.status !== 'cancelled' && order.status !== 'completed' ? `
                                <button class="btn" onclick="closeOrderDetails(); cancelOrderFromModal('${order.orderId}');" style="background: #f44336;">
                                    ❌ Stornieren
                                </button>
                            ` : ''}
                            
                            ${order.status === 'processing' ? `
                                <button class="btn" onclick="markAsCompleted('${order.orderId}'); closeOrderDetails();" style="background: #ff9800;">
                                    📦 Als versendet markieren
                                </button>
                            ` : ''}
                            
                            <button class="btn" onclick="printOrderDetails('${order.orderId}')" style="background: #2196f3;">
                                🖨️ Drucken
                            </button>
                            
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
        
        function getOrderProcessingHistory(order) {
            let historyHtml = `
                <div class="detail-section" style="margin-bottom: 2rem;">
                    <h3 style="color: #8d6e63; margin-bottom: 1rem;">⏱️ Bearbeitungsverlauf</h3>
                    <div style="background: rgba(255,255,255,0.7); padding: 1rem; border-radius: 8px;">
                        <div class="timeline">
                            <div class="timeline-item">
                                <strong>📋 Bestellung eingegangen</strong><br>
                                <small>${new Date(order.orderDate).toLocaleString('de-DE')}</small>
                            </div>
            `;
        
            if (order.processedBy) {
                historyHtml += `
                    <div class="timeline-item">
                        <strong>👤 Bearbeitung übernommen</strong><br>
                        <small>von ${order.processedBy} am ${new Date(order.processedAt).toLocaleString('de-DE')}</small>
                    </div>
                `;
            }
        
            if (order.status === 'processing') {
                historyHtml += `
                    <div class="timeline-item">
                        <strong>📦 In Bearbeitung</strong><br>
                        <small>Status geändert am ${new Date(order.statusUpdatedAt || order.processedAt || Date.now()).toLocaleString('de-DE')}</small>
                    </div>
                `;
            }
        
            if (order.status === 'completed') {
                historyHtml += `
                    <div class="timeline-item">
                        <strong>✅ Versendet/Abgeschlossen</strong><br>
                        <small>am ${new Date(order.statusUpdatedAt || Date.now()).toLocaleString('de-DE')}</small>
                    </div>
                `;
            }
        
            if (order.status === 'cancelled') {
                historyHtml += `
                    <div class="timeline-item" style="color: #f44336;">
                        <strong>❌ Storniert</strong><br>
                        <small>von ${order.cancelledBy} am ${new Date(order.cancelledAt).toLocaleString('de-DE')}</small><br>
                        <small>Grund: ${order.cancelReason}</small>
                        ${order.cancelDetails ? `<br><small>Details: ${order.cancelDetails}</small>` : ''}
                    </div>
                `;
            }
        
            historyHtml += `
                        </div>
                    </div>
                </div>
            `;
        
            return historyHtml;
        }
        
        // Neue Funktion: Bestellung als abgeschlossen markieren
        function markAsCompleted(orderId) {
            const orderIndex = orders.findIndex(o => o.orderId === orderId);
            if (orderIndex === -1) {
                showNotification('❌ Bestellung nicht gefunden.');
                return;
            }
        
            if (confirm(`📦 Bestellung #${orderId} als "versendet/abgeschlossen" markieren?`)) {
                orders[orderIndex].status = 'completed';
                orders[orderIndex].statusUpdatedBy = currentMaster.name;
                orders[orderIndex].statusUpdatedAt = new Date().toISOString();
                orders[orderIndex].completedAt = new Date().toISOString();
                
                localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
                
                logActivity('Order Completed', `Order ${orderId} marked as completed by ${currentMaster.name}`);
                showNotification(`✅ Bestellung #${orderId} als abgeschlossen markiert!`);
                
                updateOrdersCounter();
                if (document.getElementById('newOrdersModal').style.display === 'block') {
                    showNewOrders(); // Refresh if orders modal is open
                }
            }
        }
        
        // Hilfsfunktionen für Modals
        function closeCancellationModal() {
            const modal = document.getElementById('cancellationModal');
            if (modal) {
                modal.remove();
            }
        }
        
        function closeEmailPreview() {
            const modal = document.getElementById('emailPreviewModal');
            if (modal) {
                modal.remove();
            }
        }
        
        function closeOrderDetails() {
            const modal = document.getElementById('orderDetailsModal');
            if (modal) {
                modal.remove();
            }
        }
        
        function copyEmailToClipboard(email, subject, body) {
            const emailText = `An: ${email}\nBetreff: ${decodeURIComponent(subject)}\n\n${decodeURIComponent(body)}`;
            
            navigator.clipboard.writeText(emailText).then(() => {
                showNotification('📋 E-Mail-Text in Zwischenablage kopiert!');
            }).catch(() => {
                // Fallback für ältere Browser
                const textArea = document.createElement('textarea');
                textArea.value = emailText;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showNotification('📋 E-Mail-Text in Zwischenablage kopiert!');
            });
        }
        
        function printOrderDetails(orderId) {
            const order = orders.find(o => o.orderId === orderId);
            if (!order) return;
        
            const printWindow = window.open('', '_blank');
            const subtotal = order.subtotal || (order.total - (order.shippingCost || 0));
            
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Bestellung #${order.orderId} - KlarKRAFT</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .header { text-align: center; margin-bottom: 30px; }
                        .section { margin-bottom: 20px; }
                        .section h3 { color: #ff6b35; border-bottom: 2px solid #ff6b35; padding-bottom: 5px; }
                        table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        .total { font-weight: bold; font-size: 1.2em; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h1>KlarKRAFT GmbH</h1>
                        <h2>Bestellbestätigung #${order.orderId}</h2>
                    </div>
                    
                    <div class="section">
                        <h3>Kundeninformationen</h3>
                        <p><strong>Name:</strong> ${order.customerName}</p>
                        <p><strong>E-Mail:</strong> ${order.customerEmail}</p>
                        <p><strong>Telefon:</strong> ${order.customerPhone || 'Nicht angegeben'}</p>
                    </div>
        
                    <div class="section">
                        <h3>Lieferadresse</h3>
                        <p>${order.customerName}<br>
                        ${order.shippingAddress.address}<br>
                        ${order.shippingAddress.zip} ${order.shippingAddress.city}<br>
                        ${order.shippingAddress.country}</p>
                    </div>
        
                    <div class="section">
                        <h3>Bestellte Artikel</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Artikel</th>
                                    <th>Menge</th>
                                    <th>Einzelpreis</th>
                                    <th>Gesamt</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${order.items.map(item => `
                                    <tr>
                                        <td>${item.name}</td>
                                        <td>${item.quantity}</td>
                                        <td>€${item.price.toFixed(2)}</td>
                                        <td>€${item.total.toFixed(2)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
        
                    <div class="section">
                        <h3>Kostenaufstellung</h3>
                        <p>Zwischensumme: €${subtotal.toFixed(2)}</p>
                        <p>Versandkosten: ${order.shippingCost > 0 ? '€' + order.shippingCost.toFixed(2) : 'KOSTENLOS'}</p>
                        <p class="total">Gesamtsumme: €${order.total.toFixed(2)}</p>
                        <p>Zahlungsmethode: ${order.paymentMethod}</p>
                    </div>
        
                    <div class="section">
                        <h3>Bestelldetails</h3>
                        <p><strong>Bestelldatum:</strong> ${new Date(order.orderDate).toLocaleString('de-DE')}</p>
                        <p><strong>Status:</strong> ${getStatusText(order.status)}</p>
                        <p><strong>Tracking-Nummer:</strong> ${order.trackingNumber}</p>
                        ${order.processedBy ? `<p><strong>Bearbeitet von:</strong> ${order.processedBy}</p>` : ''}
                    </div>
        
                    <script>
                        window.onload = function() {
                            window.print();
                            window.onafterprint = function() {
                                window.close();
                            }
                        }
                    </script>
                </body>
                </html>
            `);
            
            printWindow.document.close();
            logActivity('Print Order', `Printed order details for ${order.orderId}`);
        }
        
        // Verbesserte showNewOrders Funktion mit besserer Status-Anzeige
        function showNewOrders() {
            if (!currentMaster) {
                showNotification('⚠️ Nur Mitarbeiter können neue Bestellungen einsehen.');
                return;
            }
        
            const pendingOrders = orders.filter(order => order.status === 'pending')
                .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
            const processingOrders = orders.filter(order => order.status === 'processing')
                .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        
            const ordersList = document.getElementById('newOrdersList');
            
            if (pendingOrders.length === 0 && processingOrders.length === 0) {
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
                        <p><strong>${processingOrders.length}</strong> Bestellung(en) sind in Bearbeitung</p>
                        <p>Gesamtwert offener Bestellungen: <strong>€${[...pendingOrders, ...processingOrders].reduce((sum, order) => sum + order.total, 0).toFixed(2)}</strong></p>
                    </div>
                `;
        
                // Neue Bestellungen
                if (pendingOrders.length > 0) {
                    contentHtml += `<h3 style="color: #f44336; margin: 2rem 0 1rem 0;">🆕 Neue Bestellungen (${pendingOrders.length})</h3>`;
                    contentHtml += pendingOrders.map(order => createOrderCard(order, 'new')).join('');
                }
        
                // Bestellungen in Bearbeitung
                if (processingOrders.length > 0) {
                    contentHtml += `<h3 style="color: #ff9800; margin: 2rem 0 1rem 0;">⚙️ In Bearbeitung (${processingOrders.length})</h3>`;
                    contentHtml += processingOrders.map(order => createOrderCard(order, 'processing')).join('');
                }
        
                ordersList.innerHTML = contentHtml;
            }
            
            document.getElementById('newOrdersModal').style.display = 'block';
            logActivity('View Orders', `Viewed ${pendingOrders.length} pending and ${processingOrders.length} processing orders`);
        }
        
        function createOrderCard(order, type) {
            const borderColor = type === 'new' ? '#f44336' : '#ff9800';
            const statusLabel = type === 'new' ? 'NEU' : 'IN ARBEIT';
            const statusBg = type === 'new' ? '#f44336' : '#ff9800';
        
            return `
                <div class="cart-item" style="border-left: 4px solid ${borderColor};">
                    <div>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <strong>Bestellung #${order.orderId}</strong>
                            <span style="background: ${statusBg}; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.8rem;">${statusLabel}</span>
                        </div>
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
                        ` : `
                            <button class="btn" onclick="markAsCompleted('${order.orderId}')" style="background: #4caf50; width: auto; padding: 0.5rem 1rem;">
                                📦 Versenden
                            </button>
                        `}
                        <button class="btn" onclick="viewOrderDetailsInModal('${order.orderId}')" style="background: #2196f3; width: auto; padding: 0.5rem 1rem;">
                            👁️ Details
                        </button>
                        <button class="btn" onclick="cancelOrderFromModal('${order.orderId}')" style="background: #f44336; width: auto; padding: 0.5rem 1rem;">
                            ❌ Stornieren
                        </button>
                    </div>
                </div>
            `;
        }
// Erweiterte Bestellhistorie-Funktion mit anklickbaren Bestellungen
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
                    <div style="font-size: 1.5rem; font-weight: bold; color: #ff9800;">${userOrders.filter(o => o.status === 'pending' || o.status === 'processing').length}</div>
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
    const isActive = order.status === 'pending' || order.status === 'processing';
    const canCancel = order.status === 'pending' || order.status === 'processing';
    
    return `
        <div class="customer-order-card" onclick="showCustomerOrderDetails('${order.orderId}')" style="cursor: pointer;">
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
                
                ${isActive ? `
                    <div style="margin-top: 1rem; padding: 0.8rem; background: rgba(255,107,53,0.1); border-radius: 8px; border-left: 4px solid #ff6b35;">
                        <div style="font-size: 0.9rem; color: #ff6b35; font-weight: bold;">
                            ${statusInfo.icon} ${statusInfo.description}
                        </div>
                        ${order.status === 'processing' && order.processedBy ? `
                            <div style="font-size: 0.8rem; color: #8d6e63; margin-top: 0.25rem;">
                                Bearbeitet von: ${order.processedBy}
                            </div>
                        ` : ''}
                    </div>
                ` : ''}
                
                ${order.status === 'cancelled' ? `
                    <div style="margin-top: 1rem; padding: 0.8rem; background: rgba(158,158,158,0.1); border-radius: 8px; border-left: 4px solid #9e9e9e;">
                        <div style="font-size: 0.9rem; color: #9e9e9e; font-weight: bold;">
                            ❌ Bestellung storniert
                        </div>
                        ${order.cancelReason ? `
                            <div style="font-size: 0.8rem; color: #8d6e63; margin-top: 0.25rem;">
                                Grund: ${getReasonText(order.cancelReason)}
                            </div>
                        ` : ''}
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

function getStatusInfo(status) {
    const statusMap = {
        'pending': {
            text: 'In Bearbeitung',
            icon: '⏳',
            description: 'Ihre Bestellung ist eingegangen und wird bearbeitet.'
        },
        'processing': {
            text: 'Versand wird vorbereitet',
            icon: '📦',
            description: 'Ihre Bestellung wird gerade für den Versand vorbereitet.'
        },
        'completed': {
            text: 'versendet',
            icon: '✅',
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

// Kunden-Bestelldetails Modal
function showCustomerOrderDetails(orderId) {
    const order = orders.find(o => o.orderId === orderId);
    if (!order) {
        showNotification('❌ Bestellung nicht gefunden.');
        return;
    }

    const subtotal = order.subtotal || (order.total - (order.shippingCost || 0));
    const statusInfo = getStatusInfo(order.status);
    const canCancel = order.status === 'pending' || order.status === 'processing';
    
    const modalHtml = `
        <div id="customerOrderDetailsModal" class="modal" style="display: block;">
            <div class="modal-content" style="max-width: 800px; max-height: 90vh;">
                <span class="close" onclick="closeCustomerOrderDetails()">&times;</span>
                
                <!-- Header -->
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

                <!-- Status-Informationen -->
                <div style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(255,107,53,0.1); border-radius: 15px; border-left: 5px solid #ff6b35;">
                    <h3 style="color: #ff6b35; margin-bottom: 1rem;">📋 Bestellstatus</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <strong>Aktueller Status:</strong><br>
                            <span style="color: #ff6b35;">${statusInfo.description}</span>
                        </div>
                        <div>
                            <strong>Tracking-Nummer:</strong><br>
                            <code style="background: rgba(255,255,255,0.7); padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: bold;">${order.trackingNumber}</code>
                        </div>
                    </div>
                    ${order.status === 'processing' && order.processedBy ? `
                        <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,107,53,0.3);">
                            <strong>Bearbeitet von:</strong> ${order.processedBy}<br>
                            <small style="color: #8d6e63;">am ${new Date(order.processedAt).toLocaleString('de-DE')}</small>
                        </div>
                    ` : ''}
                </div>

                <!-- Artikel-Details -->
                <div style="margin-bottom: 2rem;">
                    <h3 style="color: #8d6e63; margin-bottom: 1rem;">🛍️ Bestellte Artikel</h3>
                    <div style="background: rgba(255,255,255,0.9); border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                        ${order.items.map(item => `
                            <div style="display: grid; grid-template-columns: auto 1fr auto auto; gap: 1rem; align-items: center; padding: 1rem; border-bottom: 1px solid #f0f0f0;">
                                <div style="font-size: 2rem;">
                                    ${getProductEmoji(item.productId)}
                                </div>
                                <div>
                                    <strong style="color: #5d4037;">${item.name}</strong><br>
                                    <small style="color: #8d6e63;">€${item.price.toFixed(2)} pro Stück</small>
                                </div>
                                <div style="text-align: center;">
                                    <span style="background: #f5f5f5; padding: 0.25rem 0.5rem; border-radius: 15px; font-weight: bold;">
                                        ${item.quantity}x
                                    </span>
                                </div>
                                <div style="text-align: right; font-weight: bold; color: #ff6b35;">
                                    €${item.total.toFixed(2)}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Lieferung & Rechnung -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
                    <!-- Lieferadresse -->
                    <div>
                        <h3 style="color: #8d6e63; margin-bottom: 1rem;">🏠 Lieferadresse</h3>
                        <div style="background: rgba(255,255,255,0.7); padding: 1.5rem; border-radius: 10px; border: 2px solid #d7ccc8;">
                            <address style="font-style: normal; line-height: 1.5;">
                                <strong>${order.customerName}</strong><br>
                                ${order.shippingAddress.address}<br>
                                ${order.shippingAddress.zip} ${order.shippingAddress.city}<br>
                                ${order.shippingAddress.country}
                            </address>
                        </div>
                    </div>

                    <!-- Rechnungsdetails -->
                    <div>
                        <h3 style="color: #8d6e63; margin-bottom: 1rem;">💰 Rechnungsdetails</h3>
                        <div style="background: rgba(255,255,255,0.7); padding: 1.5rem; border-radius: 10px; border: 2px solid #d7ccc8;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Zwischensumme:</span>
                                <span>€${subtotal.toFixed(2)}</span>
                            </div>
                            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                                <span>Versandkosten:</span>
                                <span style="color: ${order.shippingCost > 0 ? '#8d6e63' : '#4caf50'};">
                                    ${order.shippingCost > 0 ? '€' + order.shippingCost.toFixed(2) : '🆓 KOSTENLOS'}
                                </span>
                            </div>
                            <hr style="margin: 1rem 0;">
                            <div style="display: flex; justify-content: space-between; font-size: 1.2rem; font-weight: bold; color: #ff6b35;">
                                <span>Gesamtsumme:</span>
                                <span>€${order.total.toFixed(2)}</span>
                            </div>
                            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e0e0e0; font-size: 0.9rem; color: #8d6e63;">
                                <strong>💳 Bezahlung:</strong> ${order.paymentMethod}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Bestellverlauf -->
                ${getCustomerOrderTimeline(order)}

                <!-- Aktionen -->
                <div style="display: flex; gap: 1rem; margin-top: 2rem; flex-wrap: wrap; justify-content: center;">
                    ${canCancel ? `
                        <button class="btn" onclick="requestOrderCancellation('${order.orderId}'); closeCustomerOrderDetails();" style="background: #f44336; width: auto; padding: 0.8rem 1.5rem;">
                            ❌ Bestellung stornieren
                        </button>
                    ` : ''}
                    
                    ${order.status === 'completed' ? `
                        <button class="btn" onclick="reorderItems('${order.orderId}'); closeCustomerOrderDetails();" style="background: #4caf50; width: auto; padding: 0.8rem 1.5rem;">
                            🔄 Erneut bestellen
                        </button>
                    ` : ''}
                    
                    <button class="btn" onclick="downloadOrderReceipt('${order.orderId}')" style="background: #2196f3; width: auto; padding: 0.8rem 1.5rem;">
                        📄 Rechnung herunterladen
                    </button>
                    
                    <button class="btn" onclick="closeCustomerOrderDetails()" style="background: #9e9e9e; width: auto; padding: 0.8rem 1.5rem;">
                        Schließen
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function getProductEmoji(productId) {
    const product = products.find(p => p.id === productId);
    return product ? product.image : '📦';
}

function getCustomerOrderTimeline(order) {
    return `
        <div style="margin-bottom: 2rem;">
            <h3 style="color: #8d6e63; margin-bottom: 1rem;">⏱️ Bestellverlauf</h3>
            <div style="background: rgba(255,255,255,0.7); padding: 1.5rem; border-radius: 10px; border: 2px solid #d7ccc8;">
                <div class="customer-timeline">
                    <div class="customer-timeline-item completed">
                        <div class="timeline-icon">📋</div>
                        <div class="timeline-content">
                            <strong>Bestellung eingegangen</strong>
                            <div class="timeline-date">${new Date(order.orderDate).toLocaleString('de-DE')}</div>
                        </div>
                    </div>
                    
                    ${order.processedBy ? `
                        <div class="customer-timeline-item completed">
                            <div class="timeline-icon">👤</div>
                            <div class="timeline-content">
                                <strong>Bearbeitung begonnen</strong>
                                <div class="timeline-date">${new Date(order.processedAt).toLocaleString('de-DE')}</div>
                                <div class="timeline-detail">von ${order.processedBy}</div>
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="customer-timeline-item ${order.status === 'processing' || order.status === 'completed' ? 'completed' : order.status === 'cancelled' ? 'cancelled' : 'pending'}">
                        <div class="timeline-icon">
                            ${order.status === 'completed' ? '📦' : order.status === 'cancelled' ? '❌' : order.status === 'processing' ? '⚙️' : '⏳'}
                        </div>
                        <div class="timeline-content">
                            <strong>${getStatusInfo(order.status).text}</strong>
                            ${order.statusUpdatedAt ? `
                                <div class="timeline-date">${new Date(order.statusUpdatedAt).toLocaleString('de-DE')}</div>
                            ` : ''}
                            ${order.status === 'cancelled' && order.cancelReason ? `
                                <div class="timeline-detail">Grund: ${getReasonText(order.cancelReason)}</div>
                            ` : ''}
                        </div>
                    </div>
                    
                    ${order.status !== 'cancelled' && order.status !== 'completed' ? `
                        <div class="customer-timeline-item pending">
                            <div class="timeline-icon">🚚</div>
                            <div class="timeline-content">
                                <strong>Zustellung</strong>
                                <div class="timeline-detail">Erfolgt nach Versand</div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// Neue Funktionen für Kundenaktionen
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
        // Stornierungsanfrage erstellen
        const orderIndex = orders.findIndex(o => o.orderId === orderId);
        orders[orderIndex].customerCancellationRequest = {
            reason: reason,
            requestedAt: new Date().toISOString(),
            requestedBy: currentUser.name
        };
        
        localStorage.setItem('klarkraft_orders', JSON.stringify(orders));
        
        logActivity('Customer Cancellation Request', `Customer ${currentUser.name} requested cancellation for order ${orderId}. Reason: ${reason}`);
        showNotification(`📨 Stornierungsanfrage gesendet! Wir bearbeiten Ihre Anfrage schnellstmöglich.\n\nBestellung: #${orderId}\nGrund: ${reason}`);
        
        // E-Mail an Support senden (simuliert)
        const mailtoLink = `mailto:service@klarkraft.de?subject=Stornierungsanfrage - Bestellung ${orderId}&body=Sehr geehrtes KlarKRAFT Team,%0A%0AHiermit beantrage ich die Stornierung meiner Bestellung:%0A%0ABestellnummer: ${orderId}%0AKunde: ${currentUser.name} (${currentUser.email})%0AGrund: ${reason}%0A%0ABitte bestätigen Sie die Stornierung.%0A%0AMit freundlichen Grüßen%0A${currentUser.name}`;
        
        setTimeout(() => {
            if (confirm('📧 Möchten Sie eine E-Mail an unseren Support senden?')) {
                window.open(mailtoLink);
            }
        }, 1000);
        
        loadOrderHistory(); // Refresh the order history
    }
}

function reorderItems(orderId) {
    const order = orders.find(o => o.orderId === orderId);
    if (!order) {
        showNotification('❌ Bestellung nicht gefunden.');
        return;
    }

    // Artikel zum Warenkorb hinzufügen
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
    
    // Optional: Direkt zum Warenkorb wechseln
    setTimeout(() => {
        if (confirm('🛒 Möchten Sie den Warenkorb jetzt anzeigen?')) {
            closeCustomerOrderDetails();
            showCart();
        }
    }, 1000);
}

function downloadOrderReceipt(orderId) {
    const order = orders.find(o => o.orderId === orderId);
    if (!order) {
        showNotification('❌ Bestellung nicht gefunden.');
        return;
    }

    // Rechnung als PDF simulieren (da wir kein Backend haben)
    const receiptContent = generateReceiptContent(order);
    
    // Als HTML-Datei zum Download anbieten
    const blob = new Blob([receiptContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `KlarKRAFT_Rechnung_${order.orderId}.html`;
    link.click();
    URL.revokeObjectURL(url);
    
    showNotification('📄 Rechnung wurde heruntergeladen!');
}

function generateReceiptContent(order) {
    const subtotal = order.subtotal || (order.total - (order.shippingCost || 0));
    
    return `
        <!DOCTYPE html>
        <html lang="de">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Rechnung ${order.orderId} - KlarKRAFT</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
                .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #ff6b35; }
                .company { color: #ff6b35; font-size: 2rem; font-weight: bold; margin-bottom: 10px; }
                .invoice-info { display: flex; justify-content: space-between; margin-bottom: 30px; }
                .customer-info, .order-info { flex: 1; }
                .order-info { text-align: right; }
                table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
                th { background-color: #f8f5f3; color: #5d4037; font-weight: bold; }
                .total-row { background-color: #fff8f5; font-weight: bold; }
                .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 0.9rem; color: #666; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="company">KlarKRAFT</div>
                <div>Energiestraße 15 • 47803 Krefeld • Deutschland</div>
                <div>Tel: +49 (0) 2151 - 892347 • E-Mail: info@klarkraft.de</div>
            </div>
            
            <h1 style="color: #ff6b35;">Rechnung #${order.orderId}</h1>
            
            <div class="invoice-info">
                <div class="customer-info">
                    <h3>Rechnungsadresse:</h3>
                    <div>
                        ${order.customerName}<br>
                        ${order.shippingAddress.address}<br>
                        ${order.shippingAddress.zip} ${order.shippingAddress.city}<br>
                        ${order.shippingAddress.country}
                    </div>
                </div>
                <div class="order-info">
                    <h3>Bestelldaten:</h3>
                    <div>
                        <strong>Rechnungsnummer:</strong> ${order.orderId}<br>
                        <strong>Bestelldatum:</strong> ${new Date(order.orderDate).toLocaleDateString('de-DE')}<br>
                        <strong>Zahlungsart:</strong> ${order.paymentMethod}<br>
                        <strong>Tracking:</strong> ${order.trackingNumber}
                    </div>
                </div>
            </div>
            
            <h3>Bestellte Artikel:</h3>
            <table>
                <thead>
                    <tr>
                        <th>Artikel</th>
                        <th style="text-align: center;">Menge</th>
                        <th style="text-align: right;">Einzelpreis</th>
                        <th style="text-align: right;">Gesamtpreis</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map(item => `
                        <tr>
                            <td>${item.name}</td>
                            <td style="text-align: center;">${item.quantity}</td>
                            <td style="text-align: right;">€${item.price.toFixed(2)}</td>
                            <td style="text-align: right;">€${item.total.toFixed(2)}</td>
                        </tr>
                    `).join('')}
                    <tr>
                        <td colspan="3" style="text-align: right;"><strong>Zwischensumme:</strong></td>
                        <td style="text-align: right;">€${subtotal.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td colspan="3" style="text-align: right;"><strong>Versandkosten:</strong></td>
                        <td style="text-align: right;">${order.shippingCost > 0 ? '€' + order.shippingCost.toFixed(2) : 'KOSTENLOS'}</td>
                    </tr>
                    <tr class="total-row">
                        <td colspan="3" style="text-align: right; font-size: 1.2rem;"><strong>Gesamtbetrag:</strong></td>
                        <td style="text-align: right; font-size: 1.2rem; color: #ff6b35;"><strong>€${order.total.toFixed(2)}</strong></td>
                    </tr>
                </tbody>
            </table>
            
            <div class="footer">
                <p><strong>Vielen Dank für Ihren Einkauf bei KlarKRAFT!</strong></p>
                <p>Diese Rechnung wurde automatisch erstellt und ist ohne Unterschrift gültig.</p>
                <p>
                    <strong>KlarKRAFT GmbH</strong> • Energiestraße 15, 47803 Krefeld<br>
                    USt-IdNr.: DE123456789 • HRB 12345 Amtsgericht Krefeld<br>
                    Geschäftsführer: Marcus Energius
                </p>
            </div>
        </body>
        </html>
    `;
}

function closeCustomerOrderDetails() {
    const modal = document.getElementById('customerOrderDetailsModal');
    if (modal) {
        modal.remove();
    }
}
