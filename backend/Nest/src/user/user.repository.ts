import { Injectable } from "@nestjs/common";

@Injectable()
export class UserRespository {
  findAll(id: string, pagination: { page: number, limit: number }) {
    return `${id} ${pagination.page} ${pagination.limit}`;
  }

  findOne(data: {
    email: string,
    password: string
  }) {
    return data;
  }

  addOne(data: {
    'first name': string,
    'last name': string,
    email: string,
    password: string
  }) {
    return data;
  }

  deleteOne(id: string) {
    return id;
  }
}
