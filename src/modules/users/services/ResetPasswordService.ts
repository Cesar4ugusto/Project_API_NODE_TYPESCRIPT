import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UserTokenRepository } from "../typeorm/repositories/UserTokensRepository";
import { isAfter, addHours } from "date-fns";
import * as bcrypt from "bcryptjs";

interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordService {
    public async init({ token, password }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UserTokenRepository);

        const userToken = await userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError("Something went wrong, try again!");
        }

        const user = await userRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError("User does not existis");
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError("Timeout expired!");
        }

        user.password = await bcrypt.hash(password, 16);

        await userRepository.save(user);
    }
}

export default ResetPasswordService;
