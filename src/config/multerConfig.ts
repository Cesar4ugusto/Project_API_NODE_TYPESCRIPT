import multer from "multer";
import path from "path";
import crypto from "crypto";

export default {
    dest: path.resolve(__dirname, "..", "..", "tmp"),
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "..", "tmp"),
        filename(req, file, cb) {
            const hash = crypto.randomBytes(16).toString("hex");
            const filename = `${hash}-${file.originalname}`;

            cb(null, filename);
        },
    }),
};
