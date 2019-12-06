import { IsEmail, IsString, IsPhoneNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ContactModel {
  readonly id: number;

  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  phonenumber: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  avatar_url?: string;

  @IsBoolean()
  @ApiProperty()
  is_favorite: boolean;
}
