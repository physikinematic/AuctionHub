import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { formatResponse } from 'src/utils/helpers/response';

export function IsAuthenticated() {
  return UseGuards(AuthenticatedGuard);
}

class AuthenticatedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.session.accountId) {
      formatResponse({
        error: new UnauthorizedException('Account not signed in'),
      });
    }

    return true;
  }
}
