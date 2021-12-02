import { CustomersRepository } from "@modules/customers/typeorm/repositories/CustomersRepository";
import { ProductsRepository } from "@modules/products/typeorm/repositories/ProductsRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import { OrderRepository } from "../typeorm/repositories/OrderRepository";

interface IProducts {
    id: string;
    price: number;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProducts[];
}

class CreateOrderService {
    public async init({ customer_id, products }: IRequest): Promise<Order> {
        const orderRepository = getCustomRepository(OrderRepository);
        const customerRepository = getCustomRepository(CustomersRepository);
        const productsRepository = getCustomRepository(ProductsRepository);

        const custmerExists = await customerRepository.findById(customer_id);
        if (!custmerExists) {
            throw new AppError("Could not find any customer with the given id!");
        }

        const productsExists = await productsRepository.findAllByIds(products);
        if (!productsExists.length) {
            throw new AppError("Could not find any products with the given ids!");
        }

        const productsExistsIds = productsExists.map(product => product.id);
        const checkNonexistentProducts = products.filter(
            product => !productsExistsIds.includes(product.id),
        );
        if (checkNonexistentProducts.length) {
            throw new AppError(`Could not find any product ${checkNonexistentProducts[0].id}`);
        }

        const quantityAvailble = products.filter(
            product =>
                productsExists.filter(p => p.id === product.id)[0].quantity < product.quantity,
        );
        if (quantityAvailble.length) {
            throw new AppError(
                `The quantity ${quantityAvailble[0].quantity} is not available for ${quantityAvailble[0].id}`,
            );
        }

        const serializedProducts = products.map(product => ({
            product_id: product.id,
            quantity: product.quantity,
            price: productsExists.filter(p => p.id === product.id)[0].price,
        }));

        const order = await orderRepository.generate({
            customer: custmerExists,
            products: serializedProducts,
        });

        const { order_products } = order;

        const updatedProductsQuantity = order_products.map(product => ({
            id: product.product_id,
            quantity:
                productsExists.filter(p => p.id === product.product_id)[0].quantity -
                product.quantity,
        }));

        await productsRepository.save(updatedProductsQuantity);

        return order;
    }
}

export default CreateOrderService;
