import { authDto } from "@/dto/auth/loginDto";
import { AddressDto } from "@/dto/user/AddressDto";
import { CreateUserDto } from "@/dto/user/CreateUserDto";
import { UpdateUserDto } from "@/dto/user/UpdateUserDto";
import { Usuario } from "@prisma/client";

interface IAuthService {
  login: (dto: authDto) => Promise<String>;
  register: (data: CreateUserDto) => CreateUserDto | Promise<Usuario>;
}

export { IAuthService };
