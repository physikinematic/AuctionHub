import { CallHandler, ExecutionContext, InternalServerErrorException, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { map, Observable } from "rxjs";

export function Serialize(schema: any) {
  return UseInterceptors(new SerializeInterceptor(schema));
}

class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly schema: any) { }

  parse(entry: any) {
    const result = this.schema.safeParse(entry);
    if (result.success) {
      return result.data;
    } else {
      throw new InternalServerErrorException({ ...result.error.format() });
    }
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((res: any) => {
      if (Array.isArray(res)) {
        return res.map((entry) => this.parse(entry));
      }
      else {
        return this.parse(res);
      }
    }));
  }
}