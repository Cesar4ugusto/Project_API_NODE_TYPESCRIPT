import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import DiskStorageProvider from "@shared/Providers/DiskStorageProvider/DiskStorageProvider";

interface IRequest {
    user_id: string;
    avatar: string;
}

class UpdateUserAvatarService {
    public async init({ user_id, avatar }: IRequest): Promise<User | undefined> {
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.findById(user_id);

        const storageProvider = new DiskStorageProvider();

        if (!user) {
            throw new AppError("User not found!");
        }

        if (user.avatar) {
            // const userAvatarFilePath = path.join(multerConfig.dest, user.avatar);
            // const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            // if (userAvatarFileExists) {
            //     await fs.promises.unlink(userAvatarFilePath);
            // }
            await storageProvider.deleteFile(user.avatar);
        }

        const filename = await storageProvider.saveFile(avatar);

        // user.avatar = avatar;
        user.avatar = filename;

        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
