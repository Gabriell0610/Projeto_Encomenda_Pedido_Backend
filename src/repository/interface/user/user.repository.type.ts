import { Usuario } from "@prisma/client";
import { CreateUserDto, ListUserDto } from "../../../dto/user/UserDto";

interface IUserRepository {
  create: (data: CreateUserDto) => CreateUserDto | Promise<Partial<Usuario>>;
  list: () => Promise<ListUserDto[]>;
  userExistsByEmail: (email: string) => Promise<Partial<Usuario> | null>;
}

export { IUserRepository };
