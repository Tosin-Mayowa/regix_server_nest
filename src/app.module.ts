import { User } from './user/user.entity';
import {validate,Environment} from './config/env.validation'

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserpaymentModule } from './userpayment/userpayment.module';

import secreteConfiguration from './config/secrete.configuration';



@Module({
  imports: [
    ConfigModule.forRoot({
    
      isGlobal: true,
      load:[secreteConfiguration],
validate
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        // type:'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [(__dirname + '/**/*.entity.js')],
        synchronize: true,
      }),
    }),
   
    UserModule,
    DashboardModule,
    UserpaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
