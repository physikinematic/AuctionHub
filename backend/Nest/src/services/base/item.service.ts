import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model, RootFilterQuery } from 'mongoose';
import { PaginationDto } from 'src/dtos/pagination.zod.dto';
import { paginate } from 'src/utils/helpers/paginate';
import { formatResponse } from 'src/utils/helpers/response';

@Injectable()
export abstract class ItemService<T> {
  constructor(
    protected readonly model: Model<any>,
    private readonly typeName,
  ) {}

  async find({
    filter = { deleted: false },
    query = { page: -1, limit: -1 },
  }: {
    filter?: RootFilterQuery<T>;
    query?: PaginationDto;
  }) {
    try {
      const { page, limit } = query;

      const { data, total, pageTotal, hasPreviousPage, hasNextPage } =
        await paginate(this.model, filter, {
          page,
          limit,
        });

      return formatResponse({
        message: `${this.typeName}s retrieved successfully`,
        data,
        pagination: {
          total,
          page,
          limit,
          pageTotal,
          hasPreviousPage,
          hasNextPage,
        },
      });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async findByOwner(
    owner: string,
    query: PaginationDto = { page: -1, limit: -1 },
  ) {
    try {
      if (!owner) {
        throw new BadRequestException('Invalid owner id');
      }
      return await this.find({ filter: { owner }, query });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async findById(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Invalid id');
      }

      const auction = await this.model.findOne({ _id: id, deleted: false });

      if (!auction) {
        throw new NotFoundException(`${this.typeName} not found`);
      }

      return formatResponse({
        message: `${this.typeName} retrieved successfully`,
        data: auction,
      });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async create(body: any) {
    try {
      const item = await new this.model(body).save();
      return formatResponse({
        message: `${this.typeName} created successfully`,
        data: item,
      });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async delete(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Invalid id');
      }

      const item = await this.model.findOne({ _id: id, deleted: false });

      if (!item) {
        throw new NotFoundException(`${this.typeName} not found`);
      }

      item.deleted = true;
      await item.save();
      return formatResponse({
        message: `${this.typeName} deleted successfully`,
      });
    } catch (error) {
      formatResponse({ error });
    }
  }
}
