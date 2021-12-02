import { Request, Response } from "express";
import CreateCustomerService from "../services/CreateCustomerService";
import DeleteCustomerService from "../services/DeleteCustomerService";
import ListCustomersService from "../services/ListCustomersService";
import ShowCustomerService from "../services/ShowCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";

export default class CustomerController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listCustomer = new ListCustomersService();
        const customer = await listCustomer.init();
        return res.json(customer);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email } = req.body;
        const createCustomer = new CreateCustomerService();
        const customer = await createCustomer.init({ name, email });
        return res.json(customer);
    }

    public async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const showCustomer = new ShowCustomerService();
        const customer = await showCustomer.init({ id });
        return res.json(customer);
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const { name, email } = req.body;
        const updateCustomer = new UpdateCustomerService();
        const customer = await updateCustomer.init({ id, name, email });
        return res.json(customer);
    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const deleteCustomer = new DeleteCustomerService();
        const customer = await deleteCustomer.init({ id });
        return res.json(customer);
    }
}
