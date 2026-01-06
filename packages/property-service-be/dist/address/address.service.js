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
exports.AddressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const address_entity_1 = require("./entities/address.entity");
let AddressService = class AddressService {
    addressRepository;
    constructor(addressRepository) {
        this.addressRepository = addressRepository;
    }
    async createFromBuildingDto(createBuildingDto) {
        console.log(createBuildingDto);
        const address = new address_entity_1.Address();
        address.street = createBuildingDto.street;
        address.city = createBuildingDto.city;
        address.code = createBuildingDto.zipcode;
        address.country = createBuildingDto.country;
        return await this.findOrCreateAddress(address);
    }
    async createFromPropertyDto(createPropertyDto) {
        const address = new address_entity_1.Address();
        address.street = createPropertyDto.street;
        address.city = createPropertyDto.city;
        address.code = createPropertyDto.zipcode;
        address.country = createPropertyDto.country;
        return await this.findOrCreateAddress(address);
    }
    async findOrCreateAddress(address) {
        const addressFound = await this.addressRepository.findOneBy({ ...address });
        if (addressFound) {
            return addressFound;
        }
        else {
            const newAddress = this.addressRepository.create({ ...address });
            return this.addressRepository.save(newAddress);
        }
    }
    findAll() {
        return this.addressRepository.find();
    }
    findOne(id) {
        return this.addressRepository.findOneBy({ id });
    }
    update(id) {
        return `This action updates a #${id} property`;
    }
    async remove(id) {
        await this.addressRepository.delete(id);
    }
};
exports.AddressService = AddressService;
exports.AddressService = AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(address_entity_1.Address)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AddressService);
//# sourceMappingURL=address.service.js.map