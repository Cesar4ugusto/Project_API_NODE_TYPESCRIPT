import { Router } from "express";
import UsersController from "../controllers/UsersController";
import UserAvatarController from "../controllers/UserAvatarController";
import { celebrate, Joi, Segments } from "celebrate";
import auth from "@middlewares/auth";
import multer from "multer";
import multerConfig from "@config/multerConfig";

const usersRouter = Router();
const usersController = new UsersController();
const userAvatar = new UserAvatarController();

const upload = multer(multerConfig);

usersRouter.get("/", auth, usersController.index);

usersRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);

usersRouter.patch("/avatar", auth, upload.single("avatar"), userAvatar.update);

export { usersRouter };
