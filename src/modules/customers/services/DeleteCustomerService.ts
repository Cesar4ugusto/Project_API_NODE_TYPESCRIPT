import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    id: string;
}

class DeleteCustomerService {
    public async init({ id }: IRequest): Promise<void> {
        const customerRepository = getCustomRepository(CustomersRepository);
        const customer = await customerRepository.findById(id);

        if (!customer) {
            throw new AppError("Customer not Found");
        }

        await customerRepository.remove(customer);
    }
}

export default DeleteCustomerService;
