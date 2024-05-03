import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

const DefinicionDeudas = sequelize.define('Prestamos', {
    IdPrestamo: {
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
    IdMedioPrestamo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'MediosPagoPrestamos', // Nombre de la tabla a la que hace referencia
            key: 'IdMedio' // Nombre de la columna a la que hace referencia en la tabla MediosPrestamo
        }
    },
    Cantidad: {
        type: DataTypes.DECIMAL(10, 2), // DECIMAL(precision, scale)
        allowNull: false // Aseguramos que la cantidad no sea nula
    },
    Motivo: {
        type: DataTypes.STRING
    },
    FechaRegistro: {
        type: DataTypes.DATE
    },
    FechaModificacion: {
        type: DataTypes.DATE
    },
    EsActivo: {
        type: DataTypes.BOOLEAN
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default DefinicionDeudas;