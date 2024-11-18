import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryEnum } from 'src/schemas/category.schema';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) protected model: Model<Category>) {}

  async findOne(type: CategoryEnum | string) {
    const category = await this.model.findOne({ type });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }
}
