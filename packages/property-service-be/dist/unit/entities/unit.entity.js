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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unit = void 0;
const building_entity_1 = require("../../building/entities/building.entity");
const typeorm_1 = require("typeorm");
const unit_type_1 = require("./unit.type");
const entrance_type_1 = require("./entrance.type");
const unit_status_1 = require("./unit.status");
const user_entity_1 = require("../../user/entities/user.entity");
const base_id_1 = require("../../common/base-id");
let Unit = class Unit extends base_id_1.BaseId {
    type;
    uNo;
    floor;
    entrance;
    size;
    coOwnershipShare;
    builtYear;
    rooms;
    status;
    tenant;
    building;
};
exports.Unit = Unit;
__decorate([
    (0, typeorm_1.Column)({
        nullable: false
    }),
    __metadata("design:type", Number)
], Unit.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Unit.prototype, "uNo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Unit.prototype, "floor", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Unit.prototype, "entrance", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Unit.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Unit.prototype, "coOwnershipShare", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Unit.prototype, "builtYear", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Unit.prototype, "rooms", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Unit.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'tenant_id' }),
    __metadata("design:type", user_entity_1.User)
], Unit.prototype, "tenant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => building_entity_1.Building, building => building.units),
    (0, typeorm_1.JoinColumn)({ name: 'building_id' }),
    __metadata("design:type", building_entity_1.Building)
], Unit.prototype, "building", void 0);
exports.Unit = Unit = __decorate([
    (0, typeorm_1.Entity)()
], Unit);
//# sourceMappingURL=unit.entity.js.map