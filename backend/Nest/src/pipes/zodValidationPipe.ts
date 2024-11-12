import { ArgumentMetadata, BadRequestException, PipeTransform, UsePipes } from "@nestjs/common";
import { ZodSchema } from "zod";

export function Validate(schema) {
  return UsePipes(new ZodValidationPipe(schema))
}

class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) { }

  transform(value: any, metadata: ArgumentMetadata) {
    const proccessedValue = this.schema.safeParse(value);
    if (proccessedValue.success)
      return proccessedValue.data;

    throw new BadRequestException({success: false, ...proccessedValue.error.format()});
  }
}