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
exports.UnitService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const unit_entity_1 = require("./entities/unit.entity");
const building_service_1 = require("../building/building.service");
const pagination_response_dto_1 = require("../common/pagination-response-dto");
let UnitService = class UnitService {
    unitRepository;
    buildingService;
    constructor(unitRepository, buildingService) {
        this.unitRepository = unitRepository;
        this.buildingService = buildingService;
    }
    async create(createUnitDto) {
        if (!createUnitDto.buildingId) {
            return "Unit cannot be saved as Building info is null";
        }
        const building = await this.buildingService.findOne(createUnitDto.buildingId);
        if (!building) {
            return "Building cannot be saved as Property info is null";
        }
        const unit = this.unitRepository.create(createUnitDto);
        await this.unitRepository.save(unit);
        return unit;
    }
    async createMany(totalUnits, building) {
        let units = [];
        for (var i = 0; i < totalUnits; i++) {
            units.push(await this.unitRepository.create({ building }));
        }
        await this.unitRepository.save(units);
        return units;
    }
    async findAll(paginationRequest) {
        const { limit = 10, offset = 0 } = paginationRequest;
        const [units, total] = await this.unitRepository.findAndCount({
            take: limit,
            skip: offset,
        });
        return pagination_response_dto_1.PaginationResponse.getPageable(units, total, limit, offset);
    }
    findOne(id) {
        return this.unitRepository.findOneBy({ id });
    }
    update(id, updateUnitDto) {
        return `This action updates a #${id} unit`;
    }
    async remove(id) {
        await this.unitRepository.delete(id);
    }
};
exports.UnitService = UnitService;
exports.UnitService = UnitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(unit_entity_1.Unit)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => building_service_1.BuildingService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        building_service_1.BuildingService])
], UnitService);
//# sourceMappingURL=unit.service.js.map