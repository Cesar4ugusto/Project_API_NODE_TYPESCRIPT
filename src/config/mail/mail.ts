interface IMailConfig {
    driver: "ethereal" | "ses";
    defaults: {
        from: {
            email: string;
            name: string;
        };
    };
}

export default {
    driver: process.env.MAIL_DRIVER || "ethereal",
    defaults: {
        from: {
            email: "contato@bayondcode.com",
            name: "César Augusto - CTO Bayond",
        },
    },
} as IMailConfig;
