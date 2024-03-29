require('dotenv').config();
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    waitForConnection: true,
    connectionLimit: 10,
    queueLimit: 0,
});
module.exports = pool;
