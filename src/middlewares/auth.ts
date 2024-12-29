import type { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import User, { IUser } from "../models/userModel"

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        const error = new Error('No autorizado')
        res.status(401).json({ error: error.message })
        return;
    }

    const [, token] = bearer.split(' ')

    if (!token) {
        const error = new Error('No autorizado')
        res.status(401).json({ error: error.message })
        return;
    }

    try {
        // Verifica que JWT_SECRET esté definido
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        // Asegura que el tipo de JWT_SECRET sea string
        const secret: string = process.env.JWT_SECRET;

        const result = jwt.verify(token, secret)
        if (typeof result === 'object' && result.id) {
            const user = await User.findById(result.id).select('-password')
            if (!user) {
                const error = new Error('El usuario no existe')
                res.status(404).json({ error: error.message })
                return;
            }
            req.user = user
            next()
        }
    } catch (error) {
        res.status(500).json({ error: 'Token no valido' })
    }

}