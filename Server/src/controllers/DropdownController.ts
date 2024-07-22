import { Request, Response } from 'express';
import DefinicionMediosPagoPrestamos from '../models/MediosPago';

// Método para obtener los medios de préstamo
export const getMediosPrestamo = async (req: Request, res: Response) => {
    try {
        const mediosPrestamo = await DefinicionMediosPagoPrestamos.findAll();
        return res.json(mediosPrestamo);
    } catch (error) {
        console.error('Error al obtener los medios de préstamo:', error);
        return res.status(500).json({ message: 'Error al obtener los medios de préstamo' });
    }
}

