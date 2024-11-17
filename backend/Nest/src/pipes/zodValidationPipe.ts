import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
  UsePipes,
} from '@nestjs/common';
import { ZodSchema, ZodTypeDef } from 'zod';

export function Validate(schema: ZodSchema<any, ZodTypeDef, any>) {
  return UsePipes(new ZodValidationPipe(schema));
}

class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const processedValue = this.schema.safeParse(value);
    if (processedValue.success) return processedValue.data;

    throw new BadRequestException({
      success: false,
      ...processedValue.error.format(),
    });
  }
}
