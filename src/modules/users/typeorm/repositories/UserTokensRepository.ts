import { EntityRepository, Repository } from "typeorm";
import UserTokens from "../entities/UserTokens";

@EntityRepository(UserTokens)
export class UserTokenRepository extends Repository<UserTokens> {
    public async findByToken(token: string): Promise<UserTokens | undefined> {
        const userToken = await this.findOne({
            where: {
                token,
            },
        });
        return userToken;
    }

    public async generate(user_id: string): Promise<UserTokens | undefined> {
        const userToken = await this.create({
            user_id,
        });

        await this.save(userToken);

        return userToken;
    }
}
