import { authDto } from "@/dto/auth/LoginDto";
import { CreateUserDto } from "@/dto/auth/CreateUserDto";
import { Usuario } from "@prisma/client";

interface IAuthService {
  login: (dto: authDto) => Promise<String>;
  register: (data: CreateUserDto) => CreateUserDto | Promise<Partial<Usuario>>;
}

export { IAuthService };
