const { Sequelize, DataTypes } = require('sequelize');

const db = require('../dbsql');
const category = db.define(
    'category',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING,
        },
    },
    {
        freezeTableName: true,
    }
);
export default category;
//Above sequelize is equivalent to the query of creating table below
//sqlQuery : CREATE TABLE category(id INT AUTO_INCREMEMT PRIMARY KEY, name VARCHAR(100),description VARCHAR(500))
