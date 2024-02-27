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
exports.GroceryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const grocery_entity_1 = require("./grocery.entity");
const responses_1 = require("../const/responses");
const status_codes_1 = require("../const/status-codes");
const custom_messages_1 = require("../const/custom-messages");
let GroceryService = class GroceryService {
    constructor(grocerysRepository) {
        this.grocerysRepository = grocerysRepository;
    }
    async findall(condition, getGroceryDto, skip, per_page) {
        return await this.grocerysRepository.find(Object.assign(Object.assign(Object.assign({ where: condition }, skip && { skip }), per_page && { take: per_page }), getGroceryDto && getGroceryDto.order_by && { order: { [getGroceryDto.order_by.split(" ")[0]]: getGroceryDto.order_by.split(" ")[1] } }));
    }
    async findOne(id) {
        return await this.grocerysRepository.findOne({ where: { id } });
    }
    async create(createGroceryDto) {
        const newGrocery = this.grocerysRepository.create(createGroceryDto);
        return await this.grocerysRepository.save(newGrocery);
    }
    async update(id, createGroceryDto) {
        await this.grocerysRepository.update(id, createGroceryDto);
        return await this.grocerysRepository.findOne({ where: { id } });
    }
    async delete(id) {
        const result = await this.grocerysRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Grocery not found');
        }
    }
    async findCount(condition) {
        return await this.grocerysRepository.count({ where: condition });
    }
    async bookOrder(OrderBoksDto) {
        let requestedOrderIds = OrderBoksDto.orderList.map(obj => obj.id);
        let availableItems = await this.findall({ id: (0, typeorm_2.In)(requestedOrderIds) });
        availableItems = JSON.parse(JSON.stringify(availableItems));
        let availableItemsIds = availableItems.map(obj => obj.id);
        const notAvailableItems = requestedOrderIds.filter(id => !availableItemsIds.includes(id));
        const result = notAvailableItems.map(id => ({ id: id, quantity: 0 }));
        OrderBoksDto.orderList.forEach(item => {
            let foundItem = availableItems.find(el => el.id === item.id && el.quantity <= item.quantity);
            if (foundItem) {
                result.push({ id: foundItem.id, quantity: foundItem.quantity });
            }
        });
        if (result.length) {
            return new responses_1.Responses(status_codes_1.StatusCodes.NOT_FOUND, result, custom_messages_1.CustomMessages.ITEMS_NOT_AVAILABLE, true);
        }
        await Promise.all(OrderBoksDto.orderList.map(async (item) => {
            const result = await this.grocerysRepository
                .createQueryBuilder()
                .update('grocery')
                .set({ quantity: () => `quantity - ${item.quantity}` })
                .where('id = :id', { id: item.id })
                .andWhere('quantity >= :requestedQuantity', { requestedQuantity: item.quantity })
                .execute();
        }));
        return new responses_1.Responses(status_codes_1.StatusCodes.OK, OrderBoksDto.orderList, custom_messages_1.CustomMessages.ORDER_BOOK_DONE, true);
    }
};
exports.GroceryService = GroceryService;
exports.GroceryService = GroceryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(grocery_entity_1.Grocery)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GroceryService);
//# sourceMappingURL=grocery.service.js.map