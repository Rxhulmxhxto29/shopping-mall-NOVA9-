const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const dbPath = path.resolve(__dirname, '../nova9_mall.db');

let db = null;

// Initialize the database
async function initDatabase() {
    const SQL = await initSqlJs();
    
    // Try to load existing database file or create new one
    if (fs.existsSync(dbPath)) {
        const filebuffer = fs.readFileSync(dbPath);
        db = new SQL.Database(filebuffer);
        console.log('✅ Connected to existing SQLite database');
    } else {
        db = new SQL.Database();
        console.log('✅ Created new SQLite database');
    }
    
    // Enable foreign keys
    db.run('PRAGMA foreign_keys = ON');
    
    return db;
}

// Save database to file
function saveDatabase() {
    if (db) {
        const data = db.export();
        const buffer = Buffer.from(data);
        fs.writeFileSync(dbPath, buffer);
    }
}

// Wrapper for prepared statements (to match better-sqlite3 API)
const dbWrapper = {
    prepare: (sql) => {
        return {
            run: (...params) => {
                try {
                    db.run(sql, params);
                    saveDatabase();
                    const result = db.exec("SELECT last_insert_rowid() as id");
                    return { lastInsertRowid: result[0]?.values[0]?.[0] || 0 };
                } catch (error) {
                    console.error('SQL Error:', error);
                    throw error;
                }
            },
            get: (...params) => {
                try {
                    const result = db.exec(sql, params);
                    if (result.length === 0) return null;
                    
                    const columns = result[0].columns;
                    const values = result[0].values[0];
                    
                    if (!values) return null;
                    
                    const row = {};
                    columns.forEach((col, index) => {
                        row[col] = values[index];
                    });
                    return row;
                } catch (error) {
                    console.error('SQL Error:', error);
                    throw error;
                }
            },
            all: (...params) => {
                try {
                    const result = db.exec(sql, params);
                    if (result.length === 0) return [];
                    
                    const columns = result[0].columns;
                    const values = result[0].values;
                    
                    return values.map(row => {
                        const obj = {};
                        columns.forEach((col, index) => {
                            obj[col] = row[index];
                        });
                        return obj;
                    });
                } catch (error) {
                    console.error('SQL Error:', error);
                    throw error;
                }
            }
        };
    }
};

module.exports = { initDatabase, dbWrapper, saveDatabase };
