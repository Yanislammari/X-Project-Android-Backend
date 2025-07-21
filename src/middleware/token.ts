import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserSchema from '../models/user.schema';
import dotenv from 'dotenv';

dotenv.config();
const TOKEN_KEY = process.env.SECRET_KEY as string;

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers['authorization'] as string)?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access Denied: No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, TOKEN_KEY);
        const user = await UserSchema.findOne({where: { id: (decoded as { id: string }).id }});
        if (user) {
            (req as any).user = user;
            return next(); 
        }

        return res.status(401).json({ message: 'Access Denied: Invalid user.' }); //fail case
    } catch (e) {
        console.log(e);
        return res.status(400).json({ message: 'Invalid token.' });
    }
};

export const createVerifyTokenMiddleware = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        verifyToken(req, res, next);
    };
};
