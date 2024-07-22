import { Request, Response } from "express";
import sequelize from "../db/connection";
import { QueryTypes } from 'sequelize';

export const getDeudas = async (req: Request, res: Response) => {
    const ListaDeudas = await sequelize.query('exec procConsultaDeudaPorUsuario')
    console.log(ListaDeudas);
    res.json(ListaDeudas);
}

export const postDeuda = async (req: Request, res: Response) => {
    const { IdUsuario, IdMedioPrestamo, Cantidad, Motivo, FechaRegistro } = req.body;

    try {
        // Ejecución del procedimiento almacenado
        const result = await sequelize.query(
            'exec procAgregarDeuda :IdUsuario, :IdMedioPrestamo, :Cantidad, :Motivo, :FechaRegistro',
            {
                replacements: {
                    IdUsuario,
                    IdMedioPrestamo,
                    Cantidad,
                    Motivo,
                    FechaRegistro
                },
                type: QueryTypes.RAW  // Utiliza QueryTypes aquí
            }
        );

        if (result) {
            res.json({
                msg: 'Deuda agregada correctamente.'
            });
        } else {
            res.status(400).json({
                msg: 'Ocurrió un error.'
            });
        }
    } catch (error) {
        console.error('Error al ejecutar el procedimiento almacenado:', error);

        if (error instanceof Error) {
            res.status(500).json({
                msg: 'Ocurrió un error en el servidor.',
                error: error.message
            });
        } else {
            res.status(500).json({
                msg: 'Ocurrió un error en el servidor.',
                error: String(error)
            });
        }
    }
};