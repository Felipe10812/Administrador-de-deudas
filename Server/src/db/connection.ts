import { Sequelize } from "sequelize";

const sequelize = new Sequelize('Finanzas', 'Admin1', 'Admin1', {
    host: 'LAPTOP-QIJM9HA8\\SQLEXPRESS', // Es importante usar doble barra invertida para el carácter de escape
    database: 'Finanzas',
    dialect: 'mssql'
});

export default sequelize;
