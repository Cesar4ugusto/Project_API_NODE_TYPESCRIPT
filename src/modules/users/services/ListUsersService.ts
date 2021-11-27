import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";

class ListUserstService {
    public async init(): Promise<User[]> {
        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.find();

        return user;
    }
}

export default ListUserstService;
