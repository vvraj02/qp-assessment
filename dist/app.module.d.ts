import { OnApplicationBootstrap } from '@nestjs/common';
import { DatabaseService } from './database.service';
export declare class AppModule implements OnApplicationBootstrap {
    private readonly databaseService;
    constructor(databaseService: DatabaseService);
    onApplicationBootstrap(): Promise<void>;
}
