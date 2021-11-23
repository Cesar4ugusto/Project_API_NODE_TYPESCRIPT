import { Router } from "express";
import { productsRouter } from "@modules/products/routes/products.routes";

const routes = Router();

routes.get("/products", productsRouter);

export { routes };
