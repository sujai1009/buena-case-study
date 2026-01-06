"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const database_configuration_1 = require("./config/database.configuration");
const property_module_1 = require("./property/property.module");
const unit_module_1 = require("./unit/unit.module");
const building_module_1 = require("./building/building.module");
const user_module_1 = require("./user/user.module");
const address_module_1 = require("./address/address.module");
const core_1 = require("@nestjs/core");
const global_error_handler_1 = require("./config/global.error.handler");
const file_module_1 = require("./file/file.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const ENV = process.env.NODE_ENV?.trim();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env', `.env.${ENV}`],
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useClass: database_configuration_1.DatabaseConfiguration,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..'),
            }),
            property_module_1.PropertyModule,
            unit_module_1.UnitModule,
            building_module_1.BuildingModule,
            user_module_1.UserModule,
            address_module_1.AddressModule,
            file_module_1.FileModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [{
                provide: core_1.APP_FILTER,
                useClass: global_error_handler_1.GlobalExceptionFilter,
            }, app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map