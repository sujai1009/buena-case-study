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
exports.BuildingService = void 0;
const common_1 = require("@nestjs/common");
const building_entity_1 = require("./entities/building.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const unit_service_1 = require("../unit/unit.service");
const property_service_1 = require("../property/property.service");
const pagination_response_dto_1 = require("../common/pagination-response-dto");
let BuildingService = class BuildingService {
    buildingRepository;
    unitService;
    propertyService;
    constructor(buildingRepository, unitService, propertyService) {
        this.buildingRepository = buildingRepository;
        this.unitService = unitService;
        this.propertyService = propertyService;
    }
    async create(createBuildingDto) {
        if (!createBuildingDto.propertyId) {
            return "Building cannot be saved as Property info is null";
        }
        const property = await this.propertyService.findOne(createBuildingDto.propertyId);
        if (!property) {
            return "Building cannot be saved as Property info is null";
        }
        const building = new building_entity_1.Building();
        building.property = property;
        building.name = createBuildingDto.name;
        building.houseNumber = createBuildingDto.houseNumber;
        await this.buildingRepository.save(building);
        if (createBuildingDto.isbulkCreation) {
            building.units = await this.createMultipleUnits(createBuildingDto.totalUnits, building);
            await this.buildingRepository.save(building);
        }
        return building;
    }
    async createMany(totalBuildings, property, address) {
        let buildings = [];
        for (var i = 0; i < totalBuildings; i++) {
            buildings.push(await this.buildingRepository.create({ property, address }));
        }
        await this.buildingRepository.save(buildings);
        return buildings;
    }
    async findAll(paginationRequest) {
        const { limit = 10, offset = 0 } = paginationRequest;
        const [buildings, total] = await this.buildingRepository.findAndCount({
            take: limit,
            skip: offset,
        });
        return pagination_response_dto_1.PaginationResponse.getPageable(buildings, total, limit, offset);
    }
    findOne(id) {
        return this.buildingRepository.findOneBy({ id });
    }
    update(id, updateBuildingDto) {
        return `This action updates a #${id} building`;
    }
    async remove(id) {
        await this.buildingRepository.delete(id);
    }
    async createMultipleUnits(totalUnits, building) {
        return await this.unitService.createMany(totalUnits, building);
    }
};
exports.BuildingService = BuildingService;
exports.BuildingService = BuildingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(building_entity_1.Building)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => unit_service_1.UnitService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => property_service_1.PropertyService))),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        unit_service_1.UnitService,
        property_service_1.PropertyService])
], BuildingService);
//# sourceMappingURL=building.service.js.map