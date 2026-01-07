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
var UserSeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const user_type_1 = require("./entities/user.type");
let UserSeedService = UserSeedService_1 = class UserSeedService {
    userRepository;
    logger = new common_1.Logger(UserSeedService_1.name);
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async onModuleInit() {
        this.logger.log(`The module has been initialized.`);
        const users = this.getUserData();
        let newUsersToCreate = [];
        for (var i = 0; i < users.length; i++) {
            const existingUser = await this.userRepository.findBy(users[i]);
            if (existingUser.length == 0) {
                newUsersToCreate.push(users[i]);
            }
        }
        this.logger.log("New users to create", newUsersToCreate);
        if (newUsersToCreate.length > 0) {
            await this.userRepository.insert(newUsersToCreate);
        }
    }
    getUserData() {
        return [
            { name: 'manager', type: user_type_1.UserType.Manager },
            { name: 'manager1', type: user_type_1.UserType.Manager },
            { name: 'manager2', type: user_type_1.UserType.Manager },
            { name: 'accountant', type: user_type_1.UserType.Accountant },
            { name: 'accountant1', type: user_type_1.UserType.Accountant },
            { name: 'accountant2', type: user_type_1.UserType.Accountant },
            { name: 'owner', type: user_type_1.UserType.Owner },
            { name: 'owner1', type: user_type_1.UserType.Owner },
            { name: 'owner2', type: user_type_1.UserType.Owner },
            { name: 'tenant', type: user_type_1.UserType.Tenant },
            { name: 'tenant1', type: user_type_1.UserType.Tenant },
            { name: 'tenant2', type: user_type_1.UserType.Tenant }
        ];
    }
};
exports.UserSeedService = UserSeedService;
exports.UserSeedService = UserSeedService = UserSeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserSeedService);
//# sourceMappingURL=user.seed.service.js.map