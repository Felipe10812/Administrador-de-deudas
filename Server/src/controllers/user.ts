import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import sequelize from "../db/connection";
import DefinicionUsuarios from "../models/users";
import jws from 'jsonwebtoken';
import { QueryTypes } from "sequelize";

export const nuevoUsuario = async (req: Request, res: Response) => {
    const { userName, password, Correo } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    try {
        const user = await DefinicionUsuarios.findOne({ where: { Correo: Correo } })
        if (user) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el nombre ${userName}`
            });
        }
        else {
            // Ejecución del procedimiento almacenado
            await sequelize.query(`exec procUsuariosNuevos '${userName}', '${hashPassword}', '${Correo}'`);

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
        const { Correo, password } = req.body;
        // Validamos si el usuario existe en la base de datos 
        const user: any = await DefinicionUsuarios.findOne({ where: { Correo: Correo } })
        if (!user) {
            return res.status(400).json({
                msg: `No existe el usuario con el nombre ${Correo}`
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
            Correo: Correo,
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

export const deleteUser = async (req: Request, res: Response) => {
    const { IdUsuario, esActivo } = req.body;

    try {
        const result = await sequelize.query(
            'exec procUsuarioD :IdUsuario, :esActivo', {
            replacements: {
                IdUsuario,
                esActivo
            },
            type: QueryTypes.RAW
        }
        );
        if (result) {
            res.json({
                msg: 'Usuario eliminado con exito'
            })
        } else {
            res.status(400).json({
                msg: 'Ocurrio un error'
            });
        }

    } catch (error) {
        console.error('Error al ejecutar el procedimiento almacenado:', error);

        if (error instanceof Error) {
            res.status(500).json({
                msg: 'Ocurrió un error en el servidor.',
                error: error.message
            });
        } else {
            res.status(500).json({
                msg: 'Ocurrió un error en el servidor.',
                error: String(error)
            });
        }
    }
}