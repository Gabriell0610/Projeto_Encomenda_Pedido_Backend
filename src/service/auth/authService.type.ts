import { authDto } from "@/dto/auth/loginDto";
import { AddressDto } from "@/dto/user/AddressDto";
import { UpdateUserDto } from "@/dto/user/UpdateUserDto";
import { Usuario } from "@prisma/client";

interface IAuthService {
  login: (dto: authDto) => Promise<String>;
  update: (dto: UpdateUserDto, userId: string, userEmail: string, idAddress: string) => Promise<Partial<Usuario>>;
  listById: (id: string) => Promise<Partial<Usuario | null>>;
  removeAddress: (userId: string, idAddress: string) => Promise<void>;
  addAddress: (dto: AddressDto, userId: string) => Promise<void>;
}

export { IAuthService };
