import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import sequelize from "../db/connection";
import DefinicionUsuarios from "../models/users";
import jws from 'jsonwebtoken';
import { QueryTypes } from "sequelize";

export const nuevoUsuario = async (req: Request, res: Response) => {
    const { userName, password, Correo } = req.body;

    // Asegúrate de que los datos necesarios están presentes
    if (!userName || !password || !Correo) {
        return res.status(400).json({
            msg: 'Faltan datos necesarios para crear el usuario'
        });
    }

    // Validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            msg: 'La contraseña no cumple con los requisitos: debe tener al menos 8 caracteres, incluir una letra mayúscula, una minúscula, un número y un carácter especial.'
        });
    }

    try {
        // Encriptar la contraseña
        const hashPassword = await bcrypt.hash(password, 10);

        // Verificar si el usuario ya existe
        const user = await sequelize.query(
            'SELECT * FROM "Usuarios" WHERE "Correo" = $1',
            {
                bind: [Correo],
                type: QueryTypes.SELECT
            }
        );

        if (user.length > 0) {
            return res.status(400).json({
                msg: `Ya existe un usuario con el correo ${Correo}`
            });
        }

        // Llamar a la función de PostgreSQL para insertar el nuevo usuario
        await sequelize.query(
            'SELECT crear_usuario($1, $2, $3)',
            {
                bind: [userName, hashPassword, Correo]
            }
        );

        res.json({
            msg: `Usuario ${userName} creado exitosamente`
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Ocurrió un error al crear el usuario',
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
                msg: `No existe el usuario con el correo ${Correo}`
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