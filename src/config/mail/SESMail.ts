import nodemailer from "nodemailer";
import aws from "aws-sdk";
import mailConfig from "@config/mail/mail";
import HandlebarsMailTemplate from "./HandlebarsMailTemplate";

interface ITemplateVariable {
    [key: string]: string | number;
}

interface IParseMailTemplate {
    file: string;
    variables: ITemplateVariable;
}

interface IMailContact {
    name: string;
    email: string;
}

interface ISendMail {
    from?: IMailContact;
    to: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

export default class SESMail {
    static async sendMail({ from, to, subject, templateData }: ISendMail): Promise<void> {
        const mailTemplate = new HandlebarsMailTemplate();

        const transporter = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: "2010-12-01",
            }),
        });

        const { email, name } = mailConfig.defaults.from;

        const message = await transporter.sendMail({
            from: {
                name: from?.name || name,
                address: from?.email || email,
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject: subject,
            html: await mailTemplate.parse(templateData),
        });
    }
}
