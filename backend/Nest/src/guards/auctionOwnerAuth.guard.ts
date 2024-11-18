import { Injectable, UseGuards } from '@nestjs/common';
import { AuctionService } from 'src/services/auction.service';
import { OwnerAuthGuard } from './ownerAuth.guard';

export function IsAuctionOwnerAuthorized() {
  return UseGuards(AuctionOwnerAuthGuard);
}

@Injectable()
export class AuctionOwnerAuthGuard extends OwnerAuthGuard {
  constructor(private readonly auctionService: AuctionService) {
    super(auctionService);
  }
}
