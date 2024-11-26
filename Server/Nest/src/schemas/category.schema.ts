import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum CategoryEnum {
  Mobile = 'mobile',
  Electronics = 'electronics',
  Books = 'books',
}

@Schema()
export class Category extends Document {
  @Prop({ type: String, enum: CategoryEnum, required: true })
  type: CategoryEnum;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
