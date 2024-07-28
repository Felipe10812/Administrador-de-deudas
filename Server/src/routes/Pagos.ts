import { Router } from "express";
import { postPago } from "../controllers/Deudas";
import ValidateToken from "./validate-token";

const router = Router();

router.post('/', ValidateToken, postPago);

export default router;