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
    SegundoNombre: {
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
    Direccion: {
        type: DataTypes.STRING
    },
    EstadoActivo: {
        type: DataTypes.BOOLEAN
    },
    IdEstadoDeuda: {
        type: DataTypes.NUMBER
    },
    FechaModificacion: {
        type: DataTypes.DATE
    },
    FechaRegistro: {
        type: DataTypes.DATE
    },
    Correo: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default DefinicionUsuarios;