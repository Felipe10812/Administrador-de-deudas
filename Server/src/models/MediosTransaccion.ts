import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

const MediosTransaccion = sequelize.define('MediosTransaccion', {
    IdMedio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING
    },
    Descripcion: {
        type: DataTypes.STRING
    },
    EsActivo: {
        type: DataTypes.BOOLEAN
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default MediosTransaccion;