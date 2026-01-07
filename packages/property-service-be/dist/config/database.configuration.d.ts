import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
export declare class DatabaseConfiguration implements TypeOrmOptionsFactory {
    private readonly logger;
    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions>;
}
