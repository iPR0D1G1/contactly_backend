import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactService } from './contacts.service';
import { ConfigModule } from 'nestjs-config';
import { ContactsController } from './contacts.controller';
import { SlugProvider } from './slug.provider';
import { ContactEntity } from 'entities';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ContactEntity])],
  controllers: [ContactsController],
  providers: [SlugProvider, ContactService],
})
export class ContactModule {}
