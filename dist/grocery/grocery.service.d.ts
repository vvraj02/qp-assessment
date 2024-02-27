import { Repository } from 'typeorm';
import { Grocery } from './grocery.entity';
import { CreateGroceryDto } from './create-grocery.dto';
import { GetGroceryDto } from './get-grocery.dto';
import { OrderBoksDto } from './dto/book-grocery.dto';
import { Responses } from 'src/const/responses';
export declare class GroceryService {
    private grocerysRepository;
    constructor(grocerysRepository: Repository<Grocery>);
    findall(condition?: any, getGroceryDto?: GetGroceryDto, skip?: any, per_page?: any): Promise<Grocery[]>;
    findOne(id: number): Promise<Grocery>;
    create(createGroceryDto: CreateGroceryDto): Promise<any>;
    update(id: number, createGroceryDto: CreateGroceryDto): Promise<Grocery>;
    delete(id: number): Promise<void>;
    findCount(condition: any): Promise<number>;
    bookOrder(OrderBoksDto: OrderBoksDto): Promise<Responses>;
}
