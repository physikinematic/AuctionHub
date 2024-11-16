import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AccountService } from './account.service';
import { userSchema } from './dtos/user.dto';
import { CurrentAccountInterceptor } from './interceptors/current-account.interceptor';
import { IsAuthenticatedGuard } from './guards/account.guard';
import { CurrentAccount } from './decorators/current-account.decorator';
import { Validate } from 'src/pipes/zodValidationPipe';
import { SigninDto, signinSchema } from './dtos/signin.dto';
import { SignupDto, signupSchema } from './dtos/signup.dto';
import { response } from 'src/utils/helpers/response';
import { Account } from './account.schema';

@Controller('auth')
@Serialize(userSchema)
@UseInterceptors(CurrentAccountInterceptor)
export class AccountController {
  constructor(private readonly authService: AccountService) {}

  @Get('whoami')
  @IsAuthenticatedGuard()
  async whoAmI(@CurrentAccount() account: Partial<Account>) {
    return response({
      message: 'Account info retrieved successfully',
      data: account,
    });
  }

  @Post('signin')
  @Validate(signinSchema)
  async signin(@Body() body: SigninDto, @Session() session: any) {
    const userId = await this.authService.signin(body);
    session.accountId = userId;
    return response({ message: 'Account signed in successfully' });
  }

  @Post('signup')
  @Validate(signupSchema)
  async signup(@Body() body: SignupDto, @Session() session: any) {
    try {
      const userId = await this.authService.signup(body);
      session.accountId = userId;
      return response({ message: 'Account signed up successfully' });
    } catch (error) {
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
    await this.authService.setActive(session.accountId, false);
    session.accountId = null;
    return response({ message: 'Account removed successfully' });
  }
}
