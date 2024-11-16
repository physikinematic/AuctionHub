import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { CurrentAccountInterceptor } from './interceptors/current-account.interceptor';
import { AccountController } from './account.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService, CurrentAccountInterceptor],
  exports: [AccountService],
})
export class AccountModule {}
