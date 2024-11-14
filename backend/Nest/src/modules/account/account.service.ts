import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FindOptionsSelect, FindOptionsSelectByString, Repository } from 'typeorm';
import { Account } from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountService {
  constructor(@InjectRepository(Account) protected repo: Repository<Account>) { }

  setRepo(repo: Repository<Account>) {
    this.repo = repo;
  }

  async find(
    criteria: Partial<Account>,
    select?: FindOptionsSelect<Account> | FindOptionsSelectByString<Account>,
    page: number = 1,
    limit: number = 10
  ) {
    if (!criteria || Object.values(criteria).some(value => !value)) {
      throw new BadRequestException('Account not found');
    }

    const total = await this.repo.count({ where: { ...criteria } });
    const pageTotal = Math.ceil(total / limit);

    if (page > pageTotal) {
      throw new BadRequestException('Page limit exceeded');
    }

    const accounts = await this.repo.find({
      where: { ...criteria },
      skip: (page - 1) * limit,
      take: limit,
      select: select
    });

    return {
      accounts,
      total,
      page,
      limit,
      pageTotal
    };
  }

  async findOne(criteria: Partial<Account>, select?: FindOptionsSelect<Account> | FindOptionsSelectByString<Account>) {
    if (!criteria || Object.values(criteria).some(value => !value)) {
      throw new BadRequestException('Account not found');
    }

    const account = await this.repo.findOne({ where: { ...criteria }, select: select });
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }

  async create(attrs: Partial<Account>) {
    const accountEntity = this.repo.create({ ...attrs });
    const account = await this.repo.save(accountEntity);

    return account;
  }

  async update(id: string, attrs: Partial<Account>) {
    const account = await this.repo.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    Object.assign(account, attrs);
    await this.repo.save(account);
    return account;
  }

  async remove(criteria: Partial<Account>) {
    const account = await this.repo.findOne({ where: { ...criteria } });
    if (!account) {
      throw new NotFoundException('Account not found');
    }

    await this.repo.remove(account);
  }
}