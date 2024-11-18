import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Session,
} from '@nestjs/common';
import { CreateBidDto } from 'src/dtos/createBid.zod.dto';
import { IsAuthenticated } from 'src/guards/authenticated.guard';
import { IsBidOwnerAuthorized } from 'src/guards/bidOwnerAuthorized.guard';
import { BidService } from '../services/bid.service';

@Controller('bid')
export class BidController {
  constructor(private readonly service: BidService) {}

  @Get('/:auctionId')
  async getByAuction(@Param('auctionId') auctionId: string) {
    return await this.service.findByAuction(auctionId);
  }

  @Get('owner/:ownerId')
  async getByOwner(@Param('ownerId') ownerId: string) {
    return await this.service.findByOwner(ownerId);
  }

  @Post()
  @IsAuthenticated()
  async createBid(@Body() body: CreateBidDto, @Session() session: any) {
    return await this.service.create({ ...body, owner: session.accountId });
  }

  @Delete(':id')
  @IsAuthenticated()
  @IsBidOwnerAuthorized()
  async deleteBid(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
