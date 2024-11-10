import { Body, Controller, Delete, Get, Param, Post, Query, UsePipes } from '@nestjs/common';
import { UserService } from './';
import { SigninDto, signinSchema, SignupDto, signupSchema } from '../dto';
import { ZodValidationPipe } from '../pipes';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('all/:id')
  getAll(@Param('id') id: string, @Query() query: { page: number, limit: number }) {
    return this.userService.getAll(id, query);
  }

  @Post('signin')
  @UsePipes(new ZodValidationPipe(signinSchema))
  signin(@Body() body: SigninDto) {
    return this.userService.signin(body);
  }

  @Post('signup')
  @UsePipes(new ZodValidationPipe(signupSchema))
  signup(@Body() body: SignupDto) {
    return this.userService.signup(body);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }
}
