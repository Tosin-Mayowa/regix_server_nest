import { Payment } from './../userpayment/payment.entity';
import { Role } from './dtos/create.user.dto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  fullName: string;

  @Column({
    type: 'varchar',
    length: 200,
    unique: true,
  })
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.ADMIN,
  })
  role: Role;

  @Column('varchar', { length: 250 })
  company_name: string;

  @Column('varchar', { length: 50 })
  company_phone_num: string;

  @Column('varchar', { length: 250 })
  company_email: string;

  @Column('varchar', { length: 250 })
  company_address: string;

  @Column('varchar', { length: 200 })
  state: string;

  @Column('varchar', { length: 200 })
  country: string;

  @Column('varchar', { length: 250 })
  password: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  otp: string;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ type: 'boolean', default: false })
  isActive: boolean;

  @Column()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = bcrypt.hashSync(password, this.salt);
    return hash === this.password;
  }

  @OneToMany(() => Payment, (Payment) => Payment.user)
  payment: Payment[];
}
