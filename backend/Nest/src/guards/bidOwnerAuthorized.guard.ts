import { Injectable, UseGuards } from '@nestjs/common';
import { BidService } from 'src/services/bid.service';
import { OwnerAuthGuard } from './ownerAuth.guard';

export function IsBidOwnerAuthorized() {
  return UseGuards(BidOwnerAuthGuard);
}

@Injectable()
export class BidOwnerAuthGuard extends OwnerAuthGuard {
  constructor(private readonly bidService: BidService) {
    super(bidService);
  }
}
