import { Payment } from './../../userpayment/payment.entity';
import { CreatePaymentDto } from './../../userpayment/payment.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum Role {
  ADMIN = 'Admin',
  DEVELOPER = 'Developer',
}

export class UserDto {
  @IsNumber()
  id;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  role: Role;

  @IsNotEmpty()
  company_name: string;

  @IsNotEmpty()
  company_phone_num: string;

  @IsNotEmpty()
  company_email: string;

  @IsNotEmpty()
  company_address: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  country: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  salt: string;

  @IsNotEmpty()
  isActive: boolean;

  payment: Payment[];

  validatePassword: (password: string) => Promise<boolean>;
}
