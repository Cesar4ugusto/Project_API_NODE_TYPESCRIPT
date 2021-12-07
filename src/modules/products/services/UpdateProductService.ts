import RedisCache from "@shared/cache/RedisCache";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateteProductService {
    public async init({ id, name, price, quantity }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);
        const product = await productsRepository.findOne(id);
        const redisCache = new RedisCache();

        if (!product) {
            throw new AppError("Product not fond!");
        }

        const productExists = await productsRepository.findByName(name);

        if (productExists && name !== productExists.name) {
            throw new AppError("There is already one product with this name");
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await redisCache.invalidate("api-vendas-PRODUCT_LIST");

        await productsRepository.save(product);

        return product;
    }
}

export default UpdateteProductService;
