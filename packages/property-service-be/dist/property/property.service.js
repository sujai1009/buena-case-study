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
var PropertyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const property_entity_1 = require("./entities/property.entity");
const typeorm_2 = require("typeorm");
const building_service_1 = require("../building/building.service");
const user_service_1 = require("../user/user.service");
const address_service_1 = require("../address/address.service");
const pagination_response_dto_1 = require("../common/pagination-response-dto");
const property_type_1 = require("./entities/property.type");
const file_service_1 = require("../file/file.service");
let PropertyService = PropertyService_1 = class PropertyService {
    propertyRepository;
    buildingService;
    userService;
    addressService;
    fileService;
    logger = new common_1.Logger(PropertyService_1.name);
    constructor(propertyRepository, buildingService, userService, addressService, fileService) {
        this.propertyRepository = propertyRepository;
        this.buildingService = buildingService;
        this.userService = userService;
        this.addressService = addressService;
        this.fileService = fileService;
    }
    async create(createPropertyDto) {
        this.logger.log("create ", createPropertyDto);
        const users = await this.userService.findUsersByIds([createPropertyDto.manager, createPropertyDto.accountant]);
        const property = new property_entity_1.Property();
        if (createPropertyDto.fileId) {
            this.logger.log("File present to update ", createPropertyDto.fileId);
            const aggrementFile = await this.fileService.findOne(createPropertyDto.fileId);
            (aggrementFile ? property.aggrementFile = aggrementFile : null);
        }
        property.name = createPropertyDto.name;
        property.type = createPropertyDto.type;
        property.accountant = users.get(createPropertyDto.accountant);
        property.manager = users.get(createPropertyDto.manager);
        await this.propertyRepository.save(property);
        if (createPropertyDto.isbulkCreation) {
            const address = await this.addressService.createFromPropertyDto(createPropertyDto);
            property.buildings = await this.createMultipleBuildings(createPropertyDto.totalBuildings, property, address);
            await this.propertyRepository.save(property);
        }
        return await this.findOne(property.id);
    }
    async findAll(paginationRequest) {
        this.logger.log("findAll");
        const { limit = 10, offset = 0 } = paginationRequest;
        let whereClause = {};
        const type = paginationRequest.type;
        if (type) {
            if (type === "weg") {
                whereClause = { type: property_type_1.PropertyType.WEG };
            }
            else if (type === "mv") {
                whereClause = { type: property_type_1.PropertyType.MV };
            }
        }
        const [properties, total] = await this.propertyRepository.findAndCount({
            take: limit,
            skip: offset,
            where: whereClause,
            relations: {
                aggrementFile: true
            },
        });
        return pagination_response_dto_1.PaginationResponse.getPageable(properties, total, limit, offset);
    }
    findOne(id) {
        this.logger.log("findOne");
        return this.propertyRepository.findOne({
            where: { id },
            relations: {
                buildings: true,
            },
        });
    }
    async update(id, updatePropertyDto) {
        this.logger.log("update ", id, updatePropertyDto);
        const property = await this.findOne(id);
        if (!property) {
            throw new common_1.NotFoundException("No Property with id found," + id);
        }
        if (updatePropertyDto.fileId && property.aggrementFile.id != updatePropertyDto.fileId) {
            const aggrementFile = await this.fileService.findOne(updatePropertyDto.fileId);
            (aggrementFile ? property.aggrementFile = aggrementFile : null);
        }
        Object.assign(property, updatePropertyDto);
        await this.propertyRepository.save(property);
        return property;
    }
    async updateMany(updatePropertyDtos) {
        this.logger.log("updateMany ", updatePropertyDtos);
        const ids = updatePropertyDtos.map(d => d.id);
        const units = await this.propertyRepository.findBy({ id: (0, typeorm_2.In)(ids) });
        const map = new Map(updatePropertyDtos.map(d => [d.id, d]));
        for (let u of units) {
            Object.assign(u, map.get(u.id));
        }
        await this.propertyRepository.save(units);
        return await this.propertyRepository.findBy({
            id: (0, typeorm_2.In)(ids)
        });
    }
    async remove(id) {
        this.logger.log("remove ", id);
        await this.propertyRepository.delete(id);
    }
    async createMultipleBuildings(totalBuildings, property, address) {
        this.logger.log("createMultipleBuildings");
        return await this.buildingService.createMany(totalBuildings, property, address);
    }
};
exports.PropertyService = PropertyService;
exports.PropertyService = PropertyService = PropertyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => building_service_1.BuildingService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        building_service_1.BuildingService,
        user_service_1.UserService,
        address_service_1.AddressService,
        file_service_1.FileService])
], PropertyService);
//# sourceMappingURL=property.service.js.map