import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum RolesEnum {
  User = 'user',
  Admin = 'admin',
}

@Schema()
export class Roles extends Document {
  @Prop({ type: String, enum: RolesEnum, required: true })
  type: RolesEnum;
}

export const RolesSchema = SchemaFactory.createForClass(Roles);
