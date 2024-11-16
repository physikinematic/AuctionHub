import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { AccountService } from "../account.service";

@Injectable()
export class CurrentAccountInterceptor implements NestInterceptor {
  constructor(readonly accountService: AccountService) { }

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { accountId } = request.session || {};

    if (accountId) {
      const account = await this.accountService.getInfo(accountId);
      request.currentAccount = account;
    }

    return next.handle();
  }
}