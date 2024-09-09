import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

const TiposTransaccion = sequelize.define('TiposTransaccion', {
    IdTiposTransaccion: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nombre: {
        type: DataTypes.CHAR
    },
    Descripcion: {
        type: DataTypes.STRING
    },
    EsActivo: {
        type: DataTypes.BOOLEAN
    },
}, {
    freezeTableName: true,
    timestamps: false
});

export default TiposTransaccion;