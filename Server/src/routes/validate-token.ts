import { Request, Response, NextFunction } from 'express'
import jws from 'jsonwebtoken';

const ValidateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization']
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        // Tiene token 
        try {
            const bearerToken = headerToken.slice(7);
            jws.verify(bearerToken, process.env.SECRET_KEY || 'Hola');
            next()
        } catch (error) {
            res.status(401).json({
                msg: 'Accedo deneagdo'
            })
        }
    } else {
        res.status(401).json({
            msg: 'Accedo deneagdo'
        })
    }
}

export default ValidateToken;