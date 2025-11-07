const createTables = () => {
    try {
        const db = global.db;
        
        // Users table
        db.prepare(`
            CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                first_name TEXT NOT NULL,
                last_name TEXT NOT NULL,
                phone TEXT,
                date_of_birth TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `).run();

        // Loyalty points table
        db.prepare(`
            CREATE TABLE IF NOT EXISTS loyalty_points (
                points_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                total_points INTEGER DEFAULT 0,
                current_tier TEXT DEFAULT 'Silver',
                tier_progress INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `).run();

        // Orders table
        db.prepare(`
            CREATE TABLE IF NOT EXISTS orders (
                order_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                total_amount REAL NOT NULL,
                payment_method TEXT,
                status TEXT DEFAULT 'pending',
                shipping_address TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `).run();

        // Order items table
        db.prepare(`
            CREATE TABLE IF NOT EXISTS order_items (
                item_id INTEGER PRIMARY KEY AUTOINCREMENT,
                order_id INTEGER NOT NULL,
                product_name TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                price REAL NOT NULL,
                image_url TEXT,
                FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE
            )
        `).run();

        // Events bookings table
        db.prepare(`
            CREATE TABLE IF NOT EXISTS event_bookings (
                booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                event_name TEXT NOT NULL,
                event_date TEXT NOT NULL,
                number_of_tickets INTEGER DEFAULT 1,
                status TEXT DEFAULT 'confirmed',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `).run();

        // Restaurant reservations table
        db.prepare(`
            CREATE TABLE IF NOT EXISTS restaurant_reservations (
                reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                restaurant_name TEXT NOT NULL,
                reservation_date TEXT NOT NULL,
                reservation_time TEXT NOT NULL,
                number_of_guests INTEGER NOT NULL,
                special_requests TEXT,
                status TEXT DEFAULT 'confirmed',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `).run();

        // Lost and found items table
        db.prepare(`
            CREATE TABLE IF NOT EXISTS lost_found_items (
                item_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                item_type TEXT,
                item_name TEXT NOT NULL,
                description TEXT,
                location_found TEXT,
                date_found TEXT,
                status TEXT DEFAULT 'unclaimed',
                contact_email TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
            )
        `).run();

        // Personal shopper bookings table
        db.prepare(`
            CREATE TABLE IF NOT EXISTS personal_shopper_bookings (
                booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                stylist_name TEXT NOT NULL,
                booking_date TEXT NOT NULL,
                booking_time TEXT NOT NULL,
                notes TEXT,
                status TEXT DEFAULT 'scheduled',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `).run();

        // Feedback table
        db.prepare(`
            CREATE TABLE IF NOT EXISTS customer_feedback (
                feedback_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                rating INTEGER CHECK (rating >= 1 AND rating <= 5),
                category TEXT,
                feedback_text TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `).run();

        // Gift cards table
        db.prepare(`
            CREATE TABLE IF NOT EXISTS gift_cards (
                card_id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                card_code TEXT UNIQUE NOT NULL,
                amount REAL NOT NULL,
                recipient_email TEXT NOT NULL,
                recipient_name TEXT,
                message TEXT,
                design_type TEXT,
                status TEXT DEFAULT 'active',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
            )
        `).run();

        global.saveDb();
        console.log('✅ All tables created successfully');
    } catch (error) {
        console.error('❌ Error creating tables:', error);
    }
};

module.exports = createTables;
