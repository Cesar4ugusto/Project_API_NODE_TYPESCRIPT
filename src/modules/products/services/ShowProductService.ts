import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
    id: string;
}

class ShowProductService {
    public async init({ id }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);
        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError("Product not fond!");
        }

        return product;
    }
}

export default ShowProductService;
