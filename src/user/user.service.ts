import { OtpDataDto } from './dtos/otp.dto';
import { CreateUserDto } from './dtos/create.user.dto';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDetailsDto } from './user.details.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  private readonly num = '0123456789';

 private getOtp() {
let otp='';
 for (let i = 0; i < 6; i++) {
   otp += this.num[Math.floor(Math.random() * 10)];
 }
 return otp;
  }
  async findUserByEmail(email: string): Promise<User> {
    const found = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async findUserByRole(): Promise<User> {
    const found = await this.userRepository
      .createQueryBuilder('user')
      .where('user.role = :role', { role: 'Developer' })
      .getOne();
    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }
  async findOneUser(userId: number): Promise<User> {
    const found = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .getOne();
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

async verifyOtp(otpDataDto:OtpDataDto){
  const { email, otp } = otpDataDto;
  const user = await this.findUserByEmail(email);
  if(otp !==user.otp){
throw new UnauthorizedException('invalid code,check your mail for correct')
  }
  user.isVerified=true;
  await this.userRepository.save(user);
}

  async findAllUsers(): Promise<User[]> {
    const result = await this.userRepository
      .createQueryBuilder('user')
      .getMany();
    console.log(result);
    return result;
  }

  async createUser(CreateUserDto: CreateUserDto): Promise<void> {
    const {
      fullName,
      email,
      role,
      company_name,
      company_phone_num,
      company_email,
      company_address,
      state,
      country,
      password,
    } = CreateUserDto;
let OTP = this.getOtp();
    const user = new User();
    user.fullName = fullName;
    user.role = role;
    user.otp=OTP;
    user.company_address = company_address;
    user.company_email = company_email;
    user.company_name = company_name;
    user.company_phone_num = company_phone_num;
    user.country = country;
    user.state = state;
    user.salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, user.salt);
    user.email = email;
    user.isActive = false;
    user.isVerified=false;
    await this.userRepository.save(user);
    this.mailerService
      .sendMail({
        to: email, // List of receivers email address
        from: 'regixapp@zohomail.com', // Senders email address
        subject: 'Verification Code',
        template: 'index', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
code:OTP,
          username: fullName,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async userLogin(
    userDetails: UserDetailsDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = userDetails;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (!user && !user.validatePassword(password)) {
      throw new UnauthorizedException();
    }
    user.isActive = true;
    await this.userRepository.save(user);
    const payload = { id: user.id, email: email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async deleteUser(userId: number): Promise<void> {
    await this.userRepository
      .createQueryBuilder('user')
      .delete()
      .from(User)
      .where('user.id = :userId', { userId })
      .execute();
  }
}
