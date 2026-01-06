import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadFile } from './entities/upload.file.entity';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [TypeOrmModule.forFeature([UploadFile])],
  exports: [TypeOrmModule, FileService]
})
export class FileModule {}
