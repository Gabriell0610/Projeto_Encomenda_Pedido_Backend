import { AuthorizationBodyDto } from "@/helpers/zod/schemas/token";
import { CreateUserDto } from "../../dto/user/UserDto";
import { Usuario } from "@prisma/client";

interface IUserService {
  register: (data: CreateUserDto) => CreateUserDto | Promise<Usuario>;
  list: () => Promise<Partial<Usuario>[]>;
}

export { IUserService };
