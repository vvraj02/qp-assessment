import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Grocery } from './grocery.entity';
import { CreateGroceryDto } from './create-grocery.dto';
import { GetGroceryDto } from './get-grocery.dto';
import { Roles } from 'src/auth/dto/roles.enum';
import { OrderBoksDto } from './dto/book-grocery.dto';
import { Responses } from 'src/const/responses';
import { StatusCodes } from 'src/const/status-codes';
import { CustomMessages } from 'src/const/custom-messages';

@Injectable()
export class GroceryService {
  constructor(
    @InjectRepository(Grocery)
    private grocerysRepository: Repository<Grocery>,
  ) { }

  // get all grocerys
  async findall(condition?: any, getGroceryDto?: GetGroceryDto, skip?: any, per_page?: any): Promise<Grocery[]> {
    return await this.grocerysRepository.find(
      {
        where: condition, ...skip && { skip }, ...per_page && { take: per_page },
        ...getGroceryDto && getGroceryDto.order_by && { order: { [getGroceryDto.order_by.split(" ")[0]]: getGroceryDto.order_by.split(" ")[1] } },
      },
    );
  }

  async findOne(id: number): Promise<Grocery> {
    return await this.grocerysRepository.findOne({ where: { id } });
  }

  async create(createGroceryDto: CreateGroceryDto): Promise<any> {
    const newGrocery = this.grocerysRepository.create(createGroceryDto);
    return await this.grocerysRepository.save(newGrocery);
  }

  async update(id: number, createGroceryDto: CreateGroceryDto): Promise<Grocery> {
    await this.grocerysRepository.update(id, createGroceryDto);
    return await this.grocerysRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    const result = await this.grocerysRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Grocery not found');
    }
  }

  async findCount(condition: any): Promise<number> {
    return await this.grocerysRepository.count({ where: condition });
  }

  async bookOrder(OrderBoksDto: OrderBoksDto) {
    let requestedOrderIds = OrderBoksDto.orderList.map(obj => obj.id);

    let availableItems = await this.findall({ id: In(requestedOrderIds) });
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
      return new Responses(
        StatusCodes.NOT_FOUND,
        result,
        CustomMessages.ITEMS_NOT_AVAILABLE,
        true
      );
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

    return new Responses(
      StatusCodes.OK,
      OrderBoksDto.orderList,
      CustomMessages.ORDER_BOOK_DONE,
      true
    );
  }
}
