import { CreateUserDto } from "@/dto/user/UserDto";

interface IUserService {
  register: (data: CreateUserDto) => void | CreateUserDto | Promise<CreateUserDto>;
}

export { IUserService };
