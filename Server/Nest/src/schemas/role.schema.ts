import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum RoleEnum {
  User = 'user',
  Admin = 'admin',
}

@Schema()
export class Role extends Document {
  @Prop({ type: String, enum: RoleEnum, required: true })
  type: RoleEnum;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
