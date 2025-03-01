import { CreateUserDto } from "../../../dto/user/UserDto";

interface IUserRepository {
  create: (data: CreateUserDto) => CreateUserDto | Promise<CreateUserDto>;
}

export { IUserRepository };
