import { Request, Response } from "express";
import sequelize from "../db/connection";
import { QueryTypes } from 'sequelize';

export const getDeudas = async (req: Request, res: Response) => {
    const ListaDeudas = await sequelize.query('exec procConsultaDeudaPorUsuario')
    console.log(ListaDeudas);
    res.json(ListaDeudas);
}

export const getDeudores = async (req: Request, res: Response) => {
    // Extraer IdUsuario de los parámetros de consulta
    const IdUsuario = parseInt(req.query.IdUsuario as string, 10);

    try {
        if (isNaN(IdUsuario)) {
            return res.status(400).json({ msg: 'IdUsuario es inválido.' });
        }

        // Ejecutar el procedimiento almacenado
        const ListaDeudasPagos = await sequelize.query(
            'EXEC procConsultaDeudasPagosUsuario :IdUsuario',
            {
                replacements: { IdUsuario },
                type: QueryTypes.SELECT // Utiliza QueryTypes.SELECT para resultados en formato JSON
            }
        );

        // Verificar si hay resultados
        if (ListaDeudasPagos.length > 0) {
            res.json(ListaDeudasPagos);
            console.log(ListaDeudasPagos); // Útil para depuración
        } else {
            res.status(404).json({ msg: 'No se encontraron datos para el usuario especificado.' });
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

export const postPago = async (req: Request, res: Response) => {
    const { IdUsuario, IdMedioPago, Cantidad, Motivo, FechaRegistro } = req.body;

    try {
        // Ejecución del procedimiento almacenado
        const result = await sequelize.query(
            'exec procAgregarPago :IdUsuario, :IdMedioPago, :Cantidad, :Motivo, :FechaRegistro',
            {
                replacements: {
                    IdUsuario,
                    IdMedioPago,
                    Cantidad,
                    Motivo,
                    FechaRegistro
                },
                type: QueryTypes.RAW  // Utiliza QueryTypes aquí
            }
        );

        if (result) {
            res.json({
                msg: 'Pago agregado correctamente.'
            })
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