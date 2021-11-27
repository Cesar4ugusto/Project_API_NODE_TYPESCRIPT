import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import AuthenticatedController from "../controllers/AuthenticatedController";

const authRouter = Router();
const authController = new AuthenticatedController();

authRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    authController.create,
);

export { authRouter };
