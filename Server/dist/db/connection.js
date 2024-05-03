"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('Finanzas', 'Admin1', 'Admin1', {
    host: 'LAPTOP-QIJM9HA8\\SQLEXPRESS', // Es importante usar doble barra invertida para el carácter de escape
    database: 'Finanzas',
    dialect: 'mssql'
});
exports.default = sequelize;
