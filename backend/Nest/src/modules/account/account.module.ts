import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountController } from './account.controller';
import { Account, AccountSchema } from './account.schema';
import { AccountService } from './account.service';
import { CurrentAccountInterceptor } from './interceptors/current-account.interceptor';
import { Roles, RolesSchema } from './roles.schema';
import { RolesService } from './roles.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
      {
        name: Roles.name,
        schema: RolesSchema,
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService, RolesService, CurrentAccountInterceptor],
  exports: [AccountService],
})
export class AccountModule {}
