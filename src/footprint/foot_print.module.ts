import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FootPrintService } from './foot_print.service';
import { ConfigModule } from 'nestjs-config';
import { FootPrintController } from './foot_print.controller';
import { FootPrint } from 'entities';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([FootPrint])],
  controllers: [FootPrintController],
  providers: [FootPrintService],
})
export class FootPrintModule { }
