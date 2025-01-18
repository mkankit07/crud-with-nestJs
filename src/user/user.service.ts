import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreatUserDTO } from 'src/user/dto/create-user-dto';

import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDTO: CreatUserDTO): Promise<User> {
    const password = bcrypt.hashSync(userDTO.password, 10);
    const user = await this.userRepository.save({ ...userDTO, password });

    delete user.password;
    return user;
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('Could not find user');
    }
    return user;
  }
}
