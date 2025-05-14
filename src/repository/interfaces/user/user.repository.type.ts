import { CreateUserDto } from "../../../domain/dto/auth/CreateUserDto";
import { UpdateUserDto } from "@/domain/dto/user/UpdateUserDto";
import { AddressDto, AddressUpdateDto } from "@/domain/dto/address/AddressDto";
import { UserEntity } from "@/domain/model";

interface IUserRepository {
  create: (dto: CreateUserDto) => Promise<Partial<UserEntity>>;
  list: () => Promise<Partial<UserEntity>[]>;
  userExistsByEmail: (email: string) => Promise<Partial<UserEntity> | null>;
  findUserById: (id: string) => Promise<Partial<UserEntity> | null>;
  updateUser: (dto: UpdateUserDto, userId: string) => Promise<Partial<UserEntity>>;
  removeAddress: (userId: string, idAddress: string) => Promise<void>;
  addAddress: (dto: AddressDto, userId: string) => Promise<void>;
  updateAddress: (dto: AddressUpdateDto, userId: string, addressId: string) => Promise<Partial<void>>;
}

export { IUserRepository };
