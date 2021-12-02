import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import auth from "@middlewares/auth";
import CustomerController from "../controllers/CustomerController";

const customerRouter = Router();
const customerController = new CustomerController();

customerRouter.use(auth);

customerRouter.get("/", customerController.index);
customerRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
    }),
    customerController.create,
);
customerRouter.get(
    "/:id",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    customerController.show,
);
customerRouter.put(
    "/:id",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    customerController.update,
);
customerRouter.delete(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    customerController.delete,
);

export default customerRouter;
