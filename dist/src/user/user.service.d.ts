import { User } from './user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreatUserDTO } from 'src/user/dto/create-user-dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(userDTO: CreatUserDTO): Promise<User>;
    findOne(email: string): Promise<User>;
    findById(id: number): Promise<User>;
    updateSecretKey(userId: number, secret: string): Promise<UpdateResult>;
    disable2FA(userId: number): Promise<UpdateResult>;
    findByApiKey(apiKey: string): Promise<User>;
}
