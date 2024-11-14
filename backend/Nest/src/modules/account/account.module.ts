import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { UserService } from './user/user.service';
import { CurrentAccountInterceptor } from './interceptors/current-account.interceptor';
import { User } from './user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Account, User])],
  controllers: [UserController],
  providers: [
    AccountService, 
    UserService, 
    CurrentAccountInterceptor
  ],
  exports: [AccountService]
})
export class AccountModule {}
