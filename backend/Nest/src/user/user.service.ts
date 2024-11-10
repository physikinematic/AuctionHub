import { Injectable } from '@nestjs/common';
import { UserRespository } from './';

@Injectable()
export class UserService {
  constructor(private readonly userRepository : UserRespository) {}
  
  getAll(id: string, query) {
    return this.userRepository.findAll(id, query);
  }

  signin(body) {
    return this.userRepository.findOne(body);
  }

  signup(body) {
    return this.userRepository.addOne(body);
  }

  deleteOne(id: string) {
    return this.userRepository.deleteOne(id);
  }
}
