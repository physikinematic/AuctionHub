import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException } from "@nestjs/common";
import { AccountService } from "../account.service";
import { response } from "src/utils/helpers/response";

@Injectable()
export class CurrentAccountInterceptor implements NestInterceptor {
  constructor(private readonly accountService: AccountService) { }

  async intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { accountId } = request.session || {};

    if (!accountId) {
      request.currentAccount = null;
      response({ error: new UnauthorizedException({ message: 'Account not signed in' }) });
    }
    
    try {
      const account = await this.accountService.findOne({ id: accountId }, { email: true, firstName: true, lastName: true });
      request.currentAccount = account;
    }
    catch (error) {
      throw response({ error });
    }

    return next.handle();
  }
}