import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    name: string;
    email: string;
}

class CreateCustomerService {
    public async init({ name, email }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomersRepository);
        const emailExists = await customerRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError("There is already one customer with this email");
        }

        const customer = await customerRepository.create({ name, email });

        await customerRepository.save(customer);

        return customer;
    }
}

export default CreateCustomerService;
