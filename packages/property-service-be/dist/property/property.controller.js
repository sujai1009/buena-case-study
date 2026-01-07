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
var PropertyController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyController = void 0;
const common_1 = require("@nestjs/common");
const property_service_1 = require("./property.service");
const create_property_dto_1 = require("./dto/create-property.dto");
const update_property_dto_1 = require("./dto/update-property.dto");
const swagger_1 = require("@nestjs/swagger");
const property_page_request_dto_1 = require("./dto/property-page-request-dto");
let PropertyController = PropertyController_1 = class PropertyController {
    propertyService;
    logger = new common_1.Logger(PropertyController_1.name);
    constructor(propertyService) {
        this.propertyService = propertyService;
    }
    create(createPropertyDto) {
        this.logger.log("create", createPropertyDto);
        return this.propertyService.create(createPropertyDto);
    }
    findAll(paginationRequest) {
        this.logger.log("findAll", paginationRequest);
        return this.propertyService.findAll(paginationRequest);
    }
    findOne(id) {
        this.logger.log("findOne ", id);
        return this.propertyService.findOne(+id);
    }
    update(id, updatePropertyDto) {
        this.logger.log("update ", updatePropertyDto);
        return this.propertyService.update(+id, updatePropertyDto);
    }
    updateMany(updatePropertyDtos) {
        this.logger.log("updateMany ", updatePropertyDtos);
        return this.propertyService.updateMany(updatePropertyDtos);
    }
    remove(id) {
        this.logger.log("remove ", id);
        return this.propertyService.remove(+id);
    }
};
exports.PropertyController = PropertyController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new property' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The property has been successfully created.' }),
    (0, swagger_1.ApiBody)({ type: create_property_dto_1.CreatePropertyDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_property_dto_1.CreatePropertyDto]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Find all properties' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return pageable property data' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [property_page_request_dto_1.PropertyPageReq]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Find property with given Id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'List property by id' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update the property' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Update the property with new details' }),
    (0, swagger_1.ApiBody)({ type: update_property_dto_1.UpdatePropertyDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_property_dto_1.UpdatePropertyDto]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "update", null);
__decorate([
    (0, common_1.Put)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update multiple properties' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Return updated properties data' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiBody)({ type: [update_property_dto_1.UpdatePropertyDto] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "updateMany", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete the property' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Delete the property' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PropertyController.prototype, "remove", null);
exports.PropertyController = PropertyController = PropertyController_1 = __decorate([
    (0, common_1.Controller)('p'),
    __metadata("design:paramtypes", [property_service_1.PropertyService])
], PropertyController);
//# sourceMappingURL=property.controller.js.map