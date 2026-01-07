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
var UnitController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitController = void 0;
const common_1 = require("@nestjs/common");
const unit_service_1 = require("./unit.service");
const create_unit_dto_1 = require("./dto/create-unit.dto");
const update_unit_dto_1 = require("./dto/update-unit.dto");
const swagger_1 = require("@nestjs/swagger");
const unit_page_request_dto_1 = require("./dto/unit-page-request-dto");
let UnitController = UnitController_1 = class UnitController {
    unitService;
    logger = new common_1.Logger(UnitController_1.name);
    constructor(unitService) {
        this.unitService = unitService;
    }
    create(createUnitDto) {
        this.logger.log("create");
        return this.unitService.create(createUnitDto);
    }
    findAll(paginationRequest) {
        this.logger.log("findAll", paginationRequest);
        return this.unitService.findAll(paginationRequest);
    }
    findOne(id) {
        this.logger.log("findOne", id);
        return this.unitService.findOne(+id);
    }
    update(id, updateUnitDto) {
        this.logger.log("update", id, updateUnitDto);
        return this.unitService.update(+id, updateUnitDto);
    }
    updateMany(updateUnitDtos) {
        this.logger.log("updateMany", updateUnitDtos);
        return this.unitService.updateMany(updateUnitDtos);
    }
    remove(id) {
        this.logger.log("remove", id);
        return this.unitService.remove(+id);
    }
};
exports.UnitController = UnitController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new unit' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiBody)({ type: create_unit_dto_1.CreateUnitDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_unit_dto_1.CreateUnitDto]),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Find all units' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return pageable units data' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [unit_page_request_dto_1.UnitPageReq]),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update unit by id' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return updated unit data' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_unit_dto_1.UpdateUnitDto]),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update multiple units' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return updated units data' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiBody)({ type: [update_unit_dto_1.UpdateUnitDto] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "updateMany", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UnitController.prototype, "remove", null);
exports.UnitController = UnitController = UnitController_1 = __decorate([
    (0, common_1.Controller)('u'),
    __metadata("design:paramtypes", [unit_service_1.UnitService])
], UnitController);
//# sourceMappingURL=unit.controller.js.map