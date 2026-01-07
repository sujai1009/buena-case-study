import { Logger } from "@nestjs/common";
import {TypeOrmModuleOptions, TypeOrmOptionsFactory} from "@nestjs/typeorm";
import {SnakeNamingStrategy} from "typeorm-naming-strategies";

export class DatabaseConfiguration implements TypeOrmOptionsFactory {
    private readonly logger = new Logger(DatabaseConfiguration.name);

    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        const typeOrmConfig = {
            type: process.env.TYPEORM_DATABASE_TYPE as any,
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT!) || 5432,
            username: process.env.POSTGRES_DB_USERNAME,
            password: process.env.POSTGRES_DB_PASSWORD,
            database: process.env.POSTGRES_DB,
            schema: process.env.POSTGRES_SCHEMA,
            entities: [process.env.TYPEORM_ENTITIES!],
            logging: Boolean(process.env.POSTGRES_LOGGING!) || false,
            synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE_ENTITIES!) || false,
            autoLoadEntities: Boolean(process.env.TYPEORM_AUTO_LOAD_ENTITIES!) || false,
            namingStrategy: new SnakeNamingStrategy(),
        };

        this.logger.log(typeOrmConfig);
        return typeOrmConfig; 
    }
}
