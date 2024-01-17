import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareHash, hashPassword } from '../../utils/encryption';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/user.dto';
import { Error } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.getUserByUsername(username);

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    const isAuthorised = await compareHash(password, user.password);

    if (!isAuthorised) {
      throw new UnauthorizedException('User not authorized!');
    }

    const payload = { sub: username, password };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(user: CreateUserDto) {
    const userExists = await this.userService.getUserByUsername(user.username);

    if (userExists) {
      throw new Error('User with username already exists');
    }

    const hashedPassword = await hashPassword(user.password);

    this.userService.createUser({ ...user, password: hashedPassword });

    return true;
  }
}
