import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UsersAvatarController {
    public async update(req: Request, res: Response): Promise<Response> {
        const updateAvatar = new UpdateUserAvatarService();
        const avatar = await updateAvatar.init({
            user_id: req.user.id,
            avatar: req.file?.filename as string,
        });
        return res.json(classToClass(avatar));
    }
}
