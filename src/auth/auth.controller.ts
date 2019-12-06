import { Controller, Post, Body, ValidationPipe, UnprocessableEntityException } from '@nestjs/common';
import { JwtPayloadInterface } from './interfaces';
import { AuthModel, UserModel, AuthResponse } from './../models';
import { AuthService } from './auth.service';
import { UserService } from './../user';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

  @Post('/login')
  @ApiOperation({ summary: 'login with provided credentials' })
  @ApiResponse({ status: 200, description: 'returns token to be used in http bearer authorization scheme'})
  async login(@Body(new ValidationPipe()) auth: AuthModel): Promise<AuthResponse> {
    return this.authService.authenticate(auth);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Creates a new user' })
  @ApiResponse({ status: 200, description: 'returns token to be used in http bearer authorization scheme'})
  async register(@Body(new ValidationPipe()) userModel: UserModel): Promise<AuthResponse> {
    const emailExists = await this.userService.findByEmail(userModel.email);
    console.log('email', emailExists);

    if (emailExists) {
      throw new UnprocessableEntityException();
    }

    const user = await this.userService.create(userModel);

    return this.authService.authenticate(user);
  }
}
