import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { UserpaymentController } from './userpayment.controller';
import { UserpaymentService } from './userpayment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), UserModule],
  controllers: [UserpaymentController],
  providers: [UserpaymentService],
})
export class UserpaymentModule {}
