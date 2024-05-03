import { Router } from "express";
import { getDeudas } from "../controllers/Deudas";
import ValidateToken from "./validate-token";

const router = Router();

router.get('/', ValidateToken, getDeudas);

export default router;