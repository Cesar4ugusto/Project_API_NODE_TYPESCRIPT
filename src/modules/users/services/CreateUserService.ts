import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import * as bcrypt from "bcryptjs";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async init({ name, email, password }: IRequest): Promise<User> {
        const userRepository = getCustomRepository(UsersRepository);
        const emailExists = await userRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError("There is already one user with this email");
        }

        const hash = await bcrypt.hash(password, 16);

        const user = await userRepository.create({ name, email, password: hash });

        await userRepository.save(user);

        return user;
    }
}

export default CreateUserService;
