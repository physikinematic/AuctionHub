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
import { CreateBidDto } from 'src/dtos/createBid.zod.dto';
import { PaginationDto } from 'src/dtos/pagination.zod.dto';
import { bidResponseZodSchema } from 'src/dtos/response/bid.response.zod.dto';
import { IsAuthenticated } from 'src/guards/authenticated.guard';
import { IsBidOwnerAuthorized } from 'src/guards/bidOwnerAuthorized.guard';
import { SerializeResponse } from 'src/interceptors/serialize.interceptor';
import { BidService } from '../services/bid.service';

@Controller('bid')
@SerializeResponse(bidResponseZodSchema)
export class BidController {
  constructor(private readonly service: BidService) {}

  @Get('auction/:auctionId')
  async getByAuction(
    @Param('auctionId') auctionId: string,
    @Query() query: PaginationDto,
  ) {
    return await this.service.findByAuction(auctionId, query);
  }

  @Get('owned/:ownerId')
  async getByOwner(
    @Param('ownerId') ownerId: string,
    @Query() query: PaginationDto,
  ) {
    return await this.service.findByOwner(ownerId, query);
  }

  @Post()
  @IsAuthenticated()
  async createBid(
    @Body() body: CreateBidDto,
    @Session() session: { accountId: string },
  ) {
    return await this.service.create({ ...body, owner: session.accountId });
  }

  @Delete(':id')
  @IsAuthenticated()
  @IsBidOwnerAuthorized()
  async deleteBid(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
