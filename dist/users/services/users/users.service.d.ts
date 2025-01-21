import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import { createUserParams, createuserProfileParams, updateUserParams } from 'src/utils/type';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    private profileRepository;
    constructor(userRepository: Repository<User>, profileRepository: Repository<Profile>);
    createUser(userDetails: createUserParams): Promise<User>;
    findUsers(): Promise<User[]>;
    updateUser(id: number, userDetails: updateUserParams): void;
    deleteUser(id: number): void;
    createuserProfile(id: number, userProfileDetails: createuserProfileParams): Promise<User>;
}
