import { createUserDto } from 'src/users/dtos/CreateUser.dto';
import { UserProfileDto } from 'src/users/dtos/CreateUserProfile.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
export declare class UsersController {
    private userService;
    constructor(userService: UsersService);
    getUsers(): Promise<import("../../../typeorm/entities/User").User[]>;
    createUser(createUserDto: createUserDto): Promise<import("../../../typeorm/entities/User").User>;
    updateUserById(id: number, updateUserDto: UpdateUserDto): void;
    deleteUserById(id: number): void;
    createUserProfile(id: number, createUserProfileDto: UserProfileDto): Promise<import("../../../typeorm/entities/User").User>;
}
