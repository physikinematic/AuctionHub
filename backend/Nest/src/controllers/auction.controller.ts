import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Session,
} from '@nestjs/common';
import {
  CreateAuctionDto,
  createAuctionZodSchema,
} from 'src/dtos/createAuction.zod.dto';
import {
  PaginationDto,
  paginationZodSchema,
} from 'src/dtos/pagination.zod.dto';
import { auctionResponseZodSchema } from 'src/dtos/response/auction.response.zod.dto';
import { IsAuctionOwnerAuthorized } from 'src/guards/auctionOwnerAuth.guard';
import { IsAuthenticated } from 'src/guards/authenticated.guard';
import { SerializeResponse } from 'src/interceptors/serialize.interceptor';
import { Validate } from 'src/pipes/zodValidationPipe';
import { AuctionService } from '../services/auction.service';

@Controller('auction')
@SerializeResponse(auctionResponseZodSchema)
export class AuctionController {
  constructor(private readonly service: AuctionService) {}

  @Get()
  @Validate(paginationZodSchema)
  async getAll(@Query() query: PaginationDto) {
    return await this.service.find(query);
  }

  @Get(':id')
  async getOne(@Param() param: { id: string }) {
    return await this.service.findById(param.id);
  }

  @Get('owner/:ownerId')
  @IsAuthenticated()
  @Validate(paginationZodSchema)
  async getOwned(
    @Param('ownerId') ownerId: string,
    @Query() query: PaginationDto,
  ) {
    return await this.service.findByOwner(ownerId, query);
  }

  @Get('bid/:ownerId')
  @IsAuthenticated()
  @Validate(paginationZodSchema)
  async getBidded(
    @Param('ownerId') ownerId: string,
    @Query() query: PaginationDto,
  ) {
    return await this.service.findBidded(ownerId, query);
  }

  @Post('create')
  @Validate(createAuctionZodSchema)
  @IsAuthenticated()
  async createAuction(@Body() body: CreateAuctionDto, @Session() session: any) {
    return await this.service.create({ ...body, owner: session.accountId });
  }

  @Delete(':id')
  @IsAuthenticated()
  @IsAuctionOwnerAuthorized()
  async deleteAuction(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
