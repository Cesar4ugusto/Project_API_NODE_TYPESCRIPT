import AppError from "@shared/errors/AppError";
import multerConfig from "@config/multerConfig";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import path from "path";
import fs from "fs";

interface IRequest {
    user_id: string;
    avatar: string;
}

class UpdateUserAvatarService {
    public async init({ user_id, avatar }: IRequest): Promise<User | undefined> {
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not found!");
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(multerConfig.dest, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatar;

        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
