import { Router } from "express";
import { getDeudas, getDeudores, postDeuda } from "../controllers/Deudas";
import ValidateToken from "./validate-token";

const router = Router();

router.get('/Deudas', ValidateToken, getDeudas);
router.get('/Deudores', ValidateToken, getDeudores);
router.post('/', ValidateToken, postDeuda);

export default router;