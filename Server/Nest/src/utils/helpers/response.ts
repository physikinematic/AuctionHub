import { HttpException } from '@nestjs/common';

export function formatResponse(o: {
  message?: string;
  data?: any;
  pagination?: any;
  error?: Error;
}) {
  const { message, data, pagination, error } = o;

  if (!o.error) {
    return { success: true, message, data, pagination };
  }

  throw new HttpException(
    { success: false, message: message || error.message },
    error instanceof HttpException ? error.getStatus() : 500,
  );
}
