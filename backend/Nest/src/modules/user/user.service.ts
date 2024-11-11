import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { encrypt, decrypt } from 'src/utils/helpers/encryption';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) { }

  async find(page: number = 1, limit: number = 10) {
    const total = await this.repo.count();
    const pageTotal = Math.ceil(total / limit);

    if (page > pageTotal) {
      throw new BadRequestException({success: false, message: 'Page limit exceeded'});
    }

    const users = await this.repo.find({
      skip: (page - 1) * limit,
      take: limit
    });

    return {
      success: true,
      data: users.map(user => user.id),
      pagination: {
        total,
        page,
        limit,
        pageTotal
      }
    };
  }

  async findOne(email?: string, password?: string) {
    const user = await this.repo.findOne({ where: { email } });
    if (user === null) {
      throw new NotFoundException({ success: false, message: 'User not found' });
    }

    const d = decrypt(user.password);
    if (d !== password) {
      throw new NotFoundException({ success: false, message: 'No user match' });
    }

    return { success: true, data: user.id };
  }

  async create(firstName?: string, lastName?: string, email?: string, password?: string) {
    password = encrypt(password);
    const userEntity = this.repo.create({ firstName, lastName, email, password });
    const user = await this.repo.save(userEntity);

    return { success: true, data: user.id };
  }

  async remove(id: string) {
    return id;
  }
}