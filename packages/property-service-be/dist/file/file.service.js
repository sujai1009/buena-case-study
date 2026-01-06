"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const upload_file_entity_1 = require("./entities/upload.file.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
let FileService = class FileService {
    fileRepository;
    constructor(fileRepository) {
        this.fileRepository = fileRepository;
    }
    async createFile(file) {
        const uploadFile = new upload_file_entity_1.UploadFile();
        uploadFile.name = file.filename;
        uploadFile.originalname = file.originalname;
        uploadFile.path = file.path;
        uploadFile.size = file.size;
        await this.fileRepository.save(uploadFile);
        console.log("file service=", uploadFile);
        return await this.findOne(uploadFile.id);
    }
    async findOne(id) {
        return await this.fileRepository.findOneBy({ id });
    }
    async remove(id) {
        await this.fileRepository.delete(id);
    }
};
exports.FileService = FileService;
exports.FileService = FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(upload_file_entity_1.UploadFile)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], FileService);
//# sourceMappingURL=file.service.js.map