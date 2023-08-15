import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { IsNull } from 'typeorm';

export class OtpDataDto {
 
  otp: string;

  @IsEmail()
  email: string;
}