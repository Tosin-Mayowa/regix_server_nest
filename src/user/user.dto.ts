import { IsNotEmpty } from "class-validator";

export enum Role{
    ADMIN='Admin',
    PARENT='Parent',
    TEACHER='Teacher'
}

export class CreateUserDto {
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
}