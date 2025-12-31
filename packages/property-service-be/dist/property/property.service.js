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
exports.PropertyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const property_entity_1 = require("./entities/property.entity");
const typeorm_2 = require("typeorm");
const building_service_1 = require("../building/building.service");
const user_service_1 = require("../user/user.service");
const address_service_1 = require("../address/address.service");
const pagination_response_dto_1 = require("../common/pagination-response-dto");
let PropertyService = class PropertyService {
    propertyRepository;
    buildingService;
    userService;
    addressService;
    constructor(propertyRepository, buildingService, userService, addressService) {
        this.propertyRepository = propertyRepository;
        this.buildingService = buildingService;
        this.userService = userService;
        this.addressService = addressService;
    }
    async create(createPropertyDto) {
        const address = await this.addressService.create(createPropertyDto);
        const users = await this.userService.findUsersByIds([createPropertyDto.manager, createPropertyDto.accountant]);
        const property = new property_entity_1.Property();
        property.name = createPropertyDto.name;
        property.type = createPropertyDto.type;
        property.accountant = users[createPropertyDto.accountant];
        property.manager = users[createPropertyDto.manager];
        await this.propertyRepository.save(property);
        if (createPropertyDto.isbulkCreation) {
            property.buildings = await this.createMultipleBuildings(createPropertyDto.totalBuildings, property, address);
            await this.propertyRepository.save(property);
        }
        return property;
    }
    async findAll(paginationRequest) {
        const { limit = 10, offset = 0 } = paginationRequest;
        const [properties, total] = await this.propertyRepository.findAndCount({
            take: limit,
            skip: offset,
        });
        return pagination_response_dto_1.PaginationResponse.getPageable(properties, total, limit, offset);
    }
    findOne(id) {
        return this.propertyRepository.findOneBy({ id });
    }
    update(id, updatePropertyDto) {
        return `This action updates a #${id} property`;
    }
    async remove(id) {
        await this.propertyRepository.delete(id);
    }
    async createMultipleBuildings(totalBuildings, property, address) {
        return await this.buildingService.createMany(totalBuildings, property, address);
    }
};
exports.PropertyService = PropertyService;
exports.PropertyService = PropertyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(property_entity_1.Property)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => building_service_1.BuildingService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        building_service_1.BuildingService,
        user_service_1.UserService,
        address_service_1.AddressService])
], PropertyService);
//# sourceMappingURL=property.service.js.map