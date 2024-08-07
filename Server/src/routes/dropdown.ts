import { Router } from 'express';
import { getMediosPrestamo, getUsuarios } from '../controllers/DropdownController';
import ValidateToken from './validate-token';

const router = Router();

// Ruta para obtener los medios de préstamo
//router.get('/medios-prestamo', dropdownController.getMediosPrestamo);

router.get('/MediosPrestamo', ValidateToken, getMediosPrestamo);
router.get('/DropUsuarios', ValidateToken, getUsuarios);

export default router;
