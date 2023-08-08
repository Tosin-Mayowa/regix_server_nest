import { PaymentStatus } from './payment.dto';

import { User } from './../user/user.entity';

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  company_name: string;

  @Column('varchar', { length: 50 })
  receipt_name: string;

  @Column({
    type: 'varchar',
    length: 200,
    unique: true,
  })
  email: string;

  @Column('varchar', { length: 250 })
  subscription: string;

  @Column('varchar', { length: 250 })
  amount: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.OWING,
  })
  status: PaymentStatus;

  @Column('varchar', { length: 250 })
  image: string;

  @ManyToOne(() => User, (user) => user.payment)
  user: User;

  @Column()
  userId: number;
}
