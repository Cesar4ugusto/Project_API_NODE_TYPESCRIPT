import { Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import DeleteProductService from "../services/DeleteProductService";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import UpdateteProductService from "../services/UpdateProductService";

export default class ProductsController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listProducts = new ListProductService();
        const products = await listProducts.init();
        return res.json(products);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const showProducts = new ShowProductService();
        const products = await showProducts.init({ id });
        return res.json(products);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, price, quantity } = req.body;
        const crateProducts = new CreateProductService();
        const products = await crateProducts.init({ name, price, quantity });
        return res.json(products);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, price, quantity } = req.body;
        const updateProducts = new UpdateteProductService();
        const products = await updateProducts.init({ id, name, price, quantity });
        return res.json(products);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const deleteProducts = new DeleteProductService();
        await deleteProducts.init({ id });
        return res.send();
    }
}
