import { Request, Response } from "express";
import AuthenticatedService from "../services/AuthenticatedService";

class AuthenticatedController {
    public async create(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        const auth = new AuthenticatedService();
        const user = await auth.init({ email, password });
        return res.json(user);
    }
}

export default AuthenticatedController;
