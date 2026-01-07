"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: new common_1.ConsoleLogger({
            prefix: 'BUENA-BE',
        })
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Buena GmbH')
        .setDescription('Property Management Application')
        .setVersion('1.0')
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, documentFactory, {
        jsonDocumentUrl: 'swagger/json',
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map