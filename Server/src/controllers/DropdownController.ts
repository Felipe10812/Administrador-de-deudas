import { Request, Response } from 'express';
import sequelize from '../db/connection';

// Método para obtener los medios de préstamo
export const getMediosPrestamo = async (req: Request, res: Response) => {
    try {
        const mediosPrestamo = await sequelize.query('exec MediosPagoPrestamo');
        res.json(mediosPrestamo);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los medios de préstamo: ', error });
    }
}

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const ListadoUsuarios = await sequelize.query('exec procListaDeudores');
        res.json(ListadoUsuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios: ', error });
    }
}

export const getRoles = async (req: Request, res: Response) => {
    try {
        const ListaRoles = await sequelize.query('exec procListaRoles');
        res.json(ListaRoles);
        console.log(ListaRoles);
    } catch (error) {
        console.error('Error al obtener los roles:', error);
        res.status(500).json({ message: 'Error al obtener los roles: ', error });
    }
}