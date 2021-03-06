import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserstService from "../services/ListUsersService";
import { classToClass } from "class-transformer";

export default class UsersController {
    public async index(req: Request, res: Response): Promise<Response> {
        const listUser = new ListUserstService();
        const user = await listUser.init();
        return res.json(classToClass(user));
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { name, email, password } = req.body;
        const createUser = new CreateUserService();
        const user = await createUser.init({ name, email, password });
        return res.json(classToClass(user));
    }
}
