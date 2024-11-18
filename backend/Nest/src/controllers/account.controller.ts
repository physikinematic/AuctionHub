import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Session,
} from '@nestjs/common';
import { accountResponseZodSchema } from 'src/dtos/response/account.response.zod.dto';
import { IsAuthenticated } from 'src/guards/authenticated.guard';
import { IsAuthorized } from 'src/guards/authorized.guard';
import { SerializeResponse } from 'src/interceptors/serialize.interceptor';
import { Validate } from 'src/pipes/zodValidationPipe';
import { SigninDto, signinZodSchema } from '../dtos/signin.zod.dto';
import { SignupDto, signupZodSchema } from '../dtos/signup.zod.dto';
import { AccountService } from '../services/account.service';

@Controller('auth')
@SerializeResponse(accountResponseZodSchema)
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Get(':id')
  @IsAuthenticated()
  @IsAuthorized()
  async info(@Param('id') id: string) {
    return await this.service.findById(id);
  }

  @Post('signin')
  @Validate(signinZodSchema)
  async signin(@Body() body: SigninDto, @Session() session: any) {
    return await this.service.findAndValidate(body, session);
  }

  @Post('signup')
  @Validate(signupZodSchema)
  async signup(@Body() body: SignupDto, @Session() session: any) {
    return await this.service.create(body, session);
  }

  @Post('signout')
  @IsAuthenticated()
  signout(@Session() session: any) {
    return this.service.signout(session);
  }

  @Delete(':id')
  @IsAuthenticated()
  @IsAuthorized()
  async removeAccount(@Param() id: string, @Session() session: any) {
    const success = await this.service.delete(id);
    this.signout(session);
    return success;
  }
}
