import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

const DefinicionUsuarios = sequelize.define('Usuarios', {
    IdUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    Nombre: {
        type: DataTypes.CHAR
    },
    ApellidoPaterno: {
        type: DataTypes.CHAR
    },
    ApellidoMaterno: {
        type: DataTypes.CHAR
    },
    Contraseña: {
        type: DataTypes.STRING
    },
    IdDireccion: {
        type: DataTypes.STRING
    },
    Correo: {
        type: DataTypes.STRING
    },
    FechaRegistro: {
        type: DataTypes.DATE
    },
    EsActivo: {
        type: DataTypes.BOOLEAN
    },
    FechaModificacion: {
        type: DataTypes.DATE
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default DefinicionUsuarios;