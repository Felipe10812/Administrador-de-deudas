import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

const Direcciones = sequelize.define('Direcciones', {
    IdDireccion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Calle: {
        type: DataTypes.STRING
    },
    Ciudad: {
        type: DataTypes.STRING// DECIMAL(precision, scale)
    },
    Estado: {
        type: DataTypes.STRING
    },
    CodigoPostal: {
        type: DataTypes.NUMBER
    },
    Pais: {
        type: DataTypes.STRING
    },
    FechaRegistro: {
        type: DataTypes.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Direcciones;