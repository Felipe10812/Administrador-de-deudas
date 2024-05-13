"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const DefinicionUsuarios = connection_1.default.define('MediosPagoPrestamos', {
    IdMedio: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nombre: {
        type: sequelize_1.DataTypes.CHAR
    },
    Descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    FechaRegistro: {
        type: sequelize_1.DataTypes.DATE
    },
    EstadoActivo: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = DefinicionUsuarios;
