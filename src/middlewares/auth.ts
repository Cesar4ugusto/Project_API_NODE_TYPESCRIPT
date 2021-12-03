import authConfig from "@config/authConfig";
import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function auth(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new AppError("Token is missing!", 401);
    }

    const [scheme, token] = authHeader.split(" ");

    if (!token) {
        throw new AppError("Token is missing!", 401);
    }

    if (!/^Bearer$/i.test(scheme)) {
        throw new AppError("Token is missing!", 401);
    }

    try {
        const verify = jwt.verify(token, authConfig.jwt.secret as jwt.Secret);
        const { sub } = verify as ITokenPayload;

        req.user = {
            id: sub,
        };

        return next();
    } catch (err) {
        throw new AppError("Access is not permitted!", 401);
    }
}
