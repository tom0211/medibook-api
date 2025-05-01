import { CreateUserDto } from './../auth/dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = {
      email: createUserDto.email,
      password: createUserDto.password,
      role: createUserDto.role,
    };
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }
}
