import { Controller } from '@nestjs/common';
import { AuctionService } from './auction.service';

@Controller('auction')
export class AuctionController {
  constructor(private readonly service: AuctionService) {}
}
