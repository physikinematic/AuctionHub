import { Body, Controller, Delete, Get, Post, Session } from '@nestjs/common';
import { SerializeResponse } from 'src/interceptors/serialize.interceptor';
import { Validate } from 'src/pipes/zodValidationPipe';
import { AccountService } from './account.service';
import { accountResponseZodSchema } from './dtos/account-response.zod.dto';
import { SigninDto, signinZodSchema } from './dtos/signin.zod.dto';
import { SignupDto, signupZodSchema } from './dtos/signup.zod.dto';
import { IsAuthenticatedGuard } from './guards/authenticated.guard';

@Controller('auth')
@SerializeResponse(accountResponseZodSchema)
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Get('info')
  @IsAuthenticatedGuard()
  async info(@Session() session: any) {
    return this.service.info(session.accountId);
  }

  @Post('signin')
  @Validate(signinZodSchema)
  async signin(@Body() body: SigninDto, @Session() session: any) {
    return await this.service.signin(body, session);
  }

  @Post('signup')
  @Validate(signupZodSchema)
  async signup(@Body() body: SignupDto, @Session() session: any) {
    return await this.service.signup(body, session);
  }

  @Post('signout')
  @IsAuthenticatedGuard()
  signout(@Session() session: any) {
    return this.service.signout(session);
  }

  @Delete()
  @IsAuthenticatedGuard()
  async remove(@Session() session: any) {
    return await this.service.delete(session);
  }
}
