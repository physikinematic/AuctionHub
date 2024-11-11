import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Auction } from "../auction/auction.entity";
import { Bid } from "../bid/bid.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  
  @Column({unique: true})
  email: string;
  
  @Column()
  password: string;

  @OneToMany(() => Auction, auction => auction.owner)
  auctions: Auction[]

  @OneToMany(() => Bid, bid => bid.owner)
  bids: Bid[]
}