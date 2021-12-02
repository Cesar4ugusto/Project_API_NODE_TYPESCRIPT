import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

class ListCustomersService {
    public async init(): Promise<Customer[]> {
        const cutomerRepository = getCustomRepository(CustomersRepository);
        const customers = await cutomerRepository.find();

        return customers;
    }
}

export default ListCustomersService;
