import { Usuario } from "@prisma/client";
import { CreateUserDto } from "../../../dto/user/UserDto";

interface IUserRepository {
  create: (data: CreateUserDto) => CreateUserDto | Promise<Partial<Usuario>>;
  list: () => Promise<Partial<Usuario>[]>;
  userExistsByEmail: (email: string) => Promise<Partial<Usuario> | null>;
}

export { IUserRepository };
