import { CreateUserDto } from './user.dto';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { UserDetailsDto } from './user.details.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

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

  async findAllUsers(): Promise<User[]> {
    const result = this.userRepository.createQueryBuilder('user').getMany();
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

    const user = new User();
    user.fullName = fullName;
    user.role = role;
    user.company_address = company_address;
    user.company_email = company_email;
    user.company_name = company_name;
    user.company_phone_num = company_phone_num;
    user.country = country;
    user.state = state;
    user.salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, user.salt);
    user.email = email;
    await this.userRepository.save(user);
  }

  async userLogin(userDetails: UserDetailsDto): Promise<{access_token:string}> {
    const { email, password } = userDetails;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

   
    if (!user && !user.validatePassword(password)) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, email: email };
    return {
      access_token:  this.jwtService.sign(payload),
    };
  }
}
