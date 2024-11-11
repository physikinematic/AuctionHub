import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/user.entity";
import { Bid } from "../bid/bid.entity";

@Entity()
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.auctions)
  owner: User;
  
  @Column()
  endDate: Date;
  
  @OneToMany(() => Bid, bid => bid.auctions)
  bids: Bid[];
}