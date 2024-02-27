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
exports.GroceryController = void 0;
const common_1 = require("@nestjs/common");
const grocery_service_1 = require("./grocery.service");
const swagger_1 = require("@nestjs/swagger");
const status_codes_1 = require("../const/status-codes");
const custom_messages_1 = require("../const/custom-messages");
const get_grocery_dto_1 = require("./get-grocery.dto");
const create_grocery_dto_1 = require("./create-grocery.dto");
const typeorm_1 = require("typeorm");
const responses_1 = require("../const/responses");
const roles_guard_1 = require("../auth/roles.guard");
const book_grocery_dto_1 = require("./dto/book-grocery.dto");
const auth_service_1 = require("../auth/auth.service");
let GroceryController = class GroceryController {
    constructor(groceryService, authService) {
        this.groceryService = groceryService;
        this.authService = authService;
    }
    async findAll(getGroceryDto) {
        try {
            const condition = Object.assign({}, (getGroceryDto &&
                getGroceryDto.search &&
                getGroceryDto.search.length > 0 && Object.assign({}, getGroceryDto.search.reduce((acc, iterator) => {
                acc[iterator.key] = (0, typeorm_1.ILike)(`%${iterator.value}%`);
                return acc;
            }, {}))));
            const count = await this.groceryService.findCount(condition);
            const list = await this.groceryService.findall(condition, getGroceryDto, (getGroceryDto.page - 1) * getGroceryDto.per_page, getGroceryDto.per_page);
            return new responses_1.Responses(status_codes_1.StatusCodes.OK, { list, count }, custom_messages_1.CustomMessages.SUCCESS, true);
        }
        catch (error) {
            return new responses_1.Responses(status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, null, error.message, false);
        }
    }
    async findOne(id) {
        try {
            const grocery = await this.groceryService.findOne(id);
            if (!grocery) {
                return new responses_1.Responses(status_codes_1.StatusCodes.NOT_FOUND, null, custom_messages_1.CustomMessages.GROCERY_NOT_FOUND, false);
            }
            else {
                return new responses_1.Responses(status_codes_1.StatusCodes.OK, grocery, custom_messages_1.CustomMessages.SUCCESS, true);
            }
        }
        catch (error) {
            return new responses_1.Responses(status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, null, error.message, false);
        }
    }
    async createG(createGroceryDto, req) {
        try {
            if (this.authService.isUser(req)) {
                return new responses_1.Responses(status_codes_1.StatusCodes.UNAUTHORIZED, null, custom_messages_1.CustomMessages.UNAUTHORIZED, false);
            }
            const data = await this.groceryService.create(createGroceryDto);
            return new responses_1.Responses(status_codes_1.StatusCodes.CREATED, data, custom_messages_1.CustomMessages.CREATED, true);
        }
        catch (error) {
            return new responses_1.Responses(status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, null, error.message, false);
        }
    }
    async update(id, createGroceryDto, req) {
        try {
            if (this.authService.isUser(req)) {
                return new responses_1.Responses(status_codes_1.StatusCodes.UNAUTHORIZED, null, custom_messages_1.CustomMessages.UNAUTHORIZED, false);
            }
            const data = await this.groceryService.update(id, createGroceryDto);
            return new responses_1.Responses(status_codes_1.StatusCodes.OK, data, custom_messages_1.CustomMessages.UPDATED, true);
        }
        catch (error) {
            return new responses_1.Responses(status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, null, error.message, false);
        }
    }
    async delete(id, req) {
        try {
            if (this.authService.isUser(req)) {
                return new responses_1.Responses(status_codes_1.StatusCodes.UNAUTHORIZED, null, custom_messages_1.CustomMessages.UNAUTHORIZED, false);
            }
            const grocery = await this.groceryService.findOne(id);
            if (!grocery) {
                return new responses_1.Responses(status_codes_1.StatusCodes.NOT_FOUND, null, custom_messages_1.CustomMessages.GROCERY_NOT_FOUND, false);
            }
            await this.groceryService.delete(id);
            return new responses_1.Responses(status_codes_1.StatusCodes.OK, null, custom_messages_1.CustomMessages.DELETED, true);
        }
        catch (error) {
            return new responses_1.Responses(status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, null, error.message, false);
        }
    }
    async bookOrder(orderBoksDto) {
        try {
            return await this.groceryService.bookOrder(orderBoksDto);
        }
        catch (error) {
            return new responses_1.Responses(status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, null, error.message, false);
        }
    }
};
exports.GroceryController = GroceryController;
__decorate([
    (0, common_1.Post)("details"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_grocery_dto_1.GetGroceryDto]),
    __metadata("design:returntype", Promise)
], GroceryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], GroceryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_grocery_dto_1.CreateGroceryDto, Request]),
    __metadata("design:returntype", Promise)
], GroceryController.prototype, "createG", null);
__decorate([
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_grocery_dto_1.CreateGroceryDto,
        Request]),
    __metadata("design:returntype", Promise)
], GroceryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Request]),
    __metadata("design:returntype", Promise)
], GroceryController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)("order"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_grocery_dto_1.OrderBoksDto]),
    __metadata("design:returntype", Promise)
], GroceryController.prototype, "bookOrder", null);
exports.GroceryController = GroceryController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, swagger_1.ApiTags)("Grocery"),
    (0, common_1.Controller)("grocery"),
    (0, swagger_1.ApiSecurity)('authorization'),
    __metadata("design:paramtypes", [grocery_service_1.GroceryService,
        auth_service_1.AuthService])
], GroceryController);
//# sourceMappingURL=grocery.controller.js.map