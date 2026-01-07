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
var UnitService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const unit_entity_1 = require("./entities/unit.entity");
const building_service_1 = require("../building/building.service");
const pagination_response_dto_1 = require("../common/pagination-response-dto");
const unit_type_1 = require("./entities/unit.type");
const unit_status_1 = require("./entities/unit.status");
let UnitService = UnitService_1 = class UnitService {
    unitRepository;
    buildingService;
    logger = new common_1.Logger(UnitService_1.name);
    constructor(unitRepository, buildingService) {
        this.unitRepository = unitRepository;
        this.buildingService = buildingService;
    }
    async create(createUnitDto) {
        this.logger.log("create");
        if (!createUnitDto.buildingId) {
            return "Unit cannot be saved as Building info is null";
        }
        const building = await this.buildingService.findOne(createUnitDto.buildingId);
        if (!building) {
            return "Building cannot be saved as Property info is null";
        }
        const unit = this.unitRepository.create(createUnitDto);
        unit.status = unit_status_1.UnitStatus.CREATED;
        unit.building = building;
        await this.unitRepository.save(unit);
        return await this.findOne(unit.id);
    }
    async createMany(totalUnits, building) {
        this.logger.log("createMany");
        let units = [];
        for (var i = 0; i < totalUnits; i++) {
            const type = unit_type_1.UnitType.TEMP_TYPE;
            const status = unit_status_1.UnitStatus.CREATED;
            units.push(await this.unitRepository.create({ status, type, building }));
        }
        await this.unitRepository.save(units);
        return units;
    }
    async findAll(paginationRequest) {
        this.logger.log("findAll");
        const { limit = 10, offset = 0 } = paginationRequest;
        const [units, total] = await this.unitRepository.findAndCount({
            relations: {
                building: true,
            },
            where: {
                building: {
                    id: paginationRequest.buildingId,
                },
            },
            take: limit,
            skip: offset,
        });
        return pagination_response_dto_1.PaginationResponse.getPageable(units, total, limit, offset);
    }
    findOne(id) {
        this.logger.log("findOne");
        return this.unitRepository.findOneBy({ id });
    }
    async update(id, updateUnitDto) {
        this.logger.log("update");
        const unit = await this.findOne(id);
        if (!unit) {
            throw new common_1.NotFoundException("No unit with id found id=" + id);
        }
        Object.assign(unit, updateUnitDto);
        await this.unitRepository.save(unit);
        return await this.findOne(id);
    }
    async updateMany(updateUnitDtos) {
        this.logger.log("updateMany");
        const ids = updateUnitDtos.map(d => d.id);
        const units = await this.unitRepository.findBy({ id: (0, typeorm_2.In)(ids) });
        const map = new Map(updateUnitDtos.map(d => [d.id, d]));
        for (let u of units) {
            Object.assign(u, map.get(u.id));
        }
        await this.unitRepository.save(units);
        return await this.unitRepository.findBy({
            id: (0, typeorm_2.In)(ids)
        });
    }
    async remove(id) {
        this.logger.log("remove");
        await this.unitRepository.delete(id);
    }
};
exports.UnitService = UnitService;
exports.UnitService = UnitService = UnitService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(unit_entity_1.Unit)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => building_service_1.BuildingService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        building_service_1.BuildingService])
], UnitService);
//# sourceMappingURL=unit.service.js.map