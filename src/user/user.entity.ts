import { Role } from './user.dto';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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

  @Column()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = bcrypt.hashSync(password, this.salt);
    return hash === this.password;
  }
}
