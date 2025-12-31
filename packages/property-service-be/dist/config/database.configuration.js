"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfiguration = void 0;
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
class DatabaseConfiguration {
    createTypeOrmOptions() {
        const typeOrmConfig = {
            type: process.env.TYPEORM_DATABASE_TYPE,
            host: process.env.POSTGRES_HOST,
            port: parseInt(process.env.POSTGRES_PORT) || 5432,
            username: process.env.POSTGRES_DB_USERNAME,
            password: process.env.POSTGRES_DB_PASSWORD,
            database: process.env.POSTGRES_DB,
            schema: process.env.POSTGRES_SCHEMA,
            entities: [process.env.TYPEORM_ENTITIES],
            logging: Boolean(process.env.POSTGRES_LOGGING) || false,
            synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE_ENTITIES) || false,
            autoLoadEntities: Boolean(process.env.TYPEORM_AUTO_LOAD_ENTITIES) || false,
            namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
        };
        console.log(typeOrmConfig);
        console.log(process.env.NODE_ENV);
        return typeOrmConfig;
    }
}
exports.DatabaseConfiguration = DatabaseConfiguration;
//# sourceMappingURL=database.configuration.js.map