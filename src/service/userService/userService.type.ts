import { AuthorizationBodyDto } from "@/helpers/zod/schemas/token";
import { CreateUserDto } from "../../dto/user/CreateUserDto";
import { Usuario } from "@prisma/client";
import { UpdateUserDto } from "@/dto/user/UpdateUserDto";

interface IUserService {
  register: (data: CreateUserDto) => CreateUserDto | Promise<Usuario>;
  list: () => Promise<Partial<Usuario>[]>;
}

export { IUserService };
