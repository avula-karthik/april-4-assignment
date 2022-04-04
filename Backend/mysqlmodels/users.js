const { Sequelize, DataTypes } = require('sequelize');

const db = require('../dbsql');
const Users = db.define(
    'users',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
        dob: {
            type: DataTypes.DATE,
            //type:DataTypes.DATEONLY
        },
    },
    {
        freezeTableName: true,
    }
);
export default Users;
//equivalent sql query is below
//CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(30), password VARCHAR(30), dob DATE)
