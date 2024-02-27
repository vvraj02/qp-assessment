"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const constants_1 = require("./const/constants");
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .addServer(process.env.SWAGGER_BASEPATH)
        .setTitle(process.env.SWAGGER_TITLE)
        .setDescription(process.env.SWAGGER_DESC)
        .setVersion(process.env.SWAGGER_VERSION)
        .addTag(process.env.SWAGGER_TAG)
        .addApiKey({ type: constants_1.SWAGGER.TYPE, name: constants_1.SWAGGER.NAME, in: constants_1.SWAGGER.IN }, constants_1.SWAGGER.AUTH)
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup(process.env.SWAGGER_DOC_PATH, app, document);
    app.enableCors();
    await app.listen(process.env.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map