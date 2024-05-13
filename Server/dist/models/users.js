"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const DefinicionUsuarios = connection_1.default.define('Usuarios', {
    IdUsuario: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nombre: {
        type: sequelize_1.DataTypes.CHAR
    },
    SegundoNombre: {
        type: sequelize_1.DataTypes.CHAR
    },
    ApellidoPaterno: {
        type: sequelize_1.DataTypes.CHAR
    },
    ApellidoMaterno: {
        type: sequelize_1.DataTypes.CHAR
    },
    Contraseña: {
        type: sequelize_1.DataTypes.STRING
    },
    Direccion: {
        type: sequelize_1.DataTypes.STRING
    },
    EstadoActivo: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    IdEstadoDeuda: {
        type: sequelize_1.DataTypes.NUMBER
    },
    FechaModificacion: {
        type: sequelize_1.DataTypes.DATE
    },
    FechaRegistro: {
        type: sequelize_1.DataTypes.DATE
    },
    Correo: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.default = DefinicionUsuarios;
