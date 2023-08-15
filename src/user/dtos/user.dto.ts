
import { Payment } from './../../userpayment/payment.entity';
import { CreatePaymentDto } from './../../userpayment/payment.dto';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export enum Role {
  ADMIN = 'Admin',
  DEVELOPER = 'Developer',
}

export class UserDto {
  @IsNumber()
  id:number;

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

  @IsOptional()
  isVerified: boolean;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  otp: string;

  payment: Payment[];

  validatePassword: (password: string) => Promise<boolean>;
}
