"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const DefinicionEstadosDeuda = connection_1.default.define('EstadosDeuda', {
    IdEstado: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: sequelize_1.DataTypes.STRING
    },
    Descripcion: {
        type: sequelize_1.DataTypes.STRING
    },
    EsActivo: {
        type: sequelize_1.DataTypes.BOOLEAN
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = DefinicionEstadosDeuda;
