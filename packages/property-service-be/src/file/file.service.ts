import { Injectable, Logger } from '@nestjs/common';
import { UploadFile } from './entities/upload.file.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);

  constructor(
      @InjectRepository(UploadFile)
      private readonly fileRepository: Repository<UploadFile>
  ) {}
  
  async createFile(file:Express.Multer.File) {
    this.logger.log("createFile");
    const uploadFile = new UploadFile();
    uploadFile.name = file.filename;
    uploadFile.originalname = file.originalname;
    uploadFile.path = file.path;
    uploadFile.size = file.size

    await this.fileRepository.save(uploadFile);
    return await this.findOne(uploadFile.id);
  }

  async findOne(id: number) {
    this.logger.log("fineOne");
    return await this.fileRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    this.logger.log("remove");
    await this.fileRepository.delete(id);
  }
}