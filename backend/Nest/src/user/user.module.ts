import { Module } from '@nestjs/common';
import { UserController, UserRespository, UserService } from './';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRespository]
})
export class UserModule {}
