import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

const DefinicionUsuarios = sequelize.define('MediosPagoPrestamos', {
    IdMedio: {
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
    FechaRegistro: {
        type: DataTypes.DATE
    },
    EstadoActivo: {
        type: DataTypes.BOOLEAN
    },
}, {
    freezeTableName: true,
    timestamps: false
});

export default DefinicionUsuarios;