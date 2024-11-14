import { Entity, OneToMany } from "typeorm";
import { Auction } from "../../auction/auction.entity";
import { Bid } from "../../bid/bid.entity";
import { Account } from "../account.entity";

@Entity()
export class User extends Account {
  @OneToMany(() => Auction, auction => auction.owner)
  auctions: Auction[]

  @OneToMany(() => Bid, bid => bid.owner)
  bids: Bid[]
}