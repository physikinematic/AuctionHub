import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBidDto } from 'src/dtos/createBid.zod.dto';
import { PaginationDto } from 'src/dtos/pagination.zod.dto';
import { Bid } from 'src/schemas/bid.schema';
import { formatResponse } from 'src/utils/helpers/response';
import { AuctionService } from './auction.service';
import { ItemService } from './base/item.service';

@Injectable()
export class BidService extends ItemService<Bid> {
  constructor(
    @InjectModel(Bid.name) protected model: Model<Bid>,
    @Inject(forwardRef(() => AuctionService))
    private readonly auctionService: AuctionService,
  ) {
    super(model, Bid.name);
  }

  async findByAuction(
    auction: string,
    query: PaginationDto = { page: -1, limit: -1 },
  ) {
    try {
      if (!auction) {
        throw new BadRequestException('Invalid auction id');
      }
      return await this.find({ filter: { auction }, query });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async create(body: CreateBidDto) {
    try {
      const auction = (await this.auctionService.findById(body.auction)).data;

      if (body.value < auction.minBid) {
        throw new BadRequestException(
          `Value must be greater than ${auction.minBid}`,
        );
      }

      return await super.create(body);
    } catch (error) {
      formatResponse({ error });
    }
  }
}
