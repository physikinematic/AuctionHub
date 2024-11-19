import {
  BadRequestException,
  forwardRef,
  Inject,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuctionDto } from 'src/dtos/createAuction.zod.dto';
import { PaginationDto } from 'src/dtos/pagination.zod.dto';
import { Auction } from 'src/schemas/auction.schema';
import { Bid } from 'src/schemas/bid.schema';
import { formatResponse } from 'src/utils/helpers/response';
import { ItemService } from './base/item.service';
import { BidService } from './bid.service';

export class AuctionService extends ItemService<Auction> {
  constructor(
    @InjectModel(Auction.name) protected model: Model<Auction>,
    @Inject(forwardRef(() => BidService))
    private readonly bidService: BidService,
  ) {
    super(model, Auction.name);
  }

  async findBidded(
    owner: string, // of bids
    query: PaginationDto = { page: -1, limit: -1 },
  ) {
    try {
      if (!owner) {
        throw new BadRequestException('Invalid owner id');
      }

      const bids = await this.bidService.findByOwner(owner);

      const auctions = Array.from(
        new Set(bids.data.map((bid: Bid) => bid.auction)),
      );

      return await this.find({
        filter: { _id: { $in: auctions }, query },
      });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async findIfJoined(auction: string, owner: string) {
    try {
      if (!auction) {
        throw new BadRequestException('Invalid auction id');
      }

      const bids = await this.bidService.findByAuction(auction);

      const match = bids.data.some((bid: Bid) => bid.owner.id === owner);

      if (!match) {
        throw new NotFoundException('Match not found');
      }

      return formatResponse({ message: 'Match found' });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async create(body: CreateAuctionDto) {
    return await super.create(body);
  }
}
