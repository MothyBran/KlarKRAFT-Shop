// scripts/config.js
export const CONFIG = {
    // App Settings
    APP_NAME: 'KlarKRAFT',
    VERSION: '1.0.0',
    
    // Business Logic
    SHIPPING: {
        FREE_THRESHOLD: 150.00,
        COST: 6.90,
        COUNTRIES: {
            'Deutschland': { cost: 6.90, freeThreshold: 150 },
            'Österreich': { cost: 12.90, freeThreshold: 200 },
            'Schweiz': { cost: 16.90, freeThreshold: 999999 } // Keine kostenlose Lieferung
        }
    },
    
    // Storage Keys
    STORAGE_KEYS: {
        USERS: 'klarkraft_users',
        ORDERS: 'klarkraft_orders',
        CURRENT_USER: 'klarkraft_currentUser',
        CURRENT_MASTER: 'klarkraft_currentMaster',
        ACTIVITY_LOGS: 'klarkraft_activity_logs',
        DEMO_MODE: 'klarkraft_demo_mode',
        CART: 'klarkraft_cart',
        SETTINGS: 'klarkraft_settings'
    },
    
    // UI Settings
    UI: {
        NOTIFICATION_DURATION: 4000,
        MODAL_ANIMATION_DURATION: 300,
        DEBOUNCE_DELAY: 300
    },
    
    // Validation Rules
    VALIDATION: {
        PASSWORD_MIN_LENGTH: 6,
        PHONE_PATTERN: /^[\+]?[1-9][\d]{0,15}$/,
        EMAIL_PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        IBAN_PATTERN: /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/
    }
};

