import { Request, Response } from 'express';
import sequelize from '../db/connection';

// Método para obtener los medios de préstamo
export const getMediosPrestamo = async (req: Request, res: Response) => {
    try {
        const mediosPrestamo = await sequelize.query('exec MediosPagoPrestamo');
        console.log(mediosPrestamo);
        res.json(mediosPrestamo);
    } catch (error) {
        console.error('Error al obtener los medios de préstamo:', error);
        res.status(500).json({ message: 'Error al obtener los medios de préstamo' });
    }
}

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const ListadoUsuarios = await sequelize.query('exec procListaDeudores');
        console.log(ListadoUsuarios);
        res.json(ListadoUsuarios);
    } catch (error) {
        console.error('Error al obtener los Usuarios:', error);
        res.status(500).json({ message: 'Error al obtener los usuarios :(' });
    }
}