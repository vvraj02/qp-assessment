import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Res,
  Req,
} from "@nestjs/common";
import { GroceryService } from "./grocery.service";
import { ApiBearerAuth, ApiSecurity, ApiTags } from "@nestjs/swagger";
import { StatusCodes } from "src/const/status-codes";
import { CustomMessages } from "src/const/custom-messages";
import { GetGroceryDto } from "./get-grocery.dto";
import { CreateGroceryDto } from "./create-grocery.dto";
import { ILike } from "typeorm";
import { Responses } from "src/const/responses";
import { RolesGuard } from "src/auth/roles.guard";
import { OrderBoksDto } from "./dto/book-grocery.dto";
import { AuthService } from "src/auth/auth.service";

@ApiBearerAuth()
@UseGuards(RolesGuard)
@ApiTags("Grocery")
@Controller("grocery")
@ApiSecurity('authorization')
export class GroceryController {
  constructor(private readonly groceryService: GroceryService,
    private readonly authService: AuthService) { }

  @Post("details")
  async findAll(@Body() getGroceryDto: GetGroceryDto): Promise<any> {
    try {
      const condition = {
        ...(getGroceryDto &&
          getGroceryDto.search &&
          getGroceryDto.search.length > 0 && {
          // This is an object with properties. Use curly braces.
          ...getGroceryDto.search.reduce((acc, iterator) => {
            acc[iterator.key] = ILike(`%${iterator.value}%`);
            return acc;
          }, {})
        }),
      };

      const count = await this.groceryService.findCount(condition);
      const list = await this.groceryService.findall(
        condition,
        getGroceryDto,
        (getGroceryDto.page - 1) * getGroceryDto.per_page,
        getGroceryDto.per_page
      );

      return new Responses(
        StatusCodes.OK,
        { list, count },
        CustomMessages.SUCCESS,
        true
      );
    } catch (error) {
      return new Responses(
        StatusCodes.INTERNAL_SERVER_ERROR,
        null,
        error.message,
        false
      );
    }
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<any> {
    try {

      const grocery = await this.groceryService.findOne(id);
      if (!grocery) {
        return new Responses(
          StatusCodes.NOT_FOUND,
          null,
          CustomMessages.GROCERY_NOT_FOUND,
          false
        );
      } else {
        return new Responses(
          StatusCodes.OK,
          grocery,
          CustomMessages.SUCCESS,
          true
        );
      }
    } catch (error) {
      return new Responses(
        StatusCodes.INTERNAL_SERVER_ERROR,
        null,
        error.message,
        false
      );
    }
  }

  @Post()
  async createG(@Body() createGroceryDto: CreateGroceryDto, @Req() req: Request): Promise<any> {
    try {
      if (this.authService.isUser(req)) {
        return new Responses(
          StatusCodes.UNAUTHORIZED,
          null,
          CustomMessages.UNAUTHORIZED,
          false
        );
      }
      const data = await this.groceryService.create(createGroceryDto);
      return new Responses(StatusCodes.CREATED, data, CustomMessages.CREATED, true);
    } catch (error) {
      return new Responses(
        StatusCodes.INTERNAL_SERVER_ERROR,
        null,
        error.message,
        false
      );
    }
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() createGroceryDto: CreateGroceryDto,
    @Req() req: Request
  ): Promise<any> {
    try {
      if (this.authService.isUser(req)) {
        return new Responses(
          StatusCodes.UNAUTHORIZED,
          null,
          CustomMessages.UNAUTHORIZED,
          false
        );
      }
      const data = await this.groceryService.update(id, createGroceryDto);
      return new Responses(StatusCodes.OK, data, CustomMessages.UPDATED, true);
    } catch (error) {
      return new Responses(
        StatusCodes.INTERNAL_SERVER_ERROR,
        null,
        error.message,
        false
      );
    }
  }

  @Delete(":id")
  async delete(@Param("id") id: number, @Req() req: Request): Promise<any> {
    try {
      if (this.authService.isUser(req)) {
        return new Responses(
          StatusCodes.UNAUTHORIZED,
          null,
          CustomMessages.UNAUTHORIZED,
          false
        );
      }
      //handle the error if grocery not found
      const grocery = await this.groceryService.findOne(id);
      if (!grocery) {
        return new Responses(
          StatusCodes.NOT_FOUND,
          null,
          CustomMessages.GROCERY_NOT_FOUND,
          false
        );
      }
      await this.groceryService.delete(id);
      return new Responses(
        StatusCodes.OK,
        null,
        CustomMessages.DELETED,
        true
      );
    } catch (error) {
      return new Responses(
        StatusCodes.INTERNAL_SERVER_ERROR,
        null,
        error.message,
        false
      );
    }
  }

  @Post("order")
  async bookOrder(@Body() orderBoksDto: OrderBoksDto): Promise<any> {
    try {
      return await this.groceryService.bookOrder(orderBoksDto);
    } catch (error) {
      return new Responses(
        StatusCodes.INTERNAL_SERVER_ERROR,
        null,
        error.message,
        false
      );
    }
  }

}
