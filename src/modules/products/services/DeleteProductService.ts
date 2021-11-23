import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
    id: string;
}

class DeleteProductService {
    public async init({ id }: IRequest): Promise<void> {
        const productsRepository = getCustomRepository(ProductsRepository);
        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError("Product not fond!");
        }

        await productsRepository.remove(product);
    }
}

export default DeleteProductService;
