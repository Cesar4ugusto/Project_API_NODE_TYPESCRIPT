import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "@modules/users/typeorm/entities/User";
import { UsersRepository } from "@modules/users/typeorm/repositories/UsersRepository";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import authConfig from "@config/authConfig";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class AuthenticatedService {
    public async init({ email, password }: IRequest): Promise<IResponse> {
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User not found!", 401);
        }

        const confirmPassword = await bcrypt.compare(password, user.password);

        if (!confirmPassword) {
            throw new AppError("Password incorrect!", 401);
        }

        const token = jwt.sign({}, authConfig.jwt.secret as jwt.Secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return { user, token };
    }
}

export default AuthenticatedService;
