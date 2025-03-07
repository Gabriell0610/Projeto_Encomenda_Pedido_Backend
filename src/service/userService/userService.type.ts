import { CreateUserDto, ListUserDto } from "../../dto/user/UserDto";
import { Usuario } from "@prisma/client";

interface IUserService {
  register: (data: CreateUserDto) => CreateUserDto | Promise<Usuario>;
  list: () => Promise<ListUserDto[]>;
}

export { IUserService };
