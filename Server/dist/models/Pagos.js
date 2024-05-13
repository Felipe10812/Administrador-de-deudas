"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const DefinicionPagos = connection_1.default.define('Pagos', {
    IdPago: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    IdUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Usuarios', // Nombre de la tabla a la que hace referencia
            key: 'IdUsuario' // Nombre de la columna a la que hace referencia en la tabla Usuarios
        }
    },
    IdMedioPago: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'MediosPagoPrestamos', // Nombre de la tabla a la que hace referencia
            key: 'IdMedio' // Nombre de la columna a la que hace referencia en la tabla Usuarios
        }
    },
    Cantidad: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2), // DECIMAL(precision, scale)
        allowNull: false // Aseguramos que la cantidad no sea nula
    },
    Motivo: {
        type: sequelize_1.DataTypes.STRING
    },
    FechaModificacion: {
        type: sequelize_1.DataTypes.DATE
    },
    FechaRegistro: {
        type: sequelize_1.DataTypes.DATE
    },
    EsActivo: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = DefinicionPagos;
