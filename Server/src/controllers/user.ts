import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import sequelize from "../db/connection";
import DefinicionUsuarios from "../models/users";
import jws from 'jsonwebtoken';

export const nuevoUsuario = async (req: Request, res: Response) => {
    const { userName, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await DefinicionUsuarios.findOne({ where: { Nombre: userName } })
    try {
        if (user) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el nombre ${userName}`
            });
        }
        else {
            // Ejecución del procedimiento almacenado
            await sequelize.query(`exec procUsuariosNuevos '${userName}', '${hashPassword}'`);

            res.json({
                msg: `Usuario ${userName} creado exitosamente`
            });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;
        // Validamos si el usuario existe en la base de datos 
        const user: any = await DefinicionUsuarios.findOne({ where: { Nombre: userName } })
        if (!user) {
            return res.status(400).json({
                msg: `No existe el usuario con el nombre ${userName}`
            });
        }
        // Validamos la contraseña 
        const ValidarContraseña = await bcrypt.compare(password, user.Contraseña)

        if (!ValidarContraseña) {
            return res.status(400).json({
                msg: `Contraseña incorrecta`
            })
        }
        // generamos el token 
        const token = jws.sign({
            userName: userName,
        }, process.env.SECRET_KEY || 'Hola', {
            expiresIn: '30000000'
        });

        res.json(token)

    } catch (error) {
        console.error(error);
        res.status(400).json({
            msg: 'Ocurrio un error',
            error
        });
    }
}