import { Body, Controller, Delete, Get, Param, Post, Query, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { SigninDto, signinSchema } from '../../dto/user/signin.dto';
import { SignupDto, signupSchema } from 'src/dto/user/signup.dto';
import { ZodValidationPipe } from '../../pipes/zodValidationPipe';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('all/:id')
  getUsers(@Param('id') id: string, @Query('page') page: number, @Query('limit') limit: number) {
    return this.userService.find(page, limit);
  }

  @Post('signin')
  @UsePipes(new ZodValidationPipe(signinSchema))
  signin(@Body() body: SigninDto) {
    return this.userService.findOne(body.email, body.password);
  }

  @Post('signup')
  @UsePipes(new ZodValidationPipe(signupSchema))
  signup(@Body() body: SignupDto) {
    return this.userService.create(body.firstName, body.lastName, body.email, body.password);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
