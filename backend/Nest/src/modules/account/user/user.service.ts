import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { AccountService } from "../account.service";
import { compare, encrypt } from "../../../utils/helpers/encryption";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    private readonly accountService: AccountService,
    @InjectRepository(User) protected repo: Repository<User>
  ) {
    accountService.setRepo(repo);
  }

  async signin(email?: string, password?: string) {
    const account = await this.accountService.findOne({ email });

    if (!(await compare(password, account.password))) {
      throw new UnauthorizedException('Incorrect password');
    }

    return account.id;
  }

  async signup(firstName?: string, lastName?: string, email?: string, password?: string) {
    const accountsWithThisEmail = await this.accountService.findOne({ email });
    if (accountsWithThisEmail) {
      throw new ConflictException('Account with this email already registered');
    }

    password = await encrypt(password);
    const account = await this.accountService.create({ firstName, lastName, email, password });

    return account.id;
  }

  async removeAccount(id: string) {
    await this.accountService.remove({ id });
  }
}