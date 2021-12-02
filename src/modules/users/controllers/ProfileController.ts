import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";

export default class ProfileController {
    public async show(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id;
        const showProfile = new ShowProfileService();
        const user = await showProfile.init({ user_id });
        return res.json(classToClass(user));
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id;
        const { name, email, password, old_password } = req.body;
        const updateProfile = new UpdateProfileService();
        const user = await updateProfile.init({ user_id, name, email, password, old_password });
        return res.json(classToClass(user));
    }
}
