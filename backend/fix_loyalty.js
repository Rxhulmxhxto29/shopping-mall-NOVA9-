const db = require('./config/database');

async function fixLoyaltyPoints() {
  await db.initDatabase();
  const wrapper = global.db;
  
  // Get all users
  const users = wrapper.prepare('SELECT user_id FROM users').all();
  console.log(`Found ${users.length} users`);
  
  // Add loyalty points for users who don't have them
  users.forEach(user => {
    try {
      wrapper.prepare(`
        INSERT OR IGNORE INTO loyalty_points (user_id, total_points, current_tier)
        VALUES (?, 0, 'Bronze')
      `).run(user.user_id);
      console.log(`Added loyalty points for user ${user.user_id}`);
    } catch (error) {
      console.log(`User ${user.user_id} already has loyalty points`);
    }
  });
  
  global.saveDb();
  console.log('✅ All users now have loyalty points!');
  
  // Verify
  const loyaltyCount = wrapper.prepare('SELECT COUNT(*) as count FROM loyalty_points').get();
  console.log(`Total loyalty_points entries: ${loyaltyCount.count}`);
  
  process.exit(0);
}

fixLoyaltyPoints().catch(console.error);
