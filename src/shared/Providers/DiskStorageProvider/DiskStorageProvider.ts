import multerConfig from "@config/multerConfig";
import fs from "fs";
import path from "path";

export default class DiskStorageProvider {
    public async saveFile(file: string): Promise<string> {
        await fs.promises.rename(
            path.resolve(multerConfig.tmp, file),
            path.resolve(multerConfig.dest, file),
        );
        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(multerConfig.dest, file);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }
}
