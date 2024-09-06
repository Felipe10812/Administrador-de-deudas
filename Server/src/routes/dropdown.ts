import { Router } from 'express';
import { getMediosPrestamo, getRoles, getUsuarios } from '../controllers/DropdownController';
import ValidateToken from './validate-token';

const router = Router();

// Ruta para obtener los medios de préstamo
//router.get('/medios-prestamo', dropdownController.getMediosPrestamo);

router.get('/MediosPrestamo', ValidateToken, getMediosPrestamo);
router.get('/DropUsuarios', ValidateToken, getUsuarios);
router.get('/Roles', ValidateToken, getRoles);

export default router;
