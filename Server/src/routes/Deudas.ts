import { Router } from "express";
import { getDeudas, postDeuda } from "../controllers/Deudas";
import ValidateToken from "./validate-token";

const router = Router();

router.get('/', ValidateToken, getDeudas);
router.post('/', ValidateToken, postDeuda);

export default router;