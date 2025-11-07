const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'nova9_mall.db');

async function fixLoyaltyPoints() {
    try {
        const SQL = await initSqlJs();
        const buffer = fs.readFileSync(dbPath);
        const db = new SQL.Database(buffer);

        // Get all users
        const users = db.exec('SELECT user_id FROM users');
        console.log(`Found ${users[0]?.values.length || 0} users`);

        // Add loyalty points for all users
        users[0]?.values.forEach(([userId]) => {
            db.run(`
                INSERT OR REPLACE INTO loyalty_points (user_id, total_points, current_tier)
                VALUES (?, 100, 'Bronze')
            `, [userId]);
            console.log(`✅ Set loyalty points for user ${userId}`);
        });

        // Save the database
        const data = db.export();
        fs.writeFileSync(dbPath, Buffer.from(data));
        db.close();

        console.log('\n✅ All users now have loyalty points initialized!');
        
        // Verify
        const SQL2 = await initSqlJs();
        const buffer2 = fs.readFileSync(dbPath);
        const db2 = new SQL2.Database(buffer2);
        const result = db2.exec('SELECT COUNT(*) FROM loyalty_points');
        console.log(`Total loyalty_points entries: ${result[0]?.values[0][0]}`);
        db2.close();

    } catch (error) {
        console.error('Error:', error);
    }
}

fixLoyaltyPoints();
