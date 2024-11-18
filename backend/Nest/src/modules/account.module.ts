import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from 'src/schemas/account.schema';
import { RoleService } from 'src/services/role.service';
import { AccountController } from '../controllers/account.controller';
import { Role, RoleSchema } from '../schemas/role.schema';
import { AccountService } from '../services/account.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
      {
        name: Role.name,
        schema: RoleSchema,
      },
    ]),
  ],
  controllers: [AccountController],
  providers: [AccountService, RoleService],
  exports: [AccountService],
})
export class AccountModule {}
