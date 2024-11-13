import { HttpException } from "@nestjs/common";

export function response(o: { message?: string, data?: any, error?: Error }) {
  if (!o.error) {
    return { success: true, message: o.message, data: o.data };
  }

  throw new HttpException({ success: false, message: o.message || o.error.message }, o.error instanceof HttpException ? o.error.getStatus() : 500);
}