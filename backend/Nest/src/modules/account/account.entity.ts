import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

enum Role {
  admin = 'admin',
  user = 'user'
}

@Entity()
export abstract class Account {
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
}