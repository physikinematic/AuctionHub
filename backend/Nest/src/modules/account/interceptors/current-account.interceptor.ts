import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { AccountService } from "../account.service";

@Injectable()
export class CurrentAccountInterceptor implements NestInterceptor {
  constructor(private readonly accountService: AccountService) { }

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { accountId } = request.session || {};

    if (accountId) {
      const account = await this.accountService.findOne({ id: accountId }, { email: true, firstName: true, lastName: true });
      request.currentAccount = account;
    }

    return next.handle();
  }
}