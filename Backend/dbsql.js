const Sequelize = require('sequelize');
const db = new Sequelize('westsidenode', 'user', 'karthik', {
    host: 'localhost',
    dialect: 'mysql',
});
module.exports = db;
