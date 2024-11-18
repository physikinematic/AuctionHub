import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { formatResponse } from 'src/utils/helpers/response';

export abstract class OwnerAuthGuard implements CanActivate {
  constructor(private readonly service: any) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const id = request.session.accountId;
    const paramId = request.params?.id;

    if (paramId) {
      const item = (await this.service.findById(paramId)).data;
      if (item.owner.id === id) {
        formatResponse({
          error: new ForbiddenException('Owner does not match session'),
        });
      }
    }

    return true;
  }
}
