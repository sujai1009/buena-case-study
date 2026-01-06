import { UploadFile } from './entities/upload.file.entity';
import { Repository } from 'typeorm';
export declare class FileService {
    private readonly fileRepository;
    constructor(fileRepository: Repository<UploadFile>);
    createFile(file: Express.Multer.File): Promise<UploadFile | null>;
    findOne(id: number): Promise<UploadFile | null>;
    remove(id: number): Promise<void>;
}
