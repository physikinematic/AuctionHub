import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Account } from './account.schema';
import { compare, encrypt } from '../../utils/helpers/encryption';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from './dtos/signup.dto';
import { SigninDto } from './dtos/signin.dto';

@Injectable()
export class AccountService {
  constructor(@InjectModel(Account.name) protected model: Model<Account>) {}

  async signin(body: SigninDto) {
    const { email, password } = body;
    const account = await this.model.findOne({ email });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    if (!(await compare(password, account.password))) {
      throw new UnauthorizedException('Incorrect password');
    }

    return account.active && account.id;
  }

  async signup(body: SignupDto) {
    const { email, password, firstName, lastName } = body;
    const existingAccount = await this.model.findOne({ email });

    if (existingAccount) {
      throw new ConflictException('Account with this email already registered');
    }

    const hashedPassword = await encrypt(password);
    const account = await this.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return account.id;
  }

  async getInfo(id: string) {
    const account = await this.model.findOne({ id });
    return account.active && account;
  }

  async setActive(id: string, value: boolean) {
    return await this.update(id, { active: value });
  }

  protected async create(attrs: Partial<Account>) {
    const account = new this.model(attrs);
    return account.save();
  }

  protected async update(id: string, attrs: Partial<Account>) {
    const account = await this.model.findById(id);

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    Object.assign(account, attrs);
    return account.save();
  }
}
