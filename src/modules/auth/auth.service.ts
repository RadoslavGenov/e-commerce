import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareHash, hashPassword } from '../../utils/encryption';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/user.dto';

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

    const incomingHashedPassword = await hashPassword(password);
    const isAuthorised = await compareHash(
      user.password,
      incomingHashedPassword,
    );

    if (!isAuthorised) {
      throw new UnauthorizedException('User not authorized!');
    }

    const payload = { sub: username, password };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(user: CreateUserDto) {
    // const user = await this.userService.getUserByUsername(username);
    // throw already taken username error!

    const hashedPassword = await hashPassword(user.password);

    this.userService.createUser({ ...user, password: hashedPassword });

    return true;
  }
}
