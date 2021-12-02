import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    id: string;
    name: string;
    email: string;
}

class UpdateCustomerService {
    public async init({ id, name, email }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomersRepository);
        const customer = await customerRepository.findById(id);

        if (!customer) {
            throw new AppError("Customer not found!");
        }

        const customerUpdateEmail = await customerRepository.findByEmail(email);

        if (customerUpdateEmail && email !== customer.email) {
            throw new AppError("There is already one customer with this email!");
        }

        customer.name = name;
        customer.email = email;

        await customerRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerService;
