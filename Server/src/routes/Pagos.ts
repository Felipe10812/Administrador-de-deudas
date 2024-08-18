import { Router } from "express";
import { postPago, postRegistro } from "../controllers/Deudas";
import ValidateToken from "./validate-token";

const router = Router();

router.post('/Pagos', ValidateToken, postPago);
router.post('/Registro', ValidateToken, postRegistro);

export default router;