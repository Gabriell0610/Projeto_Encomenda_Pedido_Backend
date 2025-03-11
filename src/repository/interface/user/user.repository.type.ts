import { Usuario } from "@prisma/client";
import { CreateUserDto } from "../../../dto/user/CreateUserDto";
import { UpdateUserDto } from "@/dto/user/UpdateUserDto";

interface IUserRepository {
  create: (data: CreateUserDto) => CreateUserDto | Promise<Partial<Usuario>>;
  list: () => Promise<Partial<Usuario>[]>;
  userExistsByEmail: (email: string) => Promise<Partial<Usuario> | null>;
  findById: (id: string) => Promise<Partial<Usuario> | null>;
  update: (data: UpdateUserDto, userId: string, addressId: string) => Promise<Partial<Usuario>>;
  removeAddress: (userId: string, idAddress: string) => Promise<void>;
}

export { IUserRepository };
