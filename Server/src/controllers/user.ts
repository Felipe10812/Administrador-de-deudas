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

    try {
        // Encriptar la contraseña
        const hashPassword = await bcrypt.hash(password, 10);

        // Verificar si el usuario ya existe
        const user = await sequelize.query(
            'SELECT * FROM Usuarios WHERE Correo = $1',
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
        console.error('Error al crear el usuario:', error);
        res.status(500).json({
            msg: 'Ocurrió un error al crear el usuario',
            error
        });
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        ;
        const { Correo, password } = req.body

        // Validar si el usuario existe en la base de datos 
        const user: any = await DefinicionUsuarios.findOne({ where: { Correo } });

        if (!user) {
            return res.status(400).json({
                msg: `No existe el usuario con el correo ${Correo}`
            });
        }

        // Validar la contraseña 
        const isPasswordValid = await bcrypt.compare(password, user.Contraseña);

        if (!isPasswordValid) {
            return res.status(400).json({
                msg: `Contraseña incorrecta`
            });
        }

        // Generar el token 
        const token = jws.sign(
            {
                Correo: user.Correo,
            },
            process.env.SECRET_KEY || 'Hola', // Usa una variable de entorno para la clave secreta
            {
                expiresIn: '1h' // Define el tiempo de expiración según sea necesario
            }
        );

        res.json({ token });

    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({
            msg: 'Ocurrió un error',
            error
        });
    }
};

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