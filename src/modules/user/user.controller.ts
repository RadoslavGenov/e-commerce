import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './user.schema';
import { CreateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUser(@Param() { id }: { id: string }) {
    return this.userService.getUser(id);
  }

  @Post()
  async createUser(@Body() body: CreateUserDto): Promise<UserDocument> {
    const { firstName, lastName, email, password, username } = body;
    return this.userService.createUser({
      firstName,
      lastName,
      email,
      password,
      username,
    });
  }

  @Put(':id')
  async updateUser(
    @Param() { id }: { id: string },
    @Body() updateUser: Partial<CreateUserDto>,
  ): Promise<UserDocument> {
    const { firstName, lastName, email, username, password } = updateUser;
    return this.userService.updateUser(id, {
      firstName,
      lastName,
      email,
      username,
      password,
    });
  }
}
