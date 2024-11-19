import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { formatResponse } from 'src/utils/helpers/response';

export function IsAuthorized() {
  return UseGuards(SessionAuthorizedGuard);
}

class SessionAuthorizedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const id = request.session.accountId;
    const paramId = request.params.id;

    if (paramId && id !== paramId) {
      formatResponse({
        error: new ForbiddenException(
          'Access denied: unauthorized access to account information',
        ),
      });
    }

    return true;
  }
}
