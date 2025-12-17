const mysql = require("mysql2/promise");

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 20,
    waitForConnections: true,
    queueLimit: 0
});
async function db_connection() {
    const conn = await db.getConnection();
    console.log("Database connected..");
    conn.release();
}

module.exports = { db, db_connection };
