import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuctionDto } from 'src/dtos/createAuction.zod.dto';
import { PaginationDto } from 'src/dtos/pagination.zod.dto';
import { Auction } from 'src/schemas/auction.schema';
import { Bid } from 'src/schemas/bid.schema';
import { formatResponse } from 'src/utils/helpers/response';
import { BidService } from './bid.service';
import { Injected } from './injectable.interface';

@Injectable()
export class AuctionService implements Injected {
  constructor(
    @InjectModel(Auction.name) protected model: Model<Auction>,
    private readonly bidService: BidService,
  ) {}

  async find(query: PaginationDto) {
    try {
      const { page = 1, limit = 10 } = query; // default

      const total = await this.model.countDocuments({ deleted: false });

      const auctions = await this.model
        .find({ deleted: false })
        .skip((page - 1) * limit)
        .limit(limit);

      return formatResponse({
        message: 'Auctions retrieved successfully',
        data: auctions,
        pagination: {
          total,
          page,
          limit,
          pageTotal: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async findById(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Invalid id');
      }

      const auction = await this.model.findOne({ _id: id, deleted: false });

      if (!auction) {
        throw new NotFoundException('Auction not found');
      }

      return formatResponse({
        message: 'Auction retrieved successfully',
        data: auction,
      });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async findByOwner(owner: string, query: PaginationDto) {
    try {
      if (!owner) {
        throw new BadRequestException('Invalid owner id');
      }

      const { page = 1, limit = 10 } = query;

      const total = await this.model.countDocuments({ owner, deleted: false });

      const auctions = await this.model
        .find({ owner, deleted: false })
        .skip(page * limit)
        .limit(limit);

      return formatResponse({
        message: 'Auctions retrieved successfully',
        data: auctions,
        pagination: {
          total,
          page,
          limit,
          pageTotal: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async findBidded(owner: string, query: PaginationDto) {
    try {
      if (!owner) {
        throw new BadRequestException('Invalid owner id');
      }

      const { page = 1, limit = 10 } = query;

      const bids = await this.bidService.findByOwner(owner);

      const auctions = Array.from(
        new Set(
          bids.data.map((bid: Bid) => {
            !bid.auction.deleted && bid.auction;
          }),
        ),
      );

      const total = auctions.length;

      const paginatedAuctions = auctions.slice(
        (page - 1) * limit,
        page * limit,
      );

      return formatResponse({
        message: 'Auctions retrieved successfully',
        data: paginatedAuctions,
        pagination: {
          total,
          page,
          limit,
          pageTotal: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async create(body: CreateAuctionDto) {
    try {
      const auction = await new this.model(body).save();
      return formatResponse({
        message: 'Auction created successfully',
        data: auction,
      });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async delete(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('Invalid id');
      }

      const auction = await this.model.findOne({ _id: id, deleted: false });

      if (!auction) {
        throw new NotFoundException('Auction not found');
      }

      auction.deleted = true;
      await auction.save();
      return formatResponse({ message: 'Auction deleted successfully' });
    } catch (error) {
      formatResponse({ error });
    }
  }
}
