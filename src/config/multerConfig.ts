import multer, { StorageEngine } from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import path from "path";
import crypto from "crypto";
import AppError from "@shared/errors/AppError";

interface IUploadFile {
    dest: string;
    tmp: string;
    storage: StorageEngine;
}

const storageTypes = {
    disk: multer.diskStorage({
        destination: path.resolve(__dirname, "..", "..", "tmp"),
        filename(req, file, cb) {
            const hash = crypto.randomBytes(16).toString("hex");
            const filename = `${hash}-${file.originalname}`;

            cb(null, filename);
        },
    }),
    s3: multerS3({
        s3: new aws.S3(),
        bucket: "uploadexamplecesar",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: "public-read",
        key: (req, file, cb) => {
            const hash = crypto.randomBytes(16).toString("hex");
            const filename = `${hash}-${file.originalname}`;

            cb(null, filename);
        },
    }),
};

export default {
    dest: path.resolve(__dirname, "..", "..", "uploads"),
    tmp: path.resolve(__dirname, "..", "..", "tmp"),
    storage: storageTypes[process.env.STORAGE_TYPE],
    fileFilter: (req, file, cb) => {
        const allowedMimes = ["image/jpeg", "image/pjpeg", "image/png", "image/gif"];
        if (allowedMimes.includes(file.mimetpe)) {
            cb(null, true);
        } else {
            cb(new AppError("Invalid file type."));
        }
    },
};
