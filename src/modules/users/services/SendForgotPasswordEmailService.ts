import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../typeorm/repositories/UsersRepository";
import { UserTokenRepository } from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";
import SESMail from "@config/mail/SESMail";
import mailConfig from "@config/mail/mail";
import path from "path";

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

        const forgortPasswordTemplate = path.resolve(
            __dirname,
            "..",
            "..",
            "..",
            "templates",
            "forgot_password.hbs",
        );

        if (mailConfig.driver === "ses") {
            await SESMail.sendMail({
                to: { name: user.name, email: user.email },
                subject: "Recuperaçã de senha",
                templateData: {
                    file: forgortPasswordTemplate,
                    variables: {
                        name: user.name,
                        link: `${process.env.APP_WEB_URL}/reset-password/${token}`,
                    },
                },
            });
            return;
        }

        await EtherealMail.sendMail({
            to: { name: user.name, email: user.email },
            subject: "Recuperaçã de senha",
            templateData: {
                file: forgortPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset-password/${token}`,
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;
