import { Injectable } from '@nestjs/common';
import { UploadFile } from './entities/upload.file.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FileService {
  constructor(
      @InjectRepository(UploadFile)
      private readonly fileRepository: Repository<UploadFile>
  ) {}
  
  async createFile(file:Express.Multer.File) {
    const uploadFile = new UploadFile();
    uploadFile.name = file.filename;
    uploadFile.originalname = file.originalname;
    uploadFile.path = file.path;
    uploadFile.size = file.size

    await this.fileRepository.save(uploadFile);

    console.log("file service=", uploadFile);
    
    return await this.findOne(uploadFile.id);
  }

  async findOne(id: number) {
    return await this.fileRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    await this.fileRepository.delete(id);
  }
}