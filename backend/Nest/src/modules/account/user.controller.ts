import { Body, Controller, Delete, Get, Post, Session, UseInterceptors } from '@nestjs/common';
import { Validate } from 'src/pipes/zodValidationPipe';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { response } from 'src/utils/helpers/response';
import { userSchema } from './dtos/user.dto';
import { SigninDto, signinSchema } from './dtos/signin.dto';
import { SignupDto, signupSchema } from './dtos/signup.dto';
import { CurrentAccountInterceptor } from './interceptors/current-account.interceptor';
import { CurrentAccount } from './decorators/current-account.decorator';
import { Account } from './account.entity';

@Controller('auth')
@Serialize(userSchema)
export class UserController {
  constructor(private readonly authService: AuthService) { }

  @Get('whoami')
  @UseInterceptors(CurrentAccountInterceptor)
  async whoAmI(@CurrentAccount() account: Partial<Account>) {
    return response({ message: 'Account info retrieved successfully', data: account });
  }

  @Post('signin')
  @Validate(signinSchema)
  async signin(@Body() body: SigninDto, @Session() session: any) {
    const userId = await this.authService.signin(body.email, body.password);
    session.accountId = userId;
    return response({ message: 'Account signed in successfully' });
  }

  @Post('signup')
  @Validate(signupSchema)
  async signup(@Body() body: SignupDto, @Session() session: any) {
    try {
      const userId = await this.authService.signup(body.firstName, body.lastName, body.email, body.password);
      session.accountId = userId;
      return response({ message: 'Account signed up successfully' });
    }
    catch (error) {
      response({ error });
    }
  }

  @Post('signout')
  @UseInterceptors(CurrentAccountInterceptor)
  async signout(@Session() session: any) {
    session.accountId = null;
    return response({ message: 'Account signed out successfully' });
  }

  @Delete()
  async removeUser(@Session() session: any) {
    await this.authService.removeAccount(session.accountId);
    session.accountId = null;
    return response({ message: 'Account removed successfully' });
  }
}
