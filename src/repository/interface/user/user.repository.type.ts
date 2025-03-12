import { Usuario } from "@prisma/client";
import { CreateUserDto } from "../../../dto/user/CreateUserDto";
import { UpdateUserDto } from "@/dto/user/UpdateUserDto";
import { AddressDto } from "@/dto/user/AddressDto";

interface IUserRepository {
  create: (dto: CreateUserDto) => CreateUserDto | Promise<Partial<Usuario>>;
  list: () => Promise<Partial<Usuario>[]>;
  userExistsByEmail: (email: string) => Promise<Partial<Usuario> | null>;
  findById: (id: string) => Promise<Partial<Usuario> | null>;
  update: (dto: UpdateUserDto, userId: string, addressId: string) => Promise<Partial<Usuario>>;
  removeAddress: (userId: string, idAddress: string) => Promise<void>;
  addAddress: (dto: AddressDto, userId: string) => Promise<void>;
}

export { IUserRepository };
