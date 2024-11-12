import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [UserController],
  providers: [AccountService, AuthService],
  exports: [AccountService]
})
export class AccountModule {}
