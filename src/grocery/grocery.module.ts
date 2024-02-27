import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { GroceryController } from './grocery.controller';
import { GroceryService } from './grocery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grocery } from './grocery.entity';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'question_pro_secret_key',
      signOptions: { expiresIn: '1h' }, // Adjust expiration time as needed
    }),
    TypeOrmModule.forFeature([Grocery])
  ],
  controllers: [GroceryController],
  providers: [GroceryService, AuthService],
})
export class GroceryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/grocery');
  }
}