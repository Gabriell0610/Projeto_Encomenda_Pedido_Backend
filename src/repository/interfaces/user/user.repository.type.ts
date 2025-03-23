import { Usuario } from "@prisma/client";
import { CreateUserDto } from "../../../dto/user/CreateUserDto";
import { UpdateUserDto } from "@/dto/user/UpdateUserDto";
import { AddressDto, AddressUpdateDto } from "@/dto/user/AddressDto";

interface IUserRepository {
  create: (dto: CreateUserDto) => CreateUserDto | Promise<Partial<Usuario>>;
  list: () => Promise<Partial<Usuario>[]>;
  userExistsByEmail: (email: string) => Promise<Partial<Usuario> | null>;
  findUserById: (id: string) => Promise<Partial<Usuario> | null>;
  updateUser: (dto: UpdateUserDto, userId: string) => Promise<Partial<Usuario>>;
  removeAddress: (userId: string, idAddress: string) => Promise<void>;
  addAddress: (dto: AddressDto, userId: string) => Promise<void>;
  updateAddress: (dto: AddressUpdateDto, userId: string, addressId: string) => Promise<Partial<void>>;
}

export { IUserRepository };
