import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { SigninDto, signinSchema } from 'src/dto/user/signin.dto';
import { SignupDto, signupSchema } from 'src/dto/user/signup.dto';
import { Validate } from 'src/pipes/zodValidationPipe';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { userSchema } from 'src/dto/user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(userSchema)
export class UserController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('signin')
  @Validate(signinSchema)
  signin(@Body() body: SigninDto) {
    return this.authService.signin(body.email, body.password);
  }

  @Post('signup')
  @Validate(signupSchema)
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body.firstName, body.lastName, body.email, body.password);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.authService.removeAccount(id);
  }
}
