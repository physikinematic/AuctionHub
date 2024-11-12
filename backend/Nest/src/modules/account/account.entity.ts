import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Auction } from "../auction/auction.entity";
import { Bid } from "../bid/bid.entity";

enum Role {
  admin = 'admin',
  user = 'user'
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true, update: false })
  email: string;

  @Column()
  password: string;

  @Column({ default: Role.user })
  role: Role;

  @OneToMany(() => Auction, auction => auction.owner)
  auctions: Auction[]

  @OneToMany(() => Bid, bid => bid.owner)
  bids: Bid[]
}