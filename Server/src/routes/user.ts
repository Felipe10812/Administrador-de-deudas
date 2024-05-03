import { Router } from "express";
import { login, nuevoUsuario } from "../controllers/user";

const router = Router();

router.post('/', nuevoUsuario);
router.post('/login', login)

export default router;