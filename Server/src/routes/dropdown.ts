import { Router } from 'express';
import { getMediosPrestamo } from '../controllers/DropdownController';

const router = Router();

// Ruta para obtener los medios de préstamo
//router.get('/medios-prestamo', dropdownController.getMediosPrestamo);
router.post('/', getMediosPrestamo);

export default router;
