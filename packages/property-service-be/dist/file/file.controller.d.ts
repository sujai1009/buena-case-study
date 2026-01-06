import { FileService } from './file.service';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FileService);
    create(file: Express.Multer.File): Promise<import("./entities/upload.file.entity").UploadFile | null>;
    findOne(id: number): Promise<import("./entities/upload.file.entity").UploadFile | null>;
}
