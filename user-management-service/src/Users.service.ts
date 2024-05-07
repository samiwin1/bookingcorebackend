
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.interface'; // Import the User interface
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class UserService {
  create(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async register(registerDTO: RegisterDTO): Promise<User> {
    const newUser = new this.userModel(registerDTO);
    return newUser.save();
  }

  async login(loginDTO: LoginDTO): Promise<User> {
    // Implement your login logic here
    // For example, you can find the user by email and password
    const user = await this.userModel.findOne({
      email: loginDTO.email,
      password: loginDTO.password,
    }).exec();
    if (!user) {
      throw new NotFoundException('Invalid email or password');
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updatedUser: User): Promise<User> {
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    return this.userModel.findByIdAndUpdate(id, updatedUser, { new: true }).exec();
  }

  async delete(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return deletedUser;
  }
}