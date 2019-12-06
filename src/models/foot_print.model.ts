import { IsEmail, IsString, IsPhoneNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FootPrintModel {
  readonly id: number;

  @ApiProperty()
  @IsString()
  ip: string;

  @ApiProperty()
  @IsString()
  browser: string;

  @ApiProperty()
  @IsString()
  lat: string;

  @ApiProperty()
  @IsString()
  device_info: string;

  @ApiProperty()
  @IsString()
  lng?: string;
}
