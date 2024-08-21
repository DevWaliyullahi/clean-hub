import { Request, Response, NextFunction } from "express";
import User from "../model/users";
import Cleaner from "../model/cleaners";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


export function generateAccessToken(client: User | Cleaner) {
    const payload = {
        email: client.email,
        id: client.id,
    };
    const secret = process.env.secret || "default_secret"; // Provide a default value for secret

    const options = { expiresIn: "1h" };

    return jwt.sign(payload, secret, options);
}

interface AccessTokenPayload extends jwt.JwtPayload {
        email: string;
        id: string;
}

function verifyAccessToken(token: string) {
    const secret: string = process.env.secret || "default_secret"; // Provide a default value for secret

    try {
        const decoded = jwt.verify(token, secret) as AccessTokenPayload;
        return { success: true, data: decoded };
    } catch (error) {
        return { success: false, data: (error as Error).message };
    }
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.header("Authorization");

    const token = (req.session as any).token;
    const userId = (req.session as any).userId;

    if (!token) {
        res.redirect("/login");
    }

    const verification = verifyAccessToken(token);
    if (!verification.success) {
        res.redirect("/login");
    }
    next();
}