// Product Data
export const PRODUCTS = [
    {
        id: 1,
        name: "KlarKraft Brett BASIS - Universal",
        description: "Universelles KlarKraft Brett für alle Einkäufe mit neutraler Gravur. Ideal für den täglichen Gebrauch zur Harmonisierung aller Lebensmittel.",
        price: 189.99,
        image: "🪨",
        badge: "BASIS",
        category: "boards",
        tags: ["universal", "basis", "harmonisierung"],
        details: "Unser BASIS KlarKraft Brett aus natürlichem Granit harmonisiert die Schwingungen aller Lebensmittel und Gegenstände. Die neutrale Gravur ermöglicht eine universelle Anwendung für sämtliche Produkte. Das Brett neutralisiert negative Energien von Strichcodes und elektromagnetischen Feldern. Einfach Produkte für 5-10 Minuten auf das Brett legen und die energetische Reinigung beginnt. Größe: 30x50cm, Gewicht: ca. 3kg. Hergestellt aus hochwertigem Granit mit spezieller Oberflächenbehandlung."
    },
    {
        id: 2,
        name: "KlarKraft Brett ANIMALIS - Tierprodukte",
        description: "Spezialcodierung für Fleisch, Milch und Lederprodukte. Optimiert für tierische Erzeugnisse mit gezielter Energieharmonisierung.",
        price: 209.99,
        image: "🐄",
        badge: "ANIMALIS",
        category: "boards",
        tags: ["tierprodukte", "fleisch", "milch", "spezial"],
        details: "Das ANIMALIS KlarKraft Brett ist speziell für tierische Produkte entwickelt worden. Die einzigartige Codierung neutralisiert negative Energien in Fleisch, Milch, Käse und Lederwaren besonders effektiv. Das Brett arbeitet mit speziellen Frequenzen, die auf die molekulare Struktur tierischer Proteine abgestimmt sind. Ideal für Fleischprodukte, Milcherzeugnisse, Leder und andere tierische Materialien. Die Behandlung erfolgt in 7-12 Minuten je nach Produktgröße. Größe: 30x50cm, mit spezieller ANIMALIS-Gravur."
    },
    {
        id: 3,
        name: "KlarKraft Brett HERBA - Pflanzen & Kräuter",
        description: "Ideal für Obst, Gemüse und Heilpflanzen. Verstärkt die natürliche Lebensenergie pflanzlicher Produkte und deren Nährstoffgehalt.",
        price: 199.99,
        image: "🌿",
        badge: "HERBA",
        category: "boards",
        tags: ["pflanzen", "obst", "gemüse", "kräuter"],
        details: "Das HERBA KlarKraft Brett ist perfekt auf die Bedürfnisse pflanzlicher Produkte abgestimmt. Es verstärkt die natürliche Lebensenergie von Obst, Gemüse, Kräutern und Heilpflanzen. Die spezielle HERBA-Frequenz harmonisiert die Chlorophyll-Strukturen und aktiviert die ursprüngliche Schwingung der Pflanzen. Besonders wirkungsvoll bei Bio-Produkten, frischen Kräutern und Heilpflanzen. Die Behandlungszeit beträgt 5-8 Minuten für optimale Ergebnisse. Größe: 30x50cm, mit kraftvoller Pflanzen-Symbolik graviert."
    },
    {
        id: 4,
        name: "KlarKraft Brett UMBRA - Schattengewächse",
        description: "Spezielles Energiefeld für Pilze und empfindliche Schattengewächse. Schonende Behandlung für besonders sensitive Produkte.",
        price: 219.99,
        image: "🍄",
        badge: "UMBRA",
        category: "boards",
        tags: ["pilze", "wurzelgemüse", "schattengewächse"],
        details: "UMBRA wurde speziell für Pilze, Wurzelgemüse und andere Schattengewächse entwickelt. Diese Produkte benötigen eine besonders sanfte energetische Behandlung, da sie von Natur aus empfindlicher sind. Das UMBRA-Feld arbeitet mit reduzierten Frequenzen, die speziell auf die feinen Strukturen von Pilzen und erdverbundenen Gewächsen abgestimmt sind. Ideal für alle Pilzarten, Kartoffeln, Rüben und andere Wurzelgemüse. Die schonende Behandlung dauert 10-15 Minuten. Größe: 30x50cm, mit mystischen UMBRA-Symbolen."
    },
    {
        id: 5,
        name: "KlarKraft Brett MOBILO - Reise-/Taschenmodell",
        description: "Kompakt und tragbar für unterwegs. Reduzierte Größe mit effizienter Energienutzung - weniger Ladezyklen erforderlich.",
        price: 149.99,
        image: "🎒",
        badge: "MOBILO",
        category: "boards",
        tags: ["mobil", "reise", "kompakt", "unterwegs"],
        details: "Das kompakte MOBILO KlarKraft Brett ist der perfekte Begleiter für Reisen, Büro und unterwegs. Trotz der reduzierten Größe (20x30cm) bietet es die volle Reinigungsleistung unserer Technologie. Die optimierte Energieverteilung ermöglicht längere Nutzungszeiten mit weniger Aufladungen. Ideal für Snacks, Getränke und kleinere Lebensmittel. Passt in jede Tasche und ist diskret verwendbar. Behandlungszeit: 3-7 Minuten je nach Produktgröße. Gewicht: nur 1,2kg. Inklusive Transporttasche aus natürlichen Materialien."
    },
    {
        id: 6,
        name: "KlarKraft Brett CRYSTA - Schmuck & Steine",
        description: "Speziell für Energetisierung von Edelsteinen, Ketten und Amuletten. Komplettes Set mit Zubehör für Schmuckpflege.",
        price: 279.99,
        image: "💎",
        badge: "CRYSTA",
        category: "boards",
        tags: ["schmuck", "edelsteine", "kristalle", "set"],
        details: "Das CRYSTA KlarKraft Brett ist ausschließlich für die Energetisierung von Edelsteinen, Schmuck und spirituellen Objekten konzipiert. Die spezielle Kristall-Matrix verstärkt die natürlichen Eigenschaften von Edelsteinen und lädt sie mit positiver Energie auf. Ideal für Ringe, Ketten, Armbänder, Heilsteine und Amulette. Das Komplettset enthält: CRYSTA KlarKraft Brett (25x35cm), hochwertigen Leinenbeutel zur Aufbewahrung, 50ml energetisiertes Reinigungswasser und ein spezielles Mikrofaser-Reinigungstuch. Behandlungszeit: 15-30 Minuten für optimale Aufladung."
    },
    {
        id: 7,
        name: "Universumswasser Elixier",
        description: "Kraftvolle Ampullen mit energetisiertem Wasser zur Reinigung und Harmonisierung von Objekten und Räumen.",
        price: 49.99,
        image: "💧",
        category: "elixiers",
        tags: ["wasser", "ampullen", "reinigung", "harmonisierung"],
        details: "5 Ampullen à 10ml mit hochfrequent energetisiertem Wasser aus natürlichen Quellen. Das Wasser wurde unter Vollmondlicht mit einer Auswahl kraftvoller Kristalle (Bergkristall, Amethyst, Rosenquarz) energetisiert. Wenige Tropfen genügen, um Gegenstände, Räume oder sogar Lebensmittel von negativer Energie zu befreien. Anwendung: 2-3 Tropfen auf den Gegenstand geben oder in den Raum sprühen. Das Elixier wirkt sofort und hält bis zu 48 Stunden an. Hergestellt in einem speziellen Mondlicht-Ritual mit jahrhundertealten Techniken."
    },
    {
        id: 8,
        name: "Reinigungstücher KlarKRAFT",
        description: "Spezielle Mikrofasertücher mit eingewobenen Kristallpartikeln für die tägliche energetische Reinigung.",
        price: 39.99,
        image: "🧽",
        category: "accessories",
        tags: ["tücher", "mikrofaser", "kristalle", "reinigung"],
        details: "Set aus 3 hochwertigen Mikrofaser-Reinigungstüchern mit eingewobenen Bergkristall-Partikeln. Diese speziellen Tücher sind ideal für die tägliche energetische Reinigung von Gegenständen, Bildschirmen, Oberflächen und sogar Lebensmitteln. Die Kristallpartikel neutralisieren negative Energien beim Reinigungsvorgang. Größe: 30x30cm pro Tuch. Waschbar bis 40°C ohne Weichspüler. Die Tücher behalten ihre energetischen Eigenschaften auch nach häufigem Waschen. Perfekt für Smartphone-Displays, Computer, Spiegel und alle glatten Oberflächen."
    },
    {
        id: 9,
        name: "Kraftsteine Harmonisierung",
        description: "Ausgewählte Edelsteine zur Neutralisierung von Elektrosmog und negativen Schwingungen im Wohn- und Arbeitsbereich.",
        price: 79.99,
        image: "🔮",
        category: "stones",
        tags: ["edelsteine", "harmonisierung", "elektrosmog", "set"],
        details: "Komplettset aus 7 handverlesenen Kraftsteinen, jeder mit spezifischen energetischen Eigenschaften: Amethyst (Schutz und Klarheit), Rosenquarz (Liebe und Harmonie), Citrin (Erfolg und Fülle), Bergkristall (Verstärkung und Reinigung), Aventurin (Glück und Gelassenheit), Hämatit (Erdung und Stabilität), schwarzer Turmalin (Schutz vor negativen Energien). Jeder Stein ist energetisch gereinigt und für seinen Zweck programmiert. Anwendung: Steine im Raum verteilen oder bei sich tragen. Größe: 2-4cm Durchmesser pro Stein. Inklusive Beschreibung und Anwendungshinweisen."
    },
    {
        id: 10,
        name: "Neutralisator Sticker",
        description: "Praktische selbstklebende Sticker gegen Strichcodestrahlung für direkte Anbringung auf allen Produkten.",
        price: 29.99,
        image: "🏷️",
        category: "accessories",
        tags: ["sticker", "strichcode", "neutralisierung", "praktisch"],
        details: "20 selbstklebende Neutralisator-Sticker zur direkten Anbringung auf Produktverpackungen mit Strichcodes. Die Sticker enthalten eine spezielle Frequenz-Matrix, die die negativen Informationen von Strichcodes und QR-Codes sofort neutralisiert. Einfach über oder neben den Strichcode kleben - fertig! Die Sticker sind wasserfest, UV-beständig und halten auf allen Oberflächen. Größe: 15x10mm pro Sticker. Diskret und unauffällig. Ideal für Lebensmittel, Kosmetik, Elektronik und alle anderen Produkte mit Strichcodes. Wirkung hält dauerhaft an."
    }
];

// Master Employee Data
export const MASTER_EMPLOYEES = [
    {
        id: 'MASTER001',
        name: 'Marcus Energius',
        email: 'manager@klarkraft.de',
        password: 'manager123',
        role: 'Manager',
        permissions: ['all'],
        securityCode: 'KK-2025',
        avatar: '👔'
    },
    {
        id: 'MASTER002',
        name: 'Lisa Harmonika',
        email: 'support@klarkraft.de',
        password: 'support123',
        role: 'Support',
        permissions: ['view_customers', 'view_orders', 'edit_orders'],
        securityCode: 'KK-2025',
        avatar: '🎧'
    },
    {
        id: 'MASTER003',
        name: 'Admin User',
        email: 'admin@klarkraft.de',
        password: 'admin123',
        role: 'Administrator',
        permissions: ['all'],
        securityCode: 'KK-2025',
        avatar: '⚙️'
    }
];

// Demo Users
export const DEMO_USERS = [
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

// Legal Texts
export const LEGAL_TEXTS = {
    impressum: {
        title: "Impressum",
        content: `
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
        `
    },
    // Weitere rechtliche Texte hier...
};