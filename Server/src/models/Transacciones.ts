import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

const Transacciones = sequelize.define('Transacciones', {
    IdTransaccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    IdUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Usuarios', // Nombre de la tabla a la que hace referencia
            key: 'IdUsuario' // Nombre de la columna a la que hace referencia en la tabla Usuarios
        }
    },
    IdMedio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'MediosTransaccion', // Nombre de la tabla a la que hace referencia
            key: 'IdMedio' // Nombre de la columna a la que hace referencia en la tabla MediosTransaccion
        }
    },
    IdTipotransaccion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'TiposTransaccion', // Nombre de la tabla a la que hace referencia
            key: 'IdTipoTransaccion' // Nombre de la columna a la que hace referencia en la tabla TiposTransaccion
        }
    },
    Cantidad: {
        type: DataTypes.DECIMAL(10, 2), // DECIMAL(precision, scale)
        allowNull: false // Aseguramos que la cantidad no sea nula
    },
    Motivo: {
        type: DataTypes.STRING
    },
    FechaModificacion: {
        type: DataTypes.DATE
    },
    FechaRegistro: {
        type: DataTypes.DATE
    },
    EsActivo: {
        type: DataTypes.BOOLEAN
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Transacciones;