import { Router } from "express";
import { productsRouter } from "@modules/products/routes/products.routes";
import { usersRouter } from "@modules/users/routes/users.routes";
import { authRouter } from "@authenticated/routes/authenticated.routes";
import { passwordRouter } from "@modules/users/routes/password.routes";
import { profileRouter } from "@modules/users/routes/profile.routes";
import customerRouter from "@modules/customers/routes/customer.routes";
import { ordersRouter } from "@modules/orders/routes/orders.routes";

const routes = Router();

routes.use("/products", productsRouter);
routes.use("/users", usersRouter);
routes.use("/authenticated", authRouter);
routes.use("/password", passwordRouter);
routes.use("/profile", profileRouter);
routes.use("/customer", customerRouter);
routes.use("/orders", ordersRouter);

export { routes };
