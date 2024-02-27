import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: 'question_pro_secret_key',
      signOptions: { expiresIn: '1h' }, // Adjust expiration time as needed
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {
}
