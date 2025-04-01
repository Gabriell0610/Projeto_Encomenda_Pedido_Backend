import { authDto } from "../../dto/auth/loginDto";
import { CreateUserDto } from "../../dto/auth/createUserDto";
import { Usuario } from "@prisma/client";

interface IAuthService {
  login: (dto: authDto) => Promise<String>;
  register: (data: CreateUserDto) => CreateUserDto | Promise<Partial<Usuario>>;
}

export { IAuthService };
