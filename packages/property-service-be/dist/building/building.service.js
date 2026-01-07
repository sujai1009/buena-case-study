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
var BuildingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuildingService = void 0;
const common_1 = require("@nestjs/common");
const building_entity_1 = require("./entities/building.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const unit_service_1 = require("../unit/unit.service");
const property_service_1 = require("../property/property.service");
const pagination_response_dto_1 = require("../common/pagination-response-dto");
const address_service_1 = require("../address/address.service");
let BuildingService = BuildingService_1 = class BuildingService {
    buildingRepository;
    unitService;
    propertyService;
    addressService;
    logger = new common_1.Logger(BuildingService_1.name);
    constructor(buildingRepository, unitService, propertyService, addressService) {
        this.buildingRepository = buildingRepository;
        this.unitService = unitService;
        this.propertyService = propertyService;
        this.addressService = addressService;
    }
    async create(createBuildingDto) {
        this.logger.log("create=", createBuildingDto);
        if (!createBuildingDto.propertyId) {
            return "Building cannot be saved as Property info is null";
        }
        const property = await this.propertyService.findOne(createBuildingDto.propertyId);
        if (!property) {
            return "Building cannot be saved as Property info is null";
        }
        const address = await this.addressService.createFromBuildingDto(createBuildingDto);
        const building = new building_entity_1.Building();
        building.property = property;
        building.name = createBuildingDto.name;
        building.houseNumber = createBuildingDto.houseNumber;
        building.address = address;
        await this.buildingRepository.save(building);
        if (createBuildingDto.isbulkCreation) {
            building.units = await this.createMultipleUnits(createBuildingDto.totalUnits, building);
            await this.buildingRepository.save(building);
        }
        return await this.findOne(building.id);
    }
    async createMany(totalBuildings, property, address) {
        this.logger.log("createMany");
        let buildings = [];
        const result = await this.buildingRepository.find({
            order: { id: 'DESC' },
            take: 1,
        });
        const maxId = result.length > 0 ? result[0].id : 0;
        for (var i = 0; i < totalBuildings; i++) {
            const houseNumber = maxId + i + 1 + "";
            const name = "TEMP_BUILDING_NAME_" + houseNumber;
            buildings.push(await this.buildingRepository.create({ houseNumber, name, property, address }));
        }
        await this.buildingRepository.save(buildings);
        return buildings;
    }
    async findAll(buildingPage) {
        const { limit = 10, offset = 0 } = buildingPage;
        this.logger.log("findAll ", buildingPage);
        const [buildings, total] = await this.buildingRepository.findAndCount({
            relations: {
                property: true,
                address: true,
            },
            where: {
                property: {
                    id: buildingPage.propertyId,
                },
            },
            take: limit,
            skip: offset,
        });
        return pagination_response_dto_1.PaginationResponse.getPageable(buildings, total, limit, offset);
    }
    async findOne(id) {
        this.logger.log("findOne");
        return await this.buildingRepository.findOne({
            where: { id },
            relations: {
                units: true,
                address: true,
                property: true
            },
        });
    }
    async update(id, updateBuildingDto) {
        this.logger.log("update");
        const building = await this.findOne(id);
        if (!building) {
            throw new common_1.NotFoundException("No building with id found id=" + id);
        }
        Object.assign(building, updateBuildingDto);
        await this.buildingRepository.save(building);
        if (updateBuildingDto.isbulkCreation && updateBuildingDto.totalUnits) {
            building.units = await this.createMultipleUnits(updateBuildingDto.totalUnits, building);
            await this.buildingRepository.save(building);
        }
        return building;
    }
    async updateMany(updateBuildingDtos) {
        this.logger.log("updateMany");
        const ids = updateBuildingDtos.map(d => d.id);
        const buildings = await this.buildingRepository.findBy({ id: (0, typeorm_1.In)(ids) });
        const map = new Map(updateBuildingDtos.map(d => [d.id, d]));
        for (const b of buildings) {
            Object.assign(b, map.get(b.id));
        }
        await this.buildingRepository.save(buildings);
        return await this.buildingRepository.findBy({
            id: (0, typeorm_1.In)(ids)
        });
    }
    async remove(id) {
        this.logger.log("remove");
        await this.buildingRepository.delete(id);
    }
    async createMultipleUnits(totalUnits, building) {
        this.logger.log("createMultipleUnits");
        return await this.unitService.createMany(totalUnits, building);
    }
};
exports.BuildingService = BuildingService;
exports.BuildingService = BuildingService = BuildingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(building_entity_1.Building)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => unit_service_1.UnitService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => property_service_1.PropertyService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => address_service_1.AddressService))),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        unit_service_1.UnitService,
        property_service_1.PropertyService,
        address_service_1.AddressService])
], BuildingService);
//# sourceMappingURL=building.service.js.map