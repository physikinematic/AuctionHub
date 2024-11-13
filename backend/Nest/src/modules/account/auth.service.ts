import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AccountService } from "./account.service";
import { compare, encrypt } from "src/utils/helpers/encryption";

@Injectable()
export class AuthService {
  constructor(private readonly accountService: AccountService) { }

  async signin(email?: string, password?: string) {
    const account = await this.accountService.findOne({ email });

    if (!compare(account.password, password)) {
      throw new BadRequestException({message: 'Invalid password'});
    }

    return account.id;
  }

  async signup(firstName?: string, lastName?: string, email?: string, password?: string) {
    password = await encrypt(password);
    const account = await this.accountService.create({ firstName, lastName, email, password });

    return account.id;
  }

  async removeAccount(id: string) {
    await this.accountService.remove(id);
  }
}