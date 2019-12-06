import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from './../user';
import { UserEntity } from 'entities';
import { JwtPayloadInterface } from './interfaces';
import { AuthModel, AuthResponse } from 'models';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(payload: JwtPayloadInterface): Promise<UserEntity | null> {
    console.log({ payload })
    return await this.userService.findById(payload.id);
  }

  async authenticate(auth: AuthModel): Promise<AuthResponse> {
    const user = await this.userService.findByEmailWithPassword(auth.email);
    if (!user) {
      throw new BadRequestException();
    }

    if (!this.userService.compareHash(auth.password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }
    console.log({ auth, user })
    delete user.password
    return { token: this.jwtService.sign({ id: user.id }), user: user }
  }
}
