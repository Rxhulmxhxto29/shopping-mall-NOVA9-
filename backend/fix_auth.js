const fs = require('fs');
const content = fs.readFileSync('routes/auth.js', 'utf8');
const fixed = content.replace(/prepare\('INSERT INTO loyalty_points[^;]+;/s, +"prepare('INSERT INTO loyalty_points (user_id, total_points, current_tier) VALUES (?, ?, ?)');"+);
fs.writeFileSync('routes/auth.js', fixed);
console.log('Fixed!');
