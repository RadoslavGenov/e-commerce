import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Error, model } from 'mongoose';
import { User, UserDocument, UserSchema } from './user.schema';
import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getUser(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new Error.DocumentNotFoundError(`user with id:${id} not found`);
    }

    return user;
  }

  async getUserByUsername(username: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne<UserDocument>({
      username,
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async createUser(user: CreateUserDto): Promise<UserDocument> {
    try {
      const UserValidtion = model(User.name, UserSchema);
      await UserValidtion.validate(user, [
        'firstName',
        'lastName',
        'email',
        'username',
        'password',
      ]);
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        const fields = Object.keys(error.errors);
        throw new Error(`Missing fields: ${fields.join(',')}`);
      }
    }

    const newUser = new this.userModel(user);

    return newUser.save();
  }

  async updateUser(
    id: string,
    user: Partial<CreateUserDto>,
  ): Promise<UserDocument> {
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: id }, user, {
        new: true,
      })
      .exec();

    if (!updatedUser) {
      throw new Error.DocumentNotFoundError(`user with id ${id} not found`);
    }

    return updatedUser;
  }
}
