import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";

class ListProductService {
    public async init(): Promise<Product[]> {
        const productsRepository = getCustomRepository(ProductsRepository);
        const product = await productsRepository.find();

        return product;
    }
}

export default ListProductService;
