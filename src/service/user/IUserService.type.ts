import { Usuario } from "@prisma/client";
import { UpdateUserDto } from "@/domain/dto/user/UpdateUserDto";
import { AddressDto, AddressUpdateDto } from "@/domain/dto/address/AddressDto";

interface IUserService {
  list: () => Promise<Partial<Usuario>[]>;
  updateUser: (dto: UpdateUserDto, userId: string, userEmail: string) => Promise<Partial<Usuario>>;
  listUserById: (id: string) => Promise<Partial<Usuario | null>>;
  removeAddress: (userId: string, idAddress: string) => Promise<void>;
  addAddress: (dto: AddressDto, userId: string) => Promise<void>;
  updateUserAddress: (dto: AddressUpdateDto, userId: string, addressId: string) => Promise<void>;
}

export { IUserService };
