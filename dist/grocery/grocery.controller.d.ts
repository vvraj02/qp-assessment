import { GroceryService } from "./grocery.service";
import { GetGroceryDto } from "./get-grocery.dto";
import { CreateGroceryDto } from "./create-grocery.dto";
import { OrderBoksDto } from "./dto/book-grocery.dto";
import { AuthService } from "src/auth/auth.service";
export declare class GroceryController {
    private readonly groceryService;
    private readonly authService;
    constructor(groceryService: GroceryService, authService: AuthService);
    findAll(getGroceryDto: GetGroceryDto): Promise<any>;
    findOne(id: number): Promise<any>;
    createG(createGroceryDto: CreateGroceryDto, req: Request): Promise<any>;
    update(id: number, createGroceryDto: CreateGroceryDto, req: Request): Promise<any>;
    delete(id: number, req: Request): Promise<any>;
    bookOrder(orderBoksDto: OrderBoksDto): Promise<any>;
}
