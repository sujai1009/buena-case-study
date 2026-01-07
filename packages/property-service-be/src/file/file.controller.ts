import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, Get, Logger, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { diskStorage } from 'multer';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';


@Controller('f')
export class FileController {
  private readonly logger = new Logger(FileController.name);

  constructor(private readonly fileService: FileService) { }

  @Post()
  @ApiOperation({ summary: 'Upload a file in to the system.' })
  @ApiResponse({ status: 201, description: 'Return the row information of the created file' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'public/aggrement',
        filename: (req, file, cb) => {
          cb(null, Date.now() + "_" + file.originalname);
        },
      }),
    }),
  )
  async create(@UploadedFile() file: Express.Multer.File) {
    this.logger.log("create", file)
    return await this.fileService.createFile(file);;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get the uploaded fine information for the given Id' })
  @ApiResponse({ status: 201, description: 'Return the file info' })
  findOne(@Param('id') id: number) {
    this.logger.log("fineOne ", id)
    return this.fileService.findOne(+id);
  }
}
