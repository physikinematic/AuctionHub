import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auction } from "../auction/auction.entity";
import { Account } from "../account/entities/account.entity";

@Entity()
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Account, user => user.bids)
  owner: Account;

  @Column()
  value: number;
  
  @Column()
  dateAdded: Date;

  @ManyToOne(() => Auction, auction => auction.bids)
  auctions: Auction
}