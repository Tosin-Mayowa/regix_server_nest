import { IsNotEmpty, IsOptional,IsEmail } from "class-validator";

export enum PaymentStatus{
    PAID='PAID',
    OWING='NOT YET',
}

export class CreatePaymentDto {
  @IsNotEmpty()
  company_name: string;

  @IsNotEmpty()
  receipt_name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  status: PaymentStatus;

  @IsNotEmpty()
  subscription: string;

  @IsNotEmpty()
  amount: string;

  @IsOptional()
  image: string;
}