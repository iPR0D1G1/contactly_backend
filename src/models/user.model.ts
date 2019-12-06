import { IsEmail, IsString, IsEnum } from 'class-validator';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export enum Role {
  User = 'User',
  Description = 'Description',
}

export class UserModel {
  readonly id: number;

  @ApiProperty()
  @ApiResponseProperty()
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty()
  // @ApiResponseProperty()
  password: string;

  @IsString()
  @ApiProperty()
  @ApiResponseProperty()
  firstname: string;

  @IsString()
  @ApiProperty()
  @ApiResponseProperty()
  lastname: string;

  // @IsEnum(Role)
  // @ApiResponseProperty({
  //   enum: Role,
  // })
  // @ApiProperty({
  //   enum: ['Description', 'User']
  // })
  // role: Role
}
