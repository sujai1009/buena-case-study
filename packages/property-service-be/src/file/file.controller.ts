import { FileInterceptor } from '@nestjs/platform-express';
import { Controller, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { diskStorage } from 'multer';


@Controller('f')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  // @Post()
  // @UseInterceptors(FileInterceptor('file'))
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   console.log("In FileController")
  //   console.log(file);
  // }

  @Post()
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
    console.log("FileController", file)
    return await this.fileService.createFile(file);;
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.fileService.findOne(+id);
  }
}
