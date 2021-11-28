import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UserTokenRepository } from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";

interface IRequest {
    email: string;
}

class SendForgotPasswordEmailService {
    public async init({ email }: IRequest): Promise<void> {
        const userRepository = getCustomRepository(UsersRepository);
        const userTokenRepository = getCustomRepository(UserTokenRepository);

        const user = await userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User does not exists!");
        }

        const { token } = await userTokenRepository.generate(user.id);
        // console.log(token);

        // console.log(email);

        await EtherealMail.sendMail({
            to: { name: user.name, email: user.email },
            subject: "Recuperaçã de senha",
            templateData: {
                template: `Ola {{name}}: {{token}}`,
                variables: {
                    name: user.name,
                    token,
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;
