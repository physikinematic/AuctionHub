import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auction } from "../auction/auction.entity";
import { User } from "../user/user.entity";

@Entity()
export class Bid {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.bids)
  owner: User;

  @Column()
  value: number;
  
  @Column()
  dateAdded: Date;

  @ManyToOne(() => Auction, auction => auction.bids)
  auctions: Auction
}