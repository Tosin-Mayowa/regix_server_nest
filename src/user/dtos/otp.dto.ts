import { IsNotEmpty,IsEmail } from 'class-validator';

export class OtpDataDto {
  @IsNotEmpty()
  otp: string;

  @IsEmail()
  email: string;
}