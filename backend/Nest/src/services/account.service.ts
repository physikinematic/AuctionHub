import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { formatResponse } from 'src/utils/helpers/response';
import { SigninDto } from '../dtos/signin.zod.dto';
import { SignupDto } from '../dtos/signup.zod.dto';

import { Account } from 'src/schemas/account.schema';
import { RoleEnum } from '../schemas/role.schema';
import { compare, encrypt } from '../utils/helpers/encryption';
import { RoleService } from './role.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectModel(Account.name) protected model: Model<Account>,
    protected role: RoleService,
  ) {}

  async create(body: SignupDto, session?: { accountId: string }) {
    try {
      const { email, password, firstName, lastName } = body;
      const existingAccount = await this.model.findOne({
        email,
        deleted: false,
      });

      if (existingAccount) {
        throw new ConflictException(
          'Account with this email already registered',
        );
      }

      const hashed = await encrypt(password);
      const role = await this.role.findOne(RoleEnum.User);
      const account = await new this.model({
        firstName,
        lastName,
        email,
        password: hashed,
        role,
      }).save();

      session.accountId = account.id;

      return formatResponse({
        message: 'Account created successfully',
      });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async signin(body: SigninDto, session?: { accountId: string }) {
    try {
      if (session.accountId) {
        throw new BadRequestException('An account already signed in');
      }

      const { email, password } = body;
      const account = await this.model.findOne({ email, deleted: false });

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

      return formatResponse({
        message: 'Account signed in successfully',
        data: account,
      });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async findById(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Invalid id');
      }

      const account = await this.model.findOne({ _id: id, deleted: false });

      if (!account) {
        throw new NotFoundException('Account not found');
      }

      if (account.deleted) {
        throw new GoneException('Account deleted');
      }

      return formatResponse({
        message: 'Account info retrieved successfully',
        data: account,
      });
    } catch (error) {
      formatResponse({ error });
    }
  }

  signout(session: { accountId: string }) {
    try {
      session.accountId = null;
      return formatResponse({
        message: 'Account signed out successfully',
      });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async delete(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Invalid id');
      }

      const account = await this.model.findOne({ _id: id, deleted: false });

      if (!account) {
        throw new NotFoundException('Account not found');
      }

      account.deleted = true;
      await account.save();

      return formatResponse({
        message: 'Account deleted successfully',
      });
    } catch (error) {
      formatResponse({ error });
    }
  }
}
