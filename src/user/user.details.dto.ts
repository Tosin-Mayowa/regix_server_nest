import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';


export class UserDetailsDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}