import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { ZodSchema } from "zod";

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) { }

  transform(value: any, metadata: ArgumentMetadata) {
    const proccessedValue = this.schema.safeParse(value);
    if (proccessedValue.success)
      return proccessedValue.data;

    throw new BadRequestException(proccessedValue.error.format());
  }
}