"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroceryModule = void 0;
const common_1 = require("@nestjs/common");
const grocery_controller_1 = require("./grocery.controller");
const grocery_service_1 = require("./grocery.service");
const typeorm_1 = require("@nestjs/typeorm");
const grocery_entity_1 = require("./grocery.entity");
const auth_middleware_1 = require("../auth/auth.middleware");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("../auth/auth.service");
let GroceryModule = class GroceryModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('/grocery');
    }
};
exports.GroceryModule = GroceryModule;
exports.GroceryModule = GroceryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: 'question_pro_secret_key',
                signOptions: { expiresIn: '1h' },
            }),
            typeorm_1.TypeOrmModule.forFeature([grocery_entity_1.Grocery])
        ],
        controllers: [grocery_controller_1.GroceryController],
        providers: [grocery_service_1.GroceryService, auth_service_1.AuthService],
    })
], GroceryModule);
//# sourceMappingURL=grocery.module.js.map