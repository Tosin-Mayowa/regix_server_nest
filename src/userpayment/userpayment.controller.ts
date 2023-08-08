import { Payment } from './payment.entity';
import { UserDto } from './../user/dtos/user.dto';

import { User } from './../user/user.decorator';
import { UserpaymentService } from './userpayment.service';
import { CreatePaymentDto } from './payment.dto';
import { Body, Controller, Get, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { Validator } from 'class-validator';
import { AuthGuard } from '@nestjs/passport';

@Controller('userpayment')
export class UserpaymentController {
  constructor(private userpaymentService: UserpaymentService) {}

  @Get()
  getUserPayment(@User() user: UserDto): Promise<Payment[]> {
    return this.userpaymentService.getUserPayment(user);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createPayment(
    @Body(new ValidationPipe()) paymentDto: CreatePaymentDto,
    @User(new ValidationPipe({ validateCustomDecorators: true })) user: UserDto,
  ) {
    console.log({user});
    return this.userpaymentService.createPayment(paymentDto, user);
  }
}
