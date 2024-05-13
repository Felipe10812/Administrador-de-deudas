"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.nuevoUsuario = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const connection_1 = __importDefault(require("../db/connection"));
const users_1 = __importDefault(require("../models/users"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nuevoUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, password, Correo } = req.body;
    const hashPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const user = yield users_1.default.findOne({ where: { Correo: Correo } });
        if (user) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el nombre ${userName}`
            });
        }
        else {
            // Ejecución del procedimiento almacenado
            yield connection_1.default.query(`exec procUsuariosNuevos '${userName}', '${hashPassword}', '${Correo}'`);
            res.json({
                msg: `Usuario ${userName} creado exitosamente`
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.nuevoUsuario = nuevoUsuario;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        // Validamos si el usuario existe en la base de datos 
        const user = yield users_1.default.findOne({ where: { Nombre: userName } });
        if (!user) {
            return res.status(400).json({
                msg: `No existe el usuario con el nombre ${userName}`
            });
        }
        // Validamos la contraseña 
        const ValidarContraseña = yield bcrypt_1.default.compare(password, user.Contraseña);
        if (!ValidarContraseña) {
            return res.status(400).json({
                msg: `Contraseña incorrecta`
            });
        }
        // generamos el token 
        const token = jsonwebtoken_1.default.sign({
            userName: userName,
        }, process.env.SECRET_KEY || 'Hola', {
            expiresIn: '30000000'
        });
        res.json(token);
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
});
exports.login = login;
