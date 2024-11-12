import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(Account) private repo: Repository<Account>) { }

  async find(criteria: Partial<Account>, page: number = 1, limit: number = 10) {
    const total = await this.repo.count({ where: { ...criteria } });
    const pageTotal = Math.ceil(total / limit);

    if (page > pageTotal) {
      console.log(total, limit);
      throw new BadRequestException({ success: false, message: 'Page limit exceeded' });
    }

    const accounts = await this.repo.find({
      where: { ...criteria },
      skip: (page - 1) * limit,
      take: limit
    });

    return {
      users: accounts,
      total,
      page,
      limit,
      pageTotal
    };
  }

  async findOne(criteria: Partial<Account>) { // TODO
    const account = await this.repo.findOne({ where: { ...criteria } });
    if (!account) {
      throw new NotFoundException({ success: false, message: 'Account not found' });
    }

    return account;
  }

  async create(attrs: Partial<Account>) { // TODO
    const accountEntity = this.repo.create({ ...attrs });
    const account = await this.repo.save(accountEntity);

    return account;
  }

  async update(id: string, attrs: Partial<Account>) {
    const account = await this.repo.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException({ success: false, message: 'Account not found' });
    }

    Object.assign(account, attrs);
    await this.repo.save(account);
    return account;
  }

  async remove(id: string) {
    const account = await this.repo.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException({ success: false, message: 'Account not found' });
    }

    await this.repo.remove(account);
    return account;
  }
}