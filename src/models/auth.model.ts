import { IsEmail, IsString } from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { UserModel } from './user.model';

export class AuthModel {

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}


export class AuthResponse {
  @ApiResponseProperty()
  token: string

  @ApiResponseProperty()
  user: UserModel
}