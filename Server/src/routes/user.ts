import { Router } from "express";
import { deleteUser, login, nuevoUsuario } from "../controllers/user";
import ValidateToken from "./validate-token";

const router = Router();

router.post('/', nuevoUsuario);
router.post('/login', login)
router.post('/delete', ValidateToken, deleteUser)

export default router;