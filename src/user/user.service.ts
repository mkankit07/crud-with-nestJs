import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreatUserDTO } from 'src/user/dto/create-user-dto';
import bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDTO: CreatUserDTO): Promise<User> {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(userDTO.password, salt);
    const user = await this.userRepository.save({ ...userDTO, password });
    delete user.password;
    return user;
  }
}
