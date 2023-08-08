import { UserDetailsDto } from './user.details.dto';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create.user.dto';
import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get(':userId')
findOneUser(
  @Param('userId',ParseIntPipe) userId:number
):Promise<User>{
  return this.userService.findOneUser(userId);
}

  @Post('register')
  @UsePipes( new ValidationPipe())
  createUser(@Body() createUserDto: CreateUserDto):Promise<void> {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  signIn(
    @Body(new ValidationPipe()) userDetails:UserDetailsDto
  ){
    return this.userService.userLogin(userDetails);
  }
}
