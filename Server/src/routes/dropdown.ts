import { Router } from 'express';
import { getMediosPrestamo } from '../controllers/DropdownController';
import ValidateToken from './validate-token';

const router = Router();

// Ruta para obtener los medios de préstamo
//router.get('/medios-prestamo', dropdownController.getMediosPrestamo);
router.get('/', ValidateToken, getMediosPrestamo);

export default router;
