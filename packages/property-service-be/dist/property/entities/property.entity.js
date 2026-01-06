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
exports.Property = void 0;
const base_id_1 = require("../../common/base-id");
const typeorm_1 = require("typeorm");
const property_type_1 = require("./property.type");
const building_entity_1 = require("../../building/entities/building.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const upload_file_entity_1 = require("../../file/entities/upload.file.entity");
let Property = class Property extends base_id_1.BaseId {
    name;
    type;
    manager;
    accountant;
    buildings;
    aggrementFile;
};
exports.Property = Property;
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], Property.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
        transformer: {
            to: (value) => value,
            from: (value) => property_type_1.PropertyType[value],
        },
    }),
    __metadata("design:type", Number)
], Property.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.managers),
    (0, typeorm_1.JoinColumn)({ name: 'manager_id' }),
    __metadata("design:type", user_entity_1.User)
], Property.prototype, "manager", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.accountants),
    (0, typeorm_1.JoinColumn)({ name: 'accountant_id' }),
    __metadata("design:type", user_entity_1.User)
], Property.prototype, "accountant", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => building_entity_1.Building, (building) => building.property),
    __metadata("design:type", Array)
], Property.prototype, "buildings", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => upload_file_entity_1.UploadFile, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'file_id' }),
    __metadata("design:type", upload_file_entity_1.UploadFile)
], Property.prototype, "aggrementFile", void 0);
exports.Property = Property = __decorate([
    (0, typeorm_1.Entity)()
], Property);
//# sourceMappingURL=property.entity.js.map