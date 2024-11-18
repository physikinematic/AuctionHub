import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleEnum } from 'src/schemas/role.schema';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) protected model: Model<Role>) {}

  async findOne(type: RoleEnum) {
    const role = await this.model.findOne({ type });

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }
}
