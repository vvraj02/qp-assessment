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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
let DatabaseService = class DatabaseService {
    constructor(connection) {
        this.connection = connection;
    }
    async createDatabaseIfNotExists() {
        console.log('vishal 111111111111111111111');
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        try {
            const hasDatabase = await queryRunner.hasDatabase(process.env.PG_DATABASE);
            if (!hasDatabase) {
                await queryRunner.createDatabase(process.env.PG_DATABASE, true);
            }
        }
        catch (error) {
            console.error('Error creating database:', error);
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.Connection])
], DatabaseService);
//# sourceMappingURL=database.service.js.map