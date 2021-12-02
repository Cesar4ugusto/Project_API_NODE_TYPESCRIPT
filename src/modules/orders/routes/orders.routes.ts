import { Router } from "express";
import OrdersController from "../controllers/OrdersController";
import { celebrate, Joi, Segments } from "celebrate";
import auth from "@middlewares/auth";

const ordersRouter = Router();
const ordersController = new OrdersController();

ordersRouter.use(auth);

ordersRouter.get(
    "/:id",
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    }),
    ordersController.show,
);
ordersRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            customer_id: Joi.string().required(),
            products: Joi.required(),
        },
    }),
    ordersController.create,
);

export { ordersRouter };
