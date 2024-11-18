import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBidDto } from 'src/dtos/createBid.zod.dto';
import { Bid } from 'src/schemas/bid.schema';
import { formatResponse } from 'src/utils/helpers/response';
import { Injected } from './injectable.interface';

@Injectable()
export class BidService implements Injected {
  constructor(@InjectModel(Bid.name) protected model: Model<Bid>) {}

  async findByAuction(auction: string) {
    try {
      if (!auction) {
        throw new BadRequestException('Invalid owner id');
      }

      const bids = await this.model.find({ auction, deleted: false });

      return formatResponse({
        message: 'Bids retrieved successfully',
        data: bids,
      });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async findByOwner(owner: string) {
    try {
      if (!owner) {
        throw new BadRequestException('Invalid owner id');
      }

      const bids = await this.model.find({ owner, deleted: false });

      return formatResponse({
        message: 'Bids retrieved successfully',
        data: bids,
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

      const bid = await this.model.findOne({ _id: id, deleted: false });

      if (!bid) {
        throw new NotFoundException('Bid not found');
      }

      return formatResponse({
        message: 'Bid retrieved successfully',
        data: bid,
      });
    } catch (error) {
      formatResponse({ error });
    }
  }

  async create(body: CreateBidDto) {
    try {
      const bid = await new this.model(body).save();
      return formatResponse({
        message: 'Bid created successfully',
        data: bid,
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

      const bid = await this.model.findOne({ _id: id, deleted: false });

      if (!bid) {
        throw new NotFoundException('Bid not found');
      }

      bid.deleted = true;
      await bid.save();
      return formatResponse({ message: 'Bid deleted successfully' });
    } catch (error) {
      formatResponse({ error });
    }
  }
}
