import { User } from './../user/user.entity';
import { Payment } from './payment.entity';
import { CreatePaymentDto, PaymentStatus } from './payment.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserpaymentService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) {}

 async getUserPayment(user):Promise<Payment[]>{
   const result =await this.paymentRepository
     .createQueryBuilder('payment').where('payment.userId = :userId', { userId:user.id })
     .getMany();
   console.log(result);
   return result;
 }

  async createPayment(paymentDto: CreatePaymentDto, user: User) {
    const { company_name, receipt_name, email, subscription, amount, image } =
      paymentDto;

    const payment = new Payment();
    payment.company_name = company_name;
    payment.receipt_name = receipt_name;
    payment.email = email;
    payment.amount = amount;
    payment.image = image;
    payment.status = PaymentStatus.OWING;
    payment.subscription = subscription;
    payment.user = user;
    await this.paymentRepository.save(payment);
  }
}
