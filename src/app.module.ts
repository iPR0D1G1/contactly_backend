import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user';
import { AuthModule } from './auth';
import { ContactModule } from './contacts';
import { FootPrintModule } from './footprint';
import * as path from 'path'

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '!(*.d).{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ContactModule,
    FootPrintModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
