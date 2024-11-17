import {
  ConflictException,
  ForbiddenException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { response } from 'src/utils/helpers/response';
import { compare, encrypt } from '../../utils/helpers/encryption';
import { Account } from './account.schema';
import { SigninDto } from './dtos/signin.zod.dto';
import { SignupDto } from './dtos/signup.zod.dto';
import { RolesEnum } from './roles.schema';
import { RolesService } from './roles.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) protected model: Model<Account>,
    protected roles: RolesService,
  ) {}

  async signup(body: SignupDto, session: { accountId: string }) {
    try {
      const { email, password, firstName, lastName } = body;
      const existingAccount = await this.model.findOne({ email });

      if (existingAccount) {
        throw new ConflictException(
          'Account with this email already registered',
        );
      }

      const hashed = await encrypt(password);
      const role = await this.roles.findOne(RolesEnum.User);
      const account = await new this.model({
        firstName,
        lastName,
        email,
        password: hashed,
        role,
      }).save();

      session.accountId = account.id;

      return response({
        message: 'Account created successfully',
      });
    } catch (error) {
      return response({ error });
    }
  }

  async signin(body: SigninDto, session: { accountId: string }) {
    try {
      const { email, password } = body;
      const account = await this.model.findOne({ email });

      if (!account) {
        throw new NotFoundException('Account not found');
      }

      if (account.deleted) {
        throw new GoneException('Account deleted');
      }

      if (!(await compare(password, account.password))) {
        throw new ForbiddenException('Incorrect password');
      }

      session.accountId = account.id;

      return response({
        message: 'Account signed in successfully',
      });
    } catch (error) {
      return response({ error });
    }
  }

  async info(id: string) {
    try {
      const account = await this.model.findById(id);

      if (!account) {
        throw new NotFoundException('Account not found');
      }

      if (account.deleted) {
        throw new GoneException('Account deleted');
      }

      return response({
        message: 'Account info retrieved successfully',
        data: account,
      });
    } catch (error) {
      return response({ error });
    }
  }

  signout(session: { accountId: string }) {
    try {
      session.accountId = null;
      return response({
        message: 'Account signed out successfully',
      });
    } catch (error) {
      return response({ error });
    }
  }

  async delete(session: { accountId: string }) {
    try {
      const account = await this.model.findById(session.accountId);

      if (!account) {
        throw new NotFoundException('Account not found');
      }

      account.deleted = true;
      await account.save();

      this.signout(session);

      return response({
        message: 'Account deleted successfully',
      });
    } catch (error) {
      return response({ error });
    }
  }
}
