import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Roles, RolesEnum } from './roles.schema';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles.name) protected model: Model<Roles>) {}

  async findOne(type: RolesEnum) {
    const role = await this.model.findOne({ type });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }
}
