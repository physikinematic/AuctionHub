import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "../account/entities/account.entity";
import { Bid } from "../bid/bid.entity";

@Entity()
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Account, user => user.auctions)
  owner: Account;
  
  @Column()
  endDate: Date;
  
  @OneToMany(() => Bid, bid => bid.auctions)
  bids: Bid[];
}